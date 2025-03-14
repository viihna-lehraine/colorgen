import {
	Helpers,
	Services,
	State,
	StateFactoryContract,
	Utilities
} from '../types/index.js';

const caller = 'StateFactory';

export class StateFactory implements StateFactoryContract {
	static #instance: StateFactory | null = null;

	#errors: Services['errors'];
	#helpers: Helpers;
	#log: Services['log'];
	#utils: Utilities;

	private constructor(
		helpers: Helpers,
		services: Services,
		utils: Utilities
	) {
		try {
			services.log.debug(
				`Constructing StateFactory instance.`,
				`${caller} constructor`
			);

			this.#errors = services.errors;
			this.#helpers = helpers;
			this.#log = services.log;
			this.#utils = utils;
		} catch (error) {
			throw new Error(
				`[${caller} constructor]: ${
					error instanceof Error ? error.message : error
				}`
			);
		}
	}

	static getInstance(
		helpers: Helpers,
		services: Services,
		utils: Utilities
	): StateFactory {
		return services.errors.handleSync(() => {
			if (!StateFactory.#instance) {
				services.log.debug(
					'Creating StateFactory instance.',
					`${caller}.getInstance`
				);

				StateFactory.#instance = new StateFactory(
					helpers,
					services,
					utils
				);
			}

			services.log.debug(
				`Returning StateFactory instance.`,
				`${caller}.getInstance`
			);

			return StateFactory.#instance;
		}, `[${caller}]: Error getting instance.`);
	}

	createInitialState(): Promise<State> {
		return (
			this.#errors.handleAsync(async () => {
				this.#log.debug(
					'Generating initial state.',
					`${caller}.createInitialState`
				);

				const columns = this.#utils.dom.scanPaletteColumns() ?? [];

				if (!columns) {
					this.#log.error(
						'No palette columns found!',
						`${caller}.createInitialState`
					);
				}

				this.#log.debug(
					`Scanned palette columns.`,
					`${caller}.createInitialState`
				);

				return {
					appMode: 'edit',
					paletteContainer: { columns },
					paletteHistory: [],
					preferences: {
						colorSpace: 'hsl',
						distributionType: 'soft',
						maxHistory: 20,
						maxPaletteHistory: 10,
						theme: 'light'
					},
					selections: {
						paletteColumnCount: columns.length,
						paletteType: 'complementary',
						targetedColumnPosition: 1
					},
					timestamp: this.#helpers.data.getFormattedTimestamp()
				};
			}, `[${caller}.createInitialState]: Failed to generate initial state`) ??
			({} as State)
		);
	}
}
