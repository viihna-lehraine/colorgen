// File: src/palette/common/paletteSuperUtils/create.js
import { convert, core, utils } from '../../../common/index.js';
import { idbInstance } from '../../../db/instance.js';
import { paletteHelpers } from '../paletteHelpers/index.js';
const limits = paletteHelpers.limits;
const update = paletteHelpers.update;
const hslTo = convert.hslTo;
function baseColor(customColor, enableAlpha) {
    const color = core.base.clone(customColor ?? utils.random.hsl(enableAlpha));
    return color;
}
async function paletteItem(color, enableAlpha) {
    const clonedColor = core.base.clone(color);
    const nextPaletteID = await idbInstance.getNextPaletteID();
    clonedColor.value.alpha = enableAlpha
        ? core.brand.asAlphaRange(Math.random())
        : core.brand.asAlphaRange(1);
    return {
        id: nextPaletteID ?? 0, // *DEV-NOTE* re-write to auto-increment items in same palette
        colors: {
            cmyk: hslTo(clonedColor, 'cmyk').value,
            hex: hslTo(clonedColor, 'hex').value,
            hsl: clonedColor.value,
            hsv: hslTo(clonedColor, 'hsv').value,
            lab: hslTo(clonedColor, 'lab').value,
            rgb: hslTo(clonedColor, 'rgb').value,
            xyz: hslTo(clonedColor, 'xyz').value
        },
        colorStrings: {
            cmykString: utils.color.colorToColorString(hslTo(clonedColor, 'cmyk')).value,
            hexString: utils.color.colorToColorString(hslTo(clonedColor, 'hex')).value,
            hslString: utils.color.colorToColorString(clonedColor).value,
            hsvString: utils.color.colorToColorString(hslTo(clonedColor, 'hsv')).value,
            labString: utils.color.colorToColorString(hslTo(clonedColor, 'lab')).value,
            rgbString: utils.color.colorToColorString(hslTo(clonedColor, 'rgb')).value,
            xyzString: utils.color.colorToColorString(hslTo(clonedColor, 'xyz')).value
        },
        cssStrings: {
            cmykCSSString: core.convert.colorToCSSColorString(hslTo(clonedColor, 'cmyk')),
            hexCSSString: core.convert.colorToCSSColorString(hslTo(clonedColor, 'hex')),
            hslCSSString: core.convert.colorToCSSColorString(clonedColor),
            hsvCSSString: core.convert.colorToCSSColorString(hslTo(clonedColor, 'hsv')),
            labCSSString: core.convert.colorToCSSColorString(hslTo(clonedColor, 'lab')),
            rgbCSSString: core.convert.colorToCSSColorString(hslTo(clonedColor, 'rgb')),
            xyzCSSString: core.convert.colorToCSSColorString(hslTo(clonedColor, 'xyz'))
        }
    };
}
async function paletteItemArray(baseColor, hues, enableAlpha, limitDark, limitGray, limitLight) {
    const paletteItems = [
        await paletteItem(baseColor, enableAlpha)
    ];
    for (const [i, hue] of hues.entries()) {
        let newColor = null;
        do {
            const sl = utils.random.sl(enableAlpha);
            newColor = utils.conversion.genAllColorValues({
                value: {
                    hue: core.brand.asRadial(hue),
                    ...sl.value
                },
                format: 'hsl'
            }).hsl;
        } while (newColor &&
            ((limitGray && limits.isTooGray(newColor)) ||
                (limitDark && limits.isTooDark(newColor)) ||
                (limitLight && limits.isTooLight(newColor))));
        if (newColor) {
            const newPaletteItem = await paletteItem(newColor, enableAlpha);
            paletteItems.push(newPaletteItem);
            update.colorBox(newColor, i + 1);
        }
    }
    return paletteItems;
}
export const create = {
    baseColor,
    paletteItem,
    paletteItemArray
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3BhbGV0dGUvY29tbW9uL3BhbGV0dGVTdXBlclV0aWxzL2NyZWF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx1REFBdUQ7QUFxQnZELE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFNUQsTUFBTSxNQUFNLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQztBQUNyQyxNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDO0FBRXJDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7QUFFNUIsU0FBUyxTQUFTLENBQUMsV0FBdUIsRUFBRSxXQUFvQjtJQUMvRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUU1RSxPQUFPLEtBQVksQ0FBQztBQUNyQixDQUFDO0FBRUQsS0FBSyxVQUFVLFdBQVcsQ0FDekIsS0FBVSxFQUNWLFdBQW9CO0lBRXBCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBUSxDQUFDO0lBQ2xELE1BQU0sYUFBYSxHQUFHLE1BQU0sV0FBVyxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFFM0QsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsV0FBVztRQUNwQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3hDLENBQUMsQ0FB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LENBQUM7SUFFRCxPQUFPLFlBQVksQ0FBQztBQUNyQixDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFvQztJQUN0RCxTQUFTO0lBQ1QsV0FBVztJQUNYLGdCQUFnQjtDQUNQLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBGaWxlOiBzcmMvcGFsZXR0ZS9jb21tb24vcGFsZXR0ZVN1cGVyVXRpbHMvY3JlYXRlLmpzXG5cbmltcG9ydCB7XG5cdENNWUssXG5cdENNWUtTdHJpbmcsXG5cdEhleCxcblx0SGV4U3RyaW5nLFxuXHRIU0wsXG5cdEhTTFN0cmluZyxcblx0SFNWLFxuXHRIU1ZTdHJpbmcsXG5cdExBQixcblx0TEFCU3RyaW5nLFxuXHRQYWxldHRlQ29tbW9uX1N1cGVyVXRpbHNfQ3JlYXRlLFxuXHRQYWxldHRlSXRlbSxcblx0UkdCLFxuXHRSR0JTdHJpbmcsXG5cdFNMLFxuXHRYWVosXG5cdFhZWlN0cmluZ1xufSBmcm9tICcuLi8uLi8uLi9pbmRleC9pbmRleC5qcyc7XG5pbXBvcnQgeyBjb252ZXJ0LCBjb3JlLCB1dGlscyB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9pbmRleC5qcyc7XG5pbXBvcnQgeyBpZGJJbnN0YW5jZSB9IGZyb20gJy4uLy4uLy4uL2RiL2luc3RhbmNlLmpzJztcbmltcG9ydCB7IHBhbGV0dGVIZWxwZXJzIH0gZnJvbSAnLi4vcGFsZXR0ZUhlbHBlcnMvaW5kZXguanMnO1xuXG5jb25zdCBsaW1pdHMgPSBwYWxldHRlSGVscGVycy5saW1pdHM7XG5jb25zdCB1cGRhdGUgPSBwYWxldHRlSGVscGVycy51cGRhdGU7XG5cbmNvbnN0IGhzbFRvID0gY29udmVydC5oc2xUbztcblxuZnVuY3Rpb24gYmFzZUNvbG9yKGN1c3RvbUNvbG9yOiBIU0wgfCBudWxsLCBlbmFibGVBbHBoYTogYm9vbGVhbik6IEhTTCB7XG5cdGNvbnN0IGNvbG9yID0gY29yZS5iYXNlLmNsb25lKGN1c3RvbUNvbG9yID8/IHV0aWxzLnJhbmRvbS5oc2woZW5hYmxlQWxwaGEpKTtcblxuXHRyZXR1cm4gY29sb3IgYXMgSFNMO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwYWxldHRlSXRlbShcblx0Y29sb3I6IEhTTCxcblx0ZW5hYmxlQWxwaGE6IGJvb2xlYW5cbik6IFByb21pc2U8UGFsZXR0ZUl0ZW0+IHtcblx0Y29uc3QgY2xvbmVkQ29sb3IgPSBjb3JlLmJhc2UuY2xvbmUoY29sb3IpIGFzIEhTTDtcblx0Y29uc3QgbmV4dFBhbGV0dGVJRCA9IGF3YWl0IGlkYkluc3RhbmNlLmdldE5leHRQYWxldHRlSUQoKTtcblxuXHRjbG9uZWRDb2xvci52YWx1ZS5hbHBoYSA9IGVuYWJsZUFscGhhXG5cdFx0PyBjb3JlLmJyYW5kLmFzQWxwaGFSYW5nZShNYXRoLnJhbmRvbSgpKVxuXHRcdDogY29yZS5icmFuZC5hc0FscGhhUmFuZ2UoMSk7XG5cblx0cmV0dXJuIHtcblx0XHRpZDogbmV4dFBhbGV0dGVJRCA/PyAwLCAvLyAqREVWLU5PVEUqIHJlLXdyaXRlIHRvIGF1dG8taW5jcmVtZW50IGl0ZW1zIGluIHNhbWUgcGFsZXR0ZVxuXHRcdGNvbG9yczoge1xuXHRcdFx0Y215azogKGhzbFRvKGNsb25lZENvbG9yLCAnY215aycpIGFzIENNWUspLnZhbHVlLFxuXHRcdFx0aGV4OiAoaHNsVG8oY2xvbmVkQ29sb3IsICdoZXgnKSBhcyBIZXgpLnZhbHVlLFxuXHRcdFx0aHNsOiBjbG9uZWRDb2xvci52YWx1ZSxcblx0XHRcdGhzdjogKGhzbFRvKGNsb25lZENvbG9yLCAnaHN2JykgYXMgSFNWKS52YWx1ZSxcblx0XHRcdGxhYjogKGhzbFRvKGNsb25lZENvbG9yLCAnbGFiJykgYXMgTEFCKS52YWx1ZSxcblx0XHRcdHJnYjogKGhzbFRvKGNsb25lZENvbG9yLCAncmdiJykgYXMgUkdCKS52YWx1ZSxcblx0XHRcdHh5ejogKGhzbFRvKGNsb25lZENvbG9yLCAneHl6JykgYXMgWFlaKS52YWx1ZVxuXHRcdH0sXG5cdFx0Y29sb3JTdHJpbmdzOiB7XG5cdFx0XHRjbXlrU3RyaW5nOiAoXG5cdFx0XHRcdHV0aWxzLmNvbG9yLmNvbG9yVG9Db2xvclN0cmluZyhcblx0XHRcdFx0XHRoc2xUbyhjbG9uZWRDb2xvciwgJ2NteWsnKVxuXHRcdFx0XHQpIGFzIENNWUtTdHJpbmdcblx0XHRcdCkudmFsdWUsXG5cdFx0XHRoZXhTdHJpbmc6IChcblx0XHRcdFx0dXRpbHMuY29sb3IuY29sb3JUb0NvbG9yU3RyaW5nKFxuXHRcdFx0XHRcdGhzbFRvKGNsb25lZENvbG9yLCAnaGV4Jylcblx0XHRcdFx0KSBhcyBIZXhTdHJpbmdcblx0XHRcdCkudmFsdWUsXG5cdFx0XHRoc2xTdHJpbmc6IChcblx0XHRcdFx0dXRpbHMuY29sb3IuY29sb3JUb0NvbG9yU3RyaW5nKGNsb25lZENvbG9yKSBhcyBIU0xTdHJpbmdcblx0XHRcdCkudmFsdWUsXG5cdFx0XHRoc3ZTdHJpbmc6IChcblx0XHRcdFx0dXRpbHMuY29sb3IuY29sb3JUb0NvbG9yU3RyaW5nKFxuXHRcdFx0XHRcdGhzbFRvKGNsb25lZENvbG9yLCAnaHN2Jylcblx0XHRcdFx0KSBhcyBIU1ZTdHJpbmdcblx0XHRcdCkudmFsdWUsXG5cdFx0XHRsYWJTdHJpbmc6IChcblx0XHRcdFx0dXRpbHMuY29sb3IuY29sb3JUb0NvbG9yU3RyaW5nKFxuXHRcdFx0XHRcdGhzbFRvKGNsb25lZENvbG9yLCAnbGFiJylcblx0XHRcdFx0KSBhcyBMQUJTdHJpbmdcblx0XHRcdCkudmFsdWUsXG5cdFx0XHRyZ2JTdHJpbmc6IChcblx0XHRcdFx0dXRpbHMuY29sb3IuY29sb3JUb0NvbG9yU3RyaW5nKFxuXHRcdFx0XHRcdGhzbFRvKGNsb25lZENvbG9yLCAncmdiJylcblx0XHRcdFx0KSBhcyBSR0JTdHJpbmdcblx0XHRcdCkudmFsdWUsXG5cdFx0XHR4eXpTdHJpbmc6IChcblx0XHRcdFx0dXRpbHMuY29sb3IuY29sb3JUb0NvbG9yU3RyaW5nKFxuXHRcdFx0XHRcdGhzbFRvKGNsb25lZENvbG9yLCAneHl6Jylcblx0XHRcdFx0KSBhcyBYWVpTdHJpbmdcblx0XHRcdCkudmFsdWVcblx0XHR9LFxuXHRcdGNzc1N0cmluZ3M6IHtcblx0XHRcdGNteWtDU1NTdHJpbmc6IGNvcmUuY29udmVydC5jb2xvclRvQ1NTQ29sb3JTdHJpbmcoXG5cdFx0XHRcdGhzbFRvKGNsb25lZENvbG9yLCAnY215aycpXG5cdFx0XHQpLFxuXHRcdFx0aGV4Q1NTU3RyaW5nOiBjb3JlLmNvbnZlcnQuY29sb3JUb0NTU0NvbG9yU3RyaW5nKFxuXHRcdFx0XHRoc2xUbyhjbG9uZWRDb2xvciwgJ2hleCcpXG5cdFx0XHQpLFxuXHRcdFx0aHNsQ1NTU3RyaW5nOiBjb3JlLmNvbnZlcnQuY29sb3JUb0NTU0NvbG9yU3RyaW5nKGNsb25lZENvbG9yKSxcblx0XHRcdGhzdkNTU1N0cmluZzogY29yZS5jb252ZXJ0LmNvbG9yVG9DU1NDb2xvclN0cmluZyhcblx0XHRcdFx0aHNsVG8oY2xvbmVkQ29sb3IsICdoc3YnKVxuXHRcdFx0KSxcblx0XHRcdGxhYkNTU1N0cmluZzogY29yZS5jb252ZXJ0LmNvbG9yVG9DU1NDb2xvclN0cmluZyhcblx0XHRcdFx0aHNsVG8oY2xvbmVkQ29sb3IsICdsYWInKVxuXHRcdFx0KSxcblx0XHRcdHJnYkNTU1N0cmluZzogY29yZS5jb252ZXJ0LmNvbG9yVG9DU1NDb2xvclN0cmluZyhcblx0XHRcdFx0aHNsVG8oY2xvbmVkQ29sb3IsICdyZ2InKVxuXHRcdFx0KSxcblx0XHRcdHh5ekNTU1N0cmluZzogY29yZS5jb252ZXJ0LmNvbG9yVG9DU1NDb2xvclN0cmluZyhcblx0XHRcdFx0aHNsVG8oY2xvbmVkQ29sb3IsICd4eXonKVxuXHRcdFx0KVxuXHRcdH1cblx0fTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcGFsZXR0ZUl0ZW1BcnJheShcblx0YmFzZUNvbG9yOiBIU0wsXG5cdGh1ZXM6IG51bWJlcltdLFxuXHRlbmFibGVBbHBoYTogYm9vbGVhbixcblx0bGltaXREYXJrOiBib29sZWFuLFxuXHRsaW1pdEdyYXk6IGJvb2xlYW4sXG5cdGxpbWl0TGlnaHQ6IGJvb2xlYW5cbik6IFByb21pc2U8UGFsZXR0ZUl0ZW1bXT4ge1xuXHRjb25zdCBwYWxldHRlSXRlbXM6IFBhbGV0dGVJdGVtW10gPSBbXG5cdFx0YXdhaXQgcGFsZXR0ZUl0ZW0oYmFzZUNvbG9yLCBlbmFibGVBbHBoYSlcblx0XTtcblxuXHRmb3IgKGNvbnN0IFtpLCBodWVdIG9mIGh1ZXMuZW50cmllcygpKSB7XG5cdFx0bGV0IG5ld0NvbG9yOiBIU0wgfCBudWxsID0gbnVsbDtcblxuXHRcdGRvIHtcblx0XHRcdGNvbnN0IHNsID0gdXRpbHMucmFuZG9tLnNsKGVuYWJsZUFscGhhKSBhcyBTTDtcblxuXHRcdFx0bmV3Q29sb3IgPSB1dGlscy5jb252ZXJzaW9uLmdlbkFsbENvbG9yVmFsdWVzKHtcblx0XHRcdFx0dmFsdWU6IHtcblx0XHRcdFx0XHRodWU6IGNvcmUuYnJhbmQuYXNSYWRpYWwoaHVlKSxcblx0XHRcdFx0XHQuLi5zbC52YWx1ZVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRmb3JtYXQ6ICdoc2wnXG5cdFx0XHR9KS5oc2wgYXMgSFNMO1xuXHRcdH0gd2hpbGUgKFxuXHRcdFx0bmV3Q29sb3IgJiZcblx0XHRcdCgobGltaXRHcmF5ICYmIGxpbWl0cy5pc1Rvb0dyYXkobmV3Q29sb3IpKSB8fFxuXHRcdFx0XHQobGltaXREYXJrICYmIGxpbWl0cy5pc1Rvb0RhcmsobmV3Q29sb3IpKSB8fFxuXHRcdFx0XHQobGltaXRMaWdodCAmJiBsaW1pdHMuaXNUb29MaWdodChuZXdDb2xvcikpKVxuXHRcdCk7XG5cblx0XHRpZiAobmV3Q29sb3IpIHtcblx0XHRcdGNvbnN0IG5ld1BhbGV0dGVJdGVtID0gYXdhaXQgcGFsZXR0ZUl0ZW0obmV3Q29sb3IsIGVuYWJsZUFscGhhKTtcblxuXHRcdFx0cGFsZXR0ZUl0ZW1zLnB1c2gobmV3UGFsZXR0ZUl0ZW0pO1xuXG5cdFx0XHR1cGRhdGUuY29sb3JCb3gobmV3Q29sb3IsIGkgKyAxKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcGFsZXR0ZUl0ZW1zO1xufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlOiBQYWxldHRlQ29tbW9uX1N1cGVyVXRpbHNfQ3JlYXRlID0ge1xuXHRiYXNlQ29sb3IsXG5cdHBhbGV0dGVJdGVtLFxuXHRwYWxldHRlSXRlbUFycmF5XG59IGFzIGNvbnN0O1xuIl19