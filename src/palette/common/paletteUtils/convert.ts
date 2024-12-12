// File: src/palette/common/paletteUtils/convert.ts

import {
	CMYK,
	Color,
	ColorSpaceExtended,
	Hex,
	HSL,
	HSV,
	LAB,
	PaletteCommon_Utils_Convert,
	RGB,
	SL,
	SV,
	XYZ,
	XYZ_X,
	XYZ_Y,
	XYZ_Z
} from '../../../index/index.js';
import { core, helpers, utils } from '../../../common/index.js';
import { data } from '../../../data/index.js';

const defaults = data.defaults;
const mode = data.mode;

const defaultCMYK = defaults.colors.cmyk;
const defaultHex = defaults.colors.hex;
const defaultHSL = defaults.colors.hsl;
const defaultHSV = defaults.colors.hsv;
const defaultLAB = defaults.colors.lab;
const defaultRGB = defaults.colors.rgb;
const defaultSL = defaults.colors.sl;
const defaultSV = defaults.colors.sv;
const defaultXYZ = defaults.colors.xyz;

const defaultCMYKUnbranded = core.base.clone(defaultCMYK);
const defaultHexUnbranded = core.base.clone(defaultHex);
const defaultHSLUnbranded = core.base.clone(defaultHSL);
const defaultHSVUnbranded = core.base.clone(defaultHSV);
const defaultLABUnbranded = core.base.clone(defaultLAB);
const defaultRGBUnbranded = core.base.clone(defaultRGB);
const defaultSLUnbranded = core.base.clone(defaultSL);
const defaultSVUnbranded = core.base.clone(defaultSV);
const defaultXYZUnbranded = core.base.clone(defaultXYZ);

const defaultCMYKBranded = core.brandColor.asCMYK(defaultCMYKUnbranded);
const defaultHexBranded = core.brandColor.asHex(defaultHexUnbranded);
const defaultHSLBranded = core.brandColor.asHSL(defaultHSLUnbranded);
const defaultHSVBranded = core.brandColor.asHSV(defaultHSVUnbranded);
const defaultLABBranded = core.brandColor.asLAB(defaultLABUnbranded);
const defaultRGBBranded = core.brandColor.asRGB(defaultRGBUnbranded);
const defaultSLBranded = core.brandColor.asSL(defaultSLUnbranded);
const defaultSVBranded = core.brandColor.asSV(defaultSVUnbranded);
const defaultXYZBranded = core.brandColor.asXYZ(defaultXYZUnbranded);

const applyGammaCorrection = helpers.conversion.applyGammaCorrection;
const clampRGB = helpers.conversion.clampRGB;
const componentToHex = utils.color.componentToHex;
const hueToRGB = helpers.conversion.hueToRGB;
const stripHashFromHex = utils.color.stripHashFromHex;

function cmykToHSL(cmyk: CMYK): HSL {
	try {
		if (!core.validate.colorValues(cmyk)) {
			if (mode.errorLogs)
				console.error(`Invalid CMYK value ${JSON.stringify(cmyk)}`);

			return defaultHSLBranded;
		}

		return rgbToHSL(cmykToRGB(core.base.clone(cmyk)));
	} catch (error) {
		if (mode.errorLogs) console.error(`cmykToHSL() error: ${error}`);

		return defaultHSLBranded;
	}
}

function cmykToRGB(cmyk: CMYK): RGB {
	try {
		if (!core.validate.colorValues(cmyk)) {
			if (mode.errorLogs)
				console.error(`Invalid CMYK value ${JSON.stringify(cmyk)}`);

			return defaultRGBBranded;
		}

		const clonedCMYK = core.base.clone(cmyk);
		const r =
			255 *
			(1 - clonedCMYK.value.cyan / 100) *
			(1 - clonedCMYK.value.key / 100);
		const g =
			255 *
			(1 - clonedCMYK.value.magenta / 100) *
			(1 - clonedCMYK.value.key / 100);
		const b =
			255 *
			(1 - clonedCMYK.value.yellow / 100) *
			(1 - clonedCMYK.value.key / 100);
		const alpha = cmyk.value.alpha;
		const rgb: RGB = {
			value: {
				red: core.brand.asByteRange(r),
				green: core.brand.asByteRange(g),
				blue: core.brand.asByteRange(b),
				alpha: core.brand.asAlphaRange(alpha)
			},
			format: 'rgb'
		};

		return clampRGB(rgb);
	} catch (error) {
		if (mode.errorLogs) console.error(`cmykToRGB error: ${error}`);

		return defaultRGBBranded;
	}
}

function hexToHSL(hex: Hex): HSL {
	try {
		if (!core.validate.colorValues(hex)) {
			if (mode.errorLogs)
				console.error(`Invalid Hex value ${JSON.stringify(hex)}`);

			return defaultHSLBranded;
		}

		return rgbToHSL(hexToRGB(core.base.clone(hex)));
	} catch (error) {
		if (mode.errorLogs) console.error(`hexToHSL() error: ${error}`);

		return defaultHSLBranded;
	}
}

function hexToHSLWrapper(input: string | Hex): HSL {
	try {
		const clonedInput = core.base.clone(input);

		const hex: Hex =
			typeof clonedInput === 'string'
				? {
						value: {
							hex: core.brand.asHexSet(clonedInput),
							alpha: core.brand.asHexComponent(
								clonedInput.slice(-2)
							),
							numAlpha: core.brand.asAlphaRange(
								core.convert.hexAlphaToNumericAlpha(
									clonedInput.slice(-2)
								)
							)
						},
						format: 'hex'
					}
				: {
						...clonedInput,
						value: {
							...clonedInput.value,
							numAlpha: core.brand.asAlphaRange(
								core.convert.hexAlphaToNumericAlpha(
									String(clonedInput.value.alpha)
								)
							)
						}
					};

		return hexToHSL(hex);
	} catch (error) {
		if (mode.errorLogs) {
			console.error(`Error converting hex to HSL: ${error}`);
		}

		return defaultHSLBranded;
	}
}

function hexToRGB(hex: Hex): RGB {
	try {
		if (!core.validate.colorValues(hex)) {
			if (mode.errorLogs)
				console.error(`Invalid Hex value ${JSON.stringify(hex)}`);

			return defaultRGBBranded;
		}

		const clonedHex = core.base.clone(hex);
		const strippedHex = stripHashFromHex(clonedHex).value.hex;
		const bigint = parseInt(strippedHex, 16);

		return {
			value: {
				red: core.brand.asByteRange((bigint >> 16) & 255),
				green: core.brand.asByteRange((bigint >> 8) & 255),
				blue: core.brand.asByteRange(bigint & 255),
				alpha: hex.value.numAlpha
			},
			format: 'rgb'
		};
	} catch (error) {
		if (mode.errorLogs) console.error(`hexToRGB error: ${error}`);

		return defaultRGBBranded;
	}
}

function hslToCMYK(hsl: HSL): CMYK {
	try {
		if (!core.validate.colorValues(hsl)) {
			if (mode.errorLogs)
				console.error(`Invalid HSL value ${JSON.stringify(hsl)}`);

			return defaultCMYKBranded;
		}

		return rgbToCMYK(hslToRGB(core.base.clone(hsl)));
	} catch (error) {
		if (mode.errorLogs)
			console.error(
				`Error converting HSL ${JSON.stringify(hsl)} to CMYK: ${error}`
			);

		return defaultCMYKBranded;
	}
}

function hslToHex(hsl: HSL): Hex {
	try {
		if (!core.validate.colorValues(hsl)) {
			if (mode.errorLogs)
				console.error(`Invalid HSL value ${JSON.stringify(hsl)}`);

			return defaultHexBranded;
		}

		return rgbToHex(hslToRGB(core.base.clone(hsl)));
	} catch (error) {
		if (mode.errorLogs) console.error(`hslToHex error: ${error}`);

		return defaultHexBranded;
	}
}

function hslToHSV(hsl: HSL): HSV {
	try {
		if (!core.validate.colorValues(hsl)) {
			if (mode.errorLogs)
				console.error(`Invalid HSL value ${JSON.stringify(hsl)}`);

			return defaultHSVBranded;
		}

		const clonedHSL = core.base.clone(hsl);
		const s = clonedHSL.value.saturation / 100;
		const l = clonedHSL.value.lightness / 100;
		const value = l + s * Math.min(l, 1 - 1);
		const newSaturation = value === 0 ? 0 : 2 * (1 - l / value);

		return {
			value: {
				hue: core.brand.asRadial(Math.round(clonedHSL.value.hue)),
				saturation: core.brand.asPercentile(
					Math.round(newSaturation * 100)
				),
				value: core.brand.asPercentile(Math.round(value * 100)),
				alpha: core.brand.asAlphaRange(hsl.value.alpha)
			},
			format: 'hsv'
		};
	} catch (error) {
		if (mode.errorLogs) console.error(`hslToHSV() error: ${error}`);

		return defaultHSVBranded;
	}
}

function hslToLAB(hsl: HSL): LAB {
	try {
		if (!core.validate.colorValues(hsl)) {
			if (mode.errorLogs)
				console.error(`Invalid HSL value ${JSON.stringify(hsl)}`);

			return defaultLABBranded;
		}

		return xyzToLAB(rgbToXYZ(hslToRGB(core.base.clone(hsl))));
	} catch (error) {
		if (mode.errorLogs) console.error(`hslToLab() error: ${error}`);

		return defaultLABBranded;
	}
}

function hslToRGB(hsl: HSL): RGB {
	try {
		if (!core.validate.colorValues(hsl)) {
			if (mode.errorLogs)
				console.error(`Invalid HSL value ${JSON.stringify(hsl)}`);

			return defaultRGBBranded;
		}

		const clonedHSL = core.base.clone(hsl);
		const s = clonedHSL.value.saturation / 100;
		const l = clonedHSL.value.lightness / 100;
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;

		return {
			value: {
				red: core.brand.asByteRange(
					Math.round(
						hueToRGB(p, q, clonedHSL.value.hue + 1 / 3) * 255
					)
				),
				green: core.brand.asByteRange(
					Math.round(hueToRGB(p, q, clonedHSL.value.hue) * 255)
				),
				blue: core.brand.asByteRange(
					Math.round(
						hueToRGB(p, q, clonedHSL.value.hue - 1 / 3) * 255
					)
				),
				alpha: core.brand.asAlphaRange(hsl.value.alpha)
			},
			format: 'rgb'
		};
	} catch (error) {
		if (mode.errorLogs) console.error(`hslToRGB error: ${error}`);

		return defaultRGBBranded;
	}
}

function hslToSL(hsl: HSL): SL {
	try {
		if (!core.validate.colorValues(hsl)) {
			if (mode.errorLogs)
				console.error(`Invalid HSL value ${JSON.stringify(hsl)}`);

			return defaultSLBranded;
		}

		return {
			value: {
				saturation: hsl.value.saturation,
				lightness: hsl.value.lightness,
				alpha: hsl.value.alpha
			},
			format: 'sl' as 'sl'
		};
	} catch (error) {
		if (mode.errorLogs)
			console.error(`Error converting HSL to SL: ${error}`);

		return defaultSLBranded;
	}
}

function hslToSV(hsl: HSL): SV {
	try {
		if (!core.validate.colorValues(hsl)) {
			if (mode.errorLogs)
				console.error(`Invalid HSL value ${JSON.stringify(hsl)}`);

			return defaultSVBranded;
		}

		return hsvToSV(rgbToHSV(hslToRGB(core.base.clone(hsl))));
	} catch (error) {
		if (mode.errorLogs)
			console.error(`Error converting HSL to SV: ${error}`);

		return defaultSVBranded;
	}
}

function hslToXYZ(hsl: HSL): XYZ {
	try {
		if (!core.validate.colorValues(hsl)) {
			if (mode.errorLogs)
				console.error(`Invalid HSL value ${JSON.stringify(hsl)}`);

			return defaultXYZBranded;
		}

		return labToXYZ(hslToLAB(core.base.clone(hsl)));
	} catch (error) {
		if (mode.errorLogs) console.error(`hslToXYZ error: ${error}`);

		return defaultXYZBranded;
	}
}

function hsvToHSL(hsv: HSV): HSL {
	try {
		if (!core.validate.colorValues(hsv)) {
			if (mode.errorLogs)
				console.error(`Invalid HSV value ${JSON.stringify(hsv)}`);

			return defaultHSLBranded;
		}

		const clonedHSV = core.base.clone(hsv);
		const newSaturation =
			clonedHSV.value.value * (1 - clonedHSV.value.saturation / 100) ===
				0 || clonedHSV.value.value === 0
				? 0
				: (clonedHSV.value.value -
						clonedHSV.value.value *
							(1 - clonedHSV.value.saturation / 100)) /
					Math.min(
						clonedHSV.value.value,
						100 - clonedHSV.value.value
					);
		const lightness =
			clonedHSV.value.value * (1 - clonedHSV.value.saturation / 200);

		return {
			value: {
				hue: core.brand.asRadial(Math.round(clonedHSV.value.hue)),
				saturation: core.brand.asPercentile(
					Math.round(newSaturation * 100)
				),
				lightness: core.brand.asPercentile(Math.round(lightness)),
				alpha: hsv.value.alpha
			},
			format: 'hsl'
		};
	} catch (error) {
		if (mode.errorLogs) console.error(`hsvToHSL() error: ${error}`);

		return defaultHSLBranded;
	}
}

function hsvToSV(hsv: HSV): SV {
	try {
		if (!core.validate.colorValues(hsv)) {
			if (mode.errorLogs)
				console.error(`Invalid HSV value ${JSON.stringify(hsv)}`);

			return defaultSVBranded;
		}

		return {
			value: {
				saturation: hsv.value.saturation,
				value: hsv.value.value,
				alpha: hsv.value.alpha
			},
			format: 'sv' as 'sv'
		};
	} catch (error) {
		if (mode.errorLogs)
			console.error(`Error converting HSV to SV: ${error}`);

		return defaultSVBranded;
	}
}

function labToHSL(lab: LAB): HSL {
	try {
		if (!core.validate.colorValues(lab)) {
			if (mode.errorLogs)
				console.error(`Invalid LAB value ${JSON.stringify(lab)}`);

			return defaultHSLBranded;
		}

		return rgbToHSL(labToRGB(core.base.clone(lab)));
	} catch (error) {
		if (mode.errorLogs) console.error(`labToHSL() error: ${error}`);

		return defaultHSLBranded;
	}
}

function labToRGB(lab: LAB): RGB {
	try {
		if (!core.validate.colorValues(lab)) {
			if (mode.errorLogs)
				console.error(`Invalid LAB value ${JSON.stringify(lab)}`);

			return defaultRGBBranded;
		}

		return xyzToRGB(labToXYZ(core.base.clone(lab)));
	} catch (error) {
		if (mode.errorLogs) console.error(`labToRGB error: ${error}`);

		return defaultRGBBranded;
	}
}

function labToXYZ(lab: LAB): XYZ {
	try {
		if (!core.validate.colorValues(lab)) {
			if (mode.errorLogs)
				console.error(`Invalid LAB value ${JSON.stringify(lab)}`);

			return defaultXYZBranded;
		}

		const clonedLAB = core.base.clone(lab);
		const refX = 95.047,
			refY = 100.0,
			refZ = 108.883;

		let y = (clonedLAB.value.l + 16) / 116;
		let x = clonedLAB.value.a / 500 + y;
		let z = y - clonedLAB.value.b / 200;

		const pow = Math.pow;

		return {
			value: {
				x: core.brand.asXYZ_X(
					refX *
						(pow(x, 3) > 0.008856
							? pow(x, 3)
							: (x - 16 / 116) / 7.787)
				),
				y: core.brand.asXYZ_Y(
					refY *
						(pow(y, 3) > 0.008856
							? pow(y, 3)
							: (y - 16 / 116) / 7.787)
				),
				z: core.brand.asXYZ_Z(
					refZ *
						(pow(z, 3) > 0.008856
							? pow(z, 3)
							: (z - 16 / 116) / 7.787)
				),
				alpha: core.brand.asAlphaRange(lab.value.alpha)
			},
			format: 'xyz'
		};
	} catch (error) {
		if (mode.errorLogs) console.error(`labToXYZ error: ${error}`);

		return defaultXYZBranded;
	}
}

function rgbToCMYK(rgb: RGB): CMYK {
	try {
		if (!core.validate.colorValues(rgb)) {
			if (mode.errorLogs)
				console.error(`Invalid RGB value ${JSON.stringify(rgb)}`);

			return defaultCMYKBranded;
		}

		const clonedRGB = core.base.clone(rgb);

		const redPrime = clonedRGB.value.red / 255;
		const greenPrime = clonedRGB.value.green / 255;
		const bluePrime = clonedRGB.value.blue / 255;

		const key = core.sanitize.percentile(
			1 - Math.max(redPrime, greenPrime, bluePrime)
		);
		const cyan = core.sanitize.percentile(
			(1 - redPrime - key) / (1 - key) || 0
		);
		const magenta = core.sanitize.percentile(
			(1 - greenPrime - key) / (1 - key) || 0
		);
		const yellow = core.sanitize.percentile(
			(1 - bluePrime - key) / (1 - key) || 0
		);
		const alpha = core.brand.asAlphaRange(rgb.value.alpha);
		const format: 'cmyk' = 'cmyk';

		const cmyk = { value: { cyan, magenta, yellow, key, alpha }, format };

		if (!mode.quiet)
			console.log(
				`Converted RGB ${JSON.stringify(clonedRGB)} to CMYK: ${JSON.stringify(core.base.clone(cmyk))}`
			);

		return cmyk;
	} catch (error) {
		if (mode.errorLogs)
			console.error(`Error converting RGB to CMYK: ${error}`);

		return defaultCMYKBranded;
	}
}

function rgbToHex(rgb: RGB): Hex {
	try {
		if (!core.validate.colorValues(rgb)) {
			if (mode.errorLogs)
				console.error(`Invalid RGB value ${JSON.stringify(rgb)}`);

			return defaultHexBranded;
		}

		const clonedRGB = core.base.clone(rgb);

		if (
			[
				clonedRGB.value.red,
				clonedRGB.value.green,
				clonedRGB.value.blue
			].some(v => isNaN(v) || v < 0 || v > 255) ||
			[clonedRGB.value.alpha].some(v => isNaN(v) || v < 0 || v > 1)
		) {
			if (mode.warnLogs)
				console.warn(
					`Invalid RGB values: \nR=${JSON.stringify(clonedRGB.value.red)}\nG=${JSON.stringify(clonedRGB.value.green)}\nB=${JSON.stringify(clonedRGB.value.blue)}\nA=${JSON.stringify(clonedRGB.value.alpha)}`
				);

			return {
				value: {
					hex: core.brand.asHexSet('#000000FF'),
					alpha: core.brand.asHexComponent('FF'),
					numAlpha: core.brand.asAlphaRange(1)
				},
				format: 'hex' as 'hex'
			};
		}

		return {
			value: {
				hex: core.brand.asHexSet(
					`#${componentToHex(clonedRGB.value.red)}${componentToHex(clonedRGB.value.green)}${componentToHex(clonedRGB.value.blue)}`
				),
				alpha: core.brand.asHexComponent(
					componentToHex(clonedRGB.value.alpha)
				),
				numAlpha: clonedRGB.value.alpha
			},
			format: 'hex' as 'hex'
		};
	} catch (error) {
		if (mode.errorLogs) console.warn(`rgbToHex error: ${error}`);

		return defaultHexBranded;
	}
}

function rgbToHSL(rgb: RGB): HSL {
	try {
		if (!core.validate.colorValues(rgb)) {
			if (mode.errorLogs) {
				console.error(`Invalid RGB value ${JSON.stringify(rgb)}`);
			}
			return defaultHSLBranded;
		}

		const clonedRGB = core.base.clone(rgb);

		const red = (clonedRGB.value.red as unknown as number) / 255;
		const green = (clonedRGB.value.green as unknown as number) / 255;
		const blue = (clonedRGB.value.blue as unknown as number) / 255;

		const max = Math.max(red, green, blue);
		const min = Math.min(red, green, blue);

		let hue = 0,
			saturation = 0,
			lightness = (max + min) / 2;

		if (max !== min) {
			const delta = max - min;

			saturation =
				lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

			switch (max) {
				case red:
					hue = (green - blue) / delta + (green < blue ? 6 : 0);
					break;
				case green:
					hue = (blue - red) / delta + 2;
					break;
				case blue:
					hue = (red - green) / delta + 4;
					break;
			}
			hue *= 60;
		}

		return {
			value: {
				hue: core.brand.asRadial(Math.round(hue)),
				saturation: core.brand.asPercentile(
					Math.round(saturation * 100)
				),
				lightness: core.brand.asPercentile(Math.round(lightness * 100)),
				alpha: core.brand.asAlphaRange(rgb.value.alpha)
			},
			format: 'hsl'
		};
	} catch (error) {
		if (mode.errorLogs) {
			console.error(`rgbToHSL() error: ${error}`);
		}

		return defaultHSLBranded;
	}
}

function rgbToHSV(rgb: RGB): HSV {
	try {
		if (!core.validate.colorValues(rgb)) {
			if (mode.errorLogs) {
				console.error(`Invalid RGB value ${JSON.stringify(rgb)}`);
			}
			return defaultHSVBranded;
		}

		const red = (rgb.value.red as unknown as number) / 255;
		const green = (rgb.value.green as unknown as number) / 255;
		const blue = (rgb.value.blue as unknown as number) / 255;

		const max = Math.max(red, green, blue);
		const min = Math.min(red, green, blue);
		const delta = max - min;

		let hue = 0;

		const value = max;
		const saturation = max === 0 ? 0 : delta / max;

		if (max !== min) {
			switch (max) {
				case red:
					hue = (green - blue) / delta + (green < blue ? 6 : 0);
					break;
				case green:
					hue = (blue - red) / delta + 2;
					break;
				case blue:
					hue = (red - green) / delta + 4;
					break;
			}

			hue *= 60;
		}

		return {
			value: {
				hue: core.brand.asRadial(Math.round(hue)),
				saturation: core.brand.asPercentile(
					Math.round(saturation * 100)
				),
				value: core.brand.asPercentile(Math.round(value * 100)),
				alpha: core.brand.asAlphaRange(rgb.value.alpha)
			},
			format: 'hsv'
		};
	} catch (error) {
		if (mode.errorLogs) {
			console.error(`rgbToHSV() error: ${error}`);
		}

		return defaultHSVBranded;
	}
}

function rgbToXYZ(rgb: RGB): XYZ {
	try {
		if (!core.validate.colorValues(rgb)) {
			if (mode.errorLogs) {
				console.error(`Invalid RGB value ${JSON.stringify(rgb)}`);
			}
			return defaultXYZBranded;
		}

		const red = (rgb.value.red as unknown as number) / 255;
		const green = (rgb.value.green as unknown as number) / 255;
		const blue = (rgb.value.blue as unknown as number) / 255;

		const correctedRed =
			red > 0.04045 ? Math.pow((red + 0.055) / 1.055, 2.4) : red / 12.92;
		const correctedGreen =
			green > 0.04045
				? Math.pow((green + 0.055) / 1.055, 2.4)
				: green / 12.92;
		const correctedBlue =
			blue > 0.04045
				? Math.pow((blue + 0.055) / 1.055, 2.4)
				: blue / 12.92;

		const scaledRed = correctedRed * 100;
		const scaledGreen = correctedGreen * 100;
		const scaledBlue = correctedBlue * 100;

		return {
			value: {
				x: core.brand.asXYZ_X(
					scaledRed * 0.4124 +
						scaledGreen * 0.3576 +
						scaledBlue * 0.1805
				),
				y: core.brand.asXYZ_Y(
					scaledRed * 0.2126 +
						scaledGreen * 0.7152 +
						scaledBlue * 0.0722
				),
				z: core.brand.asXYZ_Z(
					scaledRed * 0.0193 +
						scaledGreen * 0.1192 +
						scaledBlue * 0.9505
				),
				alpha: core.brand.asAlphaRange(rgb.value.alpha)
			},
			format: 'xyz'
		};
	} catch (error) {
		if (mode.errorLogs) {
			console.error(`rgbToXYZ error: ${error}`);
		}
		return defaultXYZBranded;
	}
}

function xyzToHSL(xyz: XYZ): HSL {
	try {
		if (!core.validate.colorValues(xyz)) {
			if (mode.errorLogs)
				console.error(`Invalid XYZ value ${JSON.stringify(xyz)}`);

			return defaultHSLBranded;
		}

		return rgbToHSL(xyzToRGB(core.base.clone(xyz)));
	} catch (error) {
		if (mode.errorLogs) console.error(`xyzToHSL() error: ${error}`);

		return defaultHSLBranded;
	}
}

function xyzToLAB(xyz: XYZ): LAB {
	try {
		if (!core.validate.colorValues(xyz)) {
			if (mode.errorLogs)
				console.error(`Invalid XYZ value ${JSON.stringify(xyz)}`);

			return defaultLABBranded;
		}

		const clonedXYZ = core.base.clone(xyz);
		const refX = 95.047,
			refY = 100.0,
			refZ = 108.883;

		clonedXYZ.value.x = (clonedXYZ.value.x / refX) as XYZ_X;
		clonedXYZ.value.y = (clonedXYZ.value.y / refY) as XYZ_Y;
		clonedXYZ.value.z = (clonedXYZ.value.z / refZ) as XYZ_Z;

		clonedXYZ.value.x =
			clonedXYZ.value.x > 0.008856
				? (Math.pow(clonedXYZ.value.x, 1 / 3) as XYZ_X)
				: ((7.787 * clonedXYZ.value.x + 16 / 116) as XYZ_X);
		clonedXYZ.value.y =
			clonedXYZ.value.y > 0.008856
				? (Math.pow(clonedXYZ.value.y, 1 / 3) as XYZ_Y)
				: ((7.787 * clonedXYZ.value.y + 16 / 116) as XYZ_Y);
		clonedXYZ.value.z =
			clonedXYZ.value.z > 0.008856
				? (Math.pow(clonedXYZ.value.z, 1 / 3) as XYZ_Z)
				: ((7.787 * clonedXYZ.value.z + 16 / 116) as XYZ_Z);

		const l = core.sanitize.percentile(
			parseFloat((116 * clonedXYZ.value.y - 16).toFixed(2))
		);
		const a = core.sanitize.lab(
			parseFloat(
				(500 * (clonedXYZ.value.x - clonedXYZ.value.y)).toFixed(2)
			),
			'a'
		);
		const b = core.sanitize.lab(
			parseFloat(
				(200 * (clonedXYZ.value.y - clonedXYZ.value.z)).toFixed(2)
			),
			'b'
		);

		const lab: LAB = {
			value: {
				l: core.brand.asLAB_L(l),
				a: core.brand.asLAB_A(a),
				b: core.brand.asLAB_B(b),
				alpha: xyz.value.alpha
			},
			format: 'lab'
		};

		if (!core.validate.colorValues(lab)) {
			if (mode.errorLogs)
				console.error(`Invalid LAB value ${JSON.stringify(lab)}`);

			return defaultLABBranded;
		}

		return lab;
	} catch (error) {
		if (mode.errorLogs) console.error(`xyzToLab() error: ${error}`);

		return defaultLABBranded;
	}
}

function xyzToRGB(xyz: XYZ): RGB {
	try {
		if (!core.validate.colorValues(xyz)) {
			if (mode.errorLogs) {
				console.error(`Invalid XYZ value ${JSON.stringify(xyz)}`);
			}
			return defaultRGBBranded;
		}

		const x = (xyz.value.x as unknown as number) / 100;
		const y = (xyz.value.y as unknown as number) / 100;
		const z = (xyz.value.z as unknown as number) / 100;

		let red = x * 3.2406 + y * -1.5372 + z * -0.4986;
		let green = x * -0.9689 + y * 1.8758 + z * 0.0415;
		let blue = x * 0.0557 + y * -0.204 + z * 1.057;

		red = applyGammaCorrection(red);
		green = applyGammaCorrection(green);
		blue = applyGammaCorrection(blue);

		const rgb: RGB = clampRGB({
			value: {
				red: core.brand.asByteRange(red),
				green: core.brand.asByteRange(green),
				blue: core.brand.asByteRange(blue),
				alpha: xyz.value.alpha
			},
			format: 'rgb'
		});

		return rgb;
	} catch (error) {
		if (mode.errorLogs) {
			console.error(`xyzToRGB error: ${error}`);
		}
		return defaultRGBBranded;
	}
}

// ******** BUNDLED CONVERSION FUNCTIONS ********

function hslTo(color: HSL, colorSpace: ColorSpaceExtended): Color {
	try {
		if (!core.validate.colorValues(color)) {
			console.error(`Invalid color value ${JSON.stringify(color)}`);

			return defaultRGBBranded;
		}

		const clonedColor = core.base.clone(color) as HSL;

		switch (colorSpace) {
			case 'cmyk':
				return hslToCMYK(clonedColor);
			case 'hex':
				return hslToHex(clonedColor);
			case 'hsl':
				return core.base.clone(clonedColor);
			case 'hsv':
				return hslToHSV(clonedColor);
			case 'lab':
				return hslToLAB(clonedColor);
			case 'rgb':
				return hslToRGB(clonedColor);
			case 'sl':
				return hslToSL(clonedColor);
			case 'sv':
				return hslToSV(clonedColor);
			case 'xyz':
				return hslToXYZ(clonedColor);
			default:
				throw new Error('Invalid color format');
		}
	} catch (error) {
		throw new Error(`hslTo() error: ${error}`);
	}
}

function toHSL(color: Exclude<Color, SL | SV>): HSL {
	try {
		if (!core.validate.colorValues(color)) {
			console.error(`Invalid color value ${JSON.stringify(color)}`);

			return defaultHSLBranded;
		}

		const clonedColor = core.base.clone(color);

		switch (color.format) {
			case 'cmyk':
				return cmykToHSL(clonedColor as CMYK);
			case 'hex':
				return hexToHSL(clonedColor as Hex);
			case 'hsl':
				return core.base.clone(clonedColor as HSL);
			case 'hsv':
				return hsvToHSL(clonedColor as HSV);
			case 'lab':
				return labToHSL(clonedColor as LAB);
			case 'rgb':
				return rgbToHSL(clonedColor as RGB);
			case 'xyz':
				return xyzToHSL(clonedColor as XYZ);
			default:
				throw new Error('Invalid color format');
		}
	} catch (error) {
		throw new Error(`toHSL() error: ${error}`);
	}
}

export const convert: PaletteCommon_Utils_Convert = {
	hslTo,
	toHSL,
	wrappers: {
		hexToHSL: hexToHSLWrapper
	}
};
