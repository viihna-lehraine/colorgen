import { defaults } from '../config/defaults.js';
import { commonUtils } from './common-utils.js';
import { core } from './core-utils.js';
export function randomHSL(enableAlpha) {
    try {
        const alpha = enableAlpha ? Math.random() : 1;
        const hsl = {
            value: {
                hue: commonUtils.sanitizeRadial(Math.floor(Math.random() * 360)),
                saturation: commonUtils.sanitizePercentage(Math.floor(Math.random() * 101)),
                lightness: commonUtils.sanitizePercentage(Math.floor(Math.random() * 101)),
                alpha
            },
            format: 'hsl'
        };
        if (!commonUtils.validateColorValues(hsl)) {
            console.error(`Invalid random HSL color value ${JSON.stringify(hsl)}`);
            return core.clone(defaults.hsl);
        }
        console.log(`Generated randomHSL: ${JSON.stringify(hsl)}`);
        return hsl;
    }
    catch (error) {
        console.error(`Error generating random HSL color: ${error}`);
        return core.clone(defaults.hsl);
    }
}
export function randomSL(enableAlpha) {
    try {
        const alpha = enableAlpha ? Math.random() : 1;
        const sl = {
            value: {
                saturation: commonUtils.sanitizePercentage(Math.max(0, Math.min(100, Math.random() * 100))),
                lightness: commonUtils.sanitizePercentage(Math.max(0, Math.min(100, Math.random() * 100))),
                alpha
            },
            format: 'sl'
        };
        if (!commonUtils.validateColorValues(sl)) {
            console.error(`Invalid random SV color value ${JSON.stringify(sl)}`);
            return core.clone(defaults.sl);
        }
        console.log(`Generated randomSL: ${JSON.stringify(sl)}`);
        return sl;
    }
    catch (error) {
        console.error(`Error generating random SL color: ${error}`);
        return core.clone(defaults.sl);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZG9tLWNvbG9yLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL3JhbmRvbS1jb2xvci11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFOUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFcEMsTUFBTSxVQUFVLFNBQVMsQ0FBQyxXQUFvQjtJQUM3QyxJQUFJLENBQUM7UUFDSixNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sR0FBRyxHQUFlO1lBQ3ZCLEtBQUssRUFBRTtnQkFDTixHQUFHLEVBQUUsV0FBVyxDQUFDLGNBQWMsQ0FDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQy9CO2dCQUNELFVBQVUsRUFBRSxXQUFXLENBQUMsa0JBQWtCLENBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUMvQjtnQkFDRCxTQUFTLEVBQUUsV0FBVyxDQUFDLGtCQUFrQixDQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FDL0I7Z0JBQ0QsS0FBSzthQUNMO1lBQ0QsTUFBTSxFQUFFLEtBQUs7U0FDYixDQUFDO1FBRUYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxLQUFLLENBQ1osa0NBQWtDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FDdkQsQ0FBQztZQUVGLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTNELE9BQU8sR0FBRyxDQUFDO0lBQ1osQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxzQ0FBc0MsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUU3RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7QUFDRixDQUFDO0FBRUQsTUFBTSxVQUFVLFFBQVEsQ0FBQyxXQUFvQjtJQUM1QyxJQUFJLENBQUM7UUFDSixNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sRUFBRSxHQUFjO1lBQ3JCLEtBQUssRUFBRTtnQkFDTixVQUFVLEVBQUUsV0FBVyxDQUFDLGtCQUFrQixDQUN6QyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FDL0M7Z0JBQ0QsU0FBUyxFQUFFLFdBQVcsQ0FBQyxrQkFBa0IsQ0FDeEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQy9DO2dCQUNELEtBQUs7YUFDTDtZQUNELE1BQU0sRUFBRSxJQUFJO1NBQ1osQ0FBQztRQUVGLElBQUksQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsRUFBZSxDQUFDLEVBQUUsQ0FBQztZQUN2RCxPQUFPLENBQUMsS0FBSyxDQUNaLGlDQUFpQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQ3JELENBQUM7WUFFRixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV6RCxPQUFPLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMscUNBQXFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFFNUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoQyxDQUFDO0FBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlZmF1bHRzIH0gZnJvbSAnLi4vY29uZmlnL2RlZmF1bHRzJztcbmltcG9ydCAqIGFzIGNvbG9ycyBmcm9tICcuLi9pbmRleC9jb2xvcnMnO1xuaW1wb3J0IHsgY29tbW9uVXRpbHMgfSBmcm9tICcuL2NvbW1vbi11dGlscyc7XG5pbXBvcnQgeyBjb3JlIH0gZnJvbSAnLi9jb3JlLXV0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbUhTTChlbmFibGVBbHBoYTogYm9vbGVhbik6IGNvbG9ycy5IU0wge1xuXHR0cnkge1xuXHRcdGNvbnN0IGFscGhhID0gZW5hYmxlQWxwaGEgPyBNYXRoLnJhbmRvbSgpIDogMTtcblx0XHRjb25zdCBoc2w6IGNvbG9ycy5IU0wgPSB7XG5cdFx0XHR2YWx1ZToge1xuXHRcdFx0XHRodWU6IGNvbW1vblV0aWxzLnNhbml0aXplUmFkaWFsKFxuXHRcdFx0XHRcdE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDM2MClcblx0XHRcdFx0KSxcblx0XHRcdFx0c2F0dXJhdGlvbjogY29tbW9uVXRpbHMuc2FuaXRpemVQZXJjZW50YWdlKFxuXHRcdFx0XHRcdE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMSlcblx0XHRcdFx0KSxcblx0XHRcdFx0bGlnaHRuZXNzOiBjb21tb25VdGlscy5zYW5pdGl6ZVBlcmNlbnRhZ2UoXG5cdFx0XHRcdFx0TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAxKVxuXHRcdFx0XHQpLFxuXHRcdFx0XHRhbHBoYVxuXHRcdFx0fSxcblx0XHRcdGZvcm1hdDogJ2hzbCdcblx0XHR9O1xuXG5cdFx0aWYgKCFjb21tb25VdGlscy52YWxpZGF0ZUNvbG9yVmFsdWVzKGhzbCkpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoXG5cdFx0XHRcdGBJbnZhbGlkIHJhbmRvbSBIU0wgY29sb3IgdmFsdWUgJHtKU09OLnN0cmluZ2lmeShoc2wpfWBcblx0XHRcdCk7XG5cblx0XHRcdHJldHVybiBjb3JlLmNsb25lKGRlZmF1bHRzLmhzbCk7XG5cdFx0fVxuXG5cdFx0Y29uc29sZS5sb2coYEdlbmVyYXRlZCByYW5kb21IU0w6ICR7SlNPTi5zdHJpbmdpZnkoaHNsKX1gKTtcblxuXHRcdHJldHVybiBoc2w7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Y29uc29sZS5lcnJvcihgRXJyb3IgZ2VuZXJhdGluZyByYW5kb20gSFNMIGNvbG9yOiAke2Vycm9yfWApO1xuXG5cdFx0cmV0dXJuIGNvcmUuY2xvbmUoZGVmYXVsdHMuaHNsKTtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tU0woZW5hYmxlQWxwaGE6IGJvb2xlYW4pOiBjb2xvcnMuU0wge1xuXHR0cnkge1xuXHRcdGNvbnN0IGFscGhhID0gZW5hYmxlQWxwaGEgPyBNYXRoLnJhbmRvbSgpIDogMTtcblx0XHRjb25zdCBzbDogY29sb3JzLlNMID0ge1xuXHRcdFx0dmFsdWU6IHtcblx0XHRcdFx0c2F0dXJhdGlvbjogY29tbW9uVXRpbHMuc2FuaXRpemVQZXJjZW50YWdlKFxuXHRcdFx0XHRcdE1hdGgubWF4KDAsIE1hdGgubWluKDEwMCwgTWF0aC5yYW5kb20oKSAqIDEwMCkpXG5cdFx0XHRcdCksXG5cdFx0XHRcdGxpZ2h0bmVzczogY29tbW9uVXRpbHMuc2FuaXRpemVQZXJjZW50YWdlKFxuXHRcdFx0XHRcdE1hdGgubWF4KDAsIE1hdGgubWluKDEwMCwgTWF0aC5yYW5kb20oKSAqIDEwMCkpXG5cdFx0XHRcdCksXG5cdFx0XHRcdGFscGhhXG5cdFx0XHR9LFxuXHRcdFx0Zm9ybWF0OiAnc2wnXG5cdFx0fTtcblxuXHRcdGlmICghY29tbW9uVXRpbHMudmFsaWRhdGVDb2xvclZhbHVlcyhzbCBhcyBjb2xvcnMuU0wpKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKFxuXHRcdFx0XHRgSW52YWxpZCByYW5kb20gU1YgY29sb3IgdmFsdWUgJHtKU09OLnN0cmluZ2lmeShzbCl9YFxuXHRcdFx0KTtcblxuXHRcdFx0cmV0dXJuIGNvcmUuY2xvbmUoZGVmYXVsdHMuc2wpO1xuXHRcdH1cblxuXHRcdGNvbnNvbGUubG9nKGBHZW5lcmF0ZWQgcmFuZG9tU0w6ICR7SlNPTi5zdHJpbmdpZnkoc2wpfWApO1xuXG5cdFx0cmV0dXJuIHNsO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGNvbnNvbGUuZXJyb3IoYEVycm9yIGdlbmVyYXRpbmcgcmFuZG9tIFNMIGNvbG9yOiAke2Vycm9yfWApO1xuXG5cdFx0cmV0dXJuIGNvcmUuY2xvbmUoZGVmYXVsdHMuc2wpO1xuXHR9XG59XG4iXX0=