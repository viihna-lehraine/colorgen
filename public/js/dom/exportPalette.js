// File: src/dom/exportPalette.ts
function asCSS(palette, colorSpace = 'hsl') {
    const css = palette.items
        .map(item => {
        const colorValue = (() => {
            switch (colorSpace) {
                case 'cmyk':
                    return item.cssStrings.cmykCSSString;
                case 'hex':
                    return item.cssStrings.hexCSSString;
                case 'hsl':
                    return item.cssStrings.hslCSSString;
                case 'hsv':
                    return item.cssStrings.hsvCSSString;
                case 'lab':
                    return item.cssStrings.labCSSString;
                case 'rgb':
                    return item.cssStrings.rgbCSSString;
                case 'xyz':
                    return item.cssStrings.xyzCSSString;
                default:
                    return item.cssStrings.hslCSSString;
            }
        })();
        return `
            /* Palette Item: ${item.id} */
            .color-${item.id} {
                cmyk-color: ${item.cssStrings.cmykCSSString};
                hex-color: ${item.cssStrings.hexCSSString};
                hsl-color: ${item.cssStrings.hslCSSString};
                hsv-color: ${item.cssStrings.hsvCSSString};
                lab-color: ${item.cssStrings.labCSSString};
                rgb-color: ${item.cssStrings.rgbCSSString};
                xyz-color: ${item.cssStrings.xyzCSSString};
                background-color: ${colorValue}; /* Use selected color space */
            }
        `;
    })
        .join('\n');
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `palette_${palette.id}.css`;
    a.click();
    URL.revokeObjectURL(url);
}
function asJSON(palette) {
    const json = JSON.stringify(palette, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `palette_${palette.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
}
function asPNG(palette, colorSpace = 'hsl', paletteName) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const swatchSize = 100;
    const padding = 20;
    const labelHeight = 40;
    const titleHeight = paletteName ? 60 : 0;
    canvas.width = (swatchSize + padding) * palette.items.length + padding;
    canvas.height = swatchSize + labelHeight + titleHeight + 2 * padding;
    if (!context)
        throw new Error('Could not get 2d context');
    context.fillStyle = '#f0f0f0ff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    if (paletteName) {
        context.font = '22px Arial';
        context.fillStyle = '#1e1e1eff';
        context.textAlign = 'center';
        context.fillText(paletteName, canvas.width / 2, padding + titleHeight / 2);
    }
    palette.items.forEach((item, index) => {
        const x = padding + index * (swatchSize + padding);
        const y = padding + titleHeight;
        const fillColor = (() => {
            switch (colorSpace) {
                case 'cmyk':
                    return item.cssStrings.cmykCSSString;
                case 'hex':
                    return item.cssStrings.hexCSSString;
                case 'hsl':
                    return item.cssStrings.hslCSSString;
                case 'hsv':
                    return item.cssStrings.hsvCSSString;
                case 'lab':
                    return item.cssStrings.labCSSString;
                case 'rgb':
                    return item.cssStrings.rgbCSSString;
                default:
                    return item.cssStrings.hslCSSString;
            }
        })();
        const colorLabel = fillColor;
        context.fillStyle = fillColor;
        context.fillRect(x, y, swatchSize, swatchSize);
        context.font = '12px Arial';
        context.fillStyle = '#0a0a0aff';
        context.textAlign = 'center';
        context.fillText(colorLabel, x + swatchSize / 2, y + swatchSize + labelHeight - 5);
    });
    canvas.toBlob(blob => {
        if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `palette_${palette.id}.png`;
            a.click();
            URL.revokeObjectURL(url);
        }
        else {
            console.error('Failed to create PNG blob.');
        }
    }, 'image/png');
}
function asXML(palette) {
    const xmlItems = palette.items
        .map(item => `
		<PaletteItem "${item.id}>
			<Colors>
				<CMYK>${item.colors.cmyk}</CMYK>
				<Hex>${item.colors.hex}</Hex>
				<HSL>${item.colors.hsl}</HSL>
				<HSV>${item.colors.hsv}</HSV>
				<LAB>${item.colors.lab}</LAB>
				<RGB>${item.colors.rgb}</RGB>
			</Colors>
		</PaletteItem>
	`)
        .join('');
    const xml = `
		<Palette ${palette.id}>
			<Flags>
				<EnableAlpha>${palette.flags.enableAlpha}</EnableAlpha>
				<LimitDarkness>${palette.flags.limitDarkness}</LimitDarkness>
				<LimitGrayness>${palette.flags.limitGrayness}</LimitGrayness>
				<LimitLightness>${palette.flags.limitLightness}</LimitLightness>
			</Flags>
			<Metadata>
				<CustomColor>
					<HSLColor>${palette.metadata.customColor ? palette.metadata.customColor.hslColor : null}</HSLColor>
					<ConvertedColors>${palette.metadata.customColor ? palette.metadata.customColor.convertedColors : null}</ConvertedColors>
				</CustomColor>
				<NumBoxes>${palette.metadata.numBoxes}</NumBoxes>
				<PaletteType>${palette.metadata.paletteType}</PaletteType>
			</Metadata>
			${xmlItems}
		</Palette>
	`;
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `palette_${palette.id}.xml`;
    a.click();
    URL.revokeObjectURL(url);
}
export const exportPalette = {
    asCSS,
    asJSON,
    asPNG,
    asXML
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0UGFsZXR0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb20vZXhwb3J0UGFsZXR0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpQ0FBaUM7QUFJakMsU0FBUyxLQUFLLENBQUMsT0FBZ0IsRUFBRSxhQUF5QixLQUFLO0lBQzlELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxLQUFLO1NBQ3ZCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNYLE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ3hCLFFBQVEsVUFBVSxFQUFFLENBQUM7Z0JBQ3BCLEtBQUssTUFBTTtvQkFDVixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO2dCQUN0QyxLQUFLLEtBQUs7b0JBQ1QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztnQkFDckMsS0FBSyxLQUFLO29CQUNULE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3JDLEtBQUssS0FBSztvQkFDVCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDO2dCQUNyQyxLQUFLLEtBQUs7b0JBQ1QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztnQkFDckMsS0FBSyxLQUFLO29CQUNULE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3JDLEtBQUssS0FBSztvQkFDVCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDO2dCQUNyQztvQkFDQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDO1lBQ3RDLENBQUM7UUFDRixDQUFDLENBQUMsRUFBRSxDQUFDO1FBRUwsT0FBTzsrQkFDcUIsSUFBSSxDQUFDLEVBQUU7cUJBQ2pCLElBQUksQ0FBQyxFQUFFOzhCQUNFLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYTs2QkFDOUIsSUFBSSxDQUFD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Q3RDLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFdEMsQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7SUFDYixDQUFDLENBQUMsUUFBUSxHQUFHLFdBQVcsT0FBTyxDQUFDLEVBQUUsTUFBTSxDQUFDO0lBQ3pDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUVWLEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRztJQUM1QixLQUFLO0lBQ0wsTUFBTTtJQUNOLEtBQUs7SUFDTCxLQUFLO0NBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEZpbGU6IHNyYy9kb20vZXhwb3J0UGFsZXR0ZS50c1xuXG5pbXBvcnQgeyBDb2xvclNwYWNlLCBQYWxldHRlIH0gZnJvbSAnLi4vaW5kZXgvaW5kZXgnO1xuXG5mdW5jdGlvbiBhc0NTUyhwYWxldHRlOiBQYWxldHRlLCBjb2xvclNwYWNlOiBDb2xvclNwYWNlID0gJ2hzbCcpOiB2b2lkIHtcblx0Y29uc3QgY3NzID0gcGFsZXR0ZS5pdGVtc1xuXHRcdC5tYXAoaXRlbSA9PiB7XG5cdFx0XHRjb25zdCBjb2xvclZhbHVlID0gKCgpID0+IHtcblx0XHRcdFx0c3dpdGNoIChjb2xvclNwYWNlKSB7XG5cdFx0XHRcdFx0Y2FzZSAnY215ayc6XG5cdFx0XHRcdFx0XHRyZXR1cm4gaXRlbS5jc3NTdHJpbmdzLmNteWtDU1NTdHJpbmc7XG5cdFx0XHRcdFx0Y2FzZSAnaGV4Jzpcblx0XHRcdFx0XHRcdHJldHVybiBpdGVtLmNzc1N0cmluZ3MuaGV4Q1NTU3RyaW5nO1xuXHRcdFx0XHRcdGNhc2UgJ2hzbCc6XG5cdFx0XHRcdFx0XHRyZXR1cm4gaXRlbS5jc3NTdHJpbmdzLmhzbENTU1N0cmluZztcblx0XHRcdFx0XHRjYXNlICdoc3YnOlxuXHRcdFx0XHRcdFx0cmV0dXJuIGl0ZW0uY3NzU3RyaW5ncy5oc3ZDU1NTdHJpbmc7XG5cdFx0XHRcdFx0Y2FzZSAnbGFiJzpcblx0XHRcdFx0XHRcdHJldHVybiBpdGVtLmNzc1N0cmluZ3MubGFiQ1NTU3RyaW5nO1xuXHRcdFx0XHRcdGNhc2UgJ3JnYic6XG5cdFx0XHRcdFx0XHRyZXR1cm4gaXRlbS5jc3NTdHJpbmdzLnJnYkNTU1N0cmluZztcblx0XHRcdFx0XHRjYXNlICd4eXonOlxuXHRcdFx0XHRcdFx0cmV0dXJuIGl0ZW0uY3NzU3RyaW5ncy54eXpDU1NTdHJpbmc7XG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdHJldHVybiBpdGVtLmNzc1N0cmluZ3MuaHNsQ1NTU3RyaW5nO1xuXHRcdFx0XHR9XG5cdFx0XHR9KSgpO1xuXG5cdFx0XHRyZXR1cm4gYFxuICAgICAgICAgICAgLyogUGFsZXR0ZSBJdGVtOiAke2l0ZW0uaWR9ICovXG4gICAgICAgICAgICAuY29sb3ItJHtpdGVtLmlkfSB7XG4gICAgICAgICAgICAgICAgY215ay1jb2xvcjogJHtpdGVtLmNzc1N0cmluZ3MuY215a0NTU1N0cmluZ307XG4gICAgICAgICAgICAgICAgaGV4LWNvbG9yOiAke2l0ZW0uY3NzU3RyaW5ncy5oZXhDU1NTdHJpbmd9O1xuICAgICAgICAgICAgICAgIGhzbC1jb2xvcjogJHtpdGVtLmNzc1N0cmluZ3MuaHNsQ1NTU3RyaW5nfTtcbiAgICAgICAgICAgICAgICBoc3YtY29sb3I6ICR7aXRlbS5jc3NTdHJpbmdzLmhzdkNTU1N0cmluZ307XG4gICAgICAgICAgICAgICAgbGFiLWNvbG9yOiAke2l0ZW0uY3NzU3RyaW5ncy5sYWJDU1NTdHJpbmd9O1xuICAgICAgICAgICAgICAgIHJnYi1jb2xvcjogJHtpdGVtLmNzc1N0cmluZ3MucmdiQ1NTU3RyaW5nfTtcbiAgICAgICAgICAgICAgICB4eXotY29sb3I6ICR7aXRlbS5jc3NTdHJpbmdzLnh5ekNTU1N0cmluZ307XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvclZhbHVlfTsgLyogVXNlIHNlbGVjdGVkIGNvbG9yIHNwYWNlICovXG4gICAgICAgICAgICB9XG4gICAgICAgIGA7XG5cdFx0fSlcblx0XHQuam9pbignXFxuJyk7XG5cblx0Y29uc3QgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6ICd0ZXh0L2NzcycgfSk7XG5cdGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cdGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cblx0YS5ocmVmID0gdXJsO1xuXHRhLmRvd25sb2FkID0gYHBhbGV0dGVfJHtwYWxldHRlLmlkfS5jc3NgO1xuXHRhLmNsaWNrKCk7XG5cblx0VVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xufVxuXG5mdW5jdGlvbiBhc0pTT04ocGFsZXR0ZTogUGFsZXR0ZSk6IHZvaWQge1xuXHRjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkocGFsZXR0ZSwgbnVsbCwgMik7XG5cdGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbanNvbl0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuXHRjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXHRjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXG5cdGEuaHJlZiA9IHVybDtcblx0YS5kb3dubG9hZCA9IGBwYWxldHRlXyR7cGFsZXR0ZS5pZH0uanNvbmA7XG5cdGEuY2xpY2soKTtcblxuXHRVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG59XG5cbmZ1bmN0aW9uIGFzUE5HKFxuXHRwYWxldHRlOiBQYWxldHRlLFxuXHRjb2xvclNwYWNlOiBDb2xvclNwYWNlID0gJ2hzbCcsXG5cdHBhbGV0dGVOYW1lPzogc3RyaW5nXG4pOiB2b2lkIHtcblx0Y29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cdGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuXHRjb25zdCBzd2F0Y2hTaXplID0gMTAwO1xuXHRjb25zdCBwYWRkaW5nID0gMjA7XG5cdGNvbnN0IGxhYmVsSGVpZ2h0ID0gNDA7XG5cdGNvbnN0IHRpdGxlSGVpZ2h0ID0gcGFsZXR0ZU5hbWUgPyA2MCA6IDA7XG5cblx0Y2FudmFzLndpZHRoID0gKHN3YXRjaFNpemUgKyBwYWRkaW5nKSAqIHBhbGV0dGUuaXRlbXMubGVuZ3RoICsgcGFkZGluZztcblx0Y2FudmFzLmhlaWdodCA9IHN3YXRjaFNpemUgKyBsYWJlbEhlaWdodCArIHRpdGxlSGVpZ2h0ICsgMiAqIHBhZGRpbmc7XG5cblx0aWYgKCFjb250ZXh0KSB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBnZXQgMmQgY29udGV4dCcpO1xuXG5cdGNvbnRleHQuZmlsbFN0eWxlID0gJyNmMGYwZjBmZic7XG5cdGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuXHRpZiAocGFsZXR0ZU5hbWUpIHtcblx0XHRjb250ZXh0LmZvbnQgPSAnMjJweCBBcmlhbCc7XG5cdFx0Y29udGV4dC5maWxsU3R5bGUgPSAnIzFlMWUxZWZmJztcblx0XHRjb250ZXh0LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuXHRcdGNvbnRleHQuZmlsbFRleHQoXG5cdFx0XHRwYWxldHRlTmFtZSxcblx0XHRcdGNhbnZhcy53aWR0aCAvIDIsXG5cdFx0XHRwYWRkaW5nICsgdGl0bGVIZWlnaHQgLyAyXG5cdFx0KTtcblx0fVxuXG5cdHBhbGV0dGUuaXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcblx0XHRjb25zdCB4ID0gcGFkZGluZyArIGluZGV4ICogKHN3YXRjaFNpemUgKyBwYWRkaW5nKTtcblx0XHRjb25zdCB5ID0gcGFkZGluZyArIHRpdGxlSGVpZ2h0O1xuXG5cdFx0Y29uc3QgZmlsbENvbG9yID0gKCgpID0+IHtcblx0XHRcdHN3aXRjaCAoY29sb3JTcGFjZSkge1xuXHRcdFx0XHRjYXNlICdjbXlrJzpcblx0XHRcdFx0XHRyZXR1cm4gaXRlbS5jc3NTdHJpbmdzLmNteWtDU1NTdHJpbmc7XG5cdFx0XHRcdGNhc2UgJ2hleCc6XG5cdFx0XHRcdFx0cmV0dXJuIGl0ZW0uY3NzU3RyaW5ncy5oZXhDU1NTdHJpbmc7XG5cdFx0XHRcdGNhc2UgJ2hzbCc6XG5cdFx0XHRcdFx0cmV0dXJuIGl0ZW0uY3NzU3RyaW5ncy5oc2xDU1NTdHJpbmc7XG5cdFx0XHRcdGNhc2UgJ2hzdic6XG5cdFx0XHRcdFx0cmV0dXJuIGl0ZW0uY3NzU3RyaW5ncy5oc3ZDU1NTdHJpbmc7XG5cdFx0XHRcdGNhc2UgJ2xhYic6XG5cdFx0XHRcdFx0cmV0dXJuIGl0ZW0uY3NzU3RyaW5ncy5sYWJDU1NTdHJpbmc7XG5cdFx0XHRcdGNhc2UgJ3JnYic6XG5cdFx0XHRcdFx0cmV0dXJuIGl0ZW0uY3NzU3RyaW5ncy5yZ2JDU1NTdHJpbmc7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuIGl0ZW0uY3NzU3RyaW5ncy5oc2xDU1NTdHJpbmc7XG5cdFx0XHR9XG5cdFx0fSkoKTtcblxuXHRcdGNvbnN0IGNvbG9yTGFiZWwgPSBmaWxsQ29sb3I7XG5cblx0XHRjb250ZXh0LmZpbGxTdHlsZSA9IGZpbGxDb2xvcjtcblx0XHRjb250ZXh0LmZpbGxSZWN0KHgsIHksIHN3YXRjaFNpemUsIHN3YXRjaFNpemUpO1xuXG5cdFx0Y29udGV4dC5mb250ID0gJzEycHggQXJpYWwnO1xuXHRcdGNvbnRleHQuZmlsbFN0eWxlID0gJyMwYTBhMGFmZic7XG5cdFx0Y29udGV4dC50ZXh0QWxpZ24gPSAnY2VudGVyJztcblx0XHRjb250ZXh0LmZpbGxUZXh0KFxuXHRcdFx0Y29sb3JMYWJlbCxcblx0XHRcdHggKyBzd2F0Y2hTaXplIC8gMixcblx0XHRcdHkgKyBzd2F0Y2hTaXplICsgbGFiZWxIZWlnaHQgLSA1XG5cdFx0KTtcblx0fSk7XG5cblx0Y2FudmFzLnRvQmxvYihibG9iID0+IHtcblx0XHRpZiAoYmxvYikge1xuXHRcdFx0Y29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblx0XHRcdGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cblx0XHRcdGEuaHJlZiA9IHVybDtcblx0XHRcdGEuZG93bmxvYWQgPSBgcGFsZXR0ZV8ke3BhbGV0dGUuaWR9LnBuZ2A7XG5cdFx0XHRhLmNsaWNrKCk7XG5cblx0XHRcdFVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc29sZS5lcnJvcignRmFpbGVkIHRvIGNyZWF0ZSBQTkcgYmxvYi4nKTtcblx0XHR9XG5cdH0sICdpbWFnZS9wbmcnKTtcbn1cblxuZnVuY3Rpb24gYXNYTUwocGFsZXR0ZTogUGFsZXR0ZSk6IHZvaWQge1xuXHRjb25zdCB4bWxJdGVtcyA9IHBhbGV0dGUuaXRlbXNcblx0XHQubWFwKFxuXHRcdFx0aXRlbSA9PiBgXG5cdFx0PFBhbGV0dGVJdGVtIFwiJHtpdGVtLmlkfT5cblx0XHRcdDxDb2xvcnM+XG5cdFx0XHRcdDxDTVlLPiR7aXRlbS5jb2xvcnMuY215a308L0NNWUs+XG5cdFx0XHRcdDxIZXg+JHtpdGVtLmNvbG9ycy5oZXh9PC9IZXg+XG5cdFx0XHRcdDxIU0w+JHtpdGVtLmNvbG9ycy5oc2x9PC9IU0w+XG5cdFx0XHRcdDxIU1Y+JHtpdGVtLmNvbG9ycy5oc3Z9PC9IU1Y+XG5cdFx0XHRcdDxMQUI+JHtpdGVtLmNvbG9ycy5sYWJ9PC9MQUI+XG5cdFx0XHRcdDxSR0I+JHtpdGVtLmNvbG9ycy5yZ2J9PC9SR0I+XG5cdFx0XHQ8L0NvbG9ycz5cblx0XHQ8L1BhbGV0dGVJdGVtPlxuXHRgXG5cdFx0KVxuXHRcdC5qb2luKCcnKTtcblx0Y29uc3QgeG1sID0gYFxuXHRcdDxQYWxldHRlICR7cGFsZXR0ZS5pZH0+XG5cdFx0XHQ8RmxhZ3M+XG5cdFx0XHRcdDxFbmFibGVBbHBoYT4ke3BhbGV0dGUuZmxhZ3MuZW5hYmxlQWxwaGF9PC9FbmFibGVBbHBoYT5cblx0XHRcdFx0PExpbWl0RGFya25lc3M+JHtwYWxldHRlLmZsYWdzLmxpbWl0RGFya25lc3N9PC9MaW1pdERhcmtuZXNzPlxuXHRcdFx0XHQ8TGltaXRHcmF5bmVzcz4ke3BhbGV0dGUuZmxhZ3MubGltaXRHcmF5bmVzc308L0xpbWl0R3JheW5lc3M+XG5cdFx0XHRcdDxMaW1pdExpZ2h0bmVzcz4ke3BhbGV0dGUuZmxhZ3MubGltaXRMaWdodG5lc3N9PC9MaW1pdExpZ2h0bmVzcz5cblx0XHRcdDwvRmxhZ3M+XG5cdFx0XHQ8TWV0YWRhdGE+XG5cdFx0XHRcdDxDdXN0b21Db2xvcj5cblx0XHRcdFx0XHQ8SFNMQ29sb3I+JHtwYWxldHRlLm1ldGFkYXRhLmN1c3RvbUNvbG9yID8gcGFsZXR0ZS5tZXRhZGF0YS5jdXN0b21Db2xvci5oc2xDb2xvciA6IG51bGx9PC9IU0xDb2xvcj5cblx0XHRcdFx0XHQ8Q29udmVydGVkQ29sb3JzPiR7cGFsZXR0ZS5tZXRhZGF0YS5jdXN0b21Db2xvciA/IHBhbGV0dGUubWV0YWRhdGEuY3VzdG9tQ29sb3IuY29udmVydGVkQ29sb3JzIDogbnVsbH08L0NvbnZlcnRlZENvbG9ycz5cblx0XHRcdFx0PC9DdXN0b21Db2xvcj5cblx0XHRcdFx0PE51bUJveGVzPiR7cGFsZXR0ZS5tZXRhZGF0YS5udW1Cb3hlc308L051bUJveGVzPlxuXHRcdFx0XHQ8UGFsZXR0ZVR5cGU+JHtwYWxldHRlLm1ldGFkYXRhLnBhbGV0dGVUeXBlfTwvUGFsZXR0ZVR5cGU+XG5cdFx0XHQ8L01ldGFkYXRhPlxuXHRcdFx0JHt4bWxJdGVtc31cblx0XHQ8L1BhbGV0dGU+XG5cdGA7XG5cblx0Y29uc3QgYmxvYiA9IG5ldyBCbG9iKFt4bWxdLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi94bWwnIH0pO1xuXHRjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXHRjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXG5cdGEuaHJlZiA9IHVybDtcblx0YS5kb3dubG9hZCA9IGBwYWxldHRlXyR7cGFsZXR0ZS5pZH0ueG1sYDtcblx0YS5jbGljaygpO1xuXG5cdFVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcbn1cblxuZXhwb3J0IGNvbnN0IGV4cG9ydFBhbGV0dGUgPSB7XG5cdGFzQ1NTLFxuXHRhc0pTT04sXG5cdGFzUE5HLFxuXHRhc1hNTFxufTtcbiJdfQ==