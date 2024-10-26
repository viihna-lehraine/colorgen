import { genAllColorValues } from '../color-conversion/conversion';
import { dom } from '../dom/dom-main';
import { paletteHelpers } from '../helpers/palette';
import * as colors from '../index/colors';
import { random } from '../utils/color-randomizer';
import { core } from '../utils/core';

export function genMonochromaticPalette(
	numBoxes: number,
	customColor: colors.Color | null = null,
	colorSpace: colors.ColorSpace = 'hex'
): colors.Color[] {
	try {
		let clonedCustomColor: colors.Color | null = null;

		if (customColor) {
			if (!paletteHelpers.validateColorValues(customColor)) {
				console.error(
					`Invalid custom color value ${JSON.stringify(customColor)}`
				);

				return [];
			}

			clonedCustomColor = core.clone(customColor);
		}

		if (numBoxes < 2) {
			window.alert(
				'To generate a monochromatic palette, please select a number of swatches greater than 1'
			);

			return [];
		}

		const colors: colors.Color[] = [];
		const baseColorValues = genAllColorValues(
			clonedCustomColor ?? random.randomColor(colorSpace)
		);
		const baseHSL = baseColorValues.hsl as colors.HSL;

		if (!baseHSL) {
			throw new Error(
				'Could not retrieve HSL color from genAllColorValues. HSL color is required for a monochromatic palette.'
			);
		}

		colors.push(baseHSL);

		for (let i = 1; i < numBoxes; i++) {
			const {
				value: { saturation, lightness }
			} = random.randomSL();
			const monoColorValues = genAllColorValues({
				value: {
					hue: baseHSL.value.hue,
					saturation,
					lightness
				},
				format: 'hsl'
			});
			const monoHSL = monoColorValues.hsl as colors.HSL;

			colors.push(monoHSL);

			const colorBox = document.getElementById(`color-box-${i + 1}`);

			if (colorBox) {
				const hexColor = monoColorValues.hex as colors.Hex;

				colorBox.style.backgroundColor = hexColor.value.hex;

				dom.populateColorTextOutputBox(monoHSL, i + 1);
			}
		}

		console.log(
			`Generated monochromatic palette: ${JSON.stringify(colors)}`
		);

		return colors;
	} catch (error) {
		console.error(`Error generating monochromatic palette: ${error}`);

		return [];
	}
}
