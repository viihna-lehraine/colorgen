// File: src/palette/common/paletteHelpers/limits.ts
import { core } from '../../../common';
import { config } from '../../../config';
const mode = config.mode;
function isColorInBounds(hsl) {
    if (!core.validateColorValues(hsl)) {
        if (mode.logErrors)
            console.error(`isColorInBounds: Invalid HSL value ${JSON.stringify(hsl)}`);
        return false;
    }
    return isTooDark(hsl) || isTooGray(hsl) || isTooLight(hsl);
}
function isTooDark(hsl) {
    if (!core.validateColorValues(hsl)) {
        if (mode.logErrors)
            console.error(`isTooDark: Invalid HSL value ${JSON.stringify(hsl)}`);
        return false;
    }
    return core.clone(hsl).value.lightness < config.consts.thresholds.dark;
}
function isTooGray(hsl) {
    if (!core.validateColorValues(hsl)) {
        if (mode.logErrors)
            console.error(`isTooGray: Invalid HSL value ${JSON.stringify(hsl)}`);
        return false;
    }
    return core.clone(hsl).value.saturation < config.consts.thresholds.gray;
}
function isTooLight(hsl) {
    if (!core.validateColorValues(hsl)) {
        if (mode.logErrors)
            console.error(`isTooLight: Invalid HSL value ${JSON.stringify(hsl)}`);
        return false;
    }
    return core.clone(hsl).value.lightness > config.consts.thresholds.light;
}
export const limits = {
    isColorInBounds,
    isTooDark,
    isTooGray,
    isTooLight
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGltaXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3BhbGV0dGUvY29tbW9uL3BhbGV0dGVIZWxwZXJzL2xpbWl0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxvREFBb0Q7QUFHcEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBRXpCLFNBQVMsZUFBZSxDQUFDLEdBQVE7SUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQ3BDLElBQUksSUFBSSxDQUFDLFNBQVM7WUFDakIsT0FBTyxDQUFDLEtBQUssQ0FDWixzQ0FBc0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUMzRCxDQUFDO1FBRUgsT0FBTyxLQUFLLENBQUM7SUFDZCxDQUFDO0lBRUQsT0FBTyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1RCxDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUMsR0FBUTtJQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDcEMsSUFBSSxJQUFJLENBQUMsU0FBUztZQUNqQixPQUFPLENBQUMsS0FBSyxDQUNaLGdDQUFnQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQ3JELENBQUM7UUFFSCxPQUFPLEtBQUssQ0FBQztJQUNkLENBQUM7SUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7QUFDeEUsQ0FBQztBQUVELFNBQVMsU0FBUyxDQUFDLEdBQVE7SUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQ3BDLElBQUksSUFBSSxDQUFDLFNBQVM7WUFDakIsT0FBTyxDQUFDLEtBQUssQ0FDWixnQ0FBZ0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUNyRCxDQUFDO1FBRUgsT0FBTyxLQUFLLENBQUM7SUFDZCxDQUFDO0lBRUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO0FBQ3pFLENBQUM7QUFFRCxTQUFTLFVBQVUsQ0FBQyxHQUFRO0lBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUNwQyxJQUFJLElBQUksQ0FBQyxTQUFTO1lBQ2pCLE9BQU8sQ0FBQyxLQUFLLENBQ1osaUNBQWlDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FDdEQsQ0FBQztRQUVILE9BQU8sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUVELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztBQUN6RSxDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFHO0lBQ3JCLGVBQWU7SUFDZixTQUFTO0lBQ1QsU0FBUztJQUNULFVBQVU7Q0FDRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRmlsZTogc3JjL3BhbGV0dGUvY29tbW9uL3BhbGV0dGVIZWxwZXJzL2xpbWl0cy50c1xuXG5pbXBvcnQgeyBIU0wgfSBmcm9tICcuLi8uLi8uLi9pbmRleCc7XG5pbXBvcnQgeyBjb3JlIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2NvbmZpZyc7XG5cbmNvbnN0IG1vZGUgPSBjb25maWcubW9kZTtcblxuZnVuY3Rpb24gaXNDb2xvckluQm91bmRzKGhzbDogSFNMKTogYm9vbGVhbiB7XG5cdGlmICghY29yZS52YWxpZGF0ZUNvbG9yVmFsdWVzKGhzbCkpIHtcblx0XHRpZiAobW9kZS5sb2dFcnJvcnMpXG5cdFx0XHRjb25zb2xlLmVycm9yKFxuXHRcdFx0XHRgaXNDb2xvckluQm91bmRzOiBJbnZhbGlkIEhTTCB2YWx1ZSAke0pTT04uc3RyaW5naWZ5KGhzbCl9YFxuXHRcdFx0KTtcblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHJldHVybiBpc1Rvb0RhcmsoaHNsKSB8fCBpc1Rvb0dyYXkoaHNsKSB8fCBpc1Rvb0xpZ2h0KGhzbCk7XG59XG5cbmZ1bmN0aW9uIGlzVG9vRGFyayhoc2w6IEhTTCk6IGJvb2xlYW4ge1xuXHRpZiAoIWNvcmUudmFsaWRhdGVDb2xvclZhbHVlcyhoc2wpKSB7XG5cdFx0aWYgKG1vZGUubG9nRXJyb3JzKVxuXHRcdFx0Y29uc29sZS5lcnJvcihcblx0XHRcdFx0YGlzVG9vRGFyazogSW52YWxpZCBIU0wgdmFsdWUgJHtKU09OLnN0cmluZ2lmeShoc2wpfWBcblx0XHRcdCk7XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRyZXR1cm4gY29yZS5jbG9uZShoc2wpLnZhbHVlLmxpZ2h0bmVzcyA8IGNvbmZpZy5jb25zdHMudGhyZXNob2xkcy5kYXJrO1xufVxuXG5mdW5jdGlvbiBpc1Rvb0dyYXkoaHNsOiBIU0wpOiBib29sZWFuIHtcblx0aWYgKCFjb3JlLnZhbGlkYXRlQ29sb3JWYWx1ZXMoaHNsKSkge1xuXHRcdGlmIChtb2RlLmxvZ0Vycm9ycylcblx0XHRcdGNvbnNvbGUuZXJyb3IoXG5cdFx0XHRcdGBpc1Rvb0dyYXk6IEludmFsaWQgSFNMIHZhbHVlICR7SlNPTi5zdHJpbmdpZnkoaHNsKX1gXG5cdFx0XHQpO1xuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0cmV0dXJuIGNvcmUuY2xvbmUoaHNsKS52YWx1ZS5zYXR1cmF0aW9uIDwgY29uZmlnLmNvbnN0cy50aHJlc2hvbGRzLmdyYXk7XG59XG5cbmZ1bmN0aW9uIGlzVG9vTGlnaHQoaHNsOiBIU0wpOiBib29sZWFuIHtcblx0aWYgKCFjb3JlLnZhbGlkYXRlQ29sb3JWYWx1ZXMoaHNsKSkge1xuXHRcdGlmIChtb2RlLmxvZ0Vycm9ycylcblx0XHRcdGNvbnNvbGUuZXJyb3IoXG5cdFx0XHRcdGBpc1Rvb0xpZ2h0OiBJbnZhbGlkIEhTTCB2YWx1ZSAke0pTT04uc3RyaW5naWZ5KGhzbCl9YFxuXHRcdFx0KTtcblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHJldHVybiBjb3JlLmNsb25lKGhzbCkudmFsdWUubGlnaHRuZXNzID4gY29uZmlnLmNvbnN0cy50aHJlc2hvbGRzLmxpZ2h0O1xufVxuXG5leHBvcnQgY29uc3QgbGltaXRzID0ge1xuXHRpc0NvbG9ySW5Cb3VuZHMsXG5cdGlzVG9vRGFyayxcblx0aXNUb29HcmF5LFxuXHRpc1Rvb0xpZ2h0XG59IGFzIGNvbnN0O1xuIl19