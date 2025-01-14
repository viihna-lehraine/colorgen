// File: src/paletteGen/palettes/types/random.js
import { IDBManager } from '../../../idb/index.js';
import { paletteHelpers, paletteSuperUtils } from '../../common/index.js';
import { utils } from '../../../common/index.js';
const create = paletteSuperUtils.create;
const update = paletteHelpers.update;
const idb = IDBManager.getInstance();
export async function random(args) {
    const baseColor = create.baseColor(args.customColor, args.enableAlpha);
    const paletteItems = [
        await create.paletteItem(baseColor, args.enableAlpha)
    ];
    for (let i = 1; i < args.numBoxes; i++) {
        const randomColor = utils.random.hsl(args.enableAlpha);
        const nextPaletteItem = await create.paletteItem(randomColor, args.enableAlpha);
        paletteItems.push(nextPaletteItem);
        update.colorBox(randomColor, i);
    }
    const randomPalette = await idb.savePaletteToDB('random', paletteItems, baseColor, args.numBoxes, args.enableAlpha, args.limitDark, args.limitGray, args.limitLight);
    if (!randomPalette)
        throw new Error('Random palette is either null or undefined.');
    else
        return randomPalette;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZG9tLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3BhbGV0dGUvbWFpbi90eXBlcy9yYW5kb20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0RBQWdEO0FBR2hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRWpELE1BQU0sTUFBTSxHQUFHLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztBQUN4QyxNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDO0FBRXJDLE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUVyQyxNQUFNLENBQUMsS0FBSyxVQUFVLE1BQU0sQ0FBQyxJQUFvQjtJQUNoRCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3ZFLE1BQU0sWUFBWSxHQUFrQjtRQUNuQyxNQUFNLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUM7S0FDckQsQ0FBQztJQUVGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDeEMsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sZUFBZSxHQUFHLE1BQU0sTUFBTSxDQUFDLFdBQVcsQ0FDL0MsV0FBVyxFQUNYLElBQUksQ0FBQyxXQUFXLENBQ2hCLENBQUM7UUFFRixZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRW5DLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxNQUFNLGFBQWEsR0FBRyxNQUFNLEdBQUcsQ0FBQyxlQUFlLENBQzlDLFFBQVEsRUFDUixZQUFZLEVBQ1osU0FBUyxFQUNULElBQUksQ0FBQyxRQUFRLEVBQ2IsSUFBSSxDQUFDLFdBQVcsRUFDaEIsSUFBSSxDQUFDLFNBQVMsRUFDZCxJQUFJLENBQUMsU0FBUyxFQUNkLElBQUksQ0FBQyxVQUFVLENBQ2YsQ0FBQztJQUVGLElBQUksQ0FBQyxhQUFhO1FBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQzs7UUFDM0QsT0FBTyxhQUFhLENBQUM7QUFDM0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEZpbGU6IHNyYy9wYWxldHRlR2VuL3BhbGV0dGVzL3R5cGVzL3JhbmRvbS5qc1xuXG5pbXBvcnQgeyBHZW5QYWxldHRlQXJncywgUGFsZXR0ZSwgUGFsZXR0ZUl0ZW0gfSBmcm9tICcuLi8uLi8uLi9pbmRleC9pbmRleC5qcyc7XG5pbXBvcnQgeyBJREJNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vLi4vaWRiL2luZGV4LmpzJztcbmltcG9ydCB7IHBhbGV0dGVIZWxwZXJzLCBwYWxldHRlU3VwZXJVdGlscyB9IGZyb20gJy4uLy4uL2NvbW1vbi9pbmRleC5qcyc7XG5pbXBvcnQgeyB1dGlscyB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9pbmRleC5qcyc7XG5cbmNvbnN0IGNyZWF0ZSA9IHBhbGV0dGVTdXBlclV0aWxzLmNyZWF0ZTtcbmNvbnN0IHVwZGF0ZSA9IHBhbGV0dGVIZWxwZXJzLnVwZGF0ZTtcblxuY29uc3QgaWRiID0gSURCTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmFuZG9tKGFyZ3M6IEdlblBhbGV0dGVBcmdzKTogUHJvbWlzZTxQYWxldHRlPiB7XG5cdGNvbnN0IGJhc2VDb2xvciA9IGNyZWF0ZS5iYXNlQ29sb3IoYXJncy5jdXN0b21Db2xvciwgYXJncy5lbmFibGVBbHBoYSk7XG5cdGNvbnN0IHBhbGV0dGVJdGVtczogUGFsZXR0ZUl0ZW1bXSA9IFtcblx0XHRhd2FpdCBjcmVhdGUucGFsZXR0ZUl0ZW0oYmFzZUNvbG9yLCBhcmdzLmVuYWJsZUFscGhhKVxuXHRdO1xuXG5cdGZvciAobGV0IGkgPSAxOyBpIDwgYXJncy5udW1Cb3hlczsgaSsrKSB7XG5cdFx0Y29uc3QgcmFuZG9tQ29sb3IgPSB1dGlscy5yYW5kb20uaHNsKGFyZ3MuZW5hYmxlQWxwaGEpO1xuXHRcdGNvbnN0IG5leHRQYWxldHRlSXRlbSA9IGF3YWl0IGNyZWF0ZS5wYWxldHRlSXRlbShcblx0XHRcdHJhbmRvbUNvbG9yLFxuXHRcdFx0YXJncy5lbmFibGVBbHBoYVxuXHRcdCk7XG5cblx0XHRwYWxldHRlSXRlbXMucHVzaChuZXh0UGFsZXR0ZUl0ZW0pO1xuXG5cdFx0dXBkYXRlLmNvbG9yQm94KHJhbmRvbUNvbG9yLCBpKTtcblx0fVxuXG5cdGNvbnN0IHJhbmRvbVBhbGV0dGUgPSBhd2FpdCBpZGIuc2F2ZVBhbGV0dGVUb0RCKFxuXHRcdCdyYW5kb20nLFxuXHRcdHBhbGV0dGVJdGVtcyxcblx0XHRiYXNlQ29sb3IsXG5cdFx0YXJncy5udW1Cb3hlcyxcblx0XHRhcmdzLmVuYWJsZUFscGhhLFxuXHRcdGFyZ3MubGltaXREYXJrLFxuXHRcdGFyZ3MubGltaXRHcmF5LFxuXHRcdGFyZ3MubGltaXRMaWdodFxuXHQpO1xuXG5cdGlmICghcmFuZG9tUGFsZXR0ZSlcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1JhbmRvbSBwYWxldHRlIGlzIGVpdGhlciBudWxsIG9yIHVuZGVmaW5lZC4nKTtcblx0ZWxzZSByZXR1cm4gcmFuZG9tUGFsZXR0ZTtcbn1cbiJdfQ==