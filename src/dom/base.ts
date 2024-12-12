// File: src/dom/base.ts

import {
	Color,
	ColorSpace,
	DOMBaseFnInterface,
	GetElementsForSelectedColor,
	HSL,
	PullParamsFromUI,
	SL,
	SV,
	UIElements
} from '../index/index.js';
import { core, helpers, utils, superUtils } from '../common/index.js';
import { data } from '../data/index.js';
import { paletteUtils } from '../palette/common/index.js';

const mode = data.mode;

function addConversionButtonEventListeners(): void {
	try {
		const addListener = (id: string, colorSpace: ColorSpace) => {
			const button = document.getElementById(
				id
			) as HTMLButtonElement | null;

			if (button) {
				button.addEventListener('click', () =>
					superUtils.dom.switchColorSpace(colorSpace)
				);
			} else {
				if (!mode.warnLogs)
					console.warn(`Element with id "${id}" not found.`);
			}
		};

		addListener('show-as-cmyk-button', 'cmyk');
		addListener('show-as-hex-button', 'hex');
		addListener('show-as-hsl-button', 'hsl');
		addListener('show-as-hsv-button', 'hsv');
		addListener('show-as-lab-button', 'lab');
		addListener('show-as-rgb-button', 'rgb');
	} catch (error) {
		if (mode.errorLogs)
			console.error(
				`Failed to add event listeners to conversion buttons: ${error}`
			);

		return;
	}
}

function applyCustomColor(): HSL {
	try {
		const colorPicker = document.getElementById(
			'custom-color-picker'
		) as HTMLInputElement | null;

		if (!colorPicker) {
			throw new Error('Color picker element not found');
		}

		const rawValue = colorPicker.value.trim();
		const selectedFormat = (
			document.getElementById(
				'custom-color-format'
			) as HTMLSelectElement | null
		)?.value as ColorSpace;

		if (!utils.color.isColorSpace(selectedFormat)) {
			if (!mode.gracefulErrors)
				throw new Error(`Unsupported color format: ${selectedFormat}`);
		}

		const parsedColor = utils.color.parseColor(
			selectedFormat,
			rawValue
		) as Exclude<Color, SL | SV>;

		if (!parsedColor) {
			if (!mode.gracefulErrors)
				throw new Error(`Invalid color value: ${rawValue}`);
		}

		const hslColor = utils.color.isHSLColor(parsedColor)
			? parsedColor
			: paletteUtils.convert.toHSL(parsedColor);

		return hslColor;
	} catch (error) {
		if (mode.errorLogs)
			console.error(
				`Failed to apply custom color: ${error}. Returning randomly generated hex color`
			);

		return utils.random.hsl(false) as HSL;
	}
}

function applyFirstColorToUI(color: HSL): HSL {
	try {
		const colorBox1 = document.getElementById('color-box-1');

		if (!colorBox1) {
			if (mode.errorLogs) console.error('color-box-1 is null');

			return color;
		}

		const formatColorString = core.convert.toCSSColorString(color);

		if (!formatColorString) {
			if (mode.errorLogs)
				console.error('Unexpected or unsupported color format.');

			return color;
		}

		colorBox1.style.backgroundColor = formatColorString;

		utils.palette.populateOutputBox(color, 1);

		return color;
	} catch (error) {
		if (mode.errorLogs)
			console.error(`Failed to apply first color to UI: ${error}`);

		return utils.random.hsl(false) as HSL;
	}
}

function copyToClipboard(text: string, tooltipElement: HTMLElement): void {
	try {
		const colorValue = text.replace('Copied to clipboard!', '').trim();

		navigator.clipboard
			.writeText(colorValue)
			.then(() => {
				helpers.dom.showTooltip(tooltipElement);
				if (!mode.quiet)
					console.log(`Copied color value: ${colorValue}`);

				setTimeout(
					() => tooltipElement.classList.remove('show'),
					data.consts.timeouts.tooltip || 1000
				);
			})
			.catch(err => {
				if (mode.errorLogs)
					console.error('Error copying to clipboard:', err);
			});
	} catch (error) {
		if (mode.errorLogs)
			console.error(`Failed to copy to clipboard: ${error}`);
		else if (!mode.quiet) console.error('Failed to copy to clipboard');
	}
}

function defineUIElements(): UIElements {
	try {
		const advancedMenuButton = data.consts.dom.advancedMenuButton;
		const applyCustomColorButton = data.consts.dom.applyCustomColorButton;
		const clearCustomColorButton = data.consts.dom.clearCustomColorButton;
		const closeCustomColorMenuButton =
			data.consts.dom.closeCustomColorMenuButton;
		const closeHelpMenuButton = data.consts.dom.closeHelpMenuButton;
		const closeHistoryMenuButton = data.consts.dom.closeHistoryMenuButton;
		const desaturateButton = data.consts.dom.desaturateButton;
		const enableAlphaCheckbox = data.consts.dom.enableAlphaCheckbox;
		const generateButton = data.consts.dom.generateButton;
		const helpMenuButton = data.consts.dom.helpMenuButton;
		const historyMenuButton = data.consts.dom.historyMenuButton;
		const limitDarknessCheckbox = data.consts.dom.limitDarknessCheckbox;
		const limitGraynessCheckbox = data.consts.dom.limitGraynessCheckbox;
		const limitLightnessCheckbox = data.consts.dom.limitLightnessCheckbox;
		const saturateButton = data.consts.dom.saturateButton;
		const selectedColorOption = data.consts.dom.selectedColorOption;
		const showAsCMYKButton = data.consts.dom.showAsCMYKButton;
		const showAsHexButton = data.consts.dom.showAsHexButton;
		const showAsHSLButton = data.consts.dom.showAsHSLButton;
		const showAsHSVButton = data.consts.dom.showAsHSVButton;
		const showAsLABButton = data.consts.dom.showAsLABButton;
		const showAsRGBButton = data.consts.dom.showAsRGBButton;
		const selectedColor = selectedColorOption
			? parseInt(selectedColorOption.value, 10)
			: 0;

		return {
			advancedMenuButton,
			applyCustomColorButton,
			clearCustomColorButton,
			closeCustomColorMenuButton,
			closeHelpMenuButton,
			closeHistoryMenuButton,
			desaturateButton,
			enableAlphaCheckbox,
			generateButton,
			helpMenuButton,
			historyMenuButton,
			limitDarknessCheckbox,
			limitGraynessCheckbox,
			limitLightnessCheckbox,
			saturateButton,
			selectedColor,
			showAsCMYKButton,
			showAsHexButton,
			showAsHSLButton,
			showAsHSVButton,
			showAsLABButton,
			showAsRGBButton
		};
	} catch (error) {
		if (mode.errorLogs)
			console.error(`Failed to define UI buttons: ${error}.`);
		if (!mode.quiet) console.error('Failed to define UI buttons.');

		return {
			advancedMenuButton: null,
			applyCustomColorButton: null,
			clearCustomColorButton: null,
			closeCustomColorMenuButton: null,
			closeHelpMenuButton: null,
			closeHistoryMenuButton: null,
			desaturateButton: null,
			enableAlphaCheckbox: null,
			generateButton: null,
			helpMenuButton: null,
			historyMenuButton: null,
			limitDarknessCheckbox: null,
			limitLightnessCheckbox: null,
			limitGraynessCheckbox: null,
			saturateButton: null,
			selectedColor: 0,
			showAsCMYKButton: null,
			showAsHexButton: null,
			showAsHSLButton: null,
			showAsHSVButton: null,
			showAsLABButton: null,
			showAsRGBButton: null
		};
	}
}

function desaturateColor(selectedColor: number): void {
	try {
		getElementsForSelectedColor(selectedColor);
	} catch (error) {
		if (mode.errorLogs)
			console.error(`Failed to desaturate color: ${error}`);
	}
}

function getElementsForSelectedColor(
	selectedColor: number
): GetElementsForSelectedColor {
	const selectedColorBox = document.getElementById(
		`color-box-${selectedColor}`
	);

	if (!selectedColorBox) {
		if (mode.warnLogs)
			console.warn(`Element not found for color ${selectedColor}`);

		helpers.dom.showToast('Please select a valid color.');

		return {
			selectedColorTextOutputBox: null,
			selectedColorBox: null,
			selectedColorStripe: null
		};
	}

	return {
		selectedColorTextOutputBox: document.getElementById(
			`color-text-output-box-${selectedColor}`
		),
		selectedColorBox,
		selectedColorStripe: document.getElementById(
			`color-stripe-${selectedColor}`
		)
	};
}

function pullParamsFromUI(): PullParamsFromUI {
	try {
		const paletteTypeOptionsElement = data.consts.dom.paletteTypeOptions;
		const numBoxesElement = data.consts.dom.paletteNumberOptions;
		const enableAlphaCheckbox = data.consts.dom.enableAlphaCheckbox;
		const limitDarknessCheckbox = data.consts.dom.limitDarknessCheckbox;
		const limitGraynessCheckbox = data.consts.dom.limitGraynessCheckbox;
		const limitLightnessCheckbox = data.consts.dom.limitLightnessCheckbox;

		return {
			paletteType: paletteTypeOptionsElement
				? parseInt(paletteTypeOptionsElement.value, 10)
				: 0,
			numBoxes: numBoxesElement ? parseInt(numBoxesElement.value, 10) : 0,
			enableAlpha: enableAlphaCheckbox?.checked || false,
			limitDarkness: limitDarknessCheckbox?.checked || false,
			limitGrayness: limitGraynessCheckbox?.checked || false,
			limitLightness: limitLightnessCheckbox?.checked || false
		};
	} catch (error) {
		if (mode.errorLogs)
			console.error(`Failed to pull parameters from UI: ${error}`);

		return {
			paletteType: 0,
			numBoxes: 0,
			enableAlpha: false,
			limitDarkness: false,
			limitGrayness: false,
			limitLightness: false
		};
	}
}

function saturateColor(selectedColor: number): void {
	try {
		getElementsForSelectedColor(selectedColor);
	} catch (error) {
		if (mode.errorLogs) console.error(`Failed to saturate color: ${error}`);
	}
}

function showCustomColorPopupDiv(): void {
	try {
		const popup = document.getElementById('popup-div');

		if (popup) {
			popup.classList.toggle('show');
		} else {
			if (mode.errorLogs)
				console.error(
					"document.getElementById('popup-div') is undefined"
				);

			return;
		}
	} catch (error) {
		console.error(`Failed to show custom color popup div: ${error}`);
	}
}

export const base: DOMBaseFnInterface = {
	addConversionButtonEventListeners,
	applyCustomColor,
	applyFirstColorToUI,
	copyToClipboard,
	defineUIElements,
	desaturateColor,
	getElementsForSelectedColor,
	pullParamsFromUI,
	saturateColor,
	showCustomColorPopupDiv
} as const;
