import '../../config/partials/defaults.js';
import { domIndex } from '../../config/partials/dom.js';
import { paletteConfig } from '../../config/partials/paletteConfig.js';
import '../../config/partials/regex.js';

// File: core/utils/palette.ts
const ids = domIndex.ids;
function paletteUtilitiesFactory(brand, colorUtils, dom, helpers, services, validate) {
    const { data: { deepClone }, dom: { getElement } } = helpers;
    const { errors, log } = services;
    function createPaletteItem(color, itemID) {
        return errors.handleSync(() => {
            const clonedColor = deepClone(color);
            return {
                itemID,
                colors: {
                    cmyk: colorUtils.convertHSL(clonedColor, 'cmyk').value,
                    hex: colorUtils.convertHSL(clonedColor, 'hex').value,
                    hsl: clonedColor.value,
                    hsv: colorUtils.convertHSL(clonedColor, 'hsv').value,
                    lab: colorUtils.convertHSL(clonedColor, 'lab').value,
                    rgb: colorUtils.convertHSL(clonedColor, 'rgb').value,
                    xyz: colorUtils.convertHSL(clonedColor, 'xyz').value
                },
                css: {
                    cmyk: colorUtils.formatColorAsCSS(colorUtils.convertHSL(clonedColor, 'cmyk')),
                    hex: colorUtils.formatColorAsCSS(colorUtils.convertHSL(clonedColor, 'hex')),
                    hsl: colorUtils.formatColorAsCSS(clonedColor),
                    hsv: colorUtils.formatColorAsCSS(colorUtils.convertHSL(clonedColor, 'hsv')),
                    lab: colorUtils.formatColorAsCSS(colorUtils.convertHSL(clonedColor, 'lab')),
                    rgb: colorUtils.formatColorAsCSS(colorUtils.convertHSL(clonedColor, 'rgb')),
                    xyz: colorUtils.formatColorAsCSS(colorUtils.convertHSL(clonedColor, 'xyz'))
                }
            };
        }, 'Error occurred while creating palette item');
    }
    function createPaletteItemArray(baseColor, hues) {
        return errors.handleSync(() => {
            const paletteItems = [];
            // base color always gets itemID = 1
            paletteItems.push(createPaletteItem(baseColor, 1 // ID 1 for base color
            ));
            // iterate over hues and generate PaletteItems
            for (const [i, hue] of hues.entries()) {
                const newColor = {
                    value: {
                        hue: brand.asRadial(hue),
                        saturation: brand.asPercentile(Math.random() * 100),
                        lightness: brand.asPercentile(Math.random() * 100)
                    },
                    format: 'hsl'
                };
                const newPaletteItem = createPaletteItem(newColor, i + 2 // IDs start at 2 for generated colors
                );
                paletteItems.push(newPaletteItem);
                dom.updateColorBox(newColor, String(i + 2));
            }
            return paletteItems;
        }, 'Error occurred while creating palette item array');
    }
    function createPaletteObject(options, paletteItems) {
        return errors.handleSync(() => {
            return {
                id: `${options.paletteType}_${crypto.randomUUID()}`,
                items: paletteItems,
                metadata: {
                    columnCount: options.columnCount,
                    limitDark: options.limitDark,
                    limitGray: options.limitGray,
                    limitLight: options.limitLight,
                    timestamp: helpers.data.getFormattedTimestamp(),
                    type: options.paletteType
                }
            };
        }, 'Error occurred while creating palette object');
    }
    function generateAllColorValues(color) {
        return errors.handleSync(() => {
            const clonedColor = deepClone(color);
            if (!validate.colorValue(clonedColor)) {
                log.error(`Invalid color: ${JSON.stringify(clonedColor)}`, `utils.palette.generateAllColorValues`);
                throw new Error('Invalid HSL color provided');
            }
            const convert = (target) => colorUtils.convertHSL(clonedColor, target);
            return {
                cmyk: convert('cmyk'),
                hex: convert('hex'),
                hsl: clonedColor,
                hsv: convert('hsv'),
                lab: convert('lab'),
                rgb: convert('rgb'),
                sl: convert('sl'),
                sv: convert('sv'),
                xyz: convert('xyz')
            };
        }, 'Error occurred while generating all color values');
    }
    function getPaletteOptionsFromUI() {
        return errors.handleSync(() => {
            const columnCountElement = getElement(ids.inputs.columnCount);
            const paletteTypeElement = getElement(ids.inputs.paletteType);
            const limitDarkChkbx = getElement(ids.inputs.limitDarkChkbx);
            const limitGrayChkbx = getElement(ids.inputs.limitGrayChkbx);
            const limitLightChkbx = getElement(ids.inputs.limitLightChkbx);
            if (!paletteTypeElement) {
                log.warn('paletteTypeOptions DOM element not found', `utils.palette.getPaletteOptionsFromUI`);
            }
            if (!columnCountElement) {
                log.warn(`columnCount DOM element not found`, `utils.palette.getPaletteOptionsFromUI`);
            }
            if (!limitDarkChkbx || !limitGrayChkbx || !limitLightChkbx) {
                log.warn(`One or more checkboxes not found`, `utils.palette.getPaletteOptionsFromUI`);
            }
            if (!helpers.typeGuards.isPaletteType(paletteTypeElement.value)) {
                log.warn(`Invalid palette type: ${paletteTypeElement.value}.`, `utils.palette.getPaletteOptionsFromUI`);
            }
            return {
                columnCount: columnCountElement
                    ? parseInt(columnCountElement.value, 10)
                    : 0,
                distributionType: 'soft',
                limitDark: limitDarkChkbx?.checked || false,
                limitGray: limitGrayChkbx?.checked || false,
                limitLight: limitLightChkbx?.checked || false,
                paletteType: paletteTypeElement.value
            };
        }, 'Error occurred while getting palette options from UI');
    }
    function getRandomizedPaleteOptions() {
        return errors.handleSync(() => {
            const paletteTypeMap = {
                0: 'analogous',
                1: 'complementary',
                2: 'diadic',
                3: 'hexadic',
                4: 'monochromatic',
                5: 'random',
                6: 'splitComplementary',
                7: 'tetradic',
                8: 'triadic'
            };
            const distributionTypeMap = {
                0: 'base',
                1: 'chaotic',
                2: 'soft',
                3: 'strong'
            };
            const randomPaletteTypeIndex = Math.floor(Math.random() * Object.values(paletteTypeMap).length);
            const randomDistributionTypeIndex = Math.floor(Math.random() * Object.values(distributionTypeMap).length);
            const paletteType = paletteTypeMap[randomPaletteTypeIndex];
            const distributionType = distributionTypeMap[randomDistributionTypeIndex];
            const columnCount = Math.floor(Math.random() * 6) + 1;
            const limitDark = Math.random() < 0.5;
            const limitGray = Math.random() < 0.5;
            const limitLight = Math.random() < 0.5;
            return {
                columnCount,
                distributionType,
                limitDark,
                limitGray,
                limitLight,
                paletteType
            };
        }, 'Error occurred while getting randomized palette options');
    }
    function isHSLInBounds(hsl) {
        return errors.handleSync(() => {
            if (!validate.colorValue(hsl)) {
                log.error(`Invalid HSL value ${JSON.stringify(hsl)}`, `utils.palette.isHSLInBounds`);
                return false;
            }
            return isHSLTooDark(hsl) || isHSLTooGray(hsl) || isHSLTooLight(hsl);
        }, 'Error occurred while checking if HSL is in bounds');
    }
    function isHSLTooDark(hsl) {
        return errors.handleSync(() => {
            if (!validate.colorValue(hsl)) {
                log.error(`Invalid HSL value ${JSON.stringify(hsl)}`, `utils.palette.isHSLTooDark`);
                return false;
            }
            return deepClone(hsl).value.lightness < paletteConfig.thresholds.dark;
        }, 'Error occurred while checking if HSL is too dark');
    }
    function isHSLTooGray(hsl) {
        return errors.handleSync(() => {
            if (!validate.colorValue(hsl)) {
                log.error(`Invalid HSL value ${JSON.stringify(hsl)}`, `utils.palette.isHSLTooGray`);
                return false;
            }
            return deepClone(hsl).value.saturation < paletteConfig.thresholds.gray;
        }, 'Error occurred while checking if HSL is too gray');
    }
    function isHSLTooLight(hsl) {
        return errors.handleSync(() => {
            if (!validate.colorValue(hsl)) {
                log.error('Invalid HSL value ${JSON.stringify(hsl)}', `utils.palette.isHSLTooLight`);
                return false;
            }
            return deepClone(hsl).value.lightness > paletteConfig.thresholds.light;
        }, 'Error occurred while checking if HSL is too light');
    }
    const paletteUtilities = {
        createPaletteItem,
        createPaletteItemArray,
        createPaletteObject,
        generateAllColorValues,
        getPaletteOptionsFromUI,
        getRandomizedPaleteOptions,
        isHSLInBounds,
        isHSLTooDark,
        isHSLTooGray,
        isHSLTooLight
    };
    return errors.handleSync(() => paletteUtilities, 'Error creating palette utilities group group.');
}

export { paletteUtilitiesFactory };
//# sourceMappingURL=palette.js.map
