// File: src/palette/main/types/tetradic.js
import { core, utils } from '../../../common/index.js';
import { consts } from '../../../common/data/base.js';
import { IDBManager } from '../../../db/index.js';
import { paletteSuperUtils } from '../../common/index.js';
import { ui } from '../../../ui/index.js';
const create = paletteSuperUtils.create;
const genHues = paletteSuperUtils.genHues;
const paletteRanges = consts.paletteRanges;
export async function tetradic(args) {
    // ensure exactly 4 swatches
    if (args.swatches !== 4)
        ui.enforceSwatchRules(4, 4);
    // base color setup
    const baseColor = create.baseColor(args.customColor, args.enableAlpha);
    // generate tetradic hues
    const tetradicHues = genHues.tetradic(baseColor.value.hue);
    // initialize palette items array
    const paletteItems = [];
    // add the base color as the first palette item
    const basePaletteItem = await create.paletteItem(baseColor, args.enableAlpha);
    paletteItems.push(basePaletteItem);
    // add the tetradic colors sequentially
    for (let index = 0; index < tetradicHues.length; index++) {
        const hue = tetradicHues[index];
        const adjustedHSL = {
            value: {
                hue: core.brand.asRadial(hue),
                saturation: core.brand.asPercentile(Math.max(0, Math.min(baseColor.value.saturation +
                    (index % 2 === 0
                        ? -paletteRanges.tetra.satShift
                        : paletteRanges.tetra.satShift), 100))),
                lightness: core.brand.asPercentile(Math.max(0, Math.min(baseColor.value.lightness +
                    (index % 2 === 0
                        ? -paletteRanges.tetra.lightShift
                        : paletteRanges.tetra.lightShift), 100))),
                alpha: args.enableAlpha
                    ? core.brand.asAlphaRange(Math.random())
                    : core.brand.asAlphaRange(1)
            },
            format: 'hsl'
        };
        // generate all color values and create the palette item
        const adjustedColor = utils.conversion.genAllColorValues(adjustedHSL)
            .hsl;
        const paletteItem = await create.paletteItem(adjustedColor, args.enableAlpha);
        paletteItems.push(paletteItem);
    }
    const idbManager = await IDBManager.getInstance();
    const paletteID = await idbManager.getNextPaletteID();
    if (!paletteID)
        throw new Error('Palette ID is either null or undefined.');
    // save the palette to the database
    const tetradicPalette = await idbManager.savePaletteToDB('tetradic', paletteItems, paletteID, args.swatches, args.enableAlpha, args.limitDark, args.limitGray, args.limitLight);
    // handle null or undefined palette
    if (!tetradicPalette) {
        throw new Error('Tetradic palette is either null or undefined.');
    }
    return tetradicPalette;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV0cmFkaWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvcGFsZXR0ZS9tYWluL3R5cGVzL3RldHJhZGljLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDJDQUEyQztBQVEzQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTFDLE1BQU0sTUFBTSxHQUFHLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztBQUN4QyxNQUFNLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7QUFDMUMsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztBQUUzQyxNQUFNLENBQUMsS0FBSyxVQUFVLFFBQVEsQ0FBQyxJQUFvQjtJQUNsRCw0QkFBNEI7SUFDNUIsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLENBQUM7UUFBRSxFQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXJELG1CQUFtQjtJQUNuQixNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRXZFLHlCQUF5QjtJQUN6QixNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFM0QsaUNBQWlDO0lBQ2pDLE1BQU0sWUFBWSxHQUFrQixFQUFFLENBQUM7SUFFdkMsK0NBQStDO0lBQy9DLE1B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QUFlLENBQUM7QUFDeEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEZpbGU6IHNyYy9wYWxldHRlL21haW4vdHlwZXMvdGV0cmFkaWMuanNcblxuaW1wb3J0IHtcblx0R2VuUGFsZXR0ZUFyZ3MsXG5cdEhTTCxcblx0UGFsZXR0ZSxcblx0UGFsZXR0ZUl0ZW1cbn0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvaW5kZXguanMnO1xuaW1wb3J0IHsgY29yZSwgdXRpbHMgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vaW5kZXguanMnO1xuaW1wb3J0IHsgY29uc3RzIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2RhdGEvYmFzZS5qcyc7XG5pbXBvcnQgeyBJREJNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vLi4vZGIvaW5kZXguanMnO1xuaW1wb3J0IHsgcGFsZXR0ZVN1cGVyVXRpbHMgfSBmcm9tICcuLi8uLi9jb21tb24vaW5kZXguanMnO1xuaW1wb3J0IHsgdWkgfSBmcm9tICcuLi8uLi8uLi91aS9pbmRleC5qcyc7XG5cbmNvbnN0IGNyZWF0ZSA9IHBhbGV0dGVTdXBlclV0aWxzLmNyZWF0ZTtcbmNvbnN0IGdlbkh1ZXMgPSBwYWxldHRlU3VwZXJVdGlscy5nZW5IdWVzO1xuY29uc3QgcGFsZXR0ZVJhbmdlcyA9IGNvbnN0cy5wYWxldHRlUmFuZ2VzO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdGV0cmFkaWMoYXJnczogR2VuUGFsZXR0ZUFyZ3MpOiBQcm9taXNlPFBhbGV0dGU+IHtcblx0Ly8gZW5zdXJlIGV4YWN0bHkgNCBzd2F0Y2hlc1xuXHRpZiAoYXJncy5zd2F0Y2hlcyAhPT0gNCkgdWkuZW5mb3JjZVN3YXRjaFJ1bGVzKDQsIDQpO1xuXG5cdC8vIGJhc2UgY29sb3Igc2V0dXBcblx0Y29uc3QgYmFzZUNvbG9yID0gY3JlYXRlLmJhc2VDb2xvcihhcmdzLmN1c3RvbUNvbG9yLCBhcmdzLmVuYWJsZUFscGhhKTtcblxuXHQvLyBnZW5lcmF0ZSB0ZXRyYWRpYyBodWVzXG5cdGNvbnN0IHRldHJhZGljSHVlcyA9IGdlbkh1ZXMudGV0cmFkaWMoYmFzZUNvbG9yLnZhbHVlLmh1ZSk7XG5cblx0Ly8gaW5pdGlhbGl6ZSBwYWxldHRlIGl0ZW1zIGFycmF5XG5cdGNvbnN0IHBhbGV0dGVJdGVtczogUGFsZXR0ZUl0ZW1bXSA9IFtdO1xuXG5cdC8vIGFkZCB0aGUgYmFzZSBjb2xvciBhcyB0aGUgZmlyc3QgcGFsZXR0ZSBpdGVtXG5cdGNvbnN0IGJhc2VQYWxldHRlSXRlbSA9IGF3YWl0IGNyZWF0ZS5wYWxldHRlSXRlbShcblx0XHRiYXNlQ29sb3IsXG5cdFx0YXJncy5lbmFibGVBbHBoYVxuXHQpO1xuXG5cdHBhbGV0dGVJdGVtcy5wdXNoKGJhc2VQYWxldHRlSXRlbSk7XG5cblx0Ly8gYWRkIHRoZSB0ZXRyYWRpYyBjb2xvcnMgc2VxdWVudGlhbGx5XG5cdGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0ZXRyYWRpY0h1ZXMubGVuZ3RoOyBpbmRleCsrKSB7XG5cdFx0Y29uc3QgaHVlID0gdGV0cmFkaWNIdWVzW2luZGV4XTtcblx0XHRjb25zdCBhZGp1c3RlZEhTTDogSFNMID0ge1xuXHRcdFx0dmFsdWU6IHtcblx0XHRcdFx0aHVlOiBjb3JlLmJyYW5kLmFzUmFkaWFsKGh1ZSksXG5cdFx0XHRcdHNhdHVyYXRpb246IGNvcmUuYnJhbmQuYXNQZXJjZW50aWxlKFxuXHRcdFx0XHRcdE1hdGgubWF4KFxuXHRcdFx0XHRcdFx0MCxcblx0XHRcdFx0XHRcdE1hdGgubWluKFxuXHRcdFx0XHRcdFx0XHRiYXNlQ29sb3IudmFsdWUuc2F0dXJhdGlvbiArXG5cdFx0XHRcdFx0XHRcdFx0KGluZGV4ICUgMiA9PT0gMFxuXHRcdFx0XHRcdFx0XHRcdFx0PyAtcGFsZXR0ZVJhbmdlcy50ZXRyYS5zYXRTaGlmdFxuXHRcdFx0XHRcdFx0XHRcdFx0OiBwYWxldHRlUmFuZ2VzLnRldHJhLnNhdFNoaWZ0KSxcblx0XHRcdFx0XHRcdFx0MTAwXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpLFxuXHRcdFx0XHRsaWdodG5lc3M6IGNvcmUuYnJhbmQuYXNQZXJjZW50aWxlKFxuXHRcdFx0XHRcdE1hdGgubWF4KFxuXHRcdFx0XHRcdFx0MCxcblx0XHRcdFx0XHRcdE1hdGgubWluKFxuXHRcdFx0XHRcdFx0XHRiYXNlQ29sb3IudmFsdWUubGlnaHRuZXNzICtcblx0XHRcdFx0XHRcdFx0XHQoaW5kZXggJSAyID09PSAwXG5cdFx0XHRcdFx0XHRcdFx0XHQ/IC1wYWxldHRlUmFuZ2VzLnRldHJhLmxpZ2h0U2hpZnRcblx0XHRcdFx0XHRcdFx0XHRcdDogcGFsZXR0ZVJhbmdlcy50ZXRyYS5saWdodFNoaWZ0KSxcblx0XHRcdFx0XHRcdFx0MTAwXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpLFxuXHRcdFx0XHRhbHBoYTogYXJncy5lbmFibGVBbHBoYVxuXHRcdFx0XHRcdD8gY29yZS5icmFuZC5hc0FscGhhUmFuZ2UoTWF0aC5yYW5kb20oKSlcblx0XHRcdFx0XHQ6IGNvcmUuYnJhbmQuYXNBbHBoYVJhbmdlKDEpXG5cdFx0XHR9LFxuXHRcdFx0Zm9ybWF0OiAnaHNsJ1xuXHRcdH07XG5cblx0XHQvLyBnZW5lcmF0ZSBhbGwgY29sb3IgdmFsdWVzIGFuZCBjcmVhdGUgdGhlIHBhbGV0dGUgaXRlbVxuXHRcdGNvbnN0IGFkanVzdGVkQ29sb3IgPSB1dGlscy5jb252ZXJzaW9uLmdlbkFsbENvbG9yVmFsdWVzKGFkanVzdGVkSFNMKVxuXHRcdFx0LmhzbCBhcyBIU0w7XG5cdFx0Y29uc3QgcGFsZXR0ZUl0ZW0gPSBhd2FpdCBjcmVhdGUucGFsZXR0ZUl0ZW0oXG5cdFx0XHRhZGp1c3RlZENvbG9yLFxuXHRcdFx0YXJncy5lbmFibGVBbHBoYVxuXHRcdCk7XG5cdFx0cGFsZXR0ZUl0ZW1zLnB1c2gocGFsZXR0ZUl0ZW0pO1xuXHR9XG5cblx0Y29uc3QgaWRiTWFuYWdlciA9IGF3YWl0IElEQk1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcblx0Y29uc3QgcGFsZXR0ZUlEID0gYXdhaXQgaWRiTWFuYWdlci5nZXROZXh0UGFsZXR0ZUlEKCk7XG5cblx0aWYgKCFwYWxldHRlSUQpIHRocm93IG5ldyBFcnJvcignUGFsZXR0ZSBJRCBpcyBlaXRoZXIgbnVsbCBvciB1bmRlZmluZWQuJyk7XG5cblx0Ly8gc2F2ZSB0aGUgcGFsZXR0ZSB0byB0aGUgZGF0YWJhc2Vcblx0Y29uc3QgdGV0cmFkaWNQYWxldHRlID0gYXdhaXQgaWRiTWFuYWdlci5zYXZlUGFsZXR0ZVRvREIoXG5cdFx0J3RldHJhZGljJyxcblx0XHRwYWxldHRlSXRlbXMsXG5cdFx0cGFsZXR0ZUlELFxuXHRcdGFyZ3Muc3dhdGNoZXMsXG5cdFx0YXJncy5lbmFibGVBbHBoYSxcblx0XHRhcmdzLmxpbWl0RGFyayxcblx0XHRhcmdzLmxpbWl0R3JheSxcblx0XHRhcmdzLmxpbWl0TGlnaHRcblx0KTtcblxuXHQvLyBoYW5kbGUgbnVsbCBvciB1bmRlZmluZWQgcGFsZXR0ZVxuXHRpZiAoIXRldHJhZGljUGFsZXR0ZSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignVGV0cmFkaWMgcGFsZXR0ZSBpcyBlaXRoZXIgbnVsbCBvciB1bmRlZmluZWQuJyk7XG5cdH1cblxuXHRyZXR1cm4gdGV0cmFkaWNQYWxldHRlO1xufVxuIl19