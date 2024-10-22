import { conversionHelpers } from '../helpers/conversion.js';
export function hexToCMYK(hex) {
    try {
        return conversionHelpers.hexToCMYKTryCaseHelper(hex);
    }
    catch (error) {
        console.error(`Error converting hex to CMYK: ${error}`);
        return fallbackCMYK();
    }
}
export function hslToCMYK(hsl) {
    try {
        return conversionHelpers.hslToCMYKTryCaseHelper(hsl);
    }
    catch (error) {
        console.error(`Error converting HSL to CMYK: ${error}`);
        return fallbackCMYK();
    }
}
export function hsvToCMYK(hsv) {
    try {
        return conversionHelpers.hsvToCMYKTryCaseHelper(hsv);
    }
    catch (error) {
        console.error(`Error converting HSV to CMYK: ${error}`);
        return fallbackCMYK();
    }
}
export function labToCMYK(lab) {
    try {
        return conversionHelpers.labToCMYKTryCaseHelper(lab);
    }
    catch (error) {
        console.error(`Error converting Lab to CMYK: ${error}`);
        return fallbackCMYK();
    }
}
export function rgbToCMYK(rgb) {
    try {
        const redPrime = rgb.red / 255;
        const greenPrime = rgb.green / 255;
        const bluePrime = rgb.blue / 255;
        const key = 1 - Math.max(redPrime, greenPrime, bluePrime);
        const cyan = (1 - redPrime - key) / (1 - key) || 0;
        const magenta = (1 - greenPrime - key) / (1 - key) || 0;
        const yellow = (1 - bluePrime - key) / (1 - key) || 0;
        return {
            cyan: Math.round(cyan * 100),
            magenta: Math.round(magenta * 100),
            yellow: Math.round(yellow * 100),
            key: Math.round(key * 100),
            format: 'cmyk'
        };
    }
    catch (error) {
        console.error(`Error converting RGB to CMYK: ${error}`);
        return fallbackCMYK();
    }
}
export function xyzToCMYK(xyz) {
    try {
        const cmyk = conversionHelpers.xyzToCMYKTryCaseHelper(xyz);
        return cmyk;
    }
    catch (error) {
        console.error(`Error converting XYZ to CMYK: ${error}`);
        return fallbackCMYK();
    }
}
function fallbackCMYK() {
    return { cyan: 0, magenta: 0, yellow: 0, key: 0, format: 'cmyk' };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9DTVlLLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbG9yLWNvbnZlcnNpb24vdG9DTVlLLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRzFELE1BQU0sVUFBVSxTQUFTLENBQUMsR0FBYztJQUN2QyxJQUFJLENBQUM7UUFDSixPQUFPLGlCQUFpQixDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUNBQWlDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDeEQsT0FBTyxZQUFZLEVBQUUsQ0FBQztJQUN2QixDQUFDO0FBQ0YsQ0FBQztBQUVELE1BQU0sVUFBVSxTQUFTLENBQUMsR0FBYztJQUN2QyxJQUFJLENBQUM7UUFDSixPQUFPLGlCQUFpQixDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUNBQWlDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDeEQsT0FBTyxZQUFZLEVBQUUsQ0FBQztJQUN2QixDQUFDO0FBQ0YsQ0FBQztBQUVELE1BQU0sVUFBVSxTQUFTLENBQUMsR0FBYztJQUN2QyxJQUFJLENBQUM7UUFDSixPQUFPLGlCQUFpQixDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUNBQWlDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDeEQsT0FBTyxZQUFZLEVBQUUsQ0FBQztJQUN2QixDQUFDO0FBQ0YsQ0FBQztBQUVELE1BQU0sVUFBVSxTQUFTLENBQUMsR0FBYztJQUN2QyxJQUFJLENBQUM7UUFDSixPQUFPLGlCQUFpQixDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUNBQWlDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDeEQsT0FBTyxZQUFZLEVBQUUsQ0FBQztJQUN2QixDQUFDO0FBQ0YsQ0FBQztBQUVELE1BQU0sVUFBVSxTQUFTLENBQUMsR0FBYztJQUN2QyxJQUFJLENBQUM7UUFDSixNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUMvQixNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNuQyxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUVqQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzFELE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLFFBQVEsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RCxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxTQUFTLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRELE9BQU87WUFDTixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1lBQzVCLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7WUFDbEMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztZQUNoQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQzFCLE1BQU0sRUFBRSxNQUFNO1NBQ2QsQ0FBQztJQUNILENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUNBQWlDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDeEQsT0FBTyxZQUFZLEVBQUUsQ0FBQztJQUN2QixDQUFDO0FBQ0YsQ0FBQztBQUVELE1BQU0sVUFBVSxTQUFTLENBQUMsR0FBYztJQUN2QyxJQUFJLENBQUM7UUFDSixNQUFNLElBQUksR0FBZSxpQkFBaUIsQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2RSxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUNBQWlDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDeEQsT0FBTyxZQUFZLEVBQUUsQ0FBQztJQUN2QixDQUFDO0FBQ0YsQ0FBQztBQUVELFNBQVMsWUFBWTtJQUNwQixPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUM7QUFDbkUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbnZlcnNpb25IZWxwZXJzIH0gZnJvbSAnLi4vaGVscGVycy9jb252ZXJzaW9uJztcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4uL2luZGV4JztcblxuZXhwb3J0IGZ1bmN0aW9uIGhleFRvQ01ZSyhoZXg6IHR5cGVzLkhleCk6IHR5cGVzLkNNWUsge1xuXHR0cnkge1xuXHRcdHJldHVybiBjb252ZXJzaW9uSGVscGVycy5oZXhUb0NNWUtUcnlDYXNlSGVscGVyKGhleCk7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Y29uc29sZS5lcnJvcihgRXJyb3IgY29udmVydGluZyBoZXggdG8gQ01ZSzogJHtlcnJvcn1gKTtcblx0XHRyZXR1cm4gZmFsbGJhY2tDTVlLKCk7XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhzbFRvQ01ZSyhoc2w6IHR5cGVzLkhTTCk6IHR5cGVzLkNNWUsge1xuXHR0cnkge1xuXHRcdHJldHVybiBjb252ZXJzaW9uSGVscGVycy5oc2xUb0NNWUtUcnlDYXNlSGVscGVyKGhzbCk7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Y29uc29sZS5lcnJvcihgRXJyb3IgY29udmVydGluZyBIU0wgdG8gQ01ZSzogJHtlcnJvcn1gKTtcblx0XHRyZXR1cm4gZmFsbGJhY2tDTVlLKCk7XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhzdlRvQ01ZSyhoc3Y6IHR5cGVzLkhTVik6IHR5cGVzLkNNWUsge1xuXHR0cnkge1xuXHRcdHJldHVybiBjb252ZXJzaW9uSGVscGVycy5oc3ZUb0NNWUtUcnlDYXNlSGVscGVyKGhzdik7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Y29uc29sZS5lcnJvcihgRXJyb3IgY29udmVydGluZyBIU1YgdG8gQ01ZSzogJHtlcnJvcn1gKTtcblx0XHRyZXR1cm4gZmFsbGJhY2tDTVlLKCk7XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxhYlRvQ01ZSyhsYWI6IHR5cGVzLkxBQik6IHR5cGVzLkNNWUsge1xuXHR0cnkge1xuXHRcdHJldHVybiBjb252ZXJzaW9uSGVscGVycy5sYWJUb0NNWUtUcnlDYXNlSGVscGVyKGxhYik7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Y29uc29sZS5lcnJvcihgRXJyb3IgY29udmVydGluZyBMYWIgdG8gQ01ZSzogJHtlcnJvcn1gKTtcblx0XHRyZXR1cm4gZmFsbGJhY2tDTVlLKCk7XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJnYlRvQ01ZSyhyZ2I6IHR5cGVzLlJHQik6IHR5cGVzLkNNWUsge1xuXHR0cnkge1xuXHRcdGNvbnN0IHJlZFByaW1lID0gcmdiLnJlZCAvIDI1NTtcblx0XHRjb25zdCBncmVlblByaW1lID0gcmdiLmdyZWVuIC8gMjU1O1xuXHRcdGNvbnN0IGJsdWVQcmltZSA9IHJnYi5ibHVlIC8gMjU1O1xuXG5cdFx0Y29uc3Qga2V5ID0gMSAtIE1hdGgubWF4KHJlZFByaW1lLCBncmVlblByaW1lLCBibHVlUHJpbWUpO1xuXHRcdGNvbnN0IGN5YW4gPSAoMSAtIHJlZFByaW1lIC0ga2V5KSAvICgxIC0ga2V5KSB8fCAwO1xuXHRcdGNvbnN0IG1hZ2VudGEgPSAoMSAtIGdyZWVuUHJpbWUgLSBrZXkpIC8gKDEgLSBrZXkpIHx8IDA7XG5cdFx0Y29uc3QgeWVsbG93ID0gKDEgLSBibHVlUHJpbWUgLSBrZXkpIC8gKDEgLSBrZXkpIHx8IDA7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0Y3lhbjogTWF0aC5yb3VuZChjeWFuICogMTAwKSxcblx0XHRcdG1hZ2VudGE6IE1hdGgucm91bmQobWFnZW50YSAqIDEwMCksXG5cdFx0XHR5ZWxsb3c6IE1hdGgucm91bmQoeWVsbG93ICogMTAwKSxcblx0XHRcdGtleTogTWF0aC5yb3VuZChrZXkgKiAxMDApLFxuXHRcdFx0Zm9ybWF0OiAnY215aydcblx0XHR9O1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGNvbnNvbGUuZXJyb3IoYEVycm9yIGNvbnZlcnRpbmcgUkdCIHRvIENNWUs6ICR7ZXJyb3J9YCk7XG5cdFx0cmV0dXJuIGZhbGxiYWNrQ01ZSygpO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB4eXpUb0NNWUsoeHl6OiB0eXBlcy5YWVopOiB0eXBlcy5DTVlLIHtcblx0dHJ5IHtcblx0XHRjb25zdCBjbXlrOiB0eXBlcy5DTVlLID0gY29udmVyc2lvbkhlbHBlcnMueHl6VG9DTVlLVHJ5Q2FzZUhlbHBlcih4eXopO1xuXHRcdHJldHVybiBjbXlrO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGNvbnNvbGUuZXJyb3IoYEVycm9yIGNvbnZlcnRpbmcgWFlaIHRvIENNWUs6ICR7ZXJyb3J9YCk7XG5cdFx0cmV0dXJuIGZhbGxiYWNrQ01ZSygpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGZhbGxiYWNrQ01ZSygpOiB0eXBlcy5DTVlLIHtcblx0cmV0dXJuIHsgY3lhbjogMCwgbWFnZW50YTogMCwgeWVsbG93OiAwLCBrZXk6IDAsIGZvcm1hdDogJ2NteWsnIH07XG59XG4iXX0=