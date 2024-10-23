import { conversionHelpers } from '../helpers/conversion.js';
import { defaults } from '../utils/defaults.js';
export function hexToCMYK(hex) {
    try {
        return conversionHelpers.hexToCMYKTryCaseHelper(hex);
    }
    catch (error) {
        console.error(`Error converting hex to CMYK: ${error}`);
        return defaults.defaultCMYK();
    }
}
export function hslToCMYK(hsl) {
    try {
        return conversionHelpers.hslToCMYKTryCaseHelper(hsl);
    }
    catch (error) {
        console.error(`Error converting HSL to CMYK: ${error}`);
        return defaults.defaultCMYK();
    }
}
export function hsvToCMYK(hsv) {
    try {
        return conversionHelpers.hsvToCMYKTryCaseHelper(hsv);
    }
    catch (error) {
        console.error(`Error converting HSV to CMYK: ${error}`);
        return defaults.defaultCMYK();
    }
}
export function labToCMYK(lab) {
    try {
        return conversionHelpers.labToCMYKTryCaseHelper(lab);
    }
    catch (error) {
        console.error(`Error converting Lab to CMYK: ${error}`);
        return defaults.defaultCMYK();
    }
}
export function rgbToCMYK(rgb) {
    try {
        const redPrime = rgb.value.red / 255;
        const greenPrime = rgb.value.green / 255;
        const bluePrime = rgb.value.blue / 255;
        const key = 1 - Math.max(redPrime, greenPrime, bluePrime);
        const cyan = (1 - redPrime - key) / (1 - key) || 0;
        const magenta = (1 - greenPrime - key) / (1 - key) || 0;
        const yellow = (1 - bluePrime - key) / (1 - key) || 0;
        return {
            value: {
                cyan: Math.round(cyan * 100),
                magenta: Math.round(magenta * 100),
                yellow: Math.round(yellow * 100),
                key: Math.round(key * 100)
            },
            format: 'cmyk'
        };
    }
    catch (error) {
        console.error(`Error converting RGB to CMYK: ${error}`);
        return defaults.defaultCMYK();
    }
}
export function xyzToCMYK(xyz) {
    try {
        const cmyk = conversionHelpers.xyzToCMYKTryCaseHelper(xyz);
        return cmyk;
    }
    catch (error) {
        console.error(`Error converting XYZ to CMYK: ${error}`);
        return defaults.defaultCMYK();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9DTVlLLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbG9yLWNvbnZlcnNpb24vdG9DTVlLLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTFELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUU3QyxNQUFNLFVBQVUsU0FBUyxDQUFDLEdBQWM7SUFDdkMsSUFBSSxDQUFDO1FBQ0osT0FBTyxpQkFBaUIsQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLGlDQUFpQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELE9BQU8sUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQy9CLENBQUM7QUFDRixDQUFDO0FBRUQsTUFBTSxVQUFVLFNBQVMsQ0FBQyxHQUFjO0lBQ3ZDLElBQUksQ0FBQztRQUNKLE9BQU8saUJBQWlCLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUN4RCxPQUFPLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMvQixDQUFDO0FBQ0YsQ0FBQztBQUVELE1BQU0sVUFBVSxTQUFTLENBQUMsR0FBYztJQUN2QyxJQUFJLENBQUM7UUFDSixPQUFPLGlCQUFpQixDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUNBQWlDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDeEQsT0FBTyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDL0IsQ0FBQztBQUNGLENBQUM7QUFFRCxNQUFNLFVBQVUsU0FBUyxDQUFDLEdBQWM7SUFDdkMsSUFBSSxDQUFDO1FBQ0osT0FBTyxpQkFBaUIsQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLGlDQUFpQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELE9BQU8sUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQy9CLENBQUM7QUFDRixDQUFDO0FBRUQsTUFBTSxVQUFVLFNBQVMsQ0FBQyxHQUFjO0lBQ3ZDLElBQUksQ0FBQztRQUNKLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNyQyxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDekMsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBRXZDLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDMUQsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsR0FBRyxVQUFVLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hELE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLFNBQVMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEQsT0FBTztZQUNOLEtBQUssRUFBRTtnQkFDTixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO2dCQUM1QixPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO2dCQUNsQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO2dCQUNoQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO2FBQzFCO1lBQ0QsTUFBTSxFQUFFLE1BQU07U0FDZCxDQUFDO0lBQ0gsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUN4RCxPQUFPLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMvQixDQUFDO0FBQ0YsQ0FBQztBQUVELE1BQU0sVUFBVSxTQUFTLENBQUMsR0FBYztJQUN2QyxJQUFJLENBQUM7UUFDSixNQUFNLElBQUksR0FBZSxpQkFBaUIsQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2RSxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUNBQWlDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDeEQsT0FBTyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDL0IsQ0FBQztBQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb252ZXJzaW9uSGVscGVycyB9IGZyb20gJy4uL2hlbHBlcnMvY29udmVyc2lvbic7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuLi9pbmRleCc7XG5pbXBvcnQgeyBkZWZhdWx0cyB9IGZyb20gJy4uL3V0aWxzL2RlZmF1bHRzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGhleFRvQ01ZSyhoZXg6IHR5cGVzLkhleCk6IHR5cGVzLkNNWUsge1xuXHR0cnkge1xuXHRcdHJldHVybiBjb252ZXJzaW9uSGVscGVycy5oZXhUb0NNWUtUcnlDYXNlSGVscGVyKGhleCk7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Y29uc29sZS5lcnJvcihgRXJyb3IgY29udmVydGluZyBoZXggdG8gQ01ZSzogJHtlcnJvcn1gKTtcblx0XHRyZXR1cm4gZGVmYXVsdHMuZGVmYXVsdENNWUsoKTtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaHNsVG9DTVlLKGhzbDogdHlwZXMuSFNMKTogdHlwZXMuQ01ZSyB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIGNvbnZlcnNpb25IZWxwZXJzLmhzbFRvQ01ZS1RyeUNhc2VIZWxwZXIoaHNsKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRjb25zb2xlLmVycm9yKGBFcnJvciBjb252ZXJ0aW5nIEhTTCB0byBDTVlLOiAke2Vycm9yfWApO1xuXHRcdHJldHVybiBkZWZhdWx0cy5kZWZhdWx0Q01ZSygpO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoc3ZUb0NNWUsoaHN2OiB0eXBlcy5IU1YpOiB0eXBlcy5DTVlLIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gY29udmVyc2lvbkhlbHBlcnMuaHN2VG9DTVlLVHJ5Q2FzZUhlbHBlcihoc3YpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGNvbnNvbGUuZXJyb3IoYEVycm9yIGNvbnZlcnRpbmcgSFNWIHRvIENNWUs6ICR7ZXJyb3J9YCk7XG5cdFx0cmV0dXJuIGRlZmF1bHRzLmRlZmF1bHRDTVlLKCk7XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxhYlRvQ01ZSyhsYWI6IHR5cGVzLkxBQik6IHR5cGVzLkNNWUsge1xuXHR0cnkge1xuXHRcdHJldHVybiBjb252ZXJzaW9uSGVscGVycy5sYWJUb0NNWUtUcnlDYXNlSGVscGVyKGxhYik7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Y29uc29sZS5lcnJvcihgRXJyb3IgY29udmVydGluZyBMYWIgdG8gQ01ZSzogJHtlcnJvcn1gKTtcblx0XHRyZXR1cm4gZGVmYXVsdHMuZGVmYXVsdENNWUsoKTtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmdiVG9DTVlLKHJnYjogdHlwZXMuUkdCKTogdHlwZXMuQ01ZSyB7XG5cdHRyeSB7XG5cdFx0Y29uc3QgcmVkUHJpbWUgPSByZ2IudmFsdWUucmVkIC8gMjU1O1xuXHRcdGNvbnN0IGdyZWVuUHJpbWUgPSByZ2IudmFsdWUuZ3JlZW4gLyAyNTU7XG5cdFx0Y29uc3QgYmx1ZVByaW1lID0gcmdiLnZhbHVlLmJsdWUgLyAyNTU7XG5cblx0XHRjb25zdCBrZXkgPSAxIC0gTWF0aC5tYXgocmVkUHJpbWUsIGdyZWVuUHJpbWUsIGJsdWVQcmltZSk7XG5cdFx0Y29uc3QgY3lhbiA9ICgxIC0gcmVkUHJpbWUgLSBrZXkpIC8gKDEgLSBrZXkpIHx8IDA7XG5cdFx0Y29uc3QgbWFnZW50YSA9ICgxIC0gZ3JlZW5QcmltZSAtIGtleSkgLyAoMSAtIGtleSkgfHwgMDtcblx0XHRjb25zdCB5ZWxsb3cgPSAoMSAtIGJsdWVQcmltZSAtIGtleSkgLyAoMSAtIGtleSkgfHwgMDtcblxuXHRcdHJldHVybiB7XG5cdFx0XHR2YWx1ZToge1xuXHRcdFx0XHRjeWFuOiBNYXRoLnJvdW5kKGN5YW4gKiAxMDApLFxuXHRcdFx0XHRtYWdlbnRhOiBNYXRoLnJvdW5kKG1hZ2VudGEgKiAxMDApLFxuXHRcdFx0XHR5ZWxsb3c6IE1hdGgucm91bmQoeWVsbG93ICogMTAwKSxcblx0XHRcdFx0a2V5OiBNYXRoLnJvdW5kKGtleSAqIDEwMClcblx0XHRcdH0sXG5cdFx0XHRmb3JtYXQ6ICdjbXlrJ1xuXHRcdH07XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Y29uc29sZS5lcnJvcihgRXJyb3IgY29udmVydGluZyBSR0IgdG8gQ01ZSzogJHtlcnJvcn1gKTtcblx0XHRyZXR1cm4gZGVmYXVsdHMuZGVmYXVsdENNWUsoKTtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24geHl6VG9DTVlLKHh5ejogdHlwZXMuWFlaKTogdHlwZXMuQ01ZSyB7XG5cdHRyeSB7XG5cdFx0Y29uc3QgY215azogdHlwZXMuQ01ZSyA9IGNvbnZlcnNpb25IZWxwZXJzLnh5elRvQ01ZS1RyeUNhc2VIZWxwZXIoeHl6KTtcblx0XHRyZXR1cm4gY215aztcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRjb25zb2xlLmVycm9yKGBFcnJvciBjb252ZXJ0aW5nIFhZWiB0byBDTVlLOiAke2Vycm9yfWApO1xuXHRcdHJldHVybiBkZWZhdWx0cy5kZWZhdWx0Q01ZSygpO1xuXHR9XG59XG4iXX0=