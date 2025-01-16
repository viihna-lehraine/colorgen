// File: src/dom/events/palette.js

import { UIFnBaseInterface } from '../index/index.js';
import { data } from '../data/index.js';
import { log } from '../classes/logger/index.js';

const domIDs = data.consts.dom.ids;
const logMode = data.mode.logging;
const mode = data.mode;

function enforceSwatchRules(
	minimumSwatches: number,
	maximumSwatches?: number
): void {
	const paletteDropdown = document.getElementById(
		domIDs.paletteNumberOptions
	) as HTMLSelectElement;

	if (!paletteDropdown) {
		if (logMode.errors) {
			log.error('paletteDropdown not found');
		}
		if (mode.stackTrace && logMode.verbosity > 3) {
			console.trace('enforceMinimumSwatches stack trace');
		}

		return;
	}

	const currentValue = parseInt(paletteDropdown.value, 10);

	let newValue = currentValue;

	// ensue the value is within the allowed range
	if (currentValue < minimumSwatches) {
		newValue = minimumSwatches;
	} else if (
		maximumSwatches !== undefined &&
		currentValue > maximumSwatches
	) {
		newValue = maximumSwatches;
	}

	if (newValue !== currentValue) {
		// update value in the dropdown menu
		paletteDropdown.value = newValue.toString();

		// trigger a change event to notify the application
		const event = new Event('change', { bubbles: true });
		try {
			paletteDropdown.dispatchEvent(event);
		} catch (error) {
			if (logMode.errors) {
				log.error(
					`Failed to dispatch change event to palette-number-options dropdown menu: ${error}`
				);
			}
			throw new Error(`Failed to dispatch change event: ${error}`);
		}
	}
}

export const base: UIFnBaseInterface = {
	enforceSwatchRules
};
