// File: src/palette/main/types/hexadic.js
import { IDBManager } from '../../../idb/index.js';
import { core, utils } from '../../../common/index.js';
import { data } from '../../../data/index.js';
import { paletteSuperUtils } from '../../common/index.js';
const consts = data.consts;
const create = paletteSuperUtils.create;
const defaults = data.defaults;
const genHues = paletteSuperUtils.genHues;
const mode = data.mode;
const paletteRanges = consts.paletteRanges;
const idb = IDBManager.getInstance();
export async function hexadic(args) {
    const currentHexadicPaletteID = await idb.getCurrentPaletteID();
    if (args.numBoxes < 6) {
        if (mode.warnLogs)
            console.warn('Hexadic palette requires at least 6 swatches.');
        return utils.palette.createObject('hexadic', [], core.brandColor.asHSL(defaults.colors.hsl), 0, currentHexadicPaletteID, args.enableAlpha, args.limitDark, args.limitGray, args.limitLight);
    }
    const baseColor = create.baseColor(args.customColor, args.enableAlpha);
    const hues = genHues.hexadic(baseColor);
    const paletteItems = hues.map((hue, _i) => {
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
        return create.paletteItem(newColor, args.enableAlpha);
    });
    const hexadicPalette = await idb.savePaletteToDB('hexadic', paletteItems, baseColor, args.numBoxes, args.enableAlpha, args.limitDark, args.limitGray, args.limitLight);
    if (!hexadicPalette)
        throw new Error('Hexadic palette is either null or undefined.');
    else
        return hexadicPalette;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGV4YWRpYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9wYWxldHRlL21haW4vdHlwZXMvaGV4YWRpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQ0FBMEM7QUFHMUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTFELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDM0IsTUFBTSxNQUFNLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDO0FBQ3hDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7QUFDL0IsTUFBTSxPQUFPLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDO0FBQzFDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDdkIsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztBQUUzQyxNQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7QUFFckMsTUFBTSxDQUFDLEtBQUssVUFBVSxPQUFPLENBQUMsSUFBb0I7SUFDakQsTUFBTSx1QkFBdUIsR0FBRyxNQUFNLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBRWhFLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUN2QixJQUFJLElBQUksQ0FBQyxRQUFRO1lBQ2hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsK0NBQStDLENBQUMsQ0FBQztRQUUvRCxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUNoQyxTQUFTLEVBQ1QsRUFBRSxFQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQzFDLENBQUMsRUFDRCx1QkFBdUIsRUFDdkIsSUFBSSxDQUFDLFdBQVcsRUFDaEIsSUFBSSxDQUFDLFNBQVMsRUFDZCxJQUFJLENBQUMsU0FBUyxFQUNkLElBQUksQ0FBQyxVQUFVLENBQ2YsQ0FBQztJQUNILENBQUM7SUFFRCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3ZFLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDeEMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRTtRQUN6QyxNQUFNLGVBQWUsR0FDcEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUM1QyxhQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDbEMsTUFBTSxjQUFjLEdBQ25CLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLFVBQVU7WUFDOUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sUUFBUSxHQUFRO1lBQ3JCLEtBQUssRUFBRTtnQkFDTixHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO2dCQUM3QixVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQ2xDLElBQUksQ0FBQyxHQUFHLENBQ1AsR0FBRyxFQUNILElBQUksQ0FBQyxHQUFHLENBQ1AsQ0FBQyxFQUNELFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLGVBQWUsQ0FDNUMsQ0FDRCxDQUNEO2dCQUNELFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FDakMsSUFBSSxDQUFDLEdBQUcsQ0FDUCxHQUFHLEVBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDLENBQ3ZELENBQ0Q7Z0JBQ0QsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXO29CQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUN4QyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2FBQzdCO1lBQ0QsTUFBTSxFQUFFLEtBQUs7U0FDYixDQUFDO1FBRUYsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdkQsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLGNBQWMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxlQUFlLENBQy9DLFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULElBQUksQ0FBQyxRQUFRLEVBQ2IsSUFBSSxDQUFDLFdBQVcsRUFDaEIsSUFBSSxDQUFDLFNBQVMsRUFDZCxJQUFJLENBQUMsU0FBUyxFQUNkLElBQUksQ0FBQyxVQUFVLENBQ2YsQ0FBQztJQUVGLElBQUksQ0FBQyxjQUFjO1FBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQzs7UUFDNUQsT0FBTyxjQUFjLENBQUM7QUFDNUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEZpbGU6IHNyYy9wYWxldHRlL21haW4vdHlwZXMvaGV4YWRpYy5qc1xuXG5pbXBvcnQgeyBHZW5QYWxldHRlQXJncywgSFNMLCBQYWxldHRlIH0gZnJvbSAnLi4vLi4vLi4vaW5kZXgvaW5kZXguanMnO1xuaW1wb3J0IHsgSURCTWFuYWdlciB9IGZyb20gJy4uLy4uLy4uL2lkYi9pbmRleC5qcyc7XG5pbXBvcnQgeyBjb3JlLCB1dGlscyB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9pbmRleC5qcyc7XG5pbXBvcnQgeyBkYXRhIH0gZnJvbSAnLi4vLi4vLi4vZGF0YS9pbmRleC5qcyc7XG5pbXBvcnQgeyBwYWxldHRlU3VwZXJVdGlscyB9IGZyb20gJy4uLy4uL2NvbW1vbi9pbmRleC5qcyc7XG5cbmNvbnN0IGNvbnN0cyA9IGRhdGEuY29uc3RzO1xuY29uc3QgY3JlYXRlID0gcGFsZXR0ZVN1cGVyVXRpbHMuY3JlYXRlO1xuY29uc3QgZGVmYXVsdHMgPSBkYXRhLmRlZmF1bHRzO1xuY29uc3QgZ2VuSHVlcyA9IHBhbGV0dGVTdXBlclV0aWxzLmdlbkh1ZXM7XG5jb25zdCBtb2RlID0gZGF0YS5tb2RlO1xuY29uc3QgcGFsZXR0ZVJhbmdlcyA9IGNvbnN0cy5wYWxldHRlUmFuZ2VzO1xuXG5jb25zdCBpZGIgPSBJREJNYW5hZ2VyLmdldEluc3RhbmNlKCk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoZXhhZGljKGFyZ3M6IEdlblBhbGV0dGVBcmdzKTogUHJvbWlzZTxQYWxldHRlPiB7XG5cdGNvbnN0IGN1cnJlbnRIZXhhZGljUGFsZXR0ZUlEID0gYXdhaXQgaWRiLmdldEN1cnJlbnRQYWxldHRlSUQoKTtcblxuXHRpZiAoYXJncy5udW1Cb3hlcyA8IDYpIHtcblx0XHRpZiAobW9kZS53YXJuTG9ncylcblx0XHRcdGNvbnNvbGUud2FybignSGV4YWRpYyBwYWxldHRlIHJlcXVpcmVzIGF0IGxlYXN0IDYgc3dhdGNoZXMuJyk7XG5cblx0XHRyZXR1cm4gdXRpbHMucGFsZXR0ZS5jcmVhdGVPYmplY3QoXG5cdFx0XHQnaGV4YWRpYycsXG5cdFx0XHRbXSxcblx0XHRcdGNvcmUuYnJhbmRDb2xvci5hc0hTTChkZWZhdWx0cy5jb2xvcnMuaHNsKSxcblx0XHRcdDAsXG5cdFx0XHRjdXJyZW50SGV4YWRpY1BhbGV0dGVJRCxcblx0XHRcdGFyZ3MuZW5hYmxlQWxwaGEsXG5cdFx0XHRhcmdzLmxpbWl0RGFyayxcblx0XHRcdGFyZ3MubGltaXRHcmF5LFxuXHRcdFx0YXJncy5saW1pdExpZ2h0XG5cdFx0KTtcblx0fVxuXG5cdGNvbnN0IGJhc2VDb2xvciA9IGNyZWF0ZS5iYXNlQ29sb3IoYXJncy5jdXN0b21Db2xvciwgYXJncy5lbmFibGVBbHBoYSk7XG5cdGNvbnN0IGh1ZXMgPSBnZW5IdWVzLmhleGFkaWMoYmFzZUNvbG9yKTtcblx0Y29uc3QgcGFsZXR0ZUl0ZW1zID0gaHVlcy5tYXAoKGh1ZSwgX2kpID0+IHtcblx0XHRjb25zdCBzYXR1cmF0aW9uU2hpZnQgPVxuXHRcdFx0TWF0aC5yYW5kb20oKSAqIHBhbGV0dGVSYW5nZXMuaGV4YWQuc2F0U2hpZnQgLVxuXHRcdFx0cGFsZXR0ZVJhbmdlcy5oZXhhZC5zYXRTaGlmdCAvIDI7XG5cdFx0Y29uc3QgbGlnaHRuZXNzU2hpZnQgPVxuXHRcdFx0TWF0aC5yYW5kb20oKSAqIHBhbGV0dGVSYW5nZXMuaGV4YWQubGlnaHRTaGlmdCAtXG5cdFx0XHRwYWxldHRlUmFuZ2VzLmhleGFkLmxpZ2h0U2hpZnQgLyAyO1xuXHRcdGNvbnN0IG5ld0NvbG9yOiBIU0wgPSB7XG5cdFx0XHR2YWx1ZToge1xuXHRcdFx0XHRodWU6IGNvcmUuYnJhbmQuYXNSYWRpYWwoaHVlKSxcblx0XHRcdFx0c2F0dXJhdGlvbjogY29yZS5icmFuZC5hc1BlcmNlbnRpbGUoXG5cdFx0XHRcdFx0TWF0aC5taW4oXG5cdFx0XHRcdFx0XHQxMDAsXG5cdFx0XHRcdFx0XHRNYXRoLm1heChcblx0XHRcdFx0XHRcdFx0MCxcblx0XHRcdFx0XHRcdFx0YmFzZUNvbG9yLnZhbHVlLnNhdHVyYXRpb24gKyBzYXR1cmF0aW9uU2hpZnRcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHQpXG5cdFx0XHRcdCksXG5cdFx0XHRcdGxpZ2h0bmVzczogY29yZS5icmFuZC5hc1BlcmNlbnRpbGUoXG5cdFx0XHRcdFx0TWF0aC5taW4oXG5cdFx0XHRcdFx0XHQxMDAsXG5cdFx0XHRcdFx0XHRNYXRoLm1heCgwLCBiYXNlQ29sb3IudmFsdWUubGlnaHRuZXNzICsgbGlnaHRuZXNzU2hpZnQpXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpLFxuXHRcdFx0XHRhbHBoYTogYXJncy5lbmFibGVBbHBoYVxuXHRcdFx0XHRcdD8gY29yZS5icmFuZC5hc0FscGhhUmFuZ2UoTWF0aC5yYW5kb20oKSlcblx0XHRcdFx0XHQ6IGNvcmUuYnJhbmQuYXNBbHBoYVJhbmdlKDEpXG5cdFx0XHR9LFxuXHRcdFx0Zm9ybWF0OiAnaHNsJ1xuXHRcdH07XG5cblx0XHRyZXR1cm4gY3JlYXRlLnBhbGV0dGVJdGVtKG5ld0NvbG9yLCBhcmdzLmVuYWJsZUFscGhhKTtcblx0fSk7XG5cblx0Y29uc3QgaGV4YWRpY1BhbGV0dGUgPSBhd2FpdCBpZGIuc2F2ZVBhbGV0dGVUb0RCKFxuXHRcdCdoZXhhZGljJyxcblx0XHRwYWxldHRlSXRlbXMsXG5cdFx0YmFzZUNvbG9yLFxuXHRcdGFyZ3MubnVtQm94ZXMsXG5cdFx0YXJncy5lbmFibGVBbHBoYSxcblx0XHRhcmdzLmxpbWl0RGFyayxcblx0XHRhcmdzLmxpbWl0R3JheSxcblx0XHRhcmdzLmxpbWl0TGlnaHRcblx0KTtcblxuXHRpZiAoIWhleGFkaWNQYWxldHRlKVxuXHRcdHRocm93IG5ldyBFcnJvcignSGV4YWRpYyBwYWxldHRlIGlzIGVpdGhlciBudWxsIG9yIHVuZGVmaW5lZC4nKTtcblx0ZWxzZSByZXR1cm4gaGV4YWRpY1BhbGV0dGU7XG59XG4iXX0=