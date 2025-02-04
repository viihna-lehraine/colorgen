// ColorGen - version 0.6.0-dev

// Author: Viihna Leraine (viihna@ViihnaTech.com / viihna.78 (Signal) / Viihna-Lehraine (Github))
// Licensed under GNU GPLv3 (https://www.gnu.org/licenses/gpl-3.0.html)

// You may use this code for any purpose EXCEPT for the creation of proprietary derivatives. I encourage you to improve on my code or to include it in other projects if you find it helpful. Please credit me as the original author.

// This application comes with ABSOLUTELY NO WARRANTY OR GUARANTEE OF ANY KIND.

// File: src/app.js

import { UIManager } from './ui/UIManager.js';
import { getIDBInstance } from './db/instance.js';
import { createLogger } from './logger/index.js';
import { defaultData as defaults } from './data/defaults.js';
import { domData } from './data/dom.js';
import { eventListenerFn } from './dom/eventListeners/index.js';
import { modeData as mode } from './data/mode.js';
import { uiFn } from './ui/main.js';
import { validateStaticElements } from './dom/validate.js';

const logMode = mode.logging;

const thisModule = 'app.js';

const logger = await createLogger();

if (mode.debug)
	logger.info(
		'Executing main application script',
		`${thisModule} > ANONYMOUS`
	);

if (document.readyState === 'loading') {
	if (mode.debug)
		logger.info(
			'DOM content not yet loaded. Adding DOMContentLoaded event listener and awaiting...',
			`${thisModule} > ANONYMOUS`
		);

	document.addEventListener('DOMContentLoaded', initializeApp);
} else {
	if (mode.debug)
		logger.info(
			'DOM content already loaded. Initializing application immediately.',
			`${thisModule} > ANONYMOUS`
		);

	initializeApp();
}

async function initializeApp(): Promise<void> {
	const thisFunction = 'initializeApp()';

	logger.info(
		'DOM content loaded - Initializing application',
		`${thisModule} > ${thisFunction}`
	);

	try {
		if (mode.logging.verbosity > 1)
			logger.info(
				'Creating new IDBManager instance. Initializing database and its dependencies.',
				`${thisModule} > ${thisFunction}`
			);

		const idbManager = await getIDBInstance();

		const selectedSwatch = domData.elements.static.selects.swatch;

		if (mode.debug) {
			if (!mode.quiet && logMode.debug && logMode.verbosity > 1) {
				logger.debug(
					'Validating DOM elements',
					`${thisModule} > ${thisFunction}`
				);

				validateStaticElements();
			}
		} else {
			if (!mode.quiet) {
				logger.info(
					'Skipping DOM element validation',
					`${thisModule} > ${thisFunction}`
				);
			}
		}

		const selectedColor = selectedSwatch
			? parseInt(selectedSwatch.value, 10)
			: 0;

		if (!mode.quiet && mode.debug)
			logger.debug(
				`Selected color: ${selectedColor}`,
				`${thisModule} > ${thisFunction}`
			);

		const defaultPaletteOptions = defaults.paletteOptions;
		if (!mode.quiet && logMode.info && logMode.verbosity > 1) {
			logger.info(
				`Generating initial color palette.`,
				`${thisModule} > ${thisFunction}`
			);
		}

		await uiFn.startPaletteGeneration(defaultPaletteOptions);

		const uiManager = new UIManager(eventListenerFn, idbManager);

		try {
			eventListenerFn.initializeEventListeners(uiManager);

			if (!mode.quiet)
				logger.info(
					'Event listeners have been successfully initialized',
					`${thisModule} > ${thisFunction}`
				);
		} catch (error) {
			if (logMode.error)
				logger.error(
					`Failed to initialize event listeners.\n${error}`,
					`${thisModule} > ${thisFunction}`
				);

			if (mode.showAlerts)
				alert('An error occurred. Check console for details.');
		}

		if (!mode.quiet && logMode.info)
			logger.info(
				'Application successfully initialized. Awaiting user input.',
				`${thisModule} > ${thisFunction}`
			);
	} catch (error) {
		if (logMode.error)
			logger.error(
				`Failed to initialize application: ${error}`,
				`${thisModule} > ${thisFunction}`
			);

		if (mode.showAlerts)
			alert('An error occurred. Check console for details.');
	}
}
