import {
	AppDependencies,
	CommonFunctions,
	Helpers,
	Services,
	Utilities
} from '../types/index.js';
import { PaletteRendererService } from '../dom/PaletteRendererService.js';

export async function registerDependencies(
	helpers: Helpers,
	services: Services
): Promise<AppDependencies> {
	const { errors, log } = services;
	const caller = '[REGISTER_DEPENDENCIES]';

	log.info(`Executing registerDependencies...`, `${caller}`);

	return await errors.handleAsync(async () => {
		const utils = {} as Utilities;

		const { initializeUtilities } = await import('./init.js');
		Object.assign(utils, await initializeUtilities(helpers, services));

		const common: Required<CommonFunctions> = {
			helpers,
			services,
			utils
		};

		const { initializeDOMStore } = await import('./init.js');
		const domStore = await initializeDOMStore(helpers, services);

		const { initializeStateManager } = await import('./init.js');
		const stateManager = await initializeStateManager(
			helpers,
			services,
			utils
		);

		const { generateHuesFnGroup } = await import(
			'../palette/partials/hues.js'
		);
		const { generatePaletteFnGroup } = await import(
			'../palette/partials/types.js'
		);
		const { generatePalette } = await import('../palette/generate.js');

		const paletteRenderer = PaletteRendererService.getInstance(
			common,
			domStore,
			generateHuesFnGroup,
			generatePaletteFnGroup,
			generatePalette,
			stateManager
		);

		const { initializeEventManager } = await import('./init.js');
		const eventManager = await initializeEventManager(services);

		const { initializePaletteStateService } = await import('./init.js');
		const paletteState = await initializePaletteStateService(
			helpers,
			services,
			stateManager,
			utils
		);

		const { initializePaletteEventsService } = await import('./init.js');
		const paletteEvents = await initializePaletteEventsService(
			domStore,
			helpers,
			paletteRenderer,
			paletteState,
			services,
			stateManager,
			utils
		);

		const { initializeUIEventsService } = await import('./init.js');
		const uiEvents = await initializeUIEventsService(
			domStore,
			helpers,
			paletteRenderer,
			services,
			utils
		);

		await stateManager.ensureStateReady();

		return {
			common,
			domStore,
			eventManager,
			paletteEvents,
			paletteState,
			stateManager,
			uiEvents
		} as AppDependencies;
	}, 'Error registering dependencies');
}
