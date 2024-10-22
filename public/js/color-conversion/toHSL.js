import { convert } from './conversion-index.js';
import { conversionHelpers } from '../helpers/conversion.js';
const defaultHSL = {
    hue: 0,
    saturation: 0,
    lightness: 0,
    format: 'hsl'
};
export function hexToHSL(hex) {
    try {
        const rgb = convert.hexToRGB(hex);
        return rgbToHSL(rgb);
    }
    catch (error) {
        console.error(`hexToHSL() error: ${error}`);
        return defaultHSL;
    }
}
export function rgbToHSL(rgb) {
    try {
        rgb.red /= 255;
        rgb.green /= 255;
        rgb.blue /= 255;
        const max = Math.max(rgb.red, rgb.green, rgb.blue);
        const min = Math.min(rgb.red, rgb.green, rgb.blue);
        let hue = 0, saturation = 0, lightness = (max + min) / 2;
        if (max !== min) {
            const delta = max - min;
            saturation =
                lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
            switch (max) {
                case rgb.red:
                    hue =
                        (rgb.green - rgb.blue) / delta +
                            (rgb.green < rgb.blue ? 6 : 0);
                    break;
                case rgb.green:
                    hue = (rgb.blue - rgb.red) / delta + 2;
                    break;
                case rgb.blue:
                    hue = (rgb.red - rgb.green) / delta + 4;
                    break;
            }
            hue *= 60;
        }
        return {
            hue: Math.round(hue),
            saturation: Math.round(saturation * 100),
            lightness: Math.round(lightness * 100),
            format: 'hsl'
        };
    }
    catch (error) {
        console.error(`rgbToHSL() error: ${error}`);
        return defaultHSL;
    }
}
export function hsvToHSL(hsv) {
    try {
        const newSaturation = hsv.value * (1 - hsv.saturation / 100) === 0 || hsv.value === 0
            ? 0
            : (hsv.value - hsv.value * (1 - hsv.saturation / 100)) /
                Math.min(hsv.value, 100 - hsv.value);
        const lightness = hsv.value * (1 - hsv.saturation / 200);
        return {
            hue: Math.round(hsv.hue),
            saturation: Math.round(newSaturation * 100),
            lightness: Math.round(lightness),
            format: 'hsl'
        };
    }
    catch (error) {
        console.error(`hsvToHSL() error: ${error}`);
        return defaultHSL;
    }
}
export function cmykToHSL(cmyk) {
    try {
        const rgb = convert.cmykToRGB(cmyk);
        return rgbToHSL(rgb);
    }
    catch (error) {
        console.error(`cmykToHSL() error: ${error}`);
        return defaultHSL;
    }
}
export function labToHSL(lab) {
    try {
        const rgb = convert.labToRGB(lab);
        return rgbToHSL(rgb);
    }
    catch (error) {
        console.error(`labToHSL() error: ${error}`);
        return defaultHSL;
    }
}
export function xyzToHSL(xyz) {
    try {
        const hsl = conversionHelpers.xyzToHSLTryCaseHelper(xyz);
        return hsl;
    }
    catch (error) {
        console.error(`xyzToHSL() error: ${error}`);
        return defaultHSL;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9IU0wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29sb3ItY29udmVyc2lvbi90b0hTTC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDN0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFHMUQsTUFBTSxVQUFVLEdBQWM7SUFDN0IsR0FBRyxFQUFFLENBQUM7SUFDTixVQUFVLEVBQUUsQ0FBQztJQUNiLFNBQVMsRUFBRSxDQUFDO0lBQ1osTUFBTSxFQUFFLEtBQUs7Q0FDYixDQUFDO0FBRUYsTUFBTSxVQUFVLFFBQVEsQ0FBQyxHQUFjO0lBQ3RDLElBQUksQ0FBQztRQUNKLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUM1QyxPQUFPLFVBQVUsQ0FBQztJQUNuQixDQUFDO0FBQ0YsQ0FBQztBQUVELE1BQU0sVUFBVSxRQUFRLENBQUMsR0FBYztJQUN0QyxJQUFJLENBQUM7UUFDSixHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQztRQUNmLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDO1FBQ2pCLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDO1FBRWhCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxH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O0lBQ1osQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUM1QyxPQUFPLFVBQVUsQ0FBQztJQUNuQixDQUFDO0FBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbnZlcnQgfSBmcm9tICcuL2NvbnZlcnNpb24taW5kZXgnO1xuaW1wb3J0IHsgY29udmVyc2lvbkhlbHBlcnMgfSBmcm9tICcuLi9oZWxwZXJzL2NvbnZlcnNpb24nO1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi4vaW5kZXgnO1xuXG5jb25zdCBkZWZhdWx0SFNMOiB0eXBlcy5IU0wgPSB7XG5cdGh1ZTogMCxcblx0c2F0dXJhdGlvbjogMCxcblx0bGlnaHRuZXNzOiAwLFxuXHRmb3JtYXQ6ICdoc2wnXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gaGV4VG9IU0woaGV4OiB0eXBlcy5IZXgpOiB0eXBlcy5IU0wge1xuXHR0cnkge1xuXHRcdGNvbnN0IHJnYiA9IGNvbnZlcnQuaGV4VG9SR0IoaGV4KTtcblx0XHRyZXR1cm4gcmdiVG9IU0wocmdiKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRjb25zb2xlLmVycm9yKGBoZXhUb0hTTCgpIGVycm9yOiAke2Vycm9yfWApO1xuXHRcdHJldHVybiBkZWZhdWx0SFNMO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZ2JUb0hTTChyZ2I6IHR5cGVzLlJHQik6IHR5cGVzLkhTTCB7XG5cdHRyeSB7XG5cdFx0cmdiLnJlZCAvPSAyNTU7XG5cdFx0cmdiLmdyZWVuIC89IDI1NTtcblx0XHRyZ2IuYmx1ZSAvPSAyNTU7XG5cblx0XHRjb25zdCBtYXggPSBNYXRoLm1heChyZ2IucmVkLCByZ2IuZ3JlZW4sIHJnYi5ibHVlKTtcblx0XHRjb25zdCBtaW4gPSBNYXRoLm1pbihyZ2IucmVkLCByZ2IuZ3JlZW4sIHJnYi5ibHVlKTtcblxuXHRcdGxldCBodWUgPSAwLFxuXHRcdFx0c2F0dXJhdGlvbiA9IDAsXG5cdFx0XHRsaWdodG5lc3MgPSAobWF4ICsgbWluKSAvIDI7XG5cblx0XHRpZiAobWF4ICE9PSBtaW4pIHtcblx0XHRcdGNvbnN0IGRlbHRhID0gbWF4IC0gbWluO1xuXG5cdFx0XHRzYXR1cmF0aW9uID1cblx0XHRcdFx0bGlnaHRuZXNzID4gMC41ID8gZGVsdGEgLyAoMiAtIG1heCAtIG1pbikgOiBkZWx0YSAvIChtYXggKyBtaW4pO1xuXG5cdFx0XHRzd2l0Y2ggKG1heCkge1xuXHRcdFx0XHRjYXNlIHJnYi5yZWQ6XG5cdFx0XHRcdFx0aHVlID1cblx0XHRcdFx0XHRcdChyZ2IuZ3JlZW4gLSByZ2IuYmx1ZSkgLyBkZWx0YSArXG5cdFx0XHRcdFx0XHQocmdiLmdyZWVuIDwgcmdiLmJsdWUgPyA2IDogMCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgcmdiLmdyZWVuOlxuXHRcdFx0XHRcdGh1ZSA9IChyZ2IuYmx1ZSAtIHJnYi5yZWQpIC8gZGVsdGEgKyAyO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIHJnYi5ibHVlOlxuXHRcdFx0XHRcdGh1ZSA9IChyZ2IucmVkIC0gcmdiLmdyZWVuKSAvIGRlbHRhICsgNDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGh1ZSAqPSA2MDtcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0aHVlOiBNYXRoLnJvdW5kKGh1ZSksXG5cdFx0XHRzYXR1cmF0aW9uOiBNYXRoLnJvdW5kKHNhdHVyYXRpb24gKiAxMDApLFxuXHRcdFx0bGlnaHRuZXNzOiBNYXRoLnJvdW5kKGxpZ2h0bmVzcyAqIDEwMCksXG5cdFx0XHRmb3JtYXQ6ICdoc2wnXG5cdFx0fTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRjb25zb2xlLmVycm9yKGByZ2JUb0hTTCgpIGVycm9yOiAke2Vycm9yfWApO1xuXHRcdHJldHVybiBkZWZhdWx0SFNMO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoc3ZUb0hTTChoc3Y6IHR5cGVzLkhTVik6IHR5cGVzLkhTTCB7XG5cdHRyeSB7XG5cdFx0Y29uc3QgbmV3U2F0dXJhdGlvbiA9XG5cdFx0XHRoc3YudmFsdWUgKiAoMSAtIGhzdi5zYXR1cmF0aW9uIC8gMTAwKSA9PT0gMCB8fCBoc3YudmFsdWUgPT09IDBcblx0XHRcdFx0PyAwXG5cdFx0XHRcdDogKGhzdi52YWx1ZSAtIGhzdi52YWx1ZSAqICgxIC0gaHN2LnNhdHVyYXRpb24gLyAxMDApKSAvXG5cdFx0XHRcdFx0TWF0aC5taW4oaHN2LnZhbHVlLCAxMDAgLSBoc3YudmFsdWUpO1xuXG5cdFx0Y29uc3QgbGlnaHRuZXNzID0gaHN2LnZhbHVlICogKDEgLSBoc3Yuc2F0dXJhdGlvbiAvIDIwMCk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0aHVlOiBNYXRoLnJvdW5kKGhzdi5odWUpLFxuXHRcdFx0c2F0dXJhdGlvbjogTWF0aC5yb3VuZChuZXdTYXR1cmF0aW9uICogMTAwKSxcblx0XHRcdGxpZ2h0bmVzczogTWF0aC5yb3VuZChsaWdodG5lc3MpLFxuXHRcdFx0Zm9ybWF0OiAnaHNsJ1xuXHRcdH07XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Y29uc29sZS5lcnJvcihgaHN2VG9IU0woKSBlcnJvcjogJHtlcnJvcn1gKTtcblx0XHRyZXR1cm4gZGVmYXVsdEhTTDtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY215a1RvSFNMKGNteWs6IHR5cGVzLkNNWUspOiB0eXBlcy5IU0wge1xuXHR0cnkge1xuXHRcdGNvbnN0IHJnYiA9IGNvbnZlcnQuY215a1RvUkdCKGNteWspO1xuXHRcdHJldHVybiByZ2JUb0hTTChyZ2IpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGNvbnNvbGUuZXJyb3IoYGNteWtUb0hTTCgpIGVycm9yOiAke2Vycm9yfWApO1xuXHRcdHJldHVybiBkZWZhdWx0SFNMO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsYWJUb0hTTChsYWI6IHR5cGVzLkxBQik6IHR5cGVzLkhTTCB7XG5cdHRyeSB7XG5cdFx0Y29uc3QgcmdiID0gY29udmVydC5sYWJUb1JHQihsYWIpO1xuXHRcdHJldHVybiByZ2JUb0hTTChyZ2IpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGNvbnNvbGUuZXJyb3IoYGxhYlRvSFNMKCkgZXJyb3I6ICR7ZXJyb3J9YCk7XG5cdFx0cmV0dXJuIGRlZmF1bHRIU0w7XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHh5elRvSFNMKHh5ejogdHlwZXMuWFlaKTogdHlwZXMuSFNMIHtcblx0dHJ5IHtcblx0XHRjb25zdCBoc2wgPSBjb252ZXJzaW9uSGVscGVycy54eXpUb0hTTFRyeUNhc2VIZWxwZXIoeHl6KTtcblx0XHRyZXR1cm4gaHNsO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGNvbnNvbGUuZXJyb3IoYHh5elRvSFNMKCkgZXJyb3I6ICR7ZXJyb3J9YCk7XG5cdFx0cmV0dXJuIGRlZmF1bHRIU0w7XG5cdH1cbn1cbiJdfQ==