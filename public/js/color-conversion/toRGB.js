import { labToXYZ } from './toXYZ.js';
import { stripHashFromHex } from '../utils/transforms.js';
import { conversionHelpers } from '../helpers/conversion.js';
export function xyzToRGB(xyz) {
    try {
        xyz.x /= 100;
        xyz.y /= 100;
        xyz.z /= 100;
        let red = xyz.x * 3.2406 + xyz.y * -1.5372 + xyz.z * -0.4986;
        let green = xyz.x * -0.9689 + xyz.y * 1.8758 + xyz.z * 0.0415;
        let blue = xyz.x * 0.0557 + xyz.y * -0.204 + xyz.z * 1.057;
        red = conversionHelpers.applyGammaCorrection(red);
        green = conversionHelpers.applyGammaCorrection(green);
        blue = conversionHelpers.applyGammaCorrection(blue);
        const rgb = { red, green, blue, format: 'rgb' };
        return conversionHelpers.clampRGB(rgb);
    }
    catch (error) {
        console.error(`xyzToRGB error: ${error}`);
        return { red: 0, green: 0, blue: 0, format: 'rgb' };
    }
}
export function hexToRGB(hex) {
    try {
        const strippedHex = stripHashFromHex(hex).hex;
        const bigint = parseInt(strippedHex, 16);
        return {
            red: (bigint >> 16) & 255,
            green: (bigint >> 8) & 255,
            blue: bigint & 255,
            format: 'rgb'
        };
    }
    catch (error) {
        console.error(`hexToRGB error: ${error}`);
        return { red: 0, green: 0, blue: 0, format: 'rgb' };
    }
}
export function hslToRGB(hsl) {
    try {
        const s = hsl.saturation / 100;
        const l = hsl.lightness / 100;
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        return {
            red: Math.round(conversionHelpers.hueToRGB(p, q, hsl.hue + 1 / 3) * 255),
            green: Math.round(conversionHelpers.hueToRGB(p, q, hsl.hue) * 255),
            blue: Math.round(conversionHelpers.hueToRGB(p, q, hsl.hue - 1 / 3) * 255),
            format: 'rgb'
        };
    }
    catch (error) {
        console.error(`hslToRGB error: ${error}`);
        return { red: 0, green: 0, blue: 0, format: 'rgb' };
    }
}
export function hsvToRGB(hsv) {
    try {
        const s = hsv.saturation / 100;
        const v = hsv.value / 100;
        const i = Math.floor(hsv.hue / 60) % 6;
        const f = hsv.hue / 60 - i;
        const p = v * (1 - s);
        const q = v * (1 - f * s);
        const t = v * (1 - (1 - f) * s);
        let rgb = { red: 0, green: 0, blue: 0, format: 'rgb' };
        switch (i) {
            case 0:
                rgb = { red: v, green: t, blue: p, format: 'rgb' };
                break;
            case 1:
                rgb = { red: q, green: v, blue: p, format: 'rgb' };
                break;
            case 2:
                rgb = { red: p, green: v, blue: t, format: 'rgb' };
                break;
            case 3:
                rgb = { red: p, green: q, blue: v, format: 'rgb' };
                break;
            case 4:
                rgb = { red: t, green: p, blue: v, format: 'rgb' };
                break;
            case 5:
                rgb = { red: v, green: p, blue: q, format: 'rgb' };
                break;
        }
        return conversionHelpers.clampRGB(rgb);
    }
    catch (error) {
        console.error(`hsvToRGB error: ${error}`);
        return { red: 0, green: 0, blue: 0, format: 'rgb' };
    }
}
export function cmykToRGB(cmyk) {
    try {
        const r = 255 * (1 - cmyk.cyan / 100) * (1 - cmyk.key / 100);
        const g = 255 * (1 - cmyk.magenta / 100) * (1 - cmyk.key / 100);
        const b = 255 * (1 - cmyk.yellow / 100) * (1 - cmyk.key / 100);
        const rgb = { red: r, green: g, blue: b, format: 'rgb' };
        return conversionHelpers.clampRGB(rgb);
    }
    catch (error) {
        console.error(`cmykToRGB error: ${error}`);
        return { red: 0, green: 0, blue: 0, format: 'rgb' };
    }
}
export function labToRGB(lab) {
    const xyz = labToXYZ(lab);
    return xyzToRGB(xyz);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9SR0IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29sb3ItY29udmVyc2lvbi90b1JHQi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRW5DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTFELE1BQU0sVUFBVSxRQUFRLENBQUMsR0FBYztJQUN0QyxJQUFJLENBQUM7UUFDSixHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUNiLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDO1FBQ2IsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUM7UUFFYixJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDN0QsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUM5RCxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBRTNELEdBQUcsR0FBRyxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsRCxLQUFLLEdBQUcsaUJBQWlCLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEQsSUFBSSxHQUFHLGlCQUFpQixDQUFDLG9CQUFv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R0FBRyxDQUFDLENBQUM7QUFDdEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGxhYlRvWFlaIH0gZnJvbSAnLi90b1hZWic7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuLi9pbmRleCc7XG5pbXBvcnQgeyBzdHJpcEhhc2hGcm9tSGV4IH0gZnJvbSAnLi4vdXRpbHMvdHJhbnNmb3Jtcyc7XG5pbXBvcnQgeyBjb252ZXJzaW9uSGVscGVycyB9IGZyb20gJy4uL2hlbHBlcnMvY29udmVyc2lvbic7XG5cbmV4cG9ydCBmdW5jdGlvbiB4eXpUb1JHQih4eXo6IHR5cGVzLlhZWik6IHR5cGVzLlJHQiB7XG5cdHRyeSB7XG5cdFx0eHl6LnggLz0gMTAwO1xuXHRcdHh5ei55IC89IDEwMDtcblx0XHR4eXoueiAvPSAxMDA7XG5cblx0XHRsZXQgcmVkID0geHl6LnggKiAzLjI0MDYgKyB4eXoueSAqIC0xLjUzNzIgKyB4eXoueiAqIC0wLjQ5ODY7XG5cdFx0bGV0IGdyZWVuID0geHl6LnggKiAtMC45Njg5ICsgeHl6LnkgKiAxLjg3NTggKyB4eXoueiAqIDAuMDQxNTtcblx0XHRsZXQgYmx1ZSA9IHh5ei54ICogMC4wNTU3ICsgeHl6LnkgKiAtMC4yMDQgKyB4eXoueiAqIDEuMDU3O1xuXG5cdFx0cmVkID0gY29udmVyc2lvbkhlbHBlcnMuYXBwbHlHYW1tYUNvcnJlY3Rpb24ocmVkKTtcblx0XHRncmVlbiA9IGNvbnZlcnNpb25IZWxwZXJzLmFwcGx5R2FtbWFDb3JyZWN0aW9uKGdyZWVuKTtcblx0XHRibHVlID0gY29udmVyc2lvbkhlbHBlcnMuYXBwbHlHYW1tYUNvcnJlY3Rpb24oYmx1ZSk7XG5cblx0XHRjb25zdCByZ2I6IHR5cGVzLlJHQiA9IHsgcmVkLCBncmVlbiwgYmx1ZSwgZm9ybWF0OiAncmdiJyB9O1xuXG5cdFx0cmV0dXJuIGNvbnZlcnNpb25IZWxwZXJzLmNsYW1wUkdCKHJnYik7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Y29uc29sZS5lcnJvcihgeHl6VG9SR0IgZXJyb3I6ICR7ZXJyb3J9YCk7XG5cdFx0cmV0dXJuIHsgcmVkOiAwLCBncmVlbjogMCwgYmx1ZTogMCwgZm9ybWF0OiAncmdiJyB9O1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoZXhUb1JHQihoZXg6IHR5cGVzLkhleCk6IHR5cGVzLlJHQiB7XG5cdHRyeSB7XG5cdFx0Y29uc3Qgc3RyaXBwZWRIZXggPSBzdHJpcEhhc2hGcm9tSGV4KGhleCkuaGV4O1xuXHRcdGNvbnN0IGJpZ2ludCA9IHBhcnNlSW50KHN0cmlwcGVkSGV4LCAxNik7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVkOiAoYmlnaW50ID4+IDE2KSAmIDI1NSxcblx0XHRcdGdyZWVuOiAoYmlnaW50ID4+IDgpICYgMjU1LFxuXHRcdFx0Ymx1ZTogYmlnaW50ICYgMjU1LFxuXHRcdFx0Zm9ybWF0OiAncmdiJ1xuXHRcdH07XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Y29uc29sZS5lcnJvcihgaGV4VG9SR0IgZXJyb3I6ICR7ZXJyb3J9YCk7XG5cdFx0cmV0dXJuIHsgcmVkOiAwLCBncmVlbjogMCwgYmx1ZTogMCwgZm9ybWF0OiAncmdiJyB9O1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoc2xUb1JHQihoc2w6IHR5cGVzLkhTTCk6IHR5cGVzLlJHQiB7XG5cdHRyeSB7XG5cdFx0Y29uc3QgcyA9IGhzbC5zYXR1cmF0aW9uIC8gMTAwO1xuXHRcdGNvbnN0IGwgPSBoc2wubGlnaHRuZXNzIC8gMTAwO1xuXG5cdFx0Y29uc3QgcSA9IGwgPCAwLjUgPyBsICogKDEgKyBzKSA6IGwgKyBzIC0gbCAqIHM7XG5cdFx0Y29uc3QgcCA9IDIgKiBsIC0gcTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRyZWQ6IE1hdGgucm91bmQoXG5cdFx0XHRcdGNvbnZlcnNpb25IZWxwZXJzLmh1ZVRvUkdCKHAsIHEsIGhzbC5odWUgKyAxIC8gMykgKiAyNTVcblx0XHRcdCksXG5cdFx0XHRncmVlbjogTWF0aC5yb3VuZChjb252ZXJzaW9uSGVscGVycy5odWVUb1JHQihwLCBxLCBoc2wuaHVlKSAqIDI1NSksXG5cdFx0XHRibHVlOiBNYXRoLnJvdW5kKFxuXHRcdFx0XHRjb252ZXJzaW9uSGVscGVycy5odWVUb1JHQihwLCBxLCBoc2wuaHVlIC0gMSAvIDMpICogMjU1XG5cdFx0XHQpLFxuXHRcdFx0Zm9ybWF0OiAncmdiJ1xuXHRcdH07XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Y29uc29sZS5lcnJvcihgaHNsVG9SR0IgZXJyb3I6ICR7ZXJyb3J9YCk7XG5cdFx0cmV0dXJuIHsgcmVkOiAwLCBncmVlbjogMCwgYmx1ZTogMCwgZm9ybWF0OiAncmdiJyB9O1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoc3ZUb1JHQihoc3Y6IHR5cGVzLkhTVik6IHR5cGVzLlJHQiB7XG5cdHRyeSB7XG5cdFx0Y29uc3QgcyA9IGhzdi5zYXR1cmF0aW9uIC8gMTAwO1xuXHRcdGNvbnN0IHYgPSBoc3YudmFsdWUgLyAxMDA7XG5cblx0XHRjb25zdCBpID0gTWF0aC5mbG9vcihoc3YuaHVlIC8gNjApICUgNjtcblx0XHRjb25zdCBmID0gaHN2Lmh1ZSAvIDYwIC0gaTtcblxuXHRcdGNvbnN0IHAgPSB2ICogKDEgLSBzKTtcblx0XHRjb25zdCBxID0gdiAqICgxIC0gZiAqIHMpO1xuXHRcdGNvbnN0IHQgPSB2ICogKDEgLSAoMSAtIGYpICogcyk7XG5cblx0XHRsZXQgcmdiOiB0eXBlcy5SR0IgPSB7IHJlZDogMCwgZ3JlZW46IDAsIGJsdWU6IDAsIGZvcm1hdDogJ3JnYicgfTtcblxuXHRcdHN3aXRjaCAoaSkge1xuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRyZ2IgPSB7IHJlZDogdiwgZ3JlZW46IHQsIGJsdWU6IHAsIGZvcm1hdDogJ3JnYicgfTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDE6XG5cdFx0XHRcdHJnYiA9IHsgcmVkOiBxLCBncmVlbjogdiwgYmx1ZTogcCwgZm9ybWF0OiAncmdiJyB9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMjpcblx0XHRcdFx0cmdiID0geyByZWQ6IHAsIGdyZWVuOiB2LCBibHVlOiB0LCBmb3JtYXQ6ICdyZ2InIH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHRyZ2IgPSB7IHJlZDogcCwgZ3JlZW46IHEsIGJsdWU6IHYsIGZvcm1hdDogJ3JnYicgfTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDQ6XG5cdFx0XHRcdHJnYiA9IHsgcmVkOiB0LCBncmVlbjogcCwgYmx1ZTogdiwgZm9ybWF0OiAncmdiJyB9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgNTpcblx0XHRcdFx0cmdiID0geyByZWQ6IHYsIGdyZWVuOiBwLCBibHVlOiBxLCBmb3JtYXQ6ICdyZ2InIH07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXHRcdHJldHVybiBjb252ZXJzaW9uSGVscGVycy5jbGFtcFJHQihyZ2IpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGNvbnNvbGUuZXJyb3IoYGhzdlRvUkdCIGVycm9yOiAke2Vycm9yfWApO1xuXHRcdHJldHVybiB7IHJlZDogMCwgZ3JlZW46IDAsIGJsdWU6IDAsIGZvcm1hdDogJ3JnYicgfTtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY215a1RvUkdCKGNteWs6IHR5cGVzLkNNWUspOiB0eXBlcy5SR0Ige1xuXHR0cnkge1xuXHRcdGNvbnN0IHIgPSAyNTUgKiAoMSAtIGNteWsuY3lhbiAvIDEwMCkgKiAoMSAtIGNteWsua2V5IC8gMTAwKTtcblx0XHRjb25zdCBnID0gMjU1ICogKDEgLSBjbXlrLm1hZ2VudGEgLyAxMDApICogKDEgLSBjbXlrLmtleSAvIDEwMCk7XG5cdFx0Y29uc3QgYiA9IDI1NSAqICgxIC0gY215ay55ZWxsb3cgLyAxMDApICogKDEgLSBjbXlrLmtleSAvIDEwMCk7XG5cblx0XHRjb25zdCByZ2I6IHR5cGVzLlJHQiA9IHsgcmVkOiByLCBncmVlbjogZywgYmx1ZTogYiwgZm9ybWF0OiAncmdiJyB9O1xuXG5cdFx0cmV0dXJuIGNvbnZlcnNpb25IZWxwZXJzLmNsYW1wUkdCKHJnYik7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Y29uc29sZS5lcnJvcihgY215a1RvUkdCIGVycm9yOiAke2Vycm9yfWApO1xuXHRcdHJldHVybiB7IHJlZDogMCwgZ3JlZW46IDAsIGJsdWU6IDAsIGZvcm1hdDogJ3JnYicgfTtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbGFiVG9SR0IobGFiOiB0eXBlcy5MQUIpOiB0eXBlcy5SR0Ige1xuXHRjb25zdCB4eXogPSBsYWJUb1hZWihsYWIpO1xuXHRyZXR1cm4geHl6VG9SR0IoeHl6KTtcbn1cbiJdfQ==