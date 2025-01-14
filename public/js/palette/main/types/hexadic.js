// File: src/palette/main/types/hexadic.js
import { IDBManager } from '../../../idb/index.js';
import { core } from '../../../common/index.js';
import { data } from '../../../data/index.js';
import { paletteSuperUtils } from '../../common/index.js';
import { ui } from '../../../ui/index.js';
const consts = data.consts;
const create = paletteSuperUtils.create;
const genHues = paletteSuperUtils.genHues;
const paletteRanges = consts.paletteRanges;
const idb = IDBManager.getInstance();
// *DEV-NOTE* update to reflect the fact this will always return 6 color swatches
export async function hexadic(args) {
    // ensure exactly 6 color swatches
    if (args.numBoxes !== 6) {
        ui.enforceSwatchRules(6, 6);
    }
    const baseColor = create.baseColor(args.customColor, args.enableAlpha);
    const hues = genHues.hexadic(baseColor);
    const paletteItems = [];
    for (const hue of hues) {
        const saturationShift = Math.random() * paletteRanges.hexad.satShift -
            paletteRanges.hexad.satShift / 2;
        const lightnessShift = Math.random() * paletteRanges.hexad.lightShift -
            paletteRanges.hexad.lightShift / 2;
        const newColor = {
            value: {
                hue: core.brand.asRadial(hue),
                saturation: core.brand.asPercentile(Math.min(100, Math.max(0, baseColor.value.saturation + saturationShift))),
                lightness: core.brand.asPercentile(Math.min(100, Math.max(0, baseColor.value.lightness + lightnessShift))),
                alpha: args.enableAlpha
                    ? core.brand.asAlphaRange(Math.random())
                    : core.brand.asAlphaRange(1)
            },
            format: 'hsl'
        };
        const paletteItem = await create.paletteItem(newColor, args.enableAlpha);
        paletteItems.push(paletteItem);
    }
    const hexadicPalette = await idb.savePaletteToDB('hexadic', paletteItems, baseColor, args.numBoxes, args.enableAlpha, args.limitDark, args.limitGray, args.limitLight);
    if (!hexadicPalette) {
        throw new Error('Hexadic palette is either null or undefined.');
    }
    else {
        return hexadicPalette;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGV4YWRpYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9wYWxldHRlL21haW4vdHlwZXMvaGV4YWRpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQ0FBMEM7QUFRMUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTFDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDM0IsTUFBTSxNQUFNLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDO0FBQ3hDLE1BQU0sT0FBTyxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztBQUMxQyxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDO0FBRTNDLE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUVyQyxpRkFBaUY7QUFDakYsTUFBTSxDQUFDLEtBQUssVUFBVSxPQUFPLENBQUMsSUFBb0I7SUFDakQsa0NBQWtDO0lBQ2xDLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUN6QixFQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3ZFLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFeEMsTUFBTSxZQUFZLEdBQWtCLEVBQUUsQ0FBQztJQUN2QyxLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3hCLE1BQU0sZUFBZSxHQUNwQixJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzVDLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNsQyxNQUFNLGNBQWMsR0FDbkIsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsVUFBVTtZQUM5QyxhQUFhLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDcEMsTUFBTSxRQUFRLEdBQVE7WUFDckIsS0FBSyxFQUFFO2dCQUNOLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7Z0JBQzdCLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FDbEMsSUFBSSxDQUFDLEdBQUcsQ0FDUCxHQUFHLEVBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FDUCxDQUFDLEVBQ0QsU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsZUFBZSxDQUM1QyxDQUNELENBQ0Q7Z0JBQ0QsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUNqQyxJQUFJLENBQUMsR0FBRyxDQUNQLEdBQUcsRUFDSCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUMsQ0FDdkQsQ0FDRDtnQkFDRCxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVc7b0JBQ3RCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ3hDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7YUFDN0I7WUFDRCxNQUFNLEVBQUUsS0FBSztTQUNiLENBQUM7UUFFRixNQUFNLFdBQVcsR0FBRyxNQUFNLE1BQU0sQ0FBQyxXQUFXLENBQzNDLFFBQVEsRUFDUixJQUFJLENBQUMsV0FBVyxDQUNoQixDQUFDO1FBRUYsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsTUFBTSxjQUFjLEdBQUcsTUFBTSxHQUFHLENBQUMsZUFBZSxDQUMvQyxTQUFTLEVBQ1QsWUFBWSxFQUNaLFNBQVMsRUFDVCxJQUFJLENBQUMsUUFBUSxFQUNiLElBQUksQ0FBQyxXQUFXLEVBQ2hCLElBQUksQ0FBQyxTQUFTLEVBQ2QsSUFBSSxDQUFDLFNBQVMsRUFDZCxJQUFJLENBQUMsVUFBVSxDQUNmLENBQUM7SUFFRixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7U0FBTSxDQUFDO1FBQ1AsT0FBTyxjQUFjLENBQUM7SUFDdkIsQ0FBQztBQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBGaWxlOiBzcmMvcGFsZXR0ZS9tYWluL3R5cGVzL2hleGFkaWMuanNcblxuaW1wb3J0IHtcblx0R2VuUGFsZXR0ZUFyZ3MsXG5cdEhTTCxcblx0UGFsZXR0ZSxcblx0UGFsZXR0ZUl0ZW1cbn0gZnJvbSAnLi4vLi4vLi4vaW5kZXgvaW5kZXguanMnO1xuaW1wb3J0IHsgSURCTWFuYWdlciB9IGZyb20gJy4uLy4uLy4uL2lkYi9pbmRleC5qcyc7XG5pbXBvcnQgeyBjb3JlIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2luZGV4LmpzJztcbmltcG9ydCB7IGRhdGEgfSBmcm9tICcuLi8uLi8uLi9kYXRhL2luZGV4LmpzJztcbmltcG9ydCB7IHBhbGV0dGVTdXBlclV0aWxzIH0gZnJvbSAnLi4vLi4vY29tbW9uL2luZGV4LmpzJztcbmltcG9ydCB7IHVpIH0gZnJvbSAnLi4vLi4vLi4vdWkvaW5kZXguanMnO1xuXG5jb25zdCBjb25zdHMgPSBkYXRhLmNvbnN0cztcbmNvbnN0IGNyZWF0ZSA9IHBhbGV0dGVTdXBlclV0aWxzLmNyZWF0ZTtcbmNvbnN0IGdlbkh1ZXMgPSBwYWxldHRlU3VwZXJVdGlscy5nZW5IdWVzO1xuY29uc3QgcGFsZXR0ZVJhbmdlcyA9IGNvbnN0cy5wYWxldHRlUmFuZ2VzO1xuXG5jb25zdCBpZGIgPSBJREJNYW5hZ2VyLmdldEluc3RhbmNlKCk7XG5cbi8vICpERVYtTk9URSogdXBkYXRlIHRvIHJlZmxlY3QgdGhlIGZhY3QgdGhpcyB3aWxsIGFsd2F5cyByZXR1cm4gNiBjb2xvciBzd2F0Y2hlc1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhleGFkaWMoYXJnczogR2VuUGFsZXR0ZUFyZ3MpOiBQcm9taXNlPFBhbGV0dGU+IHtcblx0Ly8gZW5zdXJlIGV4YWN0bHkgNiBjb2xvciBzd2F0Y2hlc1xuXHRpZiAoYXJncy5udW1Cb3hlcyAhPT0gNikge1xuXHRcdHVpLmVuZm9yY2VTd2F0Y2hSdWxlcyg2LCA2KTtcblx0fVxuXG5cdGNvbnN0IGJhc2VDb2xvciA9IGNyZWF0ZS5iYXNlQ29sb3IoYXJncy5jdXN0b21Db2xvciwgYXJncy5lbmFibGVBbHBoYSk7XG5cdGNvbnN0IGh1ZXMgPSBnZW5IdWVzLmhleGFkaWMoYmFzZUNvbG9yKTtcblxuXHRjb25zdCBwYWxldHRlSXRlbXM6IFBhbGV0dGVJdGVtW10gPSBbXTtcblx0Zm9yIChjb25zdCBodWUgb2YgaHVlcykge1xuXHRcdGNvbnN0IHNhdHVyYXRpb25TaGlmdCA9XG5cdFx0XHRNYXRoLnJhbmRvbSgpICogcGFsZXR0ZVJhbmdlcy5oZXhhZC5zYXRTaGlmdCAtXG5cdFx0XHRwYWxldHRlUmFuZ2VzLmhleGFkLnNhdFNoaWZ0IC8gMjtcblx0XHRjb25zdCBsaWdodG5lc3NTaGlmdCA9XG5cdFx0XHRNYXRoLnJhbmRvbSgpICogcGFsZXR0ZVJhbmdlcy5oZXhhZC5saWdodFNoaWZ0IC1cblx0XHRcdHBhbGV0dGVSYW5nZXMuaGV4YWQubGlnaHRTaGlmdCAvIDI7XG5cdFx0Y29uc3QgbmV3Q29sb3I6IEhTTCA9IHtcblx0XHRcdHZhbHVlOiB7XG5cdFx0XHRcdGh1ZTogY29yZS5icmFuZC5hc1JhZGlhbChodWUpLFxuXHRcdFx0XHRzYXR1cmF0aW9uOiBjb3JlLmJyYW5kLmFzUGVyY2VudGlsZShcblx0XHRcdFx0XHRNYXRoLm1pbihcblx0XHRcdFx0XHRcdDEwMCxcblx0XHRcdFx0XHRcdE1hdGgubWF4KFxuXHRcdFx0XHRcdFx0XHQwLFxuXHRcdFx0XHRcdFx0XHRiYXNlQ29sb3IudmFsdWUuc2F0dXJhdGlvbiArIHNhdHVyYXRpb25TaGlmdFxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdClcblx0XHRcdFx0KSxcblx0XHRcdFx0bGlnaHRuZXNzOiBjb3JlLmJyYW5kLmFzUGVyY2VudGlsZShcblx0XHRcdFx0XHRNYXRoLm1pbihcblx0XHRcdFx0XHRcdDEwMCxcblx0XHRcdFx0XHRcdE1hdGgubWF4KDAsIGJhc2VDb2xvci52YWx1ZS5saWdodG5lc3MgKyBsaWdodG5lc3NTaGlmdClcblx0XHRcdFx0XHQpXG5cdFx0XHRcdCksXG5cdFx0XHRcdGFscGhhOiBhcmdzLmVuYWJsZUFscGhhXG5cdFx0XHRcdFx0PyBjb3JlLmJyYW5kLmFzQWxwaGFSYW5nZShNYXRoLnJhbmRvbSgpKVxuXHRcdFx0XHRcdDogY29yZS5icmFuZC5hc0FscGhhUmFuZ2UoMSlcblx0XHRcdH0sXG5cdFx0XHRmb3JtYXQ6ICdoc2wnXG5cdFx0fTtcblxuXHRcdGNvbnN0IHBhbGV0dGVJdGVtID0gYXdhaXQgY3JlYXRlLnBhbGV0dGVJdGVtKFxuXHRcdFx0bmV3Q29sb3IsXG5cdFx0XHRhcmdzLmVuYWJsZUFscGhhXG5cdFx0KTtcblxuXHRcdHBhbGV0dGVJdGVtcy5wdXNoKHBhbGV0dGVJdGVtKTtcblx0fVxuXG5cdGNvbnN0IGhleGFkaWNQYWxldHRlID0gYXdhaXQgaWRiLnNhdmVQYWxldHRlVG9EQihcblx0XHQnaGV4YWRpYycsXG5cdFx0cGFsZXR0ZUl0ZW1zLFxuXHRcdGJhc2VDb2xvcixcblx0XHRhcmdzLm51bUJveGVzLFxuXHRcdGFyZ3MuZW5hYmxlQWxwaGEsXG5cdFx0YXJncy5saW1pdERhcmssXG5cdFx0YXJncy5saW1pdEdyYXksXG5cdFx0YXJncy5saW1pdExpZ2h0XG5cdCk7XG5cblx0aWYgKCFoZXhhZGljUGFsZXR0ZSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignSGV4YWRpYyBwYWxldHRlIGlzIGVpdGhlciBudWxsIG9yIHVuZGVmaW5lZC4nKTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gaGV4YWRpY1BhbGV0dGU7XG5cdH1cbn1cbiJdfQ==