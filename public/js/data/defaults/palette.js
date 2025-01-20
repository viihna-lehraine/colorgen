// File: src/data/defaults/palette.js
const unbrandedData = {
    id: `null-palette-${Date.now()}`,
    items: [],
    metadata: {
        customColor: {
            hslColor: {
                value: { hue: 0, saturation: 0, lightness: 0, alpha: 1 },
                format: 'hsl'
            },
            convertedColors: {
                cmyk: { cyan: 0, magenta: 0, yellow: 0, key: 0, alpha: 1 },
                hex: { hex: '#000000FF', alpha: 'FF', numAlpha: 1 },
                hsl: { hue: 0, saturation: 0, lightness: 0, alpha: 1 },
                hsv: { hue: 0, saturation: 0, value: 0, alpha: 1 },
                lab: { l: 0, a: 0, b: 0, alpha: 1 },
                rgb: { red: 0, green: 0, blue: 0, alpha: 1 },
                xyz: { x: 0, y: 0, z: 0, alpha: 1 }
            }
        },
        flags: {
            enableAlpha: false,
            limitDarkness: false,
            limitGrayness: false,
            limitLightness: false
        },
        name: 'UNBRANDED DEFAULT PALETTE',
        swatches: 1,
        type: '???',
        timestamp: '???'
    }
};
const unbrandedItem = {
    id: 'DEFAULT UNBRANDED PALETTE ITEM',
    colors: {
        cmyk: { cyan: 0, magenta: 0, yellow: 0, key: 0, alpha: 1 },
        hex: { hex: '#000000FF', alpha: 'FF', numAlpha: 1 },
        hsl: { hue: 0, saturation: 0, lightness: 0, alpha: 1 },
        hsv: { hue: 0, saturation: 0, value: 0, alpha: 1 },
        lab: { l: 0, a: 0, b: 0, alpha: 1 },
        rgb: { red: 0, green: 0, blue: 0, alpha: 1 },
        xyz: { x: 0, y: 0, z: 0, alpha: 1 }
    },
    colorStrings: {
        cmyk: {
            cyan: '0%',
            magenta: '0%',
            yellow: '0%',
            key: '0%',
            alpha: '1'
        },
        hex: { hex: '#000000FF', alpha: 'FF', numAlpha: '1' },
        hsl: { hue: '0', saturation: '0%', lightness: '0%', alpha: '1' },
        hsv: { hue: '0', saturation: '0%', value: '0%', alpha: '1' },
        lab: { l: '0', a: '0', b: '0', alpha: '1' },
        rgb: { red: '0', green: '0', blue: '0', alpha: '1' },
        xyz: { x: '0', y: '0', z: '0', alpha: '1' }
    },
    cssStrings: {
        cmykCSSString: 'cmyk(0%, 0%, 0%, 100%, 1)',
        hexCSSString: '#000000FF',
        hslCSSString: 'hsl(0, 0%, 0%, 0)',
        hsvCSSString: 'hsv(0, 0%, 0%, 0)',
        labCSSString: 'lab(0, 0, 0, 0)',
        rgbCSSString: 'rgb(0, 0, 0, 1)',
        xyzCSSString: 'xyz(0, 0, 0, 0)'
    }
};
const unbrandedStored = {
    tableID: 1,
    palette: unbrandedData
};
export const palette = {
    unbrandedData,
    unbrandedItem,
    unbrandedStored
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFsZXR0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kYXRhL2RlZmF1bHRzL3BhbGV0dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscUNBQXFDO0FBU3JDLE1BQU0sYUFBYSxHQUFxQjtJQUN2QyxFQUFFLEVBQUUsZ0JBQWdCLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNoQyxLQUFLLEVBQUUsRUFBRTtJQUNULFFBQVEsRUFBRTtRQUNULFdBQVcsRUFBRTtZQUNaLFFBQVEsRUFBRTtnQkFDVCxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO2dCQUN4RCxNQUFNLEVBQUUsS0FBSzthQUNiO1lBQ0QsZUFBZSxFQUFFO2dCQUNoQixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBQzFELEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFO2dCQUNuRCxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO2dCQUN0RCxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO2dCQUNsRCxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENB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SSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO1FBQ3BELEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7S0FDM0M7SUFDRCxVQUFVLEVBQUU7UUFDWCxhQUFhLEVBQUUsMkJBQTJCO1FBQzFDLFlBQVksRUFBRSxXQUFXO1FBQ3pCLFlBQVksRUFBRSxtQkFBbUI7UUFDakMsWUFBWSxFQUFFLG1CQUFtQjtRQUNqQyxZQUFZLEVBQUUsaUJBQWlCO1FBQy9CLFlBQVksRUFBRSxpQkFBaUI7UUFDL0IsWUFBWSxFQUFFLGlCQUFpQjtLQUMvQjtDQUNELENBQUM7QUFFRixNQUFNLGVBQWUsR0FBMkI7SUFDL0MsT0FBTyxFQUFFLENBQUM7SUFDVixPQUFPLEVBQUUsYUFBYTtDQUN0QixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUF1QjtJQUMxQyxhQUFhO0lBQ2IsYUFBYTtJQUNiLGVBQWU7Q0FDTixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRmlsZTogc3JjL2RhdGEvZGVmYXVsdHMvcGFsZXR0ZS5qc1xuXG5pbXBvcnQge1xuXHREZWZhdWx0UGFsZXR0ZURhdGEsXG5cdFBhbGV0dGVJdGVtVW5icmFuZGVkLFxuXHRQYWxldHRlVW5icmFuZGVkLFxuXHRTdG9yZWRQYWxldHRlVW5icmFuZGVkXG59IGZyb20gJy4uLy4uL2luZGV4L2luZGV4LmpzJztcblxuY29uc3QgdW5icmFuZGVkRGF0YTogUGFsZXR0ZVVuYnJhbmRlZCA9IHtcblx0aWQ6IGBudWxsLXBhbGV0dGUtJHtEYXRlLm5vdygpfWAsXG5cdGl0ZW1zOiBbXSxcblx0bWV0YWRhdGE6IHtcblx0XHRjdXN0b21Db2xvcjoge1xuXHRcdFx0aHNsQ29sb3I6IHtcblx0XHRcdFx0dmFsdWU6IHsgaHVlOiAwLCBzYXR1cmF0aW9uOiAwLCBsaWdodG5lc3M6IDAsIGFscGhhOiAxIH0sXG5cdFx0XHRcdGZvcm1hdDogJ2hzbCdcblx0XHRcdH0sXG5cdFx0XHRjb252ZXJ0ZWRDb2xvcnM6IHtcblx0XHRcdFx0Y215azogeyBjeWFuOiAwLCBtYWdlbnRhOiAwLCB5ZWxsb3c6IDAsIGtleTogMCwgYWxwaGE6IDEgfSxcblx0XHRcdFx0aGV4OiB7IGhleDogJyMwMDAwMDBGRicsIGFscGhhOiAnRkYnLCBudW1BbHBoYTogMSB9LFxuXHRcdFx0XHRoc2w6IHsgaHVlOiAwLCBzYXR1cmF0aW9uOiAwLCBsaWdodG5lc3M6IDAsIGFscGhhOiAxIH0sXG5cdFx0XHRcdGhzdjogeyBodWU6IDAsIHNhdHVyYXRpb246IDAsIHZhbHVlOiAwLCBhbHBoYTogMSB9LFxuXHRcdFx0XHRsYWI6IHsgbDogMCwgYTogMCwgYjogMCwgYWxwaGE6IDEgfSxcblx0XHRcdFx0cmdiOiB7IHJlZDogMCwgZ3JlZW46IDAsIGJsdWU6IDAsIGFscGhhOiAxIH0sXG5cdFx0XHRcdHh5ejogeyB4OiAwLCB5OiAwLCB6OiAwLCBhbHBoYTogMSB9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRmbGFnczoge1xuXHRcdFx0ZW5hYmxlQWxwaGE6IGZhbHNlLFxuXHRcdFx0bGltaXREYXJrbmVzczogZmFsc2UsXG5cdFx0XHRsaW1pdEdyYXluZXNzOiBmYWxzZSxcblx0XHRcdGxpbWl0TGlnaHRuZXNzOiBmYWxzZVxuXHRcdH0sXG5cdFx0bmFtZTogJ1VOQlJBTkRFRCBERUZBVUxUIFBBTEVUVEUnLFxuXHRcdHN3YXRjaGVzOiAxLFxuXHRcdHR5cGU6ICc/Pz8nLFxuXHRcdHRpbWVzdGFtcDogJz8/Pydcblx0fVxufTtcblxuY29uc3QgdW5icmFuZGVkSXRlbTogUGFsZXR0ZUl0ZW1VbmJyYW5kZWQgPSB7XG5cdGlkOiAnREVGQVVMVCBVTkJSQU5ERUQgUEFMRVRURSBJVEVNJyxcblx0Y29sb3JzOiB7XG5cdFx0Y215azogeyBjeWFuOiAwLCBtYWdlbnRhOiAwLCB5ZWxsb3c6IDAsIGtleTogMCwgYWxwaGE6IDEgfSxcblx0XHRoZXg6IHsgaGV4OiAnIzAwMDAwMEZGJywgYWxwaGE6ICdGRicsIG51bUFscGhhOiAxIH0sXG5cdFx0aHNsOiB7IGh1ZTogMCwgc2F0dXJhdGlvbjogMCwgbGlnaHRuZXNzOiAwLCBhbHBoYTogMSB9LFxuXHRcdGhzdjogeyBodWU6IDAsIHNhdHVyYXRpb246IDAsIHZhbHVlOiAwLCBhbHBoYTogMSB9LFxuXHRcdGxhYjogeyBsOiAwLCBhOiAwLCBiOiAwLCBhbHBoYTogMSB9LFxuXHRcdHJnYjogeyByZWQ6IDAsIGdyZWVuOiAwLCBibHVlOiAwLCBhbHBoYTogMSB9LFxuXHRcdHh5ejogeyB4OiAwLCB5OiAwLCB6OiAwLCBhbHBoYTogMSB9XG5cdH0sXG5cdGNvbG9yU3RyaW5nczoge1xuXHRcdGNteWs6IHtcblx0XHRcdGN5YW46ICcwJScsXG5cdFx0XHRtYWdlbnRhOiAnMCUnLFxuXHRcdFx0eWVsbG93OiAnMCUnLFxuXHRcdFx0a2V5OiAnMCUnLFxuXHRcdFx0YWxwaGE6ICcxJ1xuXHRcdH0sXG5cdFx0aGV4OiB7IGhleDogJyMwMDAwMDBGRicsIGFscGhhOiAnRkYnLCBudW1BbHBoYTogJzEnIH0sXG5cdFx0aHNsOiB7IGh1ZTogJzAnLCBzYXR1cmF0aW9uOiAnMCUnLCBsaWdodG5lc3M6ICcwJScsIGFscGhhOiAnMScgfSxcblx0XHRoc3Y6IHsgaHVlOiAnMCcsIHNhdHVyYXRpb246ICcwJScsIHZhbHVlOiAnMCUnLCBhbHBoYTogJzEnIH0sXG5cdFx0bGFiOiB7IGw6ICcwJywgYTogJzAnLCBiOiAnMCcsIGFscGhhOiAnMScgfSxcblx0XHRyZ2I6IHsgcmVkOiAnMCcsIGdyZWVuOiAnMCcsIGJsdWU6ICcwJywgYWxwaGE6ICcxJyB9LFxuXHRcdHh5ejogeyB4OiAnMCcsIHk6ICcwJywgejogJzAnLCBhbHBoYTogJzEnIH1cblx0fSxcblx0Y3NzU3RyaW5nczoge1xuXHRcdGNteWtDU1NTdHJpbmc6ICdjbXlrKDAlLCAwJSwgMCUsIDEwMCUsIDEpJyxcblx0XHRoZXhDU1NTdHJpbmc6ICcjMDAwMDAwRkYnLFxuXHRcdGhzbENTU1N0cmluZzogJ2hzbCgwLCAwJSwgMCUsIDApJyxcblx0XHRoc3ZDU1NTdHJpbmc6ICdoc3YoMCwgMCUsIDAlLCAwKScsXG5cdFx0bGFiQ1NTU3RyaW5nOiAnbGFiKDAsIDAsIDAsIDApJyxcblx0XHRyZ2JDU1NTdHJpbmc6ICdyZ2IoMCwgMCwgMCwgMSknLFxuXHRcdHh5ekNTU1N0cmluZzogJ3h5eigwLCAwLCAwLCAwKSdcblx0fVxufTtcblxuY29uc3QgdW5icmFuZGVkU3RvcmVkOiBTdG9yZWRQYWxldHRlVW5icmFuZGVkID0ge1xuXHR0YWJsZUlEOiAxLFxuXHRwYWxldHRlOiB1bmJyYW5kZWREYXRhXG59O1xuXG5leHBvcnQgY29uc3QgcGFsZXR0ZTogRGVmYXVsdFBhbGV0dGVEYXRhID0ge1xuXHR1bmJyYW5kZWREYXRhLFxuXHR1bmJyYW5kZWRJdGVtLFxuXHR1bmJyYW5kZWRTdG9yZWRcbn0gYXMgY29uc3Q7XG4iXX0=