import {
	Helpers,
	History,
	Services,
	State,
	StateManagerContract,
	Utilities
} from '../types/index.js';
import { StateFactory } from './StateFactory.js';
import { StorageManager } from '../storage/StorageManager.js';
import { env } from '../config/index.js';

const caller = 'StateManager';
const maxReadyAttempts = env.state.maxReadyAttempts;
const stateReadyTimeout = env.state.readyTimeout;

export class StateManager implements StateManagerContract {
	static #instance: StateManager | null = null;

	#state: State;
	#stateFactory: StateFactory;
	#storage!: StorageManager;

	#history: History = [];
	#redoStack: History = [];
	#undoStack: History = [];

	#debouncedSave!: (state: State) => void;
	#deepClone: Helpers['data']['deepClone'];
	#deepFreeze: Helpers['data']['deepFreeze'];
	#debounce: Helpers['time']['debounce'];
	#log: Services['log'];
	#errors: Services['errors'];

	private constructor(
		helpers: Helpers,
		services: Services,
		utils: Utilities
	) {
		try {
			services.log.debug(
				`Constructing ${caller} instance.`,
				`${caller} constructor`
			);

			this.#deepClone = helpers.data.deepClone;
			this.#deepFreeze = helpers.data.deepFreeze;
			this.#debounce = helpers.time.debounce;
			this.#log = services.log;
			this.#errors = services.errors;

			this.#state = {} as State;
			this.#stateFactory = StateFactory.getInstance(
				helpers,
				services,
				utils
			);

			this.init(services).catch(error => {
				this.#log.error(
					'StateManager init failed.',
					`${caller} constructor`
				);

				console.error(error);
			});
		} catch (error) {
			throw new Error(
				`[${caller} constructor]: ${error instanceof Error ? error.message : error}`
			);
		}
	}

	static async getInstance(
		helpers: Helpers,
		services: Services,
		utils: Utilities
	): Promise<StateManager> {
		return services.errors.handleSync(() => {
			if (!StateManager.#instance) {
				services.log.debug(
					`Creating new StateManager instance.`,
					`${caller}.getInstance`
				);

				StateManager.#instance = new StateManager(
					helpers,
					services,
					utils
				);
			}

			services.log.debug(
				`Returning ${caller} instance.`,
				`${caller}.getInstance`
			);

			return StateManager.#instance;
		}, `[${caller}]: Error getting StateManager instance.`);
	}

	async init(services: Services): Promise<void> {
		return this.#errors.handleAsync(async () => {
			this.#log.debug('Initializing State Manager.', `${caller}.init`);

			this.#storage = await StorageManager.getInstance(services);
			this.#debouncedSave = this.#debounce<(state: State) => void>(
				(state: State) => this.saveState(state),
				env.state.saveThrottleDelay
			);

			this.#state = await this.loadState();

			console.log(
				`[${caller}.init]: State after loadState():`,
				this.#state
			);

			this.saveState();
		}, `[${caller}.init]: Failed to initialize State Manager.`);
	}

	async batchUpdate(
		updater: (currentState: State) => Partial<State>
	): Promise<void> {
		this.#errors.handleSync(() => {
			const currentState = this.#deepClone(this.get() as State);
			const updates = updater(currentState);

			const isShallowEqual = Object.keys(updates).every(key =>
				Object.is(
					currentState[key as keyof State],
					updates[key as keyof State]
				)
			);

			if (isShallowEqual) {
				this.#log.debug(
					'Skipping redundant batch update.',
					`${caller}.batchUpdate`
				);
				return;
			}

			const newState = { ...currentState, ...updates };
			this.#commitState(newState);

			this.#log.debug(`Batch updated state.`, `${caller}.batchUpdate`);
		}, `[${caller}.batchUpdate]: Failed to perform batch update`);
	}

	clearHistory(): void {
		this.#errors.handleSync(() => {
			this.#history = [];
			this.#redoStack = [];
			this.#undoStack = [];

			this.#log.info(
				`History and undo stack cleared.`,
				`${caller}.clear`
			);
		}, `[${caller}.clearHistory]: Failed to clear history.`);
	}

	async ensureStateReady(): Promise<void> {
		return await this.#errors.handleAsync(
			async () => {
				let attempts = 0;

				while (!this.#state || !this.#state.paletteContainer) {
					if (attempts++ >= maxReadyAttempts) {
						this.#log.error(
							'State initialization timed out.',
							`${caller}.ensureStateReady`
						);

						throw new Error('State initialization timed out.');
					}

					this.#log.debug(
						`Waiting for state to initialize... (Attempt ${attempts}).`,
						`${caller}.ensureStateReady`
					);

					await new Promise(resolve =>
						setTimeout(resolve, stateReadyTimeout)
					);
				}

				this.#log.debug(
					'State is now initialized.',
					`${caller}.ensureStateReady`
				);
			},
			`[${caller}]: Failed to ensure state readiness.`,
			{ context: { maxReadyAttempts } }
		);
	}

	get<K extends keyof State>(key?: K): State | State[K] {
		return this.#errors.handleSync(
			() => {
				const latestState = this.#history.at(-1) ?? this.#state;
				return key ? latestState[key] : latestState;
			},
			`[${caller}.get]: Failed to retrieve state key: ${String(key)}`
		);
	}

	async loadState(): Promise<State> {
		return this.#errors.handleAsync(async () => {
			const loadedState = await this.#storage.getItem<State>('state');
			if (loadedState) {
				this.#state = this.#deepFreeze(this.#deepClone(loadedState));
				this.#log.info(
					'State loaded from storage.',
					`${caller}.loadState`
				);
				return this.#state;
			}
			this.#log.debug(
				'No saved state found. Creating initial state.',
				`${caller}.loadState`
			);
			return await this.#stateFactory.createInitialState();
		}, `[${caller}.loadState]: Failed to load state.`);
	}

	redo(): State | null {
		return this.#errors.handleSync(() => {
			if (this.#redoStack.length === 0) {
				this.#log.info(
					'No redo actions available.',
					`StateManager.redo`
				);
				return null;
			}

			const newState = this.#redoStack.pop()!;
			this.#commitState(newState);

			this.#log.debug(`Redo performed.`, `StateManager.redo`);
			return newState;
		}, `[${caller}.redo]: Failed to redo action.`);
	}

	async replaceState(newState: State): Promise<void> {
		return this.#errors.handleAsync(async () => {
			this.#trackAction();
			this.#commitState(newState);
			this.#log.info('State replaced.', `${caller}.replaceState`);
		}, `[${caller}.replaceState]: Failed to set new state.`);
	}

	async resetState(): Promise<void> {
		const initialState = await this.#stateFactory.createInitialState();

		this.#commitState(initialState);

		this.#log.info('State has been reset.', `${caller}.resetState`);
	}

	async saveState(
		state: State = this.#state,
		options: { throttle?: boolean } = {}
	): Promise<void> {
		return this.#errors.handleAsync(async () => {
			if (Object.is(this.#state, state)) {
				this.#log.debug(
					'Skipping redundant save.',
					`${caller}.saveState`
				);

				return;
			}

			if (options.throttle) {
				this.#debouncedSave(state);
			} else {
				await this.#saveOperation(state);
			}
		}, `[${caller}.saveState]: Failed to save state.`);
	}

	undo(): State | null {
		return this.#errors.handleSync(() => {
			if (this.#undoStack.length <= 1) {
				this.#log.info(
					'No undo actions available.',
					`StateManager.undo`
				);
				return null;
			}

			this.#redoStack.push(this.get() as State);
			this.#undoStack.pop();

			const newState = this.#undoStack.at(-1)!;
			this.#commitState(newState);

			this.#log.debug(`Undo performed.`, `StateManager.undo`);
			return newState;
		}, `[StateManager.undo]: Failed to undo action.`);
	}

	#commitState(newState: State): void {
		this.#errors.handleSync(() => {
			const committedState = this.#deepFreeze(this.#deepClone(newState));

			this.#history.push(committedState);
			if (this.#history.length > env.app.historyLimit) {
				this.#history.shift();
			}

			this.#state = committedState;

			this.#log.debug(
				`Committed new state to history.`,
				`${caller}.commitState`
			);
			this.saveState();
		}, `[${caller}.commitState]: Failed to commit new state.`);
	}

	async #saveOperation(state: State): Promise<void> {
		return this.#errors.handleAsync(async () => {
			for (
				let attempt = 1;
				attempt <= env.state.maxSaveRetries;
				attempt++
			) {
				try {
					await this.#storage.setItem('state', state);

					this.#log.info(
						`State saved successfully on attempt ${attempt}.`,
						`${caller}.#saveOperation`
					);

					break;
				} catch (err) {
					if (attempt < env.state.maxSaveRetries) {
						this.#log.warn(
							`Save attempt ${attempt} failed. Retrying...`,
							`${caller}.#saveOperation`
						);
					} else {
						this.#log.error(
							'Max save attempts reached. Save failed.',
							`${caller}.#saveOperation`
						);
					}
				}
			}
		}, `[${caller}.#saveOperation]: Save operation failed.`);
	}

	#trackAction(): void {
		this.#errors.handleSync(() => {
			const clonedState = this.#deepFreeze(this.#deepClone(this.#state));

			this.#history.push(clonedState);
			this.#undoStack.push(clonedState);
			this.#redoStack = [];

			if (this.#history.length > env.app.historyLimit) {
				this.#history.shift();
			}

			this.#log.debug(
				`Tracked new action in history.`,
				`${caller}.trackAction`
			);
		}, `[${caller}.trackAction]: Tracking failed.`);
	}
}
