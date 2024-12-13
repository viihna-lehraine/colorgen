// File: src/palette/main/types/monochromatic.js
import { IDBManager } from '../../../idb/index.js';
import { core, utils } from '../../../common/index.js';
import { data } from '../../../data/index.js';
import { paletteSuperUtils } from '../../common/index.js';
const create = paletteSuperUtils.create;
const mode = data.mode;
const idb = IDBManager.getInstance();
export async function monochromatic(args) {
    const currentMonochromaticPaletteID = await idb.getCurrentPaletteID();
    if (args.numBoxes < 2) {
        if (mode.warnLogs)
            console.warn('Monochromatic palette requires at least 2 swatches.');
        return utils.palette.createObject('monochromatic', [], core.brandColor.asHSL(data.defaults.colors.hsl), 0, currentMonochromaticPaletteID, args.enableAlpha, args.limitDark, args.limitGray, args.limitLight);
    }
    const baseColor = create.baseColor(args.customColor, args.enableAlpha);
    const paletteItems = [
        create.paletteItem(baseColor, args.enableAlpha)
    ];
    for (let i = 1; i < args.numBoxes; i++) {
        const hueShift = Math.random() * 10 - 5;
        const newColor = utils.conversion.genAllColorValues({
            value: {
                hue: core.brand.asRadial((baseColor.value.hue + hueShift + 360) % 360),
                saturation: core.brand.asPercentile(Math.min(100, Math.max(0, baseColor.value.saturation - i * 5))),
                lightness: core.brand.asPercentile(Math.min(100, Math.max(0, baseColor.value.lightness + (i * 10 - 20)))),
                alpha: args.enableAlpha
                    ? core.brand.asAlphaRange(Math.random())
                    : core.brand.asAlphaRange(1)
            },
            format: 'hsl'
        }).hsl;
        if (newColor) {
            paletteItems.push(create.paletteItem(newColor, args.enableAlpha));
        }
    }
    const monochromaticPalette = await idb.savePaletteToDB('monochromatic', paletteItems, baseColor, args.numBoxes, args.enableAlpha, args.limitDark, args.limitGray, args.limitLight);
    if (!monochromaticPalette)
        throw new Error('Monochromatic palette is either null or undefined.');
    else
        return monochromaticPalette;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ub2Nocm9tYXRpYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9wYWxldHRlL21haW4vdHlwZXMvbW9ub2Nocm9tYXRpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnREFBZ0Q7QUFHaEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTFELE1BQU0sTUFBTSxHQUFHLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztBQUN4QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBRXZCLE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUVyQyxNQUFNLENBQUMsS0FBSyxVQUFVLGFBQWEsQ0FBQyxJQUFvQjtJQUN2RCxNQUFNLDZCQUE2QixHQUFHLE1BQU0sR0FBRyxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFFdEUsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksSUFBSSxDQUFDLFFBQVE7WUFDaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO1FBRXJFLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQ2hDLGVBQWUsRUFDZixFQUFFLEVBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQy9DLENBQUMsRUFDRCw2QkFBNkIsRUFDN0IsSUFBSSxDQUFDLFdBQVcsRUFDaEIsSUFBSSxDQUFDLFNBQVMsRUFDZCxJQUFJLENBQUMsU0FBUyxFQUNkLElBQUksQ0FBQyxVQUFVLENBQ2YsQ0FBQztJQUNILENBQUM7SUFFRCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3ZFLE1BQU0sWUFBWSxHQUFrQjtRQUNuQyxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDO0tBQy9DLENBQUM7SUFFRixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ3hDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUM7WUFDbkQsS0FBSyxFQUFFO2dCQUNOLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FDdkIsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxRQUFRLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUM1QztnQkFDRCxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQ2xDLElBQUksQ0FBQyxHQUFHLENBQ1AsR0FBRyxFQUNILElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDL0MsQ0FDRDtnQkFDRCxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQ2pDLElBQUksQ0FBQyxHQUFHLENBQ1AsR0FBRyxFQUNILElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUN0RCxDQUNEO2dCQUNELEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVztvQkFDdEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDeEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzthQUM3QjtZQUNELE1BQU0sRUFBRSxLQUFLO1NBQ2IsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUVQLElBQUksUUFBUSxFQUFFLENBQUM7WUFDZCxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ25FLENBQUM7SUFDRixDQUFDO0lBRUQsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLEdBQUcsQ0FBQyxlQUFlLENBQ3JELGVBQWUsRUFDZixZQUFZLEVBQ1osU0FBUyxFQUNULElBQUksQ0FBQyxRQUFRLEVBQ2IsSUFBSSxDQUFDLFdBQVcsRUFDaEIsSUFBSSxDQUFDLFNBQVMsRUFDZCxJQUFJLENBQUMsU0FBUyxFQUNkLElBQUksQ0FBQyxVQUFVLENBQ2YsQ0FBQztJQUVGLElBQUksQ0FBQyxvQkFBb0I7UUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxvREFBb0QsQ0FBQyxDQUFDOztRQUNsRSxPQUFPLG9CQUFvQixDQUFDO0FBQ2xDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBGaWxlOiBzcmMvcGFsZXR0ZS9tYWluL3R5cGVzL21vbm9jaHJvbWF0aWMuanNcblxuaW1wb3J0IHsgR2VuUGFsZXR0ZUFyZ3MsIFBhbGV0dGUsIFBhbGV0dGVJdGVtIH0gZnJvbSAnLi4vLi4vLi4vaW5kZXgvaW5kZXguanMnO1xuaW1wb3J0IHsgSURCTWFuYWdlciB9IGZyb20gJy4uLy4uLy4uL2lkYi9pbmRleC5qcyc7XG5pbXBvcnQgeyBjb3JlLCB1dGlscyB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9pbmRleC5qcyc7XG5pbXBvcnQgeyBkYXRhIH0gZnJvbSAnLi4vLi4vLi4vZGF0YS9pbmRleC5qcyc7XG5pbXBvcnQgeyBwYWxldHRlU3VwZXJVdGlscyB9IGZyb20gJy4uLy4uL2NvbW1vbi9pbmRleC5qcyc7XG5cbmNvbnN0IGNyZWF0ZSA9IHBhbGV0dGVTdXBlclV0aWxzLmNyZWF0ZTtcbmNvbnN0IG1vZGUgPSBkYXRhLm1vZGU7XG5cbmNvbnN0IGlkYiA9IElEQk1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1vbm9jaHJvbWF0aWMoYXJnczogR2VuUGFsZXR0ZUFyZ3MpOiBQcm9taXNlPFBhbGV0dGU+IHtcblx0Y29uc3QgY3VycmVudE1vbm9jaHJvbWF0aWNQYWxldHRlSUQgPSBhd2FpdCBpZGIuZ2V0Q3VycmVudFBhbGV0dGVJRCgpO1xuXG5cdGlmIChhcmdzLm51bUJveGVzIDwgMikge1xuXHRcdGlmIChtb2RlLndhcm5Mb2dzKVxuXHRcdFx0Y29uc29sZS53YXJuKCdNb25vY2hyb21hdGljIHBhbGV0dGUgcmVxdWlyZXMgYXQgbGVhc3QgMiBzd2F0Y2hlcy4nKTtcblxuXHRcdHJldHVybiB1dGlscy5wYWxldHRlLmNyZWF0ZU9iamVjdChcblx0XHRcdCdtb25vY2hyb21hdGljJyxcblx0XHRcdFtdLFxuXHRcdFx0Y29yZS5icmFuZENvbG9yLmFzSFNMKGRhdGEuZGVmYXVsdHMuY29sb3JzLmhzbCksXG5cdFx0XHQwLFxuXHRcdFx0Y3VycmVudE1vbm9jaHJvbWF0aWNQYWxldHRlSUQsXG5cdFx0XHRhcmdzLmVuYWJsZUFscGhhLFxuXHRcdFx0YXJncy5saW1pdERhcmssXG5cdFx0XHRhcmdzLmxpbWl0R3JheSxcblx0XHRcdGFyZ3MubGltaXRMaWdodFxuXHRcdCk7XG5cdH1cblxuXHRjb25zdCBiYXNlQ29sb3IgPSBjcmVhdGUuYmFzZUNvbG9yKGFyZ3MuY3VzdG9tQ29sb3IsIGFyZ3MuZW5hYmxlQWxwaGEpO1xuXHRjb25zdCBwYWxldHRlSXRlbXM6IFBhbGV0dGVJdGVtW10gPSBbXG5cdFx0Y3JlYXRlLnBhbGV0dGVJdGVtKGJhc2VDb2xvciwgYXJncy5lbmFibGVBbHBoYSlcblx0XTtcblxuXHRmb3IgKGxldCBpID0gMTsgaSA8IGFyZ3MubnVtQm94ZXM7IGkrKykge1xuXHRcdGNvbnN0IGh1ZVNoaWZ0ID0gTWF0aC5yYW5kb20oKSAqIDEwIC0gNTtcblx0XHRjb25zdCBuZXdDb2xvciA9IHV0aWxzLmNvbnZlcnNpb24uZ2VuQWxsQ29sb3JWYWx1ZXMoe1xuXHRcdFx0dmFsdWU6IHtcblx0XHRcdFx0aHVlOiBjb3JlLmJyYW5kLmFzUmFkaWFsKFxuXHRcdFx0XHRcdChiYXNlQ29sb3IudmFsdWUuaHVlICsgaHVlU2hpZnQgKyAzNjApICUgMzYwXG5cdFx0XHRcdCksXG5cdFx0XHRcdHNhdHVyYXRpb246IGNvcmUuYnJhbmQuYXNQZXJjZW50aWxlKFxuXHRcdFx0XHRcdE1hdGgubWluKFxuXHRcdFx0XHRcdFx0MTAwLFxuXHRcdFx0XHRcdFx0TWF0aC5tYXgoMCwgYmFzZUNvbG9yLnZhbHVlLnNhdHVyYXRpb24gLSBpICogNSlcblx0XHRcdFx0XHQpXG5cdFx0XHRcdCksXG5cdFx0XHRcdGxpZ2h0bmVzczogY29yZS5icmFuZC5hc1BlcmNlbnRpbGUoXG5cdFx0XHRcdFx0TWF0aC5taW4oXG5cdFx0XHRcdFx0XHQxMDAsXG5cdFx0XHRcdFx0XHRNYXRoLm1heCgwLCBiYXNlQ29sb3IudmFsdWUubGlnaHRuZXNzICsgKGkgKiAxMCAtIDIwKSlcblx0XHRcdFx0XHQpXG5cdFx0XHRcdCksXG5cdFx0XHRcdGFscGhhOiBhcmdzLmVuYWJsZUFscGhhXG5cdFx0XHRcdFx0PyBjb3JlLmJyYW5kLmFzQWxwaGFSYW5nZShNYXRoLnJhbmRvbSgpKVxuXHRcdFx0XHRcdDogY29yZS5icmFuZC5hc0FscGhhUmFuZ2UoMSlcblx0XHRcdH0sXG5cdFx0XHRmb3JtYXQ6ICdoc2wnXG5cdFx0fSkuaHNsO1xuXG5cdFx0aWYgKG5ld0NvbG9yKSB7XG5cdFx0XHRwYWxldHRlSXRlbXMucHVzaChjcmVhdGUucGFsZXR0ZUl0ZW0obmV3Q29sb3IsIGFyZ3MuZW5hYmxlQWxwaGEpKTtcblx0XHR9XG5cdH1cblxuXHRjb25zdCBtb25vY2hyb21hdGljUGFsZXR0ZSA9IGF3YWl0IGlkYi5zYXZlUGFsZXR0ZVRvREIoXG5cdFx0J21vbm9jaHJvbWF0aWMnLFxuXHRcdHBhbGV0dGVJdGVtcyxcblx0XHRiYXNlQ29sb3IsXG5cdFx0YXJncy5udW1Cb3hlcyxcblx0XHRhcmdzLmVuYWJsZUFscGhhLFxuXHRcdGFyZ3MubGltaXREYXJrLFxuXHRcdGFyZ3MubGltaXRHcmF5LFxuXHRcdGFyZ3MubGltaXRMaWdodFxuXHQpO1xuXG5cdGlmICghbW9ub2Nocm9tYXRpY1BhbGV0dGUpXG5cdFx0dGhyb3cgbmV3IEVycm9yKCdNb25vY2hyb21hdGljIHBhbGV0dGUgaXMgZWl0aGVyIG51bGwgb3IgdW5kZWZpbmVkLicpO1xuXHRlbHNlIHJldHVybiBtb25vY2hyb21hdGljUGFsZXR0ZTtcbn1cbiJdfQ==