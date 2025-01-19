// File: src/io/parse/shared/colorValue.ts

import {
	CMYKValue,
	HexValue,
	HSLValue,
	HSVValue,
	LABValue,
	RGBValue,
	XYZValue
} from '../../../index/index.js';
import { parseColorString } from './color.js';

function asCMYKValue(colorString: string): CMYKValue {
	const parsed = parseColorString('cmyk', colorString);

	if (parsed && parsed.format === 'cmyk') {
		return parsed.value as CMYKValue;
	}

	throw new Error(`Invalid CMYK color string: ${colorString}`);
}

function asHexValue(colorValue: string): HexValue {
	const parsed = parseColorString('hex', colorValue);

	if (parsed && parsed.format === 'hex') {
		return parsed.value as HexValue;
	}

	throw new Error(`Invalid Hex color value: ${colorValue}`);
}

function asHSLValue(colorValue: string): HSLValue {
	const parsed = parseColorString('hsl', colorValue);

	if (parsed && parsed.format === 'hsl') {
		return parsed.value as HSLValue;
	}

	throw new Error(`Invalid HSL color value: ${colorValue}`);
}

function asHSVValue(colorValue: string): HSVValue {
	const parsed = parseColorString('hsv', colorValue);

	if (parsed && parsed.format === 'hsv') {
		return parsed.value as HSVValue;
	}

	throw new Error(`Invalid HSV color value: ${colorValue}`);
}

function asLABValue(colorValue: string): LABValue {
	const parsed = parseColorString('lab', colorValue);

	if (parsed && parsed.format === 'lab') {
		return parsed.value as LABValue;
	}

	throw new Error(`Invalid LAB color value: ${colorValue}`);
}

function asRGBValue(colorValue: string): RGBValue {
	const parsed = parseColorString('rgb', colorValue);

	if (parsed && parsed.format === 'rgb') {
		return parsed.value as RGBValue;
	}

	throw new Error(`Invalid RGB color value: ${colorValue}`);
}

function asXYZValue(colorValue: string): XYZValue {
	const parsed = parseColorString('xyz', colorValue);

	if (parsed && parsed.format === 'xyz') {
		return parsed.value as XYZValue;
	}

	throw new Error(`Invalid XYZ color value: ${colorValue}`);
}

export const asColorValue = {
	cmyk: asCMYKValue,
	hex: asHexValue,
	hsl: asHSLValue,
	hsv: asHSVValue,
	lab: asLABValue,
	rgb: asRGBValue,
	xyz: asXYZValue
};
