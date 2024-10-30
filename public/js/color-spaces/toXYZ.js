import { conversionHelpers } from '../helpers/conversion.js';
import { paletteHelpers } from '../helpers/palette.js';
import { core } from '../utils/core.js';
import { defaults } from '../config/defaults.js';
function cmykToXYZ(cmyk) {
    try {
        if (!paletteHelpers.validateColorValues(cmyk)) {
            console.error(`Invalid CMYK value ${JSON.stringify(cmyk)}`);
            return core.clone(defaults.defaultXYZ);
        }
        return conversionHelpers.cmykToXYZHelper(core.clone(cmyk));
    }
    catch (error) {
        console.error(`cmykToXYZ error: ${error}`);
        return core.clone(defaults.defaultXYZ);
    }
}
function hexToXYZ(hex) {
    try {
        if (!paletteHelpers.validateColorValues(hex)) {
            console.error(`Invalid Hex value ${JSON.stringify(hex)}`);
            return core.clone(defaults.defaultXYZ);
        }
        return conversionHelpers.hexToXYZHelper(core.clone(hex));
    }
    catch (error) {
        console.error(`hexToXYZ error: ${error}`);
        return core.clone(defaults.defaultXYZ);
    }
}
function hslToXYZ(hsl) {
    try {
        if (!paletteHelpers.validateColorValues(hsl)) {
            console.error(`Invalid HSL value ${JSON.stringify(hsl)}`);
            return core.clone(defaults.defaultXYZ);
        }
        return conversionHelpers.hslToXYZHelper(core.clone(hsl));
    }
    catch (error) {
        console.error(`hslToXYZ error: ${error}`);
        return core.clone(defaults.defaultXYZ);
    }
}
function hsvToXYZ(hsv) {
    try {
        if (!paletteHelpers.validateColorValues(hsv)) {
            console.error(`Invalid HSV value ${JSON.stringify(hsv)}`);
            return core.clone(defaults.defaultXYZ);
        }
        return conversionHelpers.hsvToXYZHelper(core.clone(hsv));
    }
    catch (error) {
        console.error(`hsvToXYZ error: ${error}`);
        return core.clone(defaults.defaultXYZ);
    }
}
function labToXYZ(lab) {
    try {
        if (!paletteHelpers.validateColorValues(lab)) {
            console.error(`Invalid LAB value ${JSON.stringify(lab)}`);
            return core.clone(defaults.defaultXYZ);
        }
        const clonedLAB = core.clone(lab);
        const refX = 95.047, refY = 100.0, refZ = 108.883;
        let y = (clonedLAB.value.l + 16) / 116;
        let x = clonedLAB.value.a / 500 + y;
        let z = y - clonedLAB.value.b / 200;
        const pow = Math.pow;
        return {
            value: {
                x: refX *
                    (pow(x, 3) > 0.008856 ? pow(x, 3) : (x - 16 / 116) / 7.787),
                y: refY *
                    (pow(y, 3) > 0.008856 ? pow(y, 3) : (y - 16 / 116) / 7.787),
                z: refZ *
                    (pow(z, 3) > 0.008856 ? pow(z, 3) : (z - 16 / 116) / 7.787)
            },
            format: 'xyz'
        };
    }
    catch (error) {
        console.error(`labToXYZ error: ${error}`);
        return core.clone(defaults.defaultXYZ);
    }
}
function rgbToXYZ(rgb) {
    try {
        if (!paletteHelpers.validateColorValues(rgb)) {
            console.error(`Invalid RGB value ${JSON.stringify(rgb)}`);
            return core.clone(defaults.defaultXYZ);
        }
        const clonedRGB = core.clone(rgb);
        clonedRGB.value.red = clonedRGB.value.red / 255;
        clonedRGB.value.green = clonedRGB.value.green / 255;
        clonedRGB.value.blue = clonedRGB.value.blue / 255;
        clonedRGB.value.red =
            clonedRGB.value.red > 0.04045
                ? Math.pow((clonedRGB.value.red + 0.055) / 1.055, 2.4)
                : clonedRGB.value.red / 12.92;
        clonedRGB.value.green =
            clonedRGB.value.green > 0.04045
                ? Math.pow((clonedRGB.value.green + 0.055) / 1.055, 2.4)
                : clonedRGB.value.green / 12.92;
        clonedRGB.value.blue =
            clonedRGB.value.blue > 0.04045
                ? Math.pow((clonedRGB.value.blue + 0.055) / 1.055, 2.4)
                : clonedRGB.value.blue / 12.92;
        clonedRGB.value.red = clonedRGB.value.red * 100;
        clonedRGB.value.green = clonedRGB.value.green * 100;
        clonedRGB.value.blue = clonedRGB.value.blue * 100;
        return {
            value: {
                x: clonedRGB.value.red * 0.4124 +
                    clonedRGB.value.green * 0.3576 +
                    clonedRGB.value.blue * 0.1805,
                y: clonedRGB.value.red * 0.2126 +
                    clonedRGB.value.green * 0.7152 +
                    clonedRGB.value.blue * 0.0722,
                z: clonedRGB.value.red * 0.0193 +
                    clonedRGB.value.green * 0.1192 +
                    clonedRGB.value.blue * 0.9505
            },
            format: 'xyz'
        };
    }
    catch (error) {
        console.error(`rgbToXYZ error: ${error}`);
        return core.clone(defaults.defaultXYZ);
    }
}
export const toXYZ = {
    cmykToXYZ,
    hexToXYZ,
    hslToXYZ,
    hsvToXYZ,
    labToXYZ,
    rgbToXYZ
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9YWVouanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29sb3Itc3BhY2VzL3RvWFlaLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUdwRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU5QyxTQUFTLFNBQVMsQ0FBQyxJQUFpQjtJQUNuQyxJQUFJLENBQUM7UUFDSixJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDL0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFNUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBRUQsT0FBTyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEtBQUssRUFBRSxDQUFDLENBQUM7UUFFM0MsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4QyxDQUFDO0FBQ0YsQ0FBQztBQUVELFNBQVMsUUFBUSxDQUFDLEdBQWU7SUFDaEMsSUFBSSxDQUFDO1FBQ0osSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQzlDLE9BQU8sQ0FBQyxLQUFLLENBQUMscUJB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LFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLE1BQU07b0JBQzVCLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU07b0JBQzlCLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLE1BQU07YUFDOUI7WUFDRCxNQUFNLEVBQUUsS0FBSztTQUNiLENBQUM7SUFDSCxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLG1CQUFtQixLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRTFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEMsQ0FBQztBQUNGLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxLQUFLLEdBQW9CO0lBQ3JDLFNBQVM7SUFDVCxRQUFRO0lBQ1IsUUFBUTtJQUNSLFFBQVE7SUFDUixRQUFRO0lBQ1IsUUFBUTtDQUNSLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb252ZXJzaW9uSGVscGVycyB9IGZyb20gJy4uL2hlbHBlcnMvY29udmVyc2lvbic7XG5pbXBvcnQgeyBwYWxldHRlSGVscGVycyB9IGZyb20gJy4uL2hlbHBlcnMvcGFsZXR0ZSc7XG5pbXBvcnQgKiBhcyBmbk9iamVjdHMgZnJvbSAnLi4vaW5kZXgvZm4tb2JqZWN0cyc7XG5pbXBvcnQgKiBhcyBjb2xvcnMgZnJvbSAnLi4vaW5kZXgvY29sb3JzJztcbmltcG9ydCB7IGNvcmUgfSBmcm9tICcuLi91dGlscy9jb3JlJztcbmltcG9ydCB7IGRlZmF1bHRzIH0gZnJvbSAnLi4vY29uZmlnL2RlZmF1bHRzJztcblxuZnVuY3Rpb24gY215a1RvWFlaKGNteWs6IGNvbG9ycy5DTVlLKTogY29sb3JzLlhZWiB7XG5cdHRyeSB7XG5cdFx0aWYgKCFwYWxldHRlSGVscGVycy52YWxpZGF0ZUNvbG9yVmFsdWVzKGNteWspKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGBJbnZhbGlkIENNWUsgdmFsdWUgJHtKU09OLnN0cmluZ2lmeShjbXlrKX1gKTtcblxuXHRcdFx0cmV0dXJuIGNvcmUuY2xvbmUoZGVmYXVsdHMuZGVmYXVsdFhZWik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNvbnZlcnNpb25IZWxwZXJzLmNteWtUb1hZWkhlbHBlcihjb3JlLmNsb25lKGNteWspKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRjb25zb2xlLmVycm9yKGBjbXlrVG9YWVogZXJyb3I6ICR7ZXJyb3J9YCk7XG5cblx0XHRyZXR1cm4gY29yZS5jbG9uZShkZWZhdWx0cy5kZWZhdWx0WFlaKTtcblx0fVxufVxuXG5mdW5jdGlvbiBoZXhUb1hZWihoZXg6IGNvbG9ycy5IZXgpOiBjb2xvcnMuWFlaIHtcblx0dHJ5IHtcblx0XHRpZiAoIXBhbGV0dGVIZWxwZXJzLnZhbGlkYXRlQ29sb3JWYWx1ZXMoaGV4KSkge1xuXHRcdFx0Y29uc29sZS5lcnJvcihgSW52YWxpZCBIZXggdmFsdWUgJHtKU09OLnN0cmluZ2lmeShoZXgpfWApO1xuXG5cdFx0XHRyZXR1cm4gY29yZS5jbG9uZShkZWZhdWx0cy5kZWZhdWx0WFlaKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gY29udmVyc2lvbkhlbHBlcnMuaGV4VG9YWVpIZWxwZXIoY29yZS5jbG9uZShoZXgpKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRjb25zb2xlLmVycm9yKGBoZXhUb1hZWiBlcnJvcjogJHtlcnJvcn1gKTtcblxuXHRcdHJldHVybiBjb3JlLmNsb25lKGRlZmF1bHRzLmRlZmF1bHRYWVopO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGhzbFRvWFlaKGhzbDogY29sb3JzLkhTTCk6IGNvbG9ycy5YWVoge1xuXHR0cnkge1xuXHRcdGlmICghcGFsZXR0ZUhlbHBlcnMudmFsaWRhdGVDb2xvclZhbHVlcyhoc2wpKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGBJbnZhbGlkIEhTTCB2YWx1ZSAke0pTT04uc3RyaW5naWZ5KGhzbCl9YCk7XG5cblx0XHRcdHJldHVybiBjb3JlLmNsb25lKGRlZmF1bHRzLmRlZmF1bHRYWVopO1xuXHRcdH1cblxuXHRcdHJldHVybiBjb252ZXJzaW9uSGVscGVycy5oc2xUb1hZWkhlbHBlcihjb3JlLmNsb25lKGhzbCkpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGNvbnNvbGUuZXJyb3IoYGhzbFRvWFlaIGVycm9yOiAke2Vycm9yfWApO1xuXG5cdFx0cmV0dXJuIGNvcmUuY2xvbmUoZGVmYXVsdHMuZGVmYXVsdFhZWik7XG5cdH1cbn1cblxuZnVuY3Rpb24gaHN2VG9YWVooaHN2OiBjb2xvcnMuSFNWKTogY29sb3JzLlhZWiB7XG5cdHRyeSB7XG5cdFx0aWYgKCFwYWxldHRlSGVscGVycy52YWxpZGF0ZUNvbG9yVmFsdWVzKGhzdikpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoYEludmFsaWQgSFNWIHZhbHVlICR7SlNPTi5zdHJpbmdpZnkoaHN2KX1gKTtcblxuXHRcdFx0cmV0dXJuIGNvcmUuY2xvbmUoZGVmYXVsdHMuZGVmYXVsdFhZWik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNvbnZlcnNpb25IZWxwZXJzLmhzdlRvWFlaSGVscGVyKGNvcmUuY2xvbmUoaHN2KSk7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Y29uc29sZS5lcnJvcihgaHN2VG9YWVogZXJyb3I6ICR7ZXJyb3J9YCk7XG5cblx0XHRyZXR1cm4gY29yZS5jbG9uZShkZWZhdWx0cy5kZWZhdWx0WFlaKTtcblx0fVxufVxuXG5mdW5jdGlvbiBsYWJUb1hZWihsYWI6IGNvbG9ycy5MQUIpOiBjb2xvcnMuWFlaIHtcblx0dHJ5IHtcblx0XHRpZiAoIXBhbGV0dGVIZWxwZXJzLnZhbGlkYXRlQ29sb3JWYWx1ZXMobGFiKSkge1xuXHRcdFx0Y29uc29sZS5lcnJvcihgSW52YWxpZCBMQUIgdmFsdWUgJHtKU09OLnN0cmluZ2lmeShsYWIpfWApO1xuXG5cdFx0XHRyZXR1cm4gY29yZS5jbG9uZShkZWZhdWx0cy5kZWZhdWx0WFlaKTtcblx0XHR9XG5cblx0XHRjb25zdCBjbG9uZWRMQUIgPSBjb3JlLmNsb25lKGxhYik7XG5cdFx0Y29uc3QgcmVmWCA9IDk1LjA0Nyxcblx0XHRcdHJlZlkgPSAxMDAuMCxcblx0XHRcdHJlZlogPSAxMDguODgzO1xuXG5cdFx0bGV0IHkgPSAoY2xvbmVkTEFCLnZhbHVlLmwgKyAxNikgLyAxMTY7XG5cdFx0bGV0IHggPSBjbG9uZWRMQUIudmFsdWUuYSAvIDUwMCArIHk7XG5cdFx0bGV0IHogPSB5IC0gY2xvbmVkTEFCLnZhbHVlLmIgLyAyMDA7XG5cblx0XHRjb25zdCBwb3cgPSBNYXRoLnBvdztcblxuXHRcdHJldHVybiB7XG5cdFx0XHR2YWx1ZToge1xuXHRcdFx0XHR4OlxuXHRcdFx0XHRcdHJlZlggKlxuXHRcdFx0XHRcdChwb3coeCwgMykgPiAwLjAwODg1NiA/IHBvdyh4LCAzKSA6ICh4IC0gMTYgLyAxMTYpIC8gNy43ODcpLFxuXHRcdFx0XHR5OlxuXHRcdFx0XHRcdHJlZlkgKlxuXHRcdFx0XHRcdChwb3coeSwgMykgPiAwLjAwODg1NiA/IHBvdyh5LCAzKSA6ICh5IC0gMTYgLyAxMTYpIC8gNy43ODcpLFxuXHRcdFx0XHR6OlxuXHRcdFx0XHRcdHJlZlogKlxuXHRcdFx0XHRcdChwb3coeiwgMykgPiAwLjAwODg1NiA/IHBvdyh6LCAzKSA6ICh6IC0gMTYgLyAxMTYpIC8gNy43ODcpXG5cdFx0XHR9LFxuXHRcdFx0Zm9ybWF0OiAneHl6J1xuXHRcdH07XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Y29uc29sZS5lcnJvcihgbGFiVG9YWVogZXJyb3I6ICR7ZXJyb3J9YCk7XG5cblx0XHRyZXR1cm4gY29yZS5jbG9uZShkZWZhdWx0cy5kZWZhdWx0WFlaKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZ2JUb1hZWihyZ2I6IGNvbG9ycy5SR0IpOiBjb2xvcnMuWFlaIHtcblx0dHJ5IHtcblx0XHRpZiAoIXBhbGV0dGVIZWxwZXJzLnZhbGlkYXRlQ29sb3JWYWx1ZXMocmdiKSkge1xuXHRcdFx0Y29uc29sZS5lcnJvcihgSW52YWxpZCBSR0IgdmFsdWUgJHtKU09OLnN0cmluZ2lmeShyZ2IpfWApO1xuXG5cdFx0XHRyZXR1cm4gY29yZS5jbG9uZShkZWZhdWx0cy5kZWZhdWx0WFlaKTtcblx0XHR9XG5cblx0XHRjb25zdCBjbG9uZWRSR0IgPSBjb3JlLmNsb25lKHJnYik7XG5cblx0XHRjbG9uZWRSR0IudmFsdWUucmVkID0gY2xvbmVkUkdCLnZhbHVlLnJlZCAvIDI1NTtcblx0XHRjbG9uZWRSR0IudmFsdWUuZ3JlZW4gPSBjbG9uZWRSR0IudmFsdWUuZ3JlZW4gLyAyNTU7XG5cdFx0Y2xvbmVkUkdCLnZhbHVlLmJsdWUgPSBjbG9uZWRSR0IudmFsdWUuYmx1ZSAvIDI1NTtcblxuXHRcdGNsb25lZFJHQi52YWx1ZS5yZWQgPVxuXHRcdFx0Y2xvbmVkUkdCLnZhbHVlLnJlZCA+IDAuMDQwNDVcblx0XHRcdFx0PyBNYXRoLnBvdygoY2xvbmVkUkdCLnZhbHVlLnJlZCArIDAuMDU1KSAvIDEuMDU1LCAyLjQpXG5cdFx0XHRcdDogY2xvbmVkUkdCLnZhbHVlLnJlZCAvIDEyLjkyO1xuXHRcdGNsb25lZFJHQi52YWx1ZS5ncmVlbiA9XG5cdFx0XHRjbG9uZWRSR0IudmFsdWUuZ3JlZW4gPiAwLjA0MDQ1XG5cdFx0XHRcdD8gTWF0aC5wb3coKGNsb25lZFJHQi52YWx1ZS5ncmVlbiArIDAuMDU1KSAvIDEuMDU1LCAyLjQpXG5cdFx0XHRcdDogY2xvbmVkUkdCLnZhbHVlLmdyZWVuIC8gMTIuOTI7XG5cdFx0Y2xvbmVkUkdCLnZhbHVlLmJsdWUgPVxuXHRcdFx0Y2xvbmVkUkdCLnZhbHVlLmJsdWUgPiAwLjA0MDQ1XG5cdFx0XHRcdD8gTWF0aC5wb3coKGNsb25lZFJHQi52YWx1ZS5ibHVlICsgMC4wNTUpIC8gMS4wNTUsIDIuNClcblx0XHRcdFx0OiBjbG9uZWRSR0IudmFsdWUuYmx1ZSAvIDEyLjkyO1xuXG5cdFx0Y2xvbmVkUkdCLnZhbHVlLnJlZCA9IGNsb25lZFJHQi52YWx1ZS5yZWQgKiAxMDA7XG5cdFx0Y2xvbmVkUkdCLnZhbHVlLmdyZWVuID0gY2xvbmVkUkdCLnZhbHVlLmdyZWVuICogMTAwO1xuXHRcdGNsb25lZFJHQi52YWx1ZS5ibHVlID0gY2xvbmVkUkdCLnZhbHVlLmJsdWUgKiAxMDA7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dmFsdWU6IHtcblx0XHRcdFx0eDpcblx0XHRcdFx0XHRjbG9uZWRSR0IudmFsdWUucmVkICogMC40MTI0ICtcblx0XHRcdFx0XHRjbG9uZWRSR0IudmFsdWUuZ3JlZW4gKiAwLjM1NzYgK1xuXHRcdFx0XHRcdGNsb25lZFJHQi52YWx1ZS5ibHVlICogMC4xODA1LFxuXHRcdFx0XHR5OlxuXHRcdFx0XHRcdGNsb25lZFJHQi52YWx1ZS5yZWQgKiAwLjIxMjYgK1xuXHRcdFx0XHRcdGNsb25lZFJHQi52YWx1ZS5ncmVlbiAqIDAuNzE1MiArXG5cdFx0XHRcdFx0Y2xvbmVkUkdCLnZhbHVlLmJsdWUgKiAwLjA3MjIsXG5cdFx0XHRcdHo6XG5cdFx0XHRcdFx0Y2xvbmVkUkdCLnZhbHVlLnJlZCAqIDAuMDE5MyArXG5cdFx0XHRcdFx0Y2xvbmVkUkdCLnZhbHVlLmdyZWVuICogMC4xMTkyICtcblx0XHRcdFx0XHRjbG9uZWRSR0IudmFsdWUuYmx1ZSAqIDAuOTUwNVxuXHRcdFx0fSxcblx0XHRcdGZvcm1hdDogJ3h5eidcblx0XHR9O1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGNvbnNvbGUuZXJyb3IoYHJnYlRvWFlaIGVycm9yOiAke2Vycm9yfWApO1xuXG5cdFx0cmV0dXJuIGNvcmUuY2xvbmUoZGVmYXVsdHMuZGVmYXVsdFhZWik7XG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IHRvWFlaOiBmbk9iamVjdHMuVG9YWVogPSB7XG5cdGNteWtUb1hZWixcblx0aGV4VG9YWVosXG5cdGhzbFRvWFlaLFxuXHRoc3ZUb1hZWixcblx0bGFiVG9YWVosXG5cdHJnYlRvWFlaXG59O1xuIl19