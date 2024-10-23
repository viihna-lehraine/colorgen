import { random } from '../utils/color-randomizer.js';
import { genAllColorValues } from '../color-conversion/conversion.js';
export function genAnalogousHues(color, numBoxes) {
    const analogousHues = [];
    const baseHue = color.value.hue;
    const maxTotalDistance = 60;
    const minTotalDistance = 10 + (numBoxes - 2) * 9;
    const totalIncrement = Math.floor(Math.random() * (maxTotalDistance - minTotalDistance + 1)) +
        minTotalDistance;
    const increment = Math.floor(totalIncrement / (numBoxes - 1));
    for (let i = 1; i < numBoxes; i++) {
        analogousHues.push((baseHue + increment * i) % 360);
    }
    return analogousHues;
}
export function genAnalogousPalette(numBoxes, customColor = null, initialColorSpace = 'hex') {
    if (numBoxes < 2) {
        window.alert('To generate an analogous palette, please select a number of swatches greater than 1');
        return [];
    }
    const colors = [];
    const baseColorValues = customColor
        ? genAllColorValues(customColor)
        : genAllColorValues(random.randomColor(initialColorSpace));
    const baseColor = baseColorValues[initialColorSpace];
    if (!baseColor) {
        throw new Error('Base color is missin in the generated values');
    }
    colors.push(baseColor);
    const analogousHues = genAnalogousHues(baseColorValues.hsl, numBoxes);
    analogousHues.forEach((hue, i) => {
        const sl = random.randomSL();
        const analogousColorValues = genAllColorValues({
            value: {
                hue,
                saturation: sl.value.saturation,
                lightness: sl.value.lightness
            },
            format: 'hsl'
        });
        const analogousColor = analogousColorValues.hsl;
        if (analogousColor) {
            colors.push(analogousColor);
        }
        const colorBox = document.getElementById(`color-box-${i + 2}`);
        if (colorBox) {
            const hexValue = analogousColorValues.hex;
            colorBox.style.backgroundColor = hexValue ? hexValue.value.hex : '';
        }
    });
    return colors;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbG9nb3VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhbGV0dGUtZ2VuL2FuYWxvZ291cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFbkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFbkUsTUFBTSxVQUFVLGdCQUFnQixDQUFDLEtBQWdCLEVBQUUsUUFBZ0I7SUFDbEUsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQ3pCLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ2hDLE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0lBQzVCLE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxHQUFHLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqRCxNQUFNLGNBQWMsR0FDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyRSxnQkFBZ0IsQ0FBQztJQUNsQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTlELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNuQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsT0FBTyxhQUFhLENBQUM7QUFDdEIsQ0FBQztBQUVELE1BQU0sVUFBVSxtQkFBbUIsQ0FDbEMsUUFBZ0IsRUFDaEIsY0FBa0MsSUFBSSxFQUN0QyxvQkFBc0MsS0FBSztJQUUzQyxJQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUNsQixNQUFNLENBQUMsS0FBSyxDQUNYLHFGQUFxRixDQUNyRixDQUFDO1FBRUYsT0FBTyxFQUFFLENBQUM7SUFDWCxDQUFDO0lBRUQsTUFBTSxNQUFNLEdBQWtCLEVBQUUsQ0FBQztJQUNqQyxNQUFNLGVBQWUsR0FBRyxXQUFXO1FBQ2xDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUM7UUFDaEMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQzVELE1BQU0sU0FBUyxHQUFHLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBRXJELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFdkIsTUFBTSxhQUFhLEdBQUcsZ0JBQWdCLENBQ3JDLGVBQWUsQ0FBQyxHQUFnQixFQUNoQyxRQUFRLENBQ1IsQ0FBQztJQUVGLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDaEMsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzdCLE1BQU0sb0JBQW9CLEdBQUcsaUJBQWlCLENBQUM7WUFDOUMsS0FBSyxFQUFFO2dCQUNOLEdBQUc7Z0JBQ0gsVUFBVSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVTtnQkFDL0IsU0FBUyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUzthQUM3QjtZQUNELE1BQU0sRUFBRSxLQUFLO1NBQ2IsQ0FBQyxDQUFDO1FBRUgsTUFBTSxjQUFjLEdBQUcsb0JBQW9CLENBQUMsR0FBRyxDQUFDO1FBRWhELElBQUksY0FBYyxFQUFFLENBQUM7WUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBRUQsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRS9ELElBQUksUUFBUSxFQUFFLENBQUM7WUFDZCxNQUFNLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQyxHQUE0QixDQUFDO1lBQ25FLFFBQVEsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNyRSxDQUFDO0lBQ0YsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLE1BQU0sQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByYW5kb20gfSBmcm9tICcuLi91dGlscy9jb2xvci1yYW5kb21pemVyJztcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4uL2luZGV4JztcbmltcG9ydCB7IGdlbkFsbENvbG9yVmFsdWVzIH0gZnJvbSAnLi4vY29sb3ItY29udmVyc2lvbi9jb252ZXJzaW9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdlbkFuYWxvZ291c0h1ZXMoY29sb3I6IHR5cGVzLkhTTCwgbnVtQm94ZXM6IG51bWJlcik6IG51bWJlcltdIHtcblx0Y29uc3QgYW5hbG9nb3VzSHVlcyA9IFtdO1xuXHRjb25zdCBiYXNlSHVlID0gY29sb3IudmFsdWUuaHVlO1xuXHRjb25zdCBtYXhUb3RhbERpc3RhbmNlID0gNjA7XG5cdGNvbnN0IG1pblRvdGFsRGlzdGFuY2UgPSAxMCArIChudW1Cb3hlcyAtIDIpICogOTtcblx0Y29uc3QgdG90YWxJbmNyZW1lbnQgPVxuXHRcdE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXhUb3RhbERpc3RhbmNlIC0gbWluVG90YWxEaXN0YW5jZSArIDEpKSArXG5cdFx0bWluVG90YWxEaXN0YW5jZTtcblx0Y29uc3QgaW5jcmVtZW50ID0gTWF0aC5mbG9vcih0b3RhbEluY3JlbWVudCAvIChudW1Cb3hlcyAtIDEpKTtcblxuXHRmb3IgKGxldCBpID0gMTsgaSA8IG51bUJveGVzOyBpKyspIHtcblx0XHRhbmFsb2dvdXNIdWVzLnB1c2goKGJhc2VIdWUgKyBpbmNyZW1lbnQgKiBpKSAlIDM2MCk7XG5cdH1cblxuXHRyZXR1cm4gYW5hbG9nb3VzSHVlcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbkFuYWxvZ291c1BhbGV0dGUoXG5cdG51bUJveGVzOiBudW1iZXIsXG5cdGN1c3RvbUNvbG9yOiB0eXBlcy5Db2xvciB8IG51bGwgPSBudWxsLFxuXHRpbml0aWFsQ29sb3JTcGFjZTogdHlwZXMuQ29sb3JTcGFjZSA9ICdoZXgnXG4pOiB0eXBlcy5Db2xvcltdIHtcblx0aWYgKG51bUJveGVzIDwgMikge1xuXHRcdHdpbmRvdy5hbGVydChcblx0XHRcdCdUbyBnZW5lcmF0ZSBhbiBhbmFsb2dvdXMgcGFsZXR0ZSwgcGxlYXNlIHNlbGVjdCBhIG51bWJlciBvZiBzd2F0Y2hlcyBncmVhdGVyIHRoYW4gMSdcblx0XHQpO1xuXG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cblx0Y29uc3QgY29sb3JzOiB0eXBlcy5Db2xvcltdID0gW107XG5cdGNvbnN0IGJhc2VDb2xvclZhbHVlcyA9IGN1c3RvbUNvbG9yXG5cdFx0PyBnZW5BbGxDb2xvclZhbHVlcyhjdXN0b21Db2xvcilcblx0XHQ6IGdlbkFsbENvbG9yVmFsdWVzKHJhbmRvbS5yYW5kb21Db2xvcihpbml0aWFsQ29sb3JTcGFjZSkpO1xuXHRjb25zdCBiYXNlQ29sb3IgPSBiYXNlQ29sb3JWYWx1ZXNbaW5pdGlhbENvbG9yU3BhY2VdO1xuXG5cdGlmICghYmFzZUNvbG9yKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdCYXNlIGNvbG9yIGlzIG1pc3NpbiBpbiB0aGUgZ2VuZXJhdGVkIHZhbHVlcycpO1xuXHR9XG5cblx0Y29sb3JzLnB1c2goYmFzZUNvbG9yKTtcblxuXHRjb25zdCBhbmFsb2dvdXNIdWVzID0gZ2VuQW5hbG9nb3VzSHVlcyhcblx0XHRiYXNlQ29sb3JWYWx1ZXMuaHNsIGFzIHR5cGVzLkhTTCxcblx0XHRudW1Cb3hlc1xuXHQpO1xuXG5cdGFuYWxvZ291c0h1ZXMuZm9yRWFjaCgoaHVlLCBpKSA9PiB7XG5cdFx0Y29uc3Qgc2wgPSByYW5kb20ucmFuZG9tU0woKTtcblx0XHRjb25zdCBhbmFsb2dvdXNDb2xvclZhbHVlcyA9IGdlbkFsbENvbG9yVmFsdWVzKHtcblx0XHRcdHZhbHVlOiB7XG5cdFx0XHRcdGh1ZSxcblx0XHRcdFx0c2F0dXJhdGlvbjogc2wudmFsdWUuc2F0dXJhdGlvbixcblx0XHRcdFx0bGlnaHRuZXNzOiBzbC52YWx1ZS5saWdodG5lc3Ncblx0XHRcdH0sXG5cdFx0XHRmb3JtYXQ6ICdoc2wnXG5cdFx0fSk7XG5cblx0XHRjb25zdCBhbmFsb2dvdXNDb2xvciA9IGFuYWxvZ291c0NvbG9yVmFsdWVzLmhzbDtcblxuXHRcdGlmIChhbmFsb2dvdXNDb2xvcikge1xuXHRcdFx0Y29sb3JzLnB1c2goYW5hbG9nb3VzQ29sb3IpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGNvbG9yQm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGNvbG9yLWJveC0ke2kgKyAyfWApO1xuXG5cdFx0aWYgKGNvbG9yQm94KSB7XG5cdFx0XHRjb25zdCBoZXhWYWx1ZSA9IGFuYWxvZ291c0NvbG9yVmFsdWVzLmhleCBhcyB0eXBlcy5IZXggfCB1bmRlZmluZWQ7XG5cdFx0XHRjb2xvckJveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBoZXhWYWx1ZSA/IGhleFZhbHVlLnZhbHVlLmhleCA6ICcnO1xuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuIGNvbG9ycztcbn1cbiJdfQ==