import { config } from '../config/constants.js';
import { domHelpers } from './dom.js';
import { core } from '../utils/core.js';
function adjustSL(color) {
    try {
        if (!validateColorValues(color)) {
            console.error('Invalid color valus for adjustment.');
            domHelpers.showToast('Invalid color values');
            return color;
        }
        const adjustedSaturation = Math.min(Math.max(color.value.saturation + config.adjustSLAmount, 0), 100);
        const adjustedLightness = Math.min(100);
        return {
            value: {
                hue: color.value.hue,
                saturation: adjustedSaturation,
                lightness: adjustedLightness
            },
            format: 'hsl'
        };
    }
    catch (error) {
        console.error(`Error adjusting saturation and lightness: ${error}`);
        return color;
    }
}
function getWeightedRandomInterval() {
    try {
        const weights = config.weights;
        const probabilities = config.probabilities;
        const cumulativeProbabilities = probabilities.reduce((acc, prob, i) => {
            acc[i] = (acc[i - 1] || 0) + prob;
            return acc;
        }, []);
        const random = Math.random();
        for (let i = 0; i < cumulativeProbabilities.length; i++) {
            if (random < cumulativeProbabilities[i]) {
                return weights[i];
            }
        }
        return weights[weights.length - 1];
    }
    catch (error) {
        console.error(`Error generating weighted random interval: ${error}`);
        return 50;
    }
}
function sanitizeLAB(value) {
    return Math.round(Math.min(Math.max(value, -125), 125));
}
function sanitizePercentage(value) {
    return Math.round(Math.min(Math.max(value, 0), 100));
}
function sanitizeRadial(value) {
    return Math.round(Math.min(Math.max(value, 0), 360)) & 360;
}
function sanitizeRGB(value) {
    return Math.round(Math.min(Math.max(value, 0), 255));
}
function validateColorValues(color) {
    const clonedColor = core.clone(color);
    const isNumericValid = (value) => typeof value === 'number' && !isNaN(value);
    const normalizePercentage = (value) => {
        if (typeof value === 'string' && value.endsWith('%')) {
            return parseFloat(value.slice(0, -1));
        }
        return typeof value === 'number' ? value : NaN;
    };
    switch (clonedColor.format) {
        case 'cmyk':
            return ([
                clonedColor.value.cyan,
                clonedColor.value.magenta,
                clonedColor.value.yellow,
                clonedColor.value.key
            ].every(isNumericValid) &&
                clonedColor.value.cyan >= 0 &&
                clonedColor.value.cyan <= 100 &&
                clonedColor.value.magenta >= 0 &&
                clonedColor.value.magenta <= 100 &&
                clonedColor.value.yellow >= 0 &&
                clonedColor.value.yellow <= 100 &&
                clonedColor.value.key >= 0 &&
                clonedColor.value.key <= 100);
        case 'hex':
            return /^#[0-9A-Fa-f]{6}$/.test(clonedColor.value.hex);
        case 'hsl':
            const isValidHSLHue = isNumericValid(clonedColor.value.hue) &&
                clonedColor.value.hue >= 0 &&
                clonedColor.value.hue <= 360;
            const isValidHSLSaturation = normalizePercentage(clonedColor.value.saturation) >= 0 &&
                normalizePercentage(clonedColor.value.saturation) <= 100;
            const isValidHSLLightness = clonedColor.value.lightness
                ? normalizePercentage(clonedColor.value.lightness) >= 0 &&
                    normalizePercentage(clonedColor.value.lightness) <= 100
                : true;
            return isValidHSLHue && isValidHSLSaturation && isValidHSLLightness;
        case 'hsv':
            const isValidHSVHue = isNumericValid(clonedColor.value.hue) &&
                clonedColor.value.hue >= 0 &&
                clonedColor.value.hue <= 360;
            const isValidHSVSaturation = normalizePercentage(clonedColor.value.saturation) >= 0 &&
                normalizePercentage(clonedColor.value.saturation) <= 100;
            const isValidHSVValue = clonedColor.value.value
                ? normalizePercentage(clonedColor.value.value) >= 0 &&
                    normalizePercentage(clonedColor.value.value) <= 100
                : true;
            return isValidHSVHue && isValidHSVSaturation && isValidHSVValue;
        case 'lab':
            return ([
                clonedColor.value.l,
                clonedColor.value.a,
                clonedColor.value.b
            ].every(isNumericValid) &&
                clonedColor.value.l >= 0 &&
                clonedColor.value.l <= 100 &&
                clonedColor.value.a >= -125 &&
                clonedColor.value.a <= 125 &&
                clonedColor.value.b >= -125 &&
                clonedColor.value.b <= 125);
        case 'rgb':
            return ([
                clonedColor.value.red,
                clonedColor.value.green,
                clonedColor.value.blue
            ].every(isNumericValid) &&
                clonedColor.value.red >= 0 &&
                clonedColor.value.red <= 255 &&
                clonedColor.value.green >= 0 &&
                clonedColor.value.green <= 255 &&
                clonedColor.value.blue >= 0 &&
                clonedColor.value.blue <= 255);
        case 'sl':
            return ([
                clonedColor.value.saturation,
                clonedColor.value.lightness
            ].every(isNumericValid) &&
                clonedColor.value.saturation >= 0 &&
                clonedColor.value.saturation <= 100 &&
                clonedColor.value.lightness >= 0 &&
                clonedColor.value.lightness <= 100);
        case 'sv':
            return ([clonedColor.value.saturation, clonedColor.value.value].every(isNumericValid) &&
                clonedColor.value.saturation >= 0 &&
                clonedColor.value.saturation <= 100 &&
                clonedColor.value.value >= 0 &&
                clonedColor.value.value <= 100);
        case 'xyz':
            return ([
                clonedColor.value.x,
                clonedColor.value.y,
                clonedColor.value.z
            ].every(isNumericValid) &&
                clonedColor.value.x >= 0 &&
                clonedColor.value.x <= 95.047 &&
                clonedColor.value.y >= 0 &&
                clonedColor.value.y <= 100.0 &&
                clonedColor.value.z >= 0 &&
                clonedColor.value.z <= 108.883);
        default:
            console.error(`Unsupported color format: ${color.format}`);
            return false;
    }
}
export const paletteHelpers = {
    adjustSL,
    getWeightedRandomInterval,
    sanitizeLAB,
    sanitizePercentage,
    sanitizeRadial,
    sanitizeRGB,
    validateColorValues
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFsZXR0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oZWxwZXJzL3BhbGV0dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFHbkMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyQyxTQUFTLFFBQVEsQ0FBQyxLQUFpQjtJQUNsQyxJQUFJLENBQUM7UUFDSixJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUNqQyxPQUFPLENBQUMsS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7WUFDckQsVUFBVSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQzdDLE9BQU8sS0FBSyxDQUFDO1FBQ2QsQ0FBQztRQUVELE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FDbEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxFQUMzRCxHQUFHLENBQ0gsQ0FBQztRQUNGLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV4QyxPQUFPO1lBQ04sS0FBSyxFQUFFO2dCQUNOLEdBQUcsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUc7Z0JBQ3BCLFVBQVUsRUFBRSxrQkFBa0I7Z0JBQzlCLFNBQVMsRUFBRSxpQkFBaUI7YUFDNUI7WUFDRCxNQUFNLEVBQUUsS0FBSztTQUNiLENBQUM7SUFDSCxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLDZDQUE2QyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLE9BQU8sS0FBSyxDQUFDO0lBQ2QsQ0FBQztBQUNGLENBQUM7QUFFRCxTQUFTLHlCQUF5QjtJQUNqQyxJQUFJLENBQUM7UUFDSixNQUFNLE9BQU8sR0FBYSxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ3pDLE1BQU0sYUFBYSxHQUFhLE1BQU0sQ0FBQyxhQUFhLENBQUM7UUFDckQsTUFBTSx1QkFBdUIsR0FBYSxhQUFhLENBQUMsTUFBTSxDQUM3RCxDQUFDLEdBQWEsRUFBRSxJQUFZLEVBQUUsQ0FBUyxFQUFFLEVBQUU7WUFDMUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDbEMsT0FBTyxHQUFHLENBQUM7UUFDWixDQUFDLEVBQ0QsRUFBRSxDQUNGLENBQUM7UUFDRixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3pELElBQUksTUFBTSxHQUFHLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ3pDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLENBQUM7UUFDRixDQUFDO1FBRUQsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLDhDQUE4QyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLE9BQU8sRUFBRSxDQUFDO0lBQ1gsQ0FBQztBQUNGLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxLQUFhO0lBQ2pDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBRUQsU0FBUyxrQkFBa0IsQ0FBQyxLQUFhO0lBQ3hDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDdEQsQ0FBQztBQUVELFNBQVMsY0FBYyxDQUFDLEtBQWE7SUFDcEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDNUQsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLEtBQWE7SUFDakMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN0RCxDQUFDO0FBRUQsU0FBUyxtQkFBbUIsQ0FDM0IsS0FBMkM7SUFFM0MsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxNQUFNLGNBQWMsR0FBRyxDQUFDLEtBQWMsRUFBVyxFQUFFLENBQ2xELE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxNQUFNLG1CQUFtQixHQUFHLENBQUMsS0FBc0IsRUFBVSxFQUFFO1FBQzlELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUN0RCxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUNELE9BQU8sT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUNoRCxDQUFDLENBQUM7SUFFRixRQUFRLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM1QixLQUFLLE1BQU07WUFDVixPQUFPLENBQ047Z0JBQ0MsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJO2dCQUN0QixXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU87Z0JBQ3pCLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTTtnQkFDeEIsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHO2FBQ3JCLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQztnQkFDdkIsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQztnQkFDM0IsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksR0FBRztnQkFDN0IsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksQ0FBQztnQkFDOUIsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksR0FBRztnQkFDaEMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQztnQkFDN0IsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksR0FBRztnQkFDL0IsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDMUIsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksR0FBRyxDQUM1QixDQUFDO1FBQ0gsS0FBSyxLQUFLO1lBQ1QsT0FBTyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4RCxLQUFLLEtBQUs7WUFDVCxNQUFNLGFBQWEsR0FDbEIsY0FBYyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUNyQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUMxQixXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUM7WUFDOUIsTUFBTSxvQkFBb0IsR0FDekIsbUJBQW1CLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUN0RCxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsQ0FBQztZQUMxRCxNQUFNLG1CQUFtQixHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUztnQkFDdEQsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztvQkFDdEQsbUJBQW1CLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHO2dCQUN4RCxDQUFDLENBQUMsSUFBSSxDQUFDO1lBRVIsT0FBTyxhQUFhLElBQUksb0JBQW9CLElBQUksbUJBQW1CLENBQUM7UUFDckUsS0FBSyxLQUFLO1lBQ1QsTUFBTSxhQUFhLEdBQ2xCLGNBQWMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFDckMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDMUIsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDO1lBQzlCLE1BQU0sb0JBQW9CLEdBQ3pCLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztnQkFDdEQsbUJBQW1CLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLENBQUM7WUFDMUQsTUFBTSxlQUFlLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLO2dCQUM5QyxDQUFDLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO29CQUNsRCxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUc7Z0JBQ3BELENBQUMsQ0FBQyxJQUFJLENBQUM7WUFFUixPQUFPLGFBQWEsSUFBSSxvQkFBb0IsSUFBSSxlQUFlLENBQUM7UUFDakUsS0FBSyxLQUFLO1lBQ1QsT0FBTyxDQUNOO2dCQUNDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDbkIsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDO2dCQUN2QixXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUN4QixXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHO2dCQUMxQixXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUc7Z0JBQzNCLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUc7Z0JBQzFCLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRztnQkFDM0IsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxDQUMxQixDQUFDO1FBQ0gsS0FBSyxLQUFLO1lBQ1QsT0FBTyxDQUNOO2dCQUNDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRztnQkFDckIsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLO2dCQUN2QixXQUFXLENBQUMsS0FBSyxDQUFDLElBQUk7YUFDdEIsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDO2dCQUN2QixXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUMxQixXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxHQUFHO2dCQUM1QixXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDO2dCQUM1QixXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxHQUFHO2dCQUM5QixXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDO2dCQUMzQixXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxHQUFHLENBQzdCLENBQUM7UUFDSCxLQUFLLElBQUk7WUFDUixPQUFPLENBQ047Z0JBQ0MsV0FBVyxDQUFDLEtBQUssQ0FBQyxVQUFVO2dCQUM1QixXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVM7YUFDM0IsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDO2dCQUN2QixXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsSUFBSSxDQUFDO2dCQUNqQyxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsSUFBSSxHQUFHO2dCQUNuQyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxDQUFDO2dCQUNoQyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxHQUFHLENBQ2xDLENBQUM7UUFDSCxLQUFLLElBQUk7WUFDUixPQUFPLENBQ04sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FDNUQsY0FBYyxDQUNkO2dCQUNELFdBQVcsQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLENBQUM7Z0JBQ2pDLFdBQVcsQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLEdBQUc7Z0JBQ25DLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUM7Z0JBQzVCLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FDOUIsQ0FBQztRQUNILEtBQUssS0FBSztZQUNULE9BQU8sQ0FDTjtnQkFDQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ25CLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQztnQkFDdkIsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDeEIsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksTUFBTTtnQkFDN0IsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDeEIsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksS0FBSztnQkFDNUIsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDeEIsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksT0FBTyxDQUM5QixDQUFDO1FBQ0g7WUFDQyxPQUFPLENBQUMsS0FBSyxDQUFDLDZCQUE2QixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUUzRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7QUFDRixDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUE2QjtJQUN2RCxRQUFRO0lBQ1IseUJBQXlCO0lBQ3pCLFdBQVc7SUFDWCxrQkFBa0I7SUFDbEIsY0FBYztJQUNkLFdBQVc7SUFDWCxtQkFBbUI7Q0FDbkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy9jb25zdGFudHMnO1xuaW1wb3J0IHsgZG9tSGVscGVycyB9IGZyb20gJy4vZG9tJztcbmltcG9ydCAqIGFzIGZuT2JqZWN0cyBmcm9tICcuLi9pbmRleC9mbi1vYmplY3RzJztcbmltcG9ydCAqIGFzIGNvbG9ycyBmcm9tICcuLi9pbmRleC9jb2xvcnMnO1xuaW1wb3J0IHsgY29yZSB9IGZyb20gJy4uL3V0aWxzL2NvcmUnO1xuXG5mdW5jdGlvbiBhZGp1c3RTTChjb2xvcjogY29sb3JzLkhTTCk6IGNvbG9ycy5IU0wge1xuXHR0cnkge1xuXHRcdGlmICghdmFsaWRhdGVDb2xvclZhbHVlcyhjb2xvcikpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ0ludmFsaWQgY29sb3IgdmFsdXMgZm9yIGFkanVzdG1lbnQuJyk7XG5cdFx0XHRkb21IZWxwZXJzLnNob3dUb2FzdCgnSW52YWxpZCBjb2xvciB2YWx1ZXMnKTtcblx0XHRcdHJldHVybiBjb2xvcjtcblx0XHR9XG5cblx0XHRjb25zdCBhZGp1c3RlZFNhdHVyYXRpb24gPSBNYXRoLm1pbihcblx0XHRcdE1hdGgubWF4KGNvbG9yLnZhbHVlLnNhdHVyYXRpb24gKyBjb25maWcuYWRqdXN0U0xBbW91bnQsIDApLFxuXHRcdFx0MTAwXG5cdFx0KTtcblx0XHRjb25zdCBhZGp1c3RlZExpZ2h0bmVzcyA9IE1hdGgubWluKDEwMCk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dmFsdWU6IHtcblx0XHRcdFx0aHVlOiBjb2xvci52YWx1ZS5odWUsXG5cdFx0XHRcdHNhdHVyYXRpb246IGFkanVzdGVkU2F0dXJhdGlvbixcblx0XHRcdFx0bGlnaHRuZXNzOiBhZGp1c3RlZExpZ2h0bmVzc1xuXHRcdFx0fSxcblx0XHRcdGZvcm1hdDogJ2hzbCdcblx0XHR9O1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGNvbnNvbGUuZXJyb3IoYEVycm9yIGFkanVzdGluZyBzYXR1cmF0aW9uIGFuZCBsaWdodG5lc3M6ICR7ZXJyb3J9YCk7XG5cdFx0cmV0dXJuIGNvbG9yO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGdldFdlaWdodGVkUmFuZG9tSW50ZXJ2YWwoKTogbnVtYmVyIHtcblx0dHJ5IHtcblx0XHRjb25zdCB3ZWlnaHRzOiBudW1iZXJbXSA9IGNvbmZpZy53ZWlnaHRzO1xuXHRcdGNvbnN0IHByb2JhYmlsaXRpZXM6IG51bWJlcltdID0gY29uZmlnLnByb2JhYmlsaXRpZXM7XG5cdFx0Y29uc3QgY3VtdWxhdGl2ZVByb2JhYmlsaXRpZXM6IG51bWJlcltdID0gcHJvYmFiaWxpdGllcy5yZWR1Y2UoXG5cdFx0XHQoYWNjOiBudW1iZXJbXSwgcHJvYjogbnVtYmVyLCBpOiBudW1iZXIpID0+IHtcblx0XHRcdFx0YWNjW2ldID0gKGFjY1tpIC0gMV0gfHwgMCkgKyBwcm9iO1xuXHRcdFx0XHRyZXR1cm4gYWNjO1xuXHRcdFx0fSxcblx0XHRcdFtdXG5cdFx0KTtcblx0XHRjb25zdCByYW5kb20gPSBNYXRoLnJhbmRvbSgpO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjdW11bGF0aXZlUHJvYmFiaWxpdGllcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKHJhbmRvbSA8IGN1bXVsYXRpdmVQcm9iYWJpbGl0aWVzW2ldKSB7XG5cdFx0XHRcdHJldHVybiB3ZWlnaHRzW2ldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB3ZWlnaHRzW3dlaWdodHMubGVuZ3RoIC0gMV07XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Y29uc29sZS5lcnJvcihgRXJyb3IgZ2VuZXJhdGluZyB3ZWlnaHRlZCByYW5kb20gaW50ZXJ2YWw6ICR7ZXJyb3J9YCk7XG5cdFx0cmV0dXJuIDUwO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHNhbml0aXplTEFCKHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuXHRyZXR1cm4gTWF0aC5yb3VuZChNYXRoLm1pbihNYXRoLm1heCh2YWx1ZSwgLTEyNSksIDEyNSkpO1xufVxuXG5mdW5jdGlvbiBzYW5pdGl6ZVBlcmNlbnRhZ2UodmFsdWU6IG51bWJlcik6IG51bWJlciB7XG5cdHJldHVybiBNYXRoLnJvdW5kKE1hdGgubWluKE1hdGgubWF4KHZhbHVlLCAwKSwgMTAwKSk7XG59XG5cbmZ1bmN0aW9uIHNhbml0aXplUmFkaWFsKHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuXHRyZXR1cm4gTWF0aC5yb3VuZChNYXRoLm1pbihNYXRoLm1heCh2YWx1ZSwgMCksIDM2MCkpICYgMzYwO1xufVxuXG5mdW5jdGlvbiBzYW5pdGl6ZVJHQih2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcblx0cmV0dXJuIE1hdGgucm91bmQoTWF0aC5taW4oTWF0aC5tYXgodmFsdWUsIDApLCAyNTUpKTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVDb2xvclZhbHVlcyhcblx0Y29sb3I6IGNvbG9ycy5Db2xvciB8IGNvbG9ycy5TTCB8IGNvbG9ycy5TVlxuKTogYm9vbGVhbiB7XG5cdGNvbnN0IGNsb25lZENvbG9yID0gY29yZS5jbG9uZShjb2xvcik7XG5cdGNvbnN0IGlzTnVtZXJpY1ZhbGlkID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PlxuXHRcdHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgIWlzTmFOKHZhbHVlKTtcblx0Y29uc3Qgbm9ybWFsaXplUGVyY2VudGFnZSA9ICh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKTogbnVtYmVyID0+IHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS5lbmRzV2l0aCgnJScpKSB7XG5cdFx0XHRyZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZS5zbGljZSgwLCAtMSkpO1xuXHRcdH1cblx0XHRyZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyA/IHZhbHVlIDogTmFOO1xuXHR9O1xuXG5cdHN3aXRjaCAoY2xvbmVkQ29sb3IuZm9ybWF0KSB7XG5cdFx0Y2FzZSAnY215ayc6XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0Y2xvbmVkQ29sb3IudmFsdWUuY3lhbixcblx0XHRcdFx0XHRjbG9uZWRDb2xvci52YWx1ZS5tYWdlbnRhLFxuXHRcdFx0XHRcdGNsb25lZENvbG9yLnZhbHVlLnllbGxvdyxcblx0XHRcdFx0XHRjbG9uZWRDb2xvci52YWx1ZS5rZXlcblx0XHRcdFx0XS5ldmVyeShpc051bWVyaWNWYWxpZCkgJiZcblx0XHRcdFx0Y2xvbmVkQ29sb3IudmFsdWUuY3lhbiA+PSAwICYmXG5cdFx0XHRcdGNsb25lZENvbG9yLnZhbHVlLmN5YW4gPD0gMTAwICYmXG5cdFx0XHRcdGNsb25lZENvbG9yLnZhbHVlLm1hZ2VudGEgPj0gMCAmJlxuXHRcdFx0XHRjbG9uZWRDb2xvci52YWx1ZS5tYWdlbnRhIDw9IDEwMCAmJlxuXHRcdFx0XHRjbG9uZWRDb2xvci52YWx1ZS55ZWxsb3cgPj0gMCAmJlxuXHRcdFx0XHRjbG9uZWRDb2xvci52YWx1ZS55ZWxsb3cgPD0gMTAwICYmXG5cdFx0XHRcdGNsb25lZENvbG9yLnZhbHVlLmtleSA+PSAwICYmXG5cdFx0XHRcdGNsb25lZENvbG9yLnZhbHVlLmtleSA8PSAxMDBcblx0XHRcdCk7XG5cdFx0Y2FzZSAnaGV4Jzpcblx0XHRcdHJldHVybiAvXiNbMC05QS1GYS1mXXs2fSQvLnRlc3QoY2xvbmVkQ29sb3IudmFsdWUuaGV4KTtcblx0XHRjYXNlICdoc2wnOlxuXHRcdFx0Y29uc3QgaXNWYWxpZEhTTEh1ZSA9XG5cdFx0XHRcdGlzTnVtZXJpY1ZhbGlkKGNsb25lZENvbG9yLnZhbHVlLmh1ZSkgJiZcblx0XHRcdFx0Y2xvbmVkQ29sb3IudmFsdWUuaHVlID49IDAgJiZcblx0XHRcdFx0Y2xvbmVkQ29sb3IudmFsdWUuaHVlIDw9IDM2MDtcblx0XHRcdGNvbnN0IGlzVmFsaWRIU0xTYXR1cmF0aW9uID1cblx0XHRcdFx0bm9ybWFsaXplUGVyY2VudGFnZShjbG9uZWRDb2xvci52YWx1ZS5zYXR1cmF0aW9uKSA+PSAwICYmXG5cdFx0XHRcdG5vcm1hbGl6ZVBlcmNlbnRhZ2UoY2xvbmVkQ29sb3IudmFsdWUuc2F0dXJhdGlvbikgPD0gMTAwO1xuXHRcdFx0Y29uc3QgaXNWYWxpZEhTTExpZ2h0bmVzcyA9IGNsb25lZENvbG9yLnZhbHVlLmxpZ2h0bmVzc1xuXHRcdFx0XHQ/IG5vcm1hbGl6ZVBlcmNlbnRhZ2UoY2xvbmVkQ29sb3IudmFsdWUubGlnaHRuZXNzKSA+PSAwICYmXG5cdFx0XHRcdFx0bm9ybWFsaXplUGVyY2VudGFnZShjbG9uZWRDb2xvci52YWx1ZS5saWdodG5lc3MpIDw9IDEwMFxuXHRcdFx0XHQ6IHRydWU7XG5cblx0XHRcdHJldHVybiBpc1ZhbGlkSFNMSHVlICYmIGlzVmFsaWRIU0xTYXR1cmF0aW9uICYmIGlzVmFsaWRIU0xMaWdodG5lc3M7XG5cdFx0Y2FzZSAnaHN2Jzpcblx0XHRcdGNvbnN0IGlzVmFsaWRIU1ZIdWUgPVxuXHRcdFx0XHRpc051bWVyaWNWYWxpZChjbG9uZWRDb2xvci52YWx1ZS5odWUpICYmXG5cdFx0XHRcdGNsb25lZENvbG9yLnZhbHVlLmh1ZSA+PSAwICYmXG5cdFx0XHRcdGNsb25lZENvbG9yLnZhbHVlLmh1ZSA8PSAzNjA7XG5cdFx0XHRjb25zdCBpc1ZhbGlkSFNWU2F0dXJhdGlvbiA9XG5cdFx0XHRcdG5vcm1hbGl6ZVBlcmNlbnRhZ2UoY2xvbmVkQ29sb3IudmFsdWUuc2F0dXJhdGlvbikgPj0gMCAmJlxuXHRcdFx0XHRub3JtYWxpemVQZXJjZW50YWdlKGNsb25lZENvbG9yLnZhbHVlLnNhdHVyYXRpb24pIDw9IDEwMDtcblx0XHRcdGNvbnN0IGlzVmFsaWRIU1ZWYWx1ZSA9IGNsb25lZENvbG9yLnZhbHVlLnZhbHVlXG5cdFx0XHRcdD8gbm9ybWFsaXplUGVyY2VudGFnZShjbG9uZWRDb2xvci52YWx1ZS52YWx1ZSkgPj0gMCAmJlxuXHRcdFx0XHRcdG5vcm1hbGl6ZVBlcmNlbnRhZ2UoY2xvbmVkQ29sb3IudmFsdWUudmFsdWUpIDw9IDEwMFxuXHRcdFx0XHQ6IHRydWU7XG5cblx0XHRcdHJldHVybiBpc1ZhbGlkSFNWSHVlICYmIGlzVmFsaWRIU1ZTYXR1cmF0aW9uICYmIGlzVmFsaWRIU1ZWYWx1ZTtcblx0XHRjYXNlICdsYWInOlxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0W1xuXHRcdFx0XHRcdGNsb25lZENvbG9yLnZhbHVlLmwsXG5cdFx0XHRcdFx0Y2xvbmVkQ29sb3IudmFsdWUuYSxcblx0XHRcdFx0XHRjbG9uZWRDb2xvci52YWx1ZS5iXG5cdFx0XHRcdF0uZXZlcnkoaXNOdW1lcmljVmFsaWQpICYmXG5cdFx0XHRcdGNsb25lZENvbG9yLnZhbHVlLmwgPj0gMCAmJlxuXHRcdFx0XHRjbG9uZWRDb2xvci52YWx1ZS5sIDw9IDEwMCAmJlxuXHRcdFx0XHRjbG9uZWRDb2xvci52YWx1ZS5hID49IC0xMjUgJiZcblx0XHRcdFx0Y2xvbmVkQ29sb3IudmFsdWUuYSA8PSAxMjUgJiZcblx0XHRcdFx0Y2xvbmVkQ29sb3IudmFsdWUuYiA+PSAtMTI1ICYmXG5cdFx0XHRcdGNsb25lZENvbG9yLnZhbHVlLmIgPD0gMTI1XG5cdFx0XHQpO1xuXHRcdGNhc2UgJ3JnYic6XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0Y2xvbmVkQ29sb3IudmFsdWUucmVkLFxuXHRcdFx0XHRcdGNsb25lZENvbG9yLnZhbHVlLmdyZWVuLFxuXHRcdFx0XHRcdGNsb25lZENvbG9yLnZhbHVlLmJsdWVcblx0XHRcdFx0XS5ldmVyeShpc051bWVyaWNWYWxpZCkgJiZcblx0XHRcdFx0Y2xvbmVkQ29sb3IudmFsdWUucmVkID49IDAgJiZcblx0XHRcdFx0Y2xvbmVkQ29sb3IudmFsdWUucmVkIDw9IDI1NSAmJlxuXHRcdFx0XHRjbG9uZWRDb2xvci52YWx1ZS5ncmVlbiA+PSAwICYmXG5cdFx0XHRcdGNsb25lZENvbG9yLnZhbHVlLmdyZWVuIDw9IDI1NSAmJlxuXHRcdFx0XHRjbG9uZWRDb2xvci52YWx1ZS5ibHVlID49IDAgJiZcblx0XHRcdFx0Y2xvbmVkQ29sb3IudmFsdWUuYmx1ZSA8PSAyNTVcblx0XHRcdCk7XG5cdFx0Y2FzZSAnc2wnOlxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0W1xuXHRcdFx0XHRcdGNsb25lZENvbG9yLnZhbHVlLnNhdHVyYXRpb24sXG5cdFx0XHRcdFx0Y2xvbmVkQ29sb3IudmFsdWUubGlnaHRuZXNzXG5cdFx0XHRcdF0uZXZlcnkoaXNOdW1lcmljVmFsaWQpICYmXG5cdFx0XHRcdGNsb25lZENvbG9yLnZhbHVlLnNhdHVyYXRpb24gPj0gMCAmJlxuXHRcdFx0XHRjbG9uZWRDb2xvci52YWx1ZS5zYXR1cmF0aW9uIDw9IDEwMCAmJlxuXHRcdFx0XHRjbG9uZWRDb2xvci52YWx1ZS5saWdodG5lc3MgPj0gMCAmJlxuXHRcdFx0XHRjbG9uZWRDb2xvci52YWx1ZS5saWdodG5lc3MgPD0gMTAwXG5cdFx0XHQpO1xuXHRcdGNhc2UgJ3N2Jzpcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFtjbG9uZWRDb2xvci52YWx1ZS5zYXR1cmF0aW9uLCBjbG9uZWRDb2xvci52YWx1ZS52YWx1ZV0uZXZlcnkoXG5cdFx0XHRcdFx0aXNOdW1lcmljVmFsaWRcblx0XHRcdFx0KSAmJlxuXHRcdFx0XHRjbG9uZWRDb2xvci52YWx1ZS5zYXR1cmF0aW9uID49IDAgJiZcblx0XHRcdFx0Y2xvbmVkQ29sb3IudmFsdWUuc2F0dXJhdGlvbiA8PSAxMDAgJiZcblx0XHRcdFx0Y2xvbmVkQ29sb3IudmFsdWUudmFsdWUgPj0gMCAmJlxuXHRcdFx0XHRjbG9uZWRDb2xvci52YWx1ZS52YWx1ZSA8PSAxMDBcblx0XHRcdCk7XG5cdFx0Y2FzZSAneHl6Jzpcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFtcblx0XHRcdFx0XHRjbG9uZWRDb2xvci52YWx1ZS54LFxuXHRcdFx0XHRcdGNsb25lZENvbG9yLnZhbHVlLnksXG5cdFx0XHRcdFx0Y2xvbmVkQ29sb3IudmFsdWUuelxuXHRcdFx0XHRdLmV2ZXJ5KGlzTnVtZXJpY1ZhbGlkKSAmJlxuXHRcdFx0XHRjbG9uZWRDb2xvci52YWx1ZS54ID49IDAgJiZcblx0XHRcdFx0Y2xvbmVkQ29sb3IudmFsdWUueCA8PSA5NS4wNDcgJiZcblx0XHRcdFx0Y2xvbmVkQ29sb3IudmFsdWUueSA+PSAwICYmXG5cdFx0XHRcdGNsb25lZENvbG9yLnZhbHVlLnkgPD0gMTAwLjAgJiZcblx0XHRcdFx0Y2xvbmVkQ29sb3IudmFsdWUueiA+PSAwICYmXG5cdFx0XHRcdGNsb25lZENvbG9yLnZhbHVlLnogPD0gMTA4Ljg4M1xuXHRcdFx0KTtcblx0XHRkZWZhdWx0OlxuXHRcdFx0Y29uc29sZS5lcnJvcihgVW5zdXBwb3J0ZWQgY29sb3IgZm9ybWF0OiAke2NvbG9yLmZvcm1hdH1gKTtcblxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbmV4cG9ydCBjb25zdCBwYWxldHRlSGVscGVyczogZm5PYmplY3RzLlBhbGV0dGVIZWxwZXJzID0ge1xuXHRhZGp1c3RTTCxcblx0Z2V0V2VpZ2h0ZWRSYW5kb21JbnRlcnZhbCxcblx0c2FuaXRpemVMQUIsXG5cdHNhbml0aXplUGVyY2VudGFnZSxcblx0c2FuaXRpemVSYWRpYWwsXG5cdHNhbml0aXplUkdCLFxuXHR2YWxpZGF0ZUNvbG9yVmFsdWVzXG59O1xuIl19