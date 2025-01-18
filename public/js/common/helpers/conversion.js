// File: src/common/helpers/conversion.js
import { core } from '../core/index.js';
import { data } from '../../data/index.js';
import { log } from '../../classes/logger/index.js';
const logMode = data.mode.logging;
export function applyGammaCorrection(value) {
    try {
        return value > 0.0031308
            ? 1.055 * Math.pow(value, 1 / 2.4) - 0.055
            : 12.92 * value;
    }
    catch (error) {
        if (logMode.errors)
            log.error(`Error applying gamma correction: ${error}`);
        return value;
    }
}
export function clampRGB(rgb) {
    const defaultRGBUnbranded = core.base.clone(data.defaults.colors.rgb);
    const defaultRGBBranded = core.brandColor.asRGB(defaultRGBUnbranded);
    if (!core.validate.colorValues(rgb)) {
        if (logMode.errors)
            log.error(`Invalid RGB value ${JSON.stringify(rgb)}`);
        return defaultRGBBranded;
    }
    try {
        return {
            value: {
                red: core.brand.asByteRange(Math.round(Math.min(Math.max(0, rgb.value.red), 1) * 255)),
                green: core.brand.asByteRange(Math.round(Math.min(Math.max(0, rgb.value.green), 1) * 255)),
                blue: core.brand.asByteRange(Math.round(Math.min(Math.max(0, rgb.value.blue), 1) * 255)),
                alpha: core.brand.asAlphaRange(parseFloat(Math.min(Math.max(0, rgb.value.alpha), 1).toFixed(2)))
            },
            format: 'rgb'
        };
    }
    catch (error) {
        if (logMode.errors)
            log.error(`Error clamping RGB values: ${error}`);
        return rgb;
    }
}
export function hueToRGB(p, q, t) {
    try {
        const clonedP = core.base.clone(p);
        const clonedQ = core.base.clone(q);
        let clonedT = core.base.clone(t);
        if (clonedT < 0)
            clonedT += 1;
        if (clonedT > 1)
            clonedT -= 1;
        if (clonedT < 1 / 6)
            return clonedP + (clonedQ - clonedP) * 6 * clonedT;
        if (clonedT < 1 / 2)
            return clonedQ;
        if (clonedT < 2 / 3)
            return clonedP + (clonedQ - clonedP) * (2 / 3 - clonedT) * 6;
        return clonedP;
    }
    catch (error) {
        if (logMode.errors)
            log.error(`Error converting hue to RGB: ${error}`);
        return 0;
    }
}
export function hslAddFormat(value) {
    const defaultHSLUnbranded = core.base.clone(data.defaults.colors.hsl);
    const defaultHSLBranded = core.brandColor.asHSL(defaultHSLUnbranded);
    try {
        if (!core.validate.colorValues({ value: value, format: 'hsl' })) {
            if (logMode.errors)
                log.error(`Invalid HSL value ${JSON.stringify(value)}`);
            return defaultHSLBranded;
        }
        return { value: value, format: 'hsl' };
    }
    catch (error) {
        if (logMode.errors)
            log.error(`Error adding HSL format: ${error}`);
        return defaultHSLBranded;
    }
}
export const conversion = {
    applyGammaCorrection,
    clampRGB,
    hslAddFormat,
    hueToRGB
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21tb24vaGVscGVycy9jb252ZXJzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHlDQUF5QztBQVF6QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDeEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUVwRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUVsQyxNQUFNLFVBQVUsb0JBQW9CLENBQUMsS0FBYTtJQUNqRCxJQUFJLENBQUM7UUFDSixPQUFPLEtBQUssR0FBRyxTQUFTO1lBQ3ZCLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEtBQUs7WUFDMUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDbEIsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDaEIsSUFBSSxPQUFPLENBQUMsTUFBTTtZQUNqQixHQUFHLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRXhELE9BQU8sS0FBSyxDQUFDO0lBQ2QsQ0FBQztBQUNGLENBQUM7QUFFRCxNQUFNLFVBQVUsUUFBUSxDQUFDLEdBQVE7SUFDaEMsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0RSxNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFFckUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDckMsSUFBSSxPQUFPLENBQUMsTUFBTTtZQUNqQixHQUFHLENBQUMsS0FBSyxDQUFDLHFCQUFxQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV2RCxPQUFPLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLENBQUM7UUFDSixPQUFPO1lBQ04sS0FBSyxFQUFFO2dCQUNOLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQ3pEO2dCQUNELEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQzNEO2dCQUNELElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQzFEO2dCQUNELEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FDN0IsVUFBVSxDQUNULElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFL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QkFBb0I7SUFDcEIsUUFBUTtJQUNSLFlBQVk7SUFDWixRQUFRO0NBQ0MsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEZpbGU6IHNyYy9jb21tb24vaGVscGVycy9jb252ZXJzaW9uLmpzXG5cbmltcG9ydCB7XG5cdENvbW1vbkhlbHBlcnNDb252ZXJzaW9uLFxuXHRIU0wsXG5cdEhTTFZhbHVlLFxuXHRSR0Jcbn0gZnJvbSAnLi4vLi4vaW5kZXgvaW5kZXguanMnO1xuaW1wb3J0IHsgY29yZSB9IGZyb20gJy4uL2NvcmUvaW5kZXguanMnO1xuaW1wb3J0IHsgZGF0YSB9IGZyb20gJy4uLy4uL2RhdGEvaW5kZXguanMnO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSAnLi4vLi4vY2xhc3Nlcy9sb2dnZXIvaW5kZXguanMnO1xuXG5jb25zdCBsb2dNb2RlID0gZGF0YS5tb2RlLmxvZ2dpbmc7XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseUdhbW1hQ29ycmVjdGlvbih2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gdmFsdWUgPiAwLjAwMzEzMDhcblx0XHRcdD8gMS4wNTUgKiBNYXRoLnBvdyh2YWx1ZSwgMSAvIDIuNCkgLSAwLjA1NVxuXHRcdFx0OiAxMi45MiAqIHZhbHVlO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGlmIChsb2dNb2RlLmVycm9ycylcblx0XHRcdGxvZy5lcnJvcihgRXJyb3IgYXBwbHlpbmcgZ2FtbWEgY29ycmVjdGlvbjogJHtlcnJvcn1gKTtcblxuXHRcdHJldHVybiB2YWx1ZTtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xhbXBSR0IocmdiOiBSR0IpOiBSR0Ige1xuXHRjb25zdCBkZWZhdWx0UkdCVW5icmFuZGVkID0gY29yZS5iYXNlLmNsb25lKGRhdGEuZGVmYXVsdHMuY29sb3JzLnJnYik7XG5cdGNvbnN0IGRlZmF1bHRSR0JCcmFuZGVkID0gY29yZS5icmFuZENvbG9yLmFzUkdCKGRlZmF1bHRSR0JVbmJyYW5kZWQpO1xuXG5cdGlmICghY29yZS52YWxpZGF0ZS5jb2xvclZhbHVlcyhyZ2IpKSB7XG5cdFx0aWYgKGxvZ01vZGUuZXJyb3JzKVxuXHRcdFx0bG9nLmVycm9yKGBJbnZhbGlkIFJHQiB2YWx1ZSAke0pTT04uc3RyaW5naWZ5KHJnYil9YCk7XG5cblx0XHRyZXR1cm4gZGVmYXVsdFJHQkJyYW5kZWQ7XG5cdH1cblxuXHR0cnkge1xuXHRcdHJldHVybiB7XG5cdFx0XHR2YWx1ZToge1xuXHRcdFx0XHRyZWQ6IGNvcmUuYnJhbmQuYXNCeXRlUmFuZ2UoXG5cdFx0XHRcdFx0TWF0aC5yb3VuZChNYXRoLm1pbihNYXRoLm1heCgwLCByZ2IudmFsdWUucmVkKSwgMSkgKiAyNTUpXG5cdFx0XHRcdCksXG5cdFx0XHRcdGdyZWVuOiBjb3JlLmJyYW5kLmFzQnl0ZVJhbmdlKFxuXHRcdFx0XHRcdE1hdGgucm91bmQoTWF0aC5taW4oTWF0aC5tYXgoMCwgcmdiLnZhbHVlLmdyZWVuKSwgMSkgKiAyNTUpXG5cdFx0XHRcdCksXG5cdFx0XHRcdGJsdWU6IGNvcmUuYnJhbmQuYXNCeXRlUmFuZ2UoXG5cdFx0XHRcdFx0TWF0aC5yb3VuZChNYXRoLm1pbihNYXRoLm1heCgwLCByZ2IudmFsdWUuYmx1ZSksIDEpICogMjU1KVxuXHRcdFx0XHQpLFxuXHRcdFx0XHRhbHBoYTogY29yZS5icmFuZC5hc0FscGhhUmFuZ2UoXG5cdFx0XHRcdFx0cGFyc2VGbG9hdChcblx0XHRcdFx0XHRcdE1hdGgubWluKE1hdGgubWF4KDAsIHJnYi52YWx1ZS5hbHBoYSksIDEpLnRvRml4ZWQoMilcblx0XHRcdFx0XHQpXG5cdFx0XHRcdClcblx0XHRcdH0sXG5cdFx0XHRmb3JtYXQ6ICdyZ2InXG5cdFx0fTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRpZiAobG9nTW9kZS5lcnJvcnMpIGxvZy5lcnJvcihgRXJyb3IgY2xhbXBpbmcgUkdCIHZhbHVlczogJHtlcnJvcn1gKTtcblxuXHRcdHJldHVybiByZ2I7XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGh1ZVRvUkdCKHA6IG51bWJlciwgcTogbnVtYmVyLCB0OiBudW1iZXIpOiBudW1iZXIge1xuXHR0cnkge1xuXHRcdGNvbnN0IGNsb25lZFAgPSBjb3JlLmJhc2UuY2xvbmUocCk7XG5cdFx0Y29uc3QgY2xvbmVkUSA9IGNvcmUuYmFzZS5jbG9uZShxKTtcblxuXHRcdGxldCBjbG9uZWRUID0gY29yZS5iYXNlLmNsb25lKHQpO1xuXG5cdFx0aWYgKGNsb25lZFQgPCAwKSBjbG9uZWRUICs9IDE7XG5cdFx0aWYgKGNsb25lZFQgPiAxKSBjbG9uZWRUIC09IDE7XG5cdFx0aWYgKGNsb25lZFQgPCAxIC8gNikgcmV0dXJuIGNsb25lZFAgKyAoY2xvbmVkUSAtIGNsb25lZFApICogNiAqIGNsb25lZFQ7XG5cdFx0aWYgKGNsb25lZFQgPCAxIC8gMikgcmV0dXJuIGNsb25lZFE7XG5cdFx0aWYgKGNsb25lZFQgPCAyIC8gMylcblx0XHRcdHJldHVybiBjbG9uZWRQICsgKGNsb25lZFEgLSBjbG9uZWRQKSAqICgyIC8gMyAtIGNsb25lZFQpICogNjtcblxuXHRcdHJldHVybiBjbG9uZWRQO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGlmIChsb2dNb2RlLmVycm9ycykgbG9nLmVycm9yKGBFcnJvciBjb252ZXJ0aW5nIGh1ZSB0byBSR0I6ICR7ZXJyb3J9YCk7XG5cblx0XHRyZXR1cm4gMDtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaHNsQWRkRm9ybWF0KHZhbHVlOiBIU0xWYWx1ZSk6IEhTTCB7XG5cdGNvbnN0IGRlZmF1bHRIU0xVbmJyYW5kZWQgPSBjb3JlLmJhc2UuY2xvbmUoZGF0YS5kZWZhdWx0cy5jb2xvcnMuaHNsKTtcblx0Y29uc3QgZGVmYXVsdEhTTEJyYW5kZWQgPSBjb3JlLmJyYW5kQ29sb3IuYXNIU0woZGVmYXVsdEhTTFVuYnJhbmRlZCk7XG5cblx0dHJ5IHtcblx0XHRpZiAoIWNvcmUudmFsaWRhdGUuY29sb3JWYWx1ZXMoeyB2YWx1ZTogdmFsdWUsIGZvcm1hdDogJ2hzbCcgfSkpIHtcblx0XHRcdGlmIChsb2dNb2RlLmVycm9ycylcblx0XHRcdFx0bG9nLmVycm9yKGBJbnZhbGlkIEhTTCB2YWx1ZSAke0pTT04uc3RyaW5naWZ5KHZhbHVlKX1gKTtcblxuXHRcdFx0cmV0dXJuIGRlZmF1bHRIU0xCcmFuZGVkO1xuXHRcdH1cblxuXHRcdHJldHVybiB7IHZhbHVlOiB2YWx1ZSwgZm9ybWF0OiAnaHNsJyB9IGFzIEhTTDtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRpZiAobG9nTW9kZS5lcnJvcnMpIGxvZy5lcnJvcihgRXJyb3IgYWRkaW5nIEhTTCBmb3JtYXQ6ICR7ZXJyb3J9YCk7XG5cblx0XHRyZXR1cm4gZGVmYXVsdEhTTEJyYW5kZWQ7XG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IGNvbnZlcnNpb246IENvbW1vbkhlbHBlcnNDb252ZXJzaW9uID0ge1xuXHRhcHBseUdhbW1hQ29ycmVjdGlvbixcblx0Y2xhbXBSR0IsXG5cdGhzbEFkZEZvcm1hdCxcblx0aHVlVG9SR0Jcbn0gYXMgY29uc3Q7XG4iXX0=