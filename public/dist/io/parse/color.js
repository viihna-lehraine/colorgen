// File: io/parse/color.js
import { commonFn } from '../../common/index.js';
import { configData as config } from '../../data/config.js';
const brand = commonFn.core.brand;
const regex = config.regex;
const colorParsers = {};
const cmykParser = {
    parse(input) {
        const match = input.match(regex.colors.cmyk);
        if (!match) {
            throw new Error(`Invalid CMYK string format: ${input}`);
        }
        const [_, cyan, magenta, yellow, key = '1'] = match;
        const value = {
            cyan: brand.asPercentile(parseFloat(cyan) / 100),
            magenta: brand.asPercentile(parseFloat(magenta) / 100),
            yellow: brand.asPercentile(parseFloat(yellow) / 100),
            key: brand.asPercentile(parseFloat(key) / 100)
        };
        return { format: 'cmyk', value };
    }
};
const hexParser = {
    parse(input) {
        const match = input.match(regex.colors.hex);
        if (!match) {
            throw new Error(`Invalid Hex string format: ${input}`);
        }
        const hex = brand.asHexSet(match[1].substring(0, 6));
        return {
            format: 'hex',
            value: { hex }
        };
    }
};
const hslParser = {
    parse(input) {
        const match = input.match(regex.colors.hsl);
        if (!match) {
            throw new Error(`Invalid HSL string format: ${input}`);
        }
        const [_, hue, saturation, lightness] = match;
        const value = {
            hue: brand.asRadial(parseFloat(hue)),
            saturation: brand.asPercentile(parseFloat(saturation) / 100),
            lightness: brand.asPercentile(parseFloat(lightness) / 100)
        };
        return { format: 'hsl', value };
    }
};
const hsvParser = {
    parse(input) {
        const match = input.match(regex.colors.hsv);
        if (!match) {
            throw new Error(`Invalid HSV string format: ${input}`);
        }
        const [_, hue, saturation, value] = match;
        const hsvValue = {
            hue: brand.asRadial(parseFloat(hue)),
            saturation: brand.asPercentile(parseFloat(saturation) / 100),
            value: brand.asPercentile(parseFloat(value) / 100)
        };
        return { format: 'hsv', value: hsvValue };
    }
};
const labParser = {
    parse(input) {
        const match = input.match(regex.colors.lab);
        if (!match) {
            throw new Error(`Invalid LAB string format: ${input}`);
        }
        const [_, l, a, b] = match;
        const labValue = {
            l: brand.asLAB_L(parseFloat(l)),
            a: brand.asLAB_A(parseFloat(a)),
            b: brand.asLAB_B(parseFloat(b))
        };
        return { format: 'lab', value: labValue };
    }
};
const rgbParser = {
    parse(input) {
        const match = input.match(regex.colors.rgb);
        if (!match) {
            throw new Error(`Invalid RGB string format: ${input}`);
        }
        const [_, red, green, blue] = match;
        const rgbValue = {
            red: brand.asByteRange(parseFloat(red)),
            green: brand.asByteRange(parseFloat(green)),
            blue: brand.asByteRange(parseFloat(blue))
        };
        return { format: 'rgb', value: rgbValue };
    }
};
const xyzParser = {
    parse(input) {
        const match = input.match(regex.colors.xyz);
        if (!match) {
            throw new Error(`Invalid XYZ string format: ${input}`);
        }
        const [_, x, y, z] = match;
        const xyzValue = {
            x: brand.asXYZ_X(parseFloat(x)),
            y: brand.asXYZ_Y(parseFloat(y)),
            z: brand.asXYZ_Z(parseFloat(z))
        };
        return { format: 'xyz', value: xyzValue };
    }
};
colorParsers['cmyk'] = cmykParser;
colorParsers['hex'] = hexParser;
colorParsers['hsl'] = hslParser;
colorParsers['hsv'] = hsvParser;
colorParsers['lab'] = labParser;
colorParsers['rgb'] = rgbParser;
colorParsers['xyz'] = xyzParser;
export function asColorString(format, input) {
    const parser = colorParsers[format.toLowerCase()];
    if (!parser) {
        throw new Error(`No parser available for format: ${format}`);
    }
    return parser.parse(input);
}
// ******** CSS COLOR STRINGS ********
export function asCSSColorString(format, input) {
    const color = asColorString(format, input);
    switch (color.format) {
        case 'cmyk':
            const cmyk = color.value;
            return `cmyk(${cmyk.cyan * 100}%, ${cmyk.magenta * 100}%, ${cmyk.yellow * 100}%, ${cmyk.key * 100}`;
        case 'hex':
            const hex = color.value;
            return `#${hex.hex}}`;
        case 'hsl':
            const hsl = color.value;
            return `hsl(${hsl.hue}, ${hsl.saturation * 100}%, ${hsl.lightness * 100}%})`;
        case 'hsv':
            const hsv = color.value;
            return `hsv(${hsv.hue}, ${hsv.saturation * 100}%, ${hsv.value * 100}%})`;
        case 'lab':
            const lab = color.value;
            return `lab(${lab.l}, ${lab.a}, ${lab.b}})`;
        case 'rgb':
            const rgb = color.value;
            return `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
        case 'xyz':
            const xyz = color.value;
            return `xyz(${xyz.x}, ${xyz.y}, ${xyz.z})`;
        default:
            throw new Error(`Unsupported color format: ${color.format}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvaW8vcGFyc2UvY29sb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEJBQTBCO0FBYTFCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsVUFBVSxJQUFJLE1BQU0sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTVELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQ2xDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFFM0IsTUFBTSxZQUFZLEdBQWdDLEVBQUUsQ0FBQztBQUVyRCxNQUFNLFVBQVUsR0FBZ0I7SUFDL0IsS0FBSyxDQUFDLEtBQWE7UUFDbEIsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTdDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDekQsQ0FBQztRQUVELE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUVwRCxNQUFNLEtBQUssR0FBa0I7WUFDNUIsSUFBSSxFQUFFLEtBQUssQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNoRCxPQUFPLEVBQUUsS0FBSyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ3RELE1BQU0sRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDcEQsR0FBRyxF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LEtBQXFCLENBQUM7WUFDeEMsT0FBTyxPQUFPLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHLE1BQU0sR0FBRyxDQUFDLFNBQVMsR0FBRyxHQUFHLEtBQUssQ0FBQztRQUU5RSxLQUFLLEtBQUs7WUFDVCxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsS0FBcUIsQ0FBQztZQUN4QyxPQUFPLE9BQU8sR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsTUFBTSxHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsS0FBSyxDQUFDO1FBRTFFLEtBQUssS0FBSztZQUNULE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxLQUFxQixDQUFDO1lBQ3hDLE9BQU8sT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBRTdDLEtBQUssS0FBSztZQUNULE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxLQUFxQixDQUFDO1lBQ3hDLE9BQU8sT0FBTyxHQUFHLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxLQUFLLEtBQUssR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDO1FBRXJELEtBQUssS0FBSztZQUNULE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxLQUFxQixDQUFDO1lBQ3hDLE9BQU8sT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRTVDO1lBQ0MsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDL0QsQ0FBQztBQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBGaWxlOiBpby9wYXJzZS9jb2xvci5qc1xuXG5pbXBvcnQge1xuXHRDTVlLLFxuXHRDb2xvcixcblx0Q29sb3JQYXJzZXIsXG5cdEhleCxcblx0SFNMLFxuXHRIU1YsXG5cdExBQixcblx0UkdCLFxuXHRYWVpcbn0gZnJvbSAnLi4vLi4vdHlwZXMvaW5kZXguanMnO1xuaW1wb3J0IHsgY29tbW9uRm4gfSBmcm9tICcuLi8uLi9jb21tb24vaW5kZXguanMnO1xuaW1wb3J0IHsgY29uZmlnRGF0YSBhcyBjb25maWcgfSBmcm9tICcuLi8uLi9kYXRhL2NvbmZpZy5qcyc7XG5cbmNvbnN0IGJyYW5kID0gY29tbW9uRm4uY29yZS5icmFuZDtcbmNvbnN0IHJlZ2V4ID0gY29uZmlnLnJlZ2V4O1xuXG5jb25zdCBjb2xvclBhcnNlcnM6IFJlY29yZDxzdHJpbmcsIENvbG9yUGFyc2VyPiA9IHt9O1xuXG5jb25zdCBjbXlrUGFyc2VyOiBDb2xvclBhcnNlciA9IHtcblx0cGFyc2UoaW5wdXQ6IHN0cmluZyk6IENNWUsge1xuXHRcdGNvbnN0IG1hdGNoID0gaW5wdXQubWF0Y2gocmVnZXguY29sb3JzLmNteWspO1xuXG5cdFx0aWYgKCFtYXRjaCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIENNWUsgc3RyaW5nIGZvcm1hdDogJHtpbnB1dH1gKTtcblx0XHR9XG5cblx0XHRjb25zdCBbXywgY3lhbiwgbWFnZW50YSwgeWVsbG93LCBrZXkgPSAnMSddID0gbWF0Y2g7XG5cblx0XHRjb25zdCB2YWx1ZTogQ01ZS1sndmFsdWUnXSA9IHtcblx0XHRcdGN5YW46IGJyYW5kLmFzUGVyY2VudGlsZShwYXJzZUZsb2F0KGN5YW4pIC8gMTAwKSxcblx0XHRcdG1hZ2VudGE6IGJyYW5kLmFzUGVyY2VudGlsZShwYXJzZUZsb2F0KG1hZ2VudGEpIC8gMTAwKSxcblx0XHRcdHllbGxvdzogYnJhbmQuYXNQZXJjZW50aWxlKHBhcnNlRmxvYXQoeWVsbG93KSAvIDEwMCksXG5cdFx0XHRrZXk6IGJyYW5kLmFzUGVyY2VudGlsZShwYXJzZUZsb2F0KGtleSkgLyAxMDApXG5cdFx0fTtcblxuXHRcdHJldHVybiB7IGZvcm1hdDogJ2NteWsnLCB2YWx1ZSB9O1xuXHR9XG59O1xuXG5jb25zdCBoZXhQYXJzZXI6IENvbG9yUGFyc2VyID0ge1xuXHRwYXJzZShpbnB1dDogc3RyaW5nKTogSGV4IHtcblx0XHRjb25zdCBtYXRjaCA9IGlucHV0Lm1hdGNoKHJlZ2V4LmNvbG9ycy5oZXgpO1xuXG5cdFx0aWYgKCFtYXRjaCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIEhleCBzdHJpbmcgZm9ybWF0OiAke2lucHV0fWApO1xuXHRcdH1cblxuXHRcdGNvbnN0IGhleCA9IGJyYW5kLmFzSGV4U2V0KG1hdGNoWzFdLnN1YnN0cmluZygwLCA2KSk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0Zm9ybWF0OiAnaGV4Jyxcblx0XHRcdHZhbHVlOiB7IGhleCB9XG5cdFx0fTtcblx0fVxufTtcblxuY29uc3QgaHNsUGFyc2VyOiBDb2xvclBhcnNlciA9IHtcblx0cGFyc2UoaW5wdXQ6IHN0cmluZyk6IEhTTCB7XG5cdFx0Y29uc3QgbWF0Y2ggPSBpbnB1dC5tYXRjaChyZWdleC5jb2xvcnMuaHNsKTtcblxuXHRcdGlmICghbWF0Y2gpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBIU0wgc3RyaW5nIGZvcm1hdDogJHtpbnB1dH1gKTtcblx0XHR9XG5cblx0XHRjb25zdCBbXywgaHVlLCBzYXR1cmF0aW9uLCBsaWdodG5lc3NdID0gbWF0Y2g7XG5cblx0XHRjb25zdCB2YWx1ZTogSFNMWyd2YWx1ZSddID0ge1xuXHRcdFx0aHVlOiBicmFuZC5hc1JhZGlhbChwYXJzZUZsb2F0KGh1ZSkpLFxuXHRcdFx0c2F0dXJhdGlvbjogYnJhbmQuYXNQZXJjZW50aWxlKHBhcnNlRmxvYXQoc2F0dXJhdGlvbikgLyAxMDApLFxuXHRcdFx0bGlnaHRuZXNzOiBicmFuZC5hc1BlcmNlbnRpbGUocGFyc2VGbG9hdChsaWdodG5lc3MpIC8gMTAwKVxuXHRcdH07XG5cblx0XHRyZXR1cm4geyBmb3JtYXQ6ICdoc2wnLCB2YWx1ZSB9O1xuXHR9XG59O1xuXG5jb25zdCBoc3ZQYXJzZXI6IENvbG9yUGFyc2VyID0ge1xuXHRwYXJzZShpbnB1dDogc3RyaW5nKTogSFNWIHtcblx0XHRjb25zdCBtYXRjaCA9IGlucHV0Lm1hdGNoKHJlZ2V4LmNvbG9ycy5oc3YpO1xuXG5cdFx0aWYgKCFtYXRjaCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIEhTViBzdHJpbmcgZm9ybWF0OiAke2lucHV0fWApO1xuXHRcdH1cblxuXHRcdGNvbnN0IFtfLCBodWUsIHNhdHVyYXRpb24sIHZhbHVlXSA9IG1hdGNoO1xuXG5cdFx0Y29uc3QgaHN2VmFsdWU6IEhTVlsndmFsdWUnXSA9IHtcblx0XHRcdGh1ZTogYnJhbmQuYXNSYWRpYWwocGFyc2VGbG9hdChodWUpKSxcblx0XHRcdHNhdHVyYXRpb246IGJyYW5kLmFzUGVyY2VudGlsZShwYXJzZUZsb2F0KHNhdHVyYXRpb24pIC8gMTAwKSxcblx0XHRcdHZhbHVlOiBicmFuZC5hc1BlcmNlbnRpbGUocGFyc2VGbG9hdCh2YWx1ZSkgLyAxMDApXG5cdFx0fTtcblxuXHRcdHJldHVybiB7IGZvcm1hdDogJ2hzdicsIHZhbHVlOiBoc3ZWYWx1ZSB9O1xuXHR9XG59O1xuXG5jb25zdCBsYWJQYXJzZXI6IENvbG9yUGFyc2VyID0ge1xuXHRwYXJzZShpbnB1dDogc3RyaW5nKTogTEFCIHtcblx0XHRjb25zdCBtYXRjaCA9IGlucHV0Lm1hdGNoKHJlZ2V4LmNvbG9ycy5sYWIpO1xuXG5cdFx0aWYgKCFtYXRjaCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIExBQiBzdHJpbmcgZm9ybWF0OiAke2lucHV0fWApO1xuXHRcdH1cblxuXHRcdGNvbnN0IFtfLCBsLCBhLCBiXSA9IG1hdGNoO1xuXG5cdFx0Y29uc3QgbGFiVmFsdWU6IExBQlsndmFsdWUnXSA9IHtcblx0XHRcdGw6IGJyYW5kLmFzTEFCX0wocGFyc2VGbG9hdChsKSksXG5cdFx0XHRhOiBicmFuZC5hc0xBQl9BKHBhcnNlRmxvYXQoYSkpLFxuXHRcdFx0YjogYnJhbmQuYXNMQUJfQihwYXJzZUZsb2F0KGIpKVxuXHRcdH07XG5cblx0XHRyZXR1cm4geyBmb3JtYXQ6ICdsYWInLCB2YWx1ZTogbGFiVmFsdWUgfTtcblx0fVxufTtcblxuY29uc3QgcmdiUGFyc2VyOiBDb2xvclBhcnNlciA9IHtcblx0cGFyc2UoaW5wdXQ6IHN0cmluZyk6IFJHQiB7XG5cdFx0Y29uc3QgbWF0Y2ggPSBpbnB1dC5tYXRjaChyZWdleC5jb2xvcnMucmdiKTtcblxuXHRcdGlmICghbWF0Y2gpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBSR0Igc3RyaW5nIGZvcm1hdDogJHtpbnB1dH1gKTtcblx0XHR9XG5cblx0XHRjb25zdCBbXywgcmVkLCBncmVlbiwgYmx1ZV0gPSBtYXRjaDtcblxuXHRcdGNvbnN0IHJnYlZhbHVlOiBSR0JbJ3ZhbHVlJ10gPSB7XG5cdFx0XHRyZWQ6IGJyYW5kLmFzQnl0ZVJhbmdlKHBhcnNlRmxvYXQocmVkKSksXG5cdFx0XHRncmVlbjogYnJhbmQuYXNCeXRlUmFuZ2UocGFyc2VGbG9hdChncmVlbikpLFxuXHRcdFx0Ymx1ZTogYnJhbmQuYXNCeXRlUmFuZ2UocGFyc2VGbG9hdChibHVlKSlcblx0XHR9O1xuXG5cdFx0cmV0dXJuIHsgZm9ybWF0OiAncmdiJywgdmFsdWU6IHJnYlZhbHVlIH07XG5cdH1cbn07XG5cbmNvbnN0IHh5elBhcnNlcjogQ29sb3JQYXJzZXIgPSB7XG5cdHBhcnNlKGlucHV0OiBzdHJpbmcpOiBYWVoge1xuXHRcdGNvbnN0IG1hdGNoID0gaW5wdXQubWF0Y2gocmVnZXguY29sb3JzLnh5eik7XG5cblx0XHRpZiAoIW1hdGNoKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgWFlaIHN0cmluZyBmb3JtYXQ6ICR7aW5wdXR9YCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgW18sIHgsIHksIHpdID0gbWF0Y2g7XG5cblx0XHRjb25zdCB4eXpWYWx1ZTogWFlaWyd2YWx1ZSddID0ge1xuXHRcdFx0eDogYnJhbmQuYXNYWVpfWChwYXJzZUZsb2F0KHgpKSxcblx0XHRcdHk6IGJyYW5kLmFzWFlaX1kocGFyc2VGbG9hdCh5KSksXG5cdFx0XHR6OiBicmFuZC5hc1hZWl9aKHBhcnNlRmxvYXQoeikpXG5cdFx0fTtcblxuXHRcdHJldHVybiB7IGZvcm1hdDogJ3h5eicsIHZhbHVlOiB4eXpWYWx1ZSB9O1xuXHR9XG59O1xuXG5jb2xvclBhcnNlcnNbJ2NteWsnXSA9IGNteWtQYXJzZXI7XG5jb2xvclBhcnNlcnNbJ2hleCddID0gaGV4UGFyc2VyO1xuY29sb3JQYXJzZXJzWydoc2wnXSA9IGhzbFBhcnNlcjtcbmNvbG9yUGFyc2Vyc1snaHN2J10gPSBoc3ZQYXJzZXI7XG5jb2xvclBhcnNlcnNbJ2xhYiddID0gbGFiUGFyc2VyO1xuY29sb3JQYXJzZXJzWydyZ2InXSA9IHJnYlBhcnNlcjtcbmNvbG9yUGFyc2Vyc1sneHl6J10gPSB4eXpQYXJzZXI7XG5cbmV4cG9ydCBmdW5jdGlvbiBhc0NvbG9yU3RyaW5nKGZvcm1hdDogc3RyaW5nLCBpbnB1dDogc3RyaW5nKTogQ29sb3Ige1xuXHRjb25zdCBwYXJzZXIgPSBjb2xvclBhcnNlcnNbZm9ybWF0LnRvTG93ZXJDYXNlKCldO1xuXG5cdGlmICghcGFyc2VyKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBObyBwYXJzZXIgYXZhaWxhYmxlIGZvciBmb3JtYXQ6ICR7Zm9ybWF0fWApO1xuXHR9XG5cblx0cmV0dXJuIHBhcnNlci5wYXJzZShpbnB1dCk7XG59XG5cbi8vICoqKioqKioqIENTUyBDT0xPUiBTVFJJTkdTICoqKioqKioqXG5cbmV4cG9ydCBmdW5jdGlvbiBhc0NTU0NvbG9yU3RyaW5nKGZvcm1hdDogc3RyaW5nLCBpbnB1dDogc3RyaW5nKTogc3RyaW5nIHtcblx0Y29uc3QgY29sb3IgPSBhc0NvbG9yU3RyaW5nKGZvcm1hdCwgaW5wdXQpO1xuXG5cdHN3aXRjaCAoY29sb3IuZm9ybWF0KSB7XG5cdFx0Y2FzZSAnY215ayc6XG5cdFx0XHRjb25zdCBjbXlrID0gY29sb3IudmFsdWUgYXMgQ01ZS1sndmFsdWUnXTtcblx0XHRcdHJldHVybiBgY215aygke2NteWsuY3lhbiAqIDEwMH0lLCAke2NteWsubWFnZW50YSAqIDEwMH0lLCAke2NteWsueWVsbG93ICogMTAwfSUsICR7Y215ay5rZXkgKiAxMDB9YDtcblxuXHRcdGNhc2UgJ2hleCc6XG5cdFx0XHRjb25zdCBoZXggPSBjb2xvci52YWx1ZSBhcyBIZXhbJ3ZhbHVlJ107XG5cdFx0XHRyZXR1cm4gYCMke2hleC5oZXh9fWA7XG5cblx0XHRjYXNlICdoc2wnOlxuXHRcdFx0Y29uc3QgaHNsID0gY29sb3IudmFsdWUgYXMgSFNMWyd2YWx1ZSddO1xuXHRcdFx0cmV0dXJuIGBoc2woJHtoc2wuaHVlfSwgJHtoc2wuc2F0dXJhdGlvbiAqIDEwMH0lLCAke2hzbC5saWdodG5lc3MgKiAxMDB9JX0pYDtcblxuXHRcdGNhc2UgJ2hzdic6XG5cdFx0XHRjb25zdCBoc3YgPSBjb2xvci52YWx1ZSBhcyBIU1ZbJ3ZhbHVlJ107XG5cdFx0XHRyZXR1cm4gYGhzdigke2hzdi5odWV9LCAke2hzdi5zYXR1cmF0aW9uICogMTAwfSUsICR7aHN2LnZhbHVlICogMTAwfSV9KWA7XG5cblx0XHRjYXNlICdsYWInOlxuXHRcdFx0Y29uc3QgbGFiID0gY29sb3IudmFsdWUgYXMgTEFCWyd2YWx1ZSddO1xuXHRcdFx0cmV0dXJuIGBsYWIoJHtsYWIubH0sICR7bGFiLmF9LCAke2xhYi5ifX0pYDtcblxuXHRcdGNhc2UgJ3JnYic6XG5cdFx0XHRjb25zdCByZ2IgPSBjb2xvci52YWx1ZSBhcyBSR0JbJ3ZhbHVlJ107XG5cdFx0XHRyZXR1cm4gYHJnYigke3JnYi5yZWR9LCAke3JnYi5ncmVlbn0sICR7cmdiLmJsdWV9KWA7XG5cblx0XHRjYXNlICd4eXonOlxuXHRcdFx0Y29uc3QgeHl6ID0gY29sb3IudmFsdWUgYXMgWFlaWyd2YWx1ZSddO1xuXHRcdFx0cmV0dXJuIGB4eXooJHt4eXoueH0sICR7eHl6Lnl9LCAke3h5ei56fSlgO1xuXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgY29sb3IgZm9ybWF0OiAke2NvbG9yLmZvcm1hdH1gKTtcblx0fVxufVxuIl19