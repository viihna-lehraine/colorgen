import { convert } from '../../color-conversion/conversion-index.js';
export function isHexTooGray(hex) {
    const rgb = convert.hexToRGB(hex);
    return isRGBTooGray(rgb);
}
export function isHexTooDark(hex) {
    const rgb = convert.hexToRGB(hex);
    return isRGBTooDark(rgb);
}
export function isHexTooBright(hex) {
    const rgb = convert.hexToRGB(hex);
    return isRGBTooBright(rgb);
}
export function isHSLTooGray(hsl, hslGrayThreshold = 20) {
    return hsl.value.saturation < hslGrayThreshold;
}
export function isHSLTooDark(hsl, hslDarknessThreshold = 25) {
    return hsl.value.lightness < hslDarknessThreshold;
}
export function isHSLTooBright(hsl, hslBrightnessThreshold = 75) {
    return hsl.value.lightness > hslBrightnessThreshold;
}
export function isRGBTooGray(rgb, rgbGrayTreshold = 10) {
    return (Math.abs(rgb.value.red - rgb.value.green) < rgbGrayTreshold &&
        Math.abs(rgb.value.green - rgb.value.blue) < rgbGrayTreshold &&
        Math.abs(rgb.value.red - rgb.value.blue) < rgbGrayTreshold);
}
export function isRGBTooDark(rgb, rgbMinBrightness = 50) {
    return ((rgb.value.red + rgb.value.green + rgb.value.blue) / 3 <
        rgbMinBrightness);
}
export function isRGBTooBright(rgb, rgbMaxBrightness = 200) {
    return ((rgb.value.red + rgb.value.green + rgb.value.blue) / 3 >
        rgbMaxBrightness);
}
export function isHSVTooGray(hsv, hsvGrayThreshold = 10) {
    return hsv.value.saturation < hsvGrayThreshold;
}
export function isHSVTooDark(hsv, hsvDarknessThreshold = 10) {
    return hsv.value.value < hsvDarknessThreshold;
}
export function isHSVTooBright(hsv, hsvBrightnessValueThreshold = 90, hsvBrightnessSaturationThreshold = 10) {
    return (hsv.value.value > hsvBrightnessValueThreshold &&
        hsv.value.saturation < hsvBrightnessSaturationThreshold);
}
export function isCMYKTooGray(cmyk, cmykGrayThreshold = 5) {
    return (Math.abs(cmyk.value.cyan - cmyk.value.magenta) < cmykGrayThreshold &&
        Math.abs(cmyk.value.magenta - cmyk.value.yellow) < cmykGrayThreshold);
}
export function isCMYKTooDark(cmyk, cmykDarknesshreshold = 90) {
    return cmyk.value.key > cmykDarknesshreshold;
}
export function isCMYKTooBright(cmyk, cmykBrightnessThreshold = 10) {
    return (cmyk.value.cyan < cmykBrightnessThreshold &&
        cmyk.value.magenta < cmykBrightnessThreshold &&
        cmyk.value.yellow < cmykBrightnessThreshold);
}
export function isLABTooGray(lab, labGrayThreshold = 10) {
    return (Math.abs(lab.value.a) < labGrayThreshold &&
        Math.abs(lab.value.b) < labGrayThreshold);
}
export function isLABTooDark(lab, labDarknessThreshold = 10) {
    return lab.value.l < labDarknessThreshold;
}
export function isLABTooBright(lab, labBrightnessThreshold = 90) {
    return lab.value.l > labBrightnessThreshold;
}
export function isColorInBounds(cmyk, hex, hsl, hsv, lab, rgb) {
    return (isCMYKTooGray(cmyk) ||
        isCMYKTooDark(cmyk) ||
        isCMYKTooBright(cmyk) ||
        isHexTooGray(hex) ||
        isHexTooDark(hex) ||
        isHexTooBright(hex) ||
        isHSLTooGray(hsl) ||
        isHSLTooDark(hsl) ||
        isHSLTooBright(hsl) ||
        isHSVTooGray(hsv) ||
        isHSVTooDark(hsv) ||
        isHSVTooBright(hsv) ||
        isLABTooGray(lab) ||
        isLABTooDark(lab) ||
        isLABTooBright(lab) ||
        isRGBTooGray(rgb) ||
        isRGBTooDark(rgb) ||
        isRGBTooBright(rgb));
}
export const colorLimits = {
    isCMYKTooBright,
    isCMYKTooDark,
    isCMYKTooGray,
    isHSLTooBright,
    isHSLTooDark,
    isHSLTooGray,
    isHSVTooBright,
    isHSVTooDark,
    isHSVTooGray,
    isLABTooBright,
    isLABTooDark,
    isLABTooGray,
    isRGBTooBright,
    isRGBTooDark,
    isRGBTooGray
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGltaXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RvbS91c2VyLXBhcmFtcy9saW1pdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBRWxFLE1BQU0sVUFBVSxZQUFZLENBQUMsR0FBYztJQUMxQyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLE9BQU8sWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFFRCxNQUFNLFVBQVUsWUFBWSxDQUFDLEdBQWM7SUFDMUMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQyxPQUFPLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBRUQsTUFBTSxVQUFVLGNBQWMsQ0FBQyxHQUFjO0lBQzVDLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEMsT0FBTyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQUVELE1BQU0sVUFBVSxZQUFZLENBQzNCLEdBQWMsRUFDZCxtQkFBMkIsRUFBRTtJQUU3QixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLGdCQUFnQixDQUFDO0FBQ2hELENBQUM7QUFFRCxNQUFNLFVBQVUsWUFBWSxDQUMzQixHQUFjLEVBQ2QsdUJBQStCLEVBQUU7SUFFakMsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQztBQUNuRCxDQUFDO0FBRUQsTUFBTSxVQUFVLGNBQWMsQ0FDN0IsR0FBYyxFQUNkLHlCQUFpQyxFQUFFO0lBRW5DLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsc0JBQXNCLENBQUM7QUFDckQs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RyxDQUFDO1FBQ25CLFlBQVksQ0FBQyxHQUFHLENBQUM7UUFDakIsWUFBWSxDQUFDLEdBQUcsQ0FBQztRQUNqQixjQUFjLENBQUMsR0FBRyxDQUFDLENBQ25CLENBQUM7QUFDSCxDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHO0lBQzFCLGVBQWU7SUFDZixhQUFhO0lBQ2IsYUFBYTtJQUNiLGNBQWM7SUFDZCxZQUFZO0lBQ1osWUFBWTtJQUNaLGNBQWM7SUFDZCxZQUFZO0lBQ1osWUFBWTtJQUNaLGNBQWM7SUFDZCxZQUFZO0lBQ1osWUFBWTtJQUNaLGNBQWM7SUFDZCxZQUFZO0lBQ1osWUFBWTtDQUNaLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuLi8uLi9pbmRleCc7XG5pbXBvcnQgeyBjb252ZXJ0IH0gZnJvbSAnLi4vLi4vY29sb3ItY29udmVyc2lvbi9jb252ZXJzaW9uLWluZGV4JztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzSGV4VG9vR3JheShoZXg6IHR5cGVzLkhleCk6IGJvb2xlYW4ge1xuXHRjb25zdCByZ2IgPSBjb252ZXJ0LmhleFRvUkdCKGhleCk7XG5cdHJldHVybiBpc1JHQlRvb0dyYXkocmdiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSGV4VG9vRGFyayhoZXg6IHR5cGVzLkhleCk6IGJvb2xlYW4ge1xuXHRjb25zdCByZ2IgPSBjb252ZXJ0LmhleFRvUkdCKGhleCk7XG5cdHJldHVybiBpc1JHQlRvb0RhcmsocmdiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSGV4VG9vQnJpZ2h0KGhleDogdHlwZXMuSGV4KTogYm9vbGVhbiB7XG5cdGNvbnN0IHJnYiA9IGNvbnZlcnQuaGV4VG9SR0IoaGV4KTtcblx0cmV0dXJuIGlzUkdCVG9vQnJpZ2h0KHJnYik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0hTTFRvb0dyYXkoXG5cdGhzbDogdHlwZXMuSFNMLFxuXHRoc2xHcmF5VGhyZXNob2xkOiBudW1iZXIgPSAyMFxuKTogYm9vbGVhbiB7XG5cdHJldHVybiBoc2wudmFsdWUuc2F0dXJhdGlvbiA8IGhzbEdyYXlUaHJlc2hvbGQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0hTTFRvb0RhcmsoXG5cdGhzbDogdHlwZXMuSFNMLFxuXHRoc2xEYXJrbmVzc1RocmVzaG9sZDogbnVtYmVyID0gMjVcbik6IGJvb2xlYW4ge1xuXHRyZXR1cm4gaHNsLnZhbHVlLmxpZ2h0bmVzcyA8IGhzbERhcmtuZXNzVGhyZXNob2xkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNIU0xUb29CcmlnaHQoXG5cdGhzbDogdHlwZXMuSFNMLFxuXHRoc2xCcmlnaHRuZXNzVGhyZXNob2xkOiBudW1iZXIgPSA3NVxuKTogYm9vbGVhbiB7XG5cdHJldHVybiBoc2wudmFsdWUubGlnaHRuZXNzID4gaHNsQnJpZ2h0bmVzc1RocmVzaG9sZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUkdCVG9vR3JheShcblx0cmdiOiB0eXBlcy5SR0IsXG5cdHJnYkdyYXlUcmVzaG9sZDogbnVtYmVyID0gMTBcbik6IGJvb2xlYW4ge1xuXHRyZXR1cm4gKFxuXHRcdE1hdGguYWJzKHJnYi52YWx1ZS5yZWQgLSByZ2IudmFsdWUuZ3JlZW4pIDwgcmdiR3JheVRyZXNob2xkICYmXG5cdFx0TWF0aC5hYnMocmdiLnZhbHVlLmdyZWVuIC0gcmdiLnZhbHVlLmJsdWUpIDwgcmdiR3JheVRyZXNob2xkICYmXG5cdFx0TWF0aC5hYnMocmdiLnZhbHVlLnJlZCAtIHJnYi52YWx1ZS5ibHVlKSA8IHJnYkdyYXlUcmVzaG9sZFxuXHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNSR0JUb29EYXJrKFxuXHRyZ2I6IHR5cGVzLlJHQixcblx0cmdiTWluQnJpZ2h0bmVzczogbnVtYmVyID0gNTBcbik6IGJvb2xlYW4ge1xuXHRyZXR1cm4gKFxuXHRcdChyZ2IudmFsdWUucmVkICsgcmdiLnZhbHVlLmdyZWVuICsgcmdiLnZhbHVlLmJsdWUpIC8gMyA8XG5cdFx0cmdiTWluQnJpZ2h0bmVzc1xuXHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNSR0JUb29CcmlnaHQoXG5cdHJnYjogdHlwZXMuUkdCLFxuXHRyZ2JNYXhCcmlnaHRuZXNzOiBudW1iZXIgPSAyMDBcbik6IGJvb2xlYW4ge1xuXHRyZXR1cm4gKFxuXHRcdChyZ2IudmFsdWUucmVkICsgcmdiLnZhbHVlLmdyZWVuICsgcmdiLnZhbHVlLmJsdWUpIC8gMyA+XG5cdFx0cmdiTWF4QnJpZ2h0bmVzc1xuXHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNIU1ZUb29HcmF5KFxuXHRoc3Y6IHR5cGVzLkhTVixcblx0aHN2R3JheVRocmVzaG9sZDogbnVtYmVyID0gMTBcbik6IGJvb2xlYW4ge1xuXHRyZXR1cm4gaHN2LnZhbHVlLnNhdHVyYXRpb24gPCBoc3ZHcmF5VGhyZXNob2xkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNIU1ZUb29EYXJrKFxuXHRoc3Y6IHR5cGVzLkhTVixcblx0aHN2RGFya25lc3NUaHJlc2hvbGQ6IG51bWJlciA9IDEwXG4pOiBib29sZWFuIHtcblx0cmV0dXJuIGhzdi52YWx1ZS52YWx1ZSA8IGhzdkRhcmtuZXNzVGhyZXNob2xkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNIU1ZUb29CcmlnaHQoXG5cdGhzdjogdHlwZXMuSFNWLFxuXHRoc3ZCcmlnaHRuZXNzVmFsdWVUaHJlc2hvbGQ6IG51bWJlciA9IDkwLFxuXHRoc3ZCcmlnaHRuZXNzU2F0dXJhdGlvblRocmVzaG9sZDogbnVtYmVyID0gMTBcbik6IGJvb2xlYW4ge1xuXHRyZXR1cm4gKFxuXHRcdGhzdi52YWx1ZS52YWx1ZSA+IGhzdkJyaWdodG5lc3NWYWx1ZVRocmVzaG9sZCAmJlxuXHRcdGhzdi52YWx1ZS5zYXR1cmF0aW9uIDwgaHN2QnJpZ2h0bmVzc1NhdHVyYXRpb25UaHJlc2hvbGRcblx0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ01ZS1Rvb0dyYXkoXG5cdGNteWs6IHR5cGVzLkNNWUssXG5cdGNteWtHcmF5VGhyZXNob2xkOiBudW1iZXIgPSA1XG4pOiBib29sZWFuIHtcblx0cmV0dXJuIChcblx0XHRNYXRoLmFicyhjbXlrLnZhbHVlLmN5YW4gLSBjbXlrLnZhbHVlLm1hZ2VudGEpIDwgY215a0dyYXlUaHJlc2hvbGQgJiZcblx0XHRNYXRoLmFicyhjbXlrLnZhbHVlLm1hZ2VudGEgLSBjbXlrLnZhbHVlLnllbGxvdykgPCBjbXlrR3JheVRocmVzaG9sZFxuXHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDTVlLVG9vRGFyayhcblx0Y215azogdHlwZXMuQ01ZSyxcblx0Y215a0RhcmtuZXNzaHJlc2hvbGQ6IG51bWJlciA9IDkwXG4pOiBib29sZWFuIHtcblx0cmV0dXJuIGNteWsudmFsdWUua2V5ID4gY215a0RhcmtuZXNzaHJlc2hvbGQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NNWUtUb29CcmlnaHQoXG5cdGNteWs6IHR5cGVzLkNNWUssXG5cdGNteWtCcmlnaHRuZXNzVGhyZXNob2xkOiBudW1iZXIgPSAxMFxuKTogYm9vbGVhbiB7XG5cdHJldHVybiAoXG5cdFx0Y215ay52YWx1ZS5jeWFuIDwgY215a0JyaWdodG5lc3NUaHJlc2hvbGQgJiZcblx0XHRjbXlrLnZhbHVlLm1hZ2VudGEgPCBjbXlrQnJpZ2h0bmVzc1RocmVzaG9sZCAmJlxuXHRcdGNteWsudmFsdWUueWVsbG93IDwgY215a0JyaWdodG5lc3NUaHJlc2hvbGRcblx0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTEFCVG9vR3JheShcblx0bGFiOiB0eXBlcy5MQUIsXG5cdGxhYkdyYXlUaHJlc2hvbGQ6IG51bWJlciA9IDEwXG4pOiBib29sZWFuIHtcblx0cmV0dXJuIChcblx0XHRNYXRoLmFicyhsYWIudmFsdWUuYSkgPCBsYWJHcmF5VGhyZXNob2xkICYmXG5cdFx0TWF0aC5hYnMobGFiLnZhbHVlLmIpIDwgbGFiR3JheVRocmVzaG9sZFxuXHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNMQUJUb29EYXJrKFxuXHRsYWI6IHR5cGVzLkxBQixcblx0bGFiRGFya25lc3NUaHJlc2hvbGQ6IG51bWJlciA9IDEwXG4pOiBib29sZWFuIHtcblx0cmV0dXJuIGxhYi52YWx1ZS5sIDwgbGFiRGFya25lc3NUaHJlc2hvbGQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0xBQlRvb0JyaWdodChcblx0bGFiOiB0eXBlcy5MQUIsXG5cdGxhYkJyaWdodG5lc3NUaHJlc2hvbGQ6IG51bWJlciA9IDkwXG4pOiBib29sZWFuIHtcblx0cmV0dXJuIGxhYi52YWx1ZS5sID4gbGFiQnJpZ2h0bmVzc1RocmVzaG9sZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ29sb3JJbkJvdW5kcyhcblx0Y215azogdHlwZXMuQ01ZSyxcblx0aGV4OiB0eXBlcy5IZXgsXG5cdGhzbDogdHlwZXMuSFNMLFxuXHRoc3Y6IHR5cGVzLkhTVixcblx0bGFiOiB0eXBlcy5MQUIsXG5cdHJnYjogdHlwZXMuUkdCXG4pOiBib29sZWFuIHtcblx0cmV0dXJuIChcblx0XHRpc0NNWUtUb29HcmF5KGNteWspIHx8XG5cdFx0aXNDTVlLVG9vRGFyayhjbXlrKSB8fFxuXHRcdGlzQ01ZS1Rvb0JyaWdodChjbXlrKSB8fFxuXHRcdGlzSGV4VG9vR3JheShoZXgpIHx8XG5cdFx0aXNIZXhUb29EYXJrKGhleCkgfHxcblx0XHRpc0hleFRvb0JyaWdodChoZXgpIHx8XG5cdFx0aXNIU0xUb29HcmF5KGhzbCkgfHxcblx0XHRpc0hTTFRvb0RhcmsoaHNsKSB8fFxuXHRcdGlzSFNMVG9vQnJpZ2h0KGhzbCkgfHxcblx0XHRpc0hTVlRvb0dyYXkoaHN2KSB8fFxuXHRcdGlzSFNWVG9vRGFyayhoc3YpIHx8XG5cdFx0aXNIU1ZUb29CcmlnaHQoaHN2KSB8fFxuXHRcdGlzTEFCVG9vR3JheShsYWIpIHx8XG5cdFx0aXNMQUJUb29EYXJrKGxhYikgfHxcblx0XHRpc0xBQlRvb0JyaWdodChsYWIpIHx8XG5cdFx0aXNSR0JUb29HcmF5KHJnYikgfHxcblx0XHRpc1JHQlRvb0RhcmsocmdiKSB8fFxuXHRcdGlzUkdCVG9vQnJpZ2h0KHJnYilcblx0KTtcbn1cblxuZXhwb3J0IGNvbnN0IGNvbG9yTGltaXRzID0ge1xuXHRpc0NNWUtUb29CcmlnaHQsXG5cdGlzQ01ZS1Rvb0RhcmssXG5cdGlzQ01ZS1Rvb0dyYXksXG5cdGlzSFNMVG9vQnJpZ2h0LFxuXHRpc0hTTFRvb0RhcmssXG5cdGlzSFNMVG9vR3JheSxcblx0aXNIU1ZUb29CcmlnaHQsXG5cdGlzSFNWVG9vRGFyayxcblx0aXNIU1ZUb29HcmF5LFxuXHRpc0xBQlRvb0JyaWdodCxcblx0aXNMQUJUb29EYXJrLFxuXHRpc0xBQlRvb0dyYXksXG5cdGlzUkdCVG9vQnJpZ2h0LFxuXHRpc1JHQlRvb0RhcmssXG5cdGlzUkdCVG9vR3JheVxufTtcbiJdfQ==