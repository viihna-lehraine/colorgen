// File: src/palette/io/parse/color.ts
import { common } from '../../../common/index.js';
import { config } from '../../../config/index.js';
const brand = common.core.brand;
const regex = config.regex;
const colorParsers = {};
const cmykParser = {
    parse(input) {
        const match = input.match(regex.colors.cmyk);
        if (!match) {
            throw new Error(`Invalid CMYK string format: ${input}`);
        }
        const [_, cyan, magenta, yellow, key, alpha = '1'] = match;
        const value = {
            cyan: brand.asPercentile(parseFloat(cyan) / 100),
            magenta: brand.asPercentile(parseFloat(magenta) / 100),
            yellow: brand.asPercentile(parseFloat(yellow) / 100),
            key: brand.asPercentile(parseFloat(key) / 100),
            alpha: brand.asAlphaRange(parseFloat(alpha))
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
        const alpha = brand.asHexComponent(String(match[1].length === 8
            ? parseInt(match[1].substring(6, 8), 16) / 255
            : 1));
        const numAlpha = brand.asAlphaRange(alpha);
        return {
            format: 'hex',
            value: { hex, alpha, numAlpha }
        };
    }
};
const hslParser = {
    parse(input) {
        const match = input.match(regex.colors.hsl);
        if (!match) {
            throw new Error(`Invalid HSL string format: ${input}`);
        }
        const [_, hue, saturation, lightness, alpha = '1'] = match;
        const value = {
            hue: brand.asRadial(parseFloat(hue)),
            saturation: brand.asPercentile(parseFloat(saturation) / 100),
            lightness: brand.asPercentile(parseFloat(lightness) / 100),
            alpha: brand.asAlphaRange(parseFloat(alpha))
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
        const [_, hue, saturation, value, alpha = '1'] = match;
        const hsvValue = {
            hue: brand.asRadial(parseFloat(hue)),
            saturation: brand.asPercentile(parseFloat(saturation) / 100),
            value: brand.asPercentile(parseFloat(value) / 100),
            alpha: brand.asAlphaRange(parseFloat(alpha))
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
        const [_, l, a, b, alpha = '1'] = match;
        const labValue = {
            l: brand.asLAB_L(parseFloat(l)),
            a: brand.asLAB_A(parseFloat(a)),
            b: brand.asLAB_B(parseFloat(b)),
            alpha: brand.asAlphaRange(parseFloat(alpha))
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
        const [_, red, green, blue, alpha = '1'] = match;
        const rgbValue = {
            red: brand.asByteRange(parseFloat(red)),
            green: brand.asByteRange(parseFloat(green)),
            blue: brand.asByteRange(parseFloat(blue)),
            alpha: brand.asAlphaRange(parseFloat(alpha))
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
        const [_, x, y, z, alpha = '1'] = match;
        const xyzValue = {
            x: brand.asXYZ_X(parseFloat(x)),
            y: brand.asXYZ_Y(parseFloat(y)),
            z: brand.asXYZ_Z(parseFloat(z)),
            alpha: brand.asAlphaRange(parseFloat(alpha))
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
export function parseColorString(format, input) {
    const parser = colorParsers[format.toLowerCase()];
    if (!parser) {
        throw new Error(`No parser available for format: ${format}`);
    }
    return parser.parse(input);
}
// ******** CSS COLOR STRINGS ********
export function parseCSSColorString(format, input) {
    const color = parseColorString(format, input);
    switch (color.format) {
        case 'cmyk':
            const cmyk = color.value;
            return `cmyk(${cmyk.cyan * 100}%, ${cmyk.magenta * 100}%, ${cmyk.yellow * 100}%, ${cmyk.key * 100}${cmyk.alpha !== 1 ? `, ${cmyk.alpha}` : ''})`;
        case 'hex':
            const hex = color.value;
            return `#${hex.hex}${String(hex.alpha) !== 'FF' ? hex.alpha : ''}`;
        case 'hsl':
            const hsl = color.value;
            return `hsl(${hsl.hue}, ${hsl.saturation * 100}%, ${hsl.lightness * 100}%${hsl.alpha !== 1 ? `, ${hsl.alpha}` : ''})`;
        case 'hsv':
            const hsv = color.value;
            return `hsv(${hsv.hue}, ${hsv.saturation * 100}%, ${hsv.value * 100}%${hsv.alpha !== 1 ? `, ${hsv.alpha}` : ''})`;
        case 'lab':
            const lab = color.value;
            return `lab(${lab.l}, ${lab.a}, ${lab.b}${lab.alpha !== 1 ? `, ${lab.alpha}` : ''})`;
        case 'rgb':
            const rgb = color.value;
            return `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue}${rgb.alpha !== 1 ? `, ${rgb.alpha}` : ''})`;
        case 'xyz':
            const xyz = color.value;
            return `xyz(${xyz.x}, ${xyz.y}, ${xyz.z}${xyz.alpha !== 1 ? `, ${xyz.alpha}` : ''})`;
        default:
            throw new Error(`Unsupported color format: ${color.format}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvaW8vcGFyc2Uvc2hhcmVkL2NvbG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHNDQUFzQztBQW1CdEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVsRCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUNoQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBRTNCLE1BQU0sWUFBWSxHQUFnQyxFQUFFLENBQUM7QUFFckQsTUFBTSxVQUFVLEdBQWdCO0lBQy9CLEtBQUssQ0FBQyxLQUFhO1FBQ2xCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU3QyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDWixNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFFRCxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBRTNELE1BQU0sS0FBSyxHQUFjO1lBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDaEQsT0FBTyxFQUFFLEtBQUssQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUN0RCxNQUFNLEVBQUUsS0FBSyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lB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SyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQ3RDLEdBQUcsQ0FBQztRQUVMLEtBQUssS0FBSztZQUNULE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxLQUFxQixDQUFDO1lBQ3hDLE9BQU8sT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FDdEMsR0FBRyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUN0QyxHQUFHLENBQUM7UUFFTDtZQUNDLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQy9ELENBQUM7QUFDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRmlsZTogc3JjL3BhbGV0dGUvaW8vcGFyc2UvY29sb3IudHNcblxuaW1wb3J0IHtcblx0Q01ZSyxcblx0Q01ZS1ZhbHVlLFxuXHRDb2xvcixcblx0Q29sb3JQYXJzZXIsXG5cdEhleCxcblx0SFNMLFxuXHRIU0xWYWx1ZSxcblx0SFNWLFxuXHRIU1ZWYWx1ZSxcblx0TEFCLFxuXHRMQUJWYWx1ZSxcblx0UkdCLFxuXHRSR0JWYWx1ZSxcblx0WFlaLFxuXHRYWVpWYWx1ZVxufSBmcm9tICcuLi8uLi8uLi9pbmRleC9pbmRleC5qcyc7XG5pbXBvcnQgeyBjb21tb24gfSBmcm9tICcuLi8uLi8uLi9jb21tb24vaW5kZXguanMnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vY29uZmlnL2luZGV4LmpzJztcblxuY29uc3QgYnJhbmQgPSBjb21tb24uY29yZS5icmFuZDtcbmNvbnN0IHJlZ2V4ID0gY29uZmlnLnJlZ2V4O1xuXG5jb25zdCBjb2xvclBhcnNlcnM6IFJlY29yZDxzdHJpbmcsIENvbG9yUGFyc2VyPiA9IHt9O1xuXG5jb25zdCBjbXlrUGFyc2VyOiBDb2xvclBhcnNlciA9IHtcblx0cGFyc2UoaW5wdXQ6IHN0cmluZyk6IENNWUsge1xuXHRcdGNvbnN0IG1hdGNoID0gaW5wdXQubWF0Y2gocmVnZXguY29sb3JzLmNteWspO1xuXG5cdFx0aWYgKCFtYXRjaCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIENNWUsgc3RyaW5nIGZvcm1hdDogJHtpbnB1dH1gKTtcblx0XHR9XG5cblx0XHRjb25zdCBbXywgY3lhbiwgbWFnZW50YSwgeWVsbG93LCBrZXksIGFscGhhID0gJzEnXSA9IG1hdGNoO1xuXG5cdFx0Y29uc3QgdmFsdWU6IENNWUtWYWx1ZSA9IHtcblx0XHRcdGN5YW46IGJyYW5kLmFzUGVyY2VudGlsZShwYXJzZUZsb2F0KGN5YW4pIC8gMTAwKSxcblx0XHRcdG1hZ2VudGE6IGJyYW5kLmFzUGVyY2VudGlsZShwYXJzZUZsb2F0KG1hZ2VudGEpIC8gMTAwKSxcblx0XHRcdHllbGxvdzogYnJhbmQuYXNQZXJjZW50aWxlKHBhcnNlRmxvYXQoeWVsbG93KSAvIDEwMCksXG5cdFx0XHRrZXk6IGJyYW5kLmFzUGVyY2VudGlsZShwYXJzZUZsb2F0KGtleSkgLyAxMDApLFxuXHRcdFx0YWxwaGE6IGJyYW5kLmFzQWxwaGFSYW5nZShwYXJzZUZsb2F0KGFscGhhKSlcblx0XHR9O1xuXG5cdFx0cmV0dXJuIHsgZm9ybWF0OiAnY215aycsIHZhbHVlIH07XG5cdH1cbn07XG5cbmNvbnN0IGhleFBhcnNlcjogQ29sb3JQYXJzZXIgPSB7XG5cdHBhcnNlKGlucHV0OiBzdHJpbmcpOiBIZXgge1xuXHRcdGNvbnN0IG1hdGNoID0gaW5wdXQubWF0Y2gocmVnZXguY29sb3JzLmhleCk7XG5cblx0XHRpZiAoIW1hdGNoKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgSGV4IHN0cmluZyBmb3JtYXQ6ICR7aW5wdXR9YCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgaGV4ID0gYnJhbmQuYXNIZXhTZXQobWF0Y2hbMV0uc3Vic3RyaW5nKDAsIDYpKTtcblx0XHRjb25zdCBhbHBoYSA9IGJyYW5kLmFzSGV4Q29tcG9uZW50KFxuXHRcdFx0U3RyaW5nKFxuXHRcdFx0XHRtYXRjaFsxXS5sZW5ndGggPT09IDhcblx0XHRcdFx0XHQ/IHBhcnNlSW50KG1hdGNoWzFdLnN1YnN0cmluZyg2LCA4KSwgMTYpIC8gMjU1XG5cdFx0XHRcdFx0OiAxXG5cdFx0XHQpXG5cdFx0KTtcblx0XHRjb25zdCBudW1BbHBoYSA9IGJyYW5kLmFzQWxwaGFSYW5nZShhbHBoYSk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0Zm9ybWF0OiAnaGV4Jyxcblx0XHRcdHZhbHVlOiB7IGhleCwgYWxwaGEsIG51bUFscGhhIH1cblx0XHR9O1xuXHR9XG59O1xuXG5jb25zdCBoc2xQYXJzZXI6IENvbG9yUGFyc2VyID0ge1xuXHRwYXJzZShpbnB1dDogc3RyaW5nKTogSFNMIHtcblx0XHRjb25zdCBtYXRjaCA9IGlucHV0Lm1hdGNoKHJlZ2V4LmNvbG9ycy5oc2wpO1xuXG5cdFx0aWYgKCFtYXRjaCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIEhTTCBzdHJpbmcgZm9ybWF0OiAke2lucHV0fWApO1xuXHRcdH1cblxuXHRcdGNvbnN0IFtfLCBodWUsIHNhdHVyYXRpb24sIGxpZ2h0bmVzcywgYWxwaGEgPSAnMSddID0gbWF0Y2g7XG5cblx0XHRjb25zdCB2YWx1ZTogSFNMVmFsdWUgPSB7XG5cdFx0XHRodWU6IGJyYW5kLmFzUmFkaWFsKHBhcnNlRmxvYXQoaHVlKSksXG5cdFx0XHRzYXR1cmF0aW9uOiBicmFuZC5hc1BlcmNlbnRpbGUocGFyc2VGbG9hdChzYXR1cmF0aW9uKSAvIDEwMCksXG5cdFx0XHRsaWdodG5lc3M6IGJyYW5kLmFzUGVyY2VudGlsZShwYXJzZUZsb2F0KGxpZ2h0bmVzcykgLyAxMDApLFxuXHRcdFx0YWxwaGE6IGJyYW5kLmFzQWxwaGFSYW5nZShwYXJzZUZsb2F0KGFscGhhKSlcblx0XHR9O1xuXG5cdFx0cmV0dXJuIHsgZm9ybWF0OiAnaHNsJywgdmFsdWUgfTtcblx0fVxufTtcblxuY29uc3QgaHN2UGFyc2VyOiBDb2xvclBhcnNlciA9IHtcblx0cGFyc2UoaW5wdXQ6IHN0cmluZyk6IEhTViB7XG5cdFx0Y29uc3QgbWF0Y2ggPSBpbnB1dC5tYXRjaChyZWdleC5jb2xvcnMuaHN2KTtcblxuXHRcdGlmICghbWF0Y2gpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBIU1Ygc3RyaW5nIGZvcm1hdDogJHtpbnB1dH1gKTtcblx0XHR9XG5cblx0XHRjb25zdCBbXywgaHVlLCBzYXR1cmF0aW9uLCB2YWx1ZSwgYWxwaGEgPSAnMSddID0gbWF0Y2g7XG5cblx0XHRjb25zdCBoc3ZWYWx1ZTogSFNWVmFsdWUgPSB7XG5cdFx0XHRodWU6IGJyYW5kLmFzUmFkaWFsKHBhcnNlRmxvYXQoaHVlKSksXG5cdFx0XHRzYXR1cmF0aW9uOiBicmFuZC5hc1BlcmNlbnRpbGUocGFyc2VGbG9hdChzYXR1cmF0aW9uKSAvIDEwMCksXG5cdFx0XHR2YWx1ZTogYnJhbmQuYXNQZXJjZW50aWxlKHBhcnNlRmxvYXQodmFsdWUpIC8gMTAwKSxcblx0XHRcdGFscGhhOiBicmFuZC5hc0FscGhhUmFuZ2UocGFyc2VGbG9hdChhbHBoYSkpXG5cdFx0fTtcblxuXHRcdHJldHVybiB7IGZvcm1hdDogJ2hzdicsIHZhbHVlOiBoc3ZWYWx1ZSB9O1xuXHR9XG59O1xuXG5jb25zdCBsYWJQYXJzZXI6IENvbG9yUGFyc2VyID0ge1xuXHRwYXJzZShpbnB1dDogc3RyaW5nKTogTEFCIHtcblx0XHRjb25zdCBtYXRjaCA9IGlucHV0Lm1hdGNoKHJlZ2V4LmNvbG9ycy5sYWIpO1xuXG5cdFx0aWYgKCFtYXRjaCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIExBQiBzdHJpbmcgZm9ybWF0OiAke2lucHV0fWApO1xuXHRcdH1cblxuXHRcdGNvbnN0IFtfLCBsLCBhLCBiLCBhbHBoYSA9ICcxJ10gPSBtYXRjaDtcblxuXHRcdGNvbnN0IGxhYlZhbHVlOiBMQUJWYWx1ZSA9IHtcblx0XHRcdGw6IGJyYW5kLmFzTEFCX0wocGFyc2VGbG9hdChsKSksXG5cdFx0XHRhOiBicmFuZC5hc0xBQl9BKHBhcnNlRmxvYXQoYSkpLFxuXHRcdFx0YjogYnJhbmQuYXNMQUJfQihwYXJzZUZsb2F0KGIpKSxcblx0XHRcdGFscGhhOiBicmFuZC5hc0FscGhhUmFuZ2UocGFyc2VGbG9hdChhbHBoYSkpXG5cdFx0fTtcblxuXHRcdHJldHVybiB7IGZvcm1hdDogJ2xhYicsIHZhbHVlOiBsYWJWYWx1ZSB9O1xuXHR9XG59O1xuXG5jb25zdCByZ2JQYXJzZXI6IENvbG9yUGFyc2VyID0ge1xuXHRwYXJzZShpbnB1dDogc3RyaW5nKTogUkdCIHtcblx0XHRjb25zdCBtYXRjaCA9IGlucHV0Lm1hdGNoKHJlZ2V4LmNvbG9ycy5yZ2IpO1xuXG5cdFx0aWYgKCFtYXRjaCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIFJHQiBzdHJpbmcgZm9ybWF0OiAke2lucHV0fWApO1xuXHRcdH1cblxuXHRcdGNvbnN0IFtfLCByZWQsIGdyZWVuLCBibHVlLCBhbHBoYSA9ICcxJ10gPSBtYXRjaDtcblxuXHRcdGNvbnN0IHJnYlZhbHVlOiBSR0JWYWx1ZSA9IHtcblx0XHRcdHJlZDogYnJhbmQuYXNCeXRlUmFuZ2UocGFyc2VGbG9hdChyZWQpKSxcblx0XHRcdGdyZWVuOiBicmFuZC5hc0J5dGVSYW5nZShwYXJzZUZsb2F0KGdyZWVuKSksXG5cdFx0XHRibHVlOiBicmFuZC5hc0J5dGVSYW5nZShwYXJzZUZsb2F0KGJsdWUpKSxcblx0XHRcdGFscGhhOiBicmFuZC5hc0FscGhhUmFuZ2UocGFyc2VGbG9hdChhbHBoYSkpXG5cdFx0fTtcblxuXHRcdHJldHVybiB7IGZvcm1hdDogJ3JnYicsIHZhbHVlOiByZ2JWYWx1ZSB9O1xuXHR9XG59O1xuXG5jb25zdCB4eXpQYXJzZXI6IENvbG9yUGFyc2VyID0ge1xuXHRwYXJzZShpbnB1dDogc3RyaW5nKTogWFlaIHtcblx0XHRjb25zdCBtYXRjaCA9IGlucHV0Lm1hdGNoKHJlZ2V4LmNvbG9ycy54eXopO1xuXG5cdFx0aWYgKCFtYXRjaCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIFhZWiBzdHJpbmcgZm9ybWF0OiAke2lucHV0fWApO1xuXHRcdH1cblxuXHRcdGNvbnN0IFtfLCB4LCB5LCB6LCBhbHBoYSA9ICcxJ10gPSBtYXRjaDtcblxuXHRcdGNvbnN0IHh5elZhbHVlOiBYWVpWYWx1ZSA9IHtcblx0XHRcdHg6IGJyYW5kLmFzWFlaX1gocGFyc2VGbG9hdCh4KSksXG5cdFx0XHR5OiBicmFuZC5hc1hZWl9ZKHBhcnNlRmxvYXQoeSkpLFxuXHRcdFx0ejogYnJhbmQuYXNYWVpfWihwYXJzZUZsb2F0KHopKSxcblx0XHRcdGFscGhhOiBicmFuZC5hc0FscGhhUmFuZ2UocGFyc2VGbG9hdChhbHBoYSkpXG5cdFx0fTtcblxuXHRcdHJldHVybiB7IGZvcm1hdDogJ3h5eicsIHZhbHVlOiB4eXpWYWx1ZSB9O1xuXHR9XG59O1xuXG5jb2xvclBhcnNlcnNbJ2NteWsnXSA9IGNteWtQYXJzZXI7XG5jb2xvclBhcnNlcnNbJ2hleCddID0gaGV4UGFyc2VyO1xuY29sb3JQYXJzZXJzWydoc2wnXSA9IGhzbFBhcnNlcjtcbmNvbG9yUGFyc2Vyc1snaHN2J10gPSBoc3ZQYXJzZXI7XG5jb2xvclBhcnNlcnNbJ2xhYiddID0gbGFiUGFyc2VyO1xuY29sb3JQYXJzZXJzWydyZ2InXSA9IHJnYlBhcnNlcjtcbmNvbG9yUGFyc2Vyc1sneHl6J10gPSB4eXpQYXJzZXI7XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUNvbG9yU3RyaW5nKGZvcm1hdDogc3RyaW5nLCBpbnB1dDogc3RyaW5nKTogQ29sb3Ige1xuXHRjb25zdCBwYXJzZXIgPSBjb2xvclBhcnNlcnNbZm9ybWF0LnRvTG93ZXJDYXNlKCldO1xuXG5cdGlmICghcGFyc2VyKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBObyBwYXJzZXIgYXZhaWxhYmxlIGZvciBmb3JtYXQ6ICR7Zm9ybWF0fWApO1xuXHR9XG5cblx0cmV0dXJuIHBhcnNlci5wYXJzZShpbnB1dCk7XG59XG5cbi8vICoqKioqKioqIENTUyBDT0xPUiBTVFJJTkdTICoqKioqKioqXG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUNTU0NvbG9yU3RyaW5nKGZvcm1hdDogc3RyaW5nLCBpbnB1dDogc3RyaW5nKTogc3RyaW5nIHtcblx0Y29uc3QgY29sb3IgPSBwYXJzZUNvbG9yU3RyaW5nKGZvcm1hdCwgaW5wdXQpO1xuXG5cdHN3aXRjaCAoY29sb3IuZm9ybWF0KSB7XG5cdFx0Y2FzZSAnY215ayc6XG5cdFx0XHRjb25zdCBjbXlrID0gY29sb3IudmFsdWUgYXMgQ01ZS1sndmFsdWUnXTtcblx0XHRcdHJldHVybiBgY215aygke2NteWsuY3lhbiAqIDEwMH0lLCAke2NteWsubWFnZW50YSAqIDEwMH0lLCAke2NteWsueWVsbG93ICogMTAwfSUsICR7Y215ay5rZXkgKiAxMDB9JHtcblx0XHRcdFx0Y215ay5hbHBoYSAhPT0gMSA/IGAsICR7Y215ay5hbHBoYX1gIDogJydcblx0XHRcdH0pYDtcblxuXHRcdGNhc2UgJ2hleCc6XG5cdFx0XHRjb25zdCBoZXggPSBjb2xvci52YWx1ZSBhcyBIZXhbJ3ZhbHVlJ107XG5cdFx0XHRyZXR1cm4gYCMke2hleC5oZXh9JHtTdHJpbmcoaGV4LmFscGhhKSAhPT0gJ0ZGJyA/IGhleC5hbHBoYSA6ICcnfWA7XG5cblx0XHRjYXNlICdoc2wnOlxuXHRcdFx0Y29uc3QgaHNsID0gY29sb3IudmFsdWUgYXMgSFNMWyd2YWx1ZSddO1xuXHRcdFx0cmV0dXJuIGBoc2woJHtoc2wuaHVlfSwgJHtoc2wuc2F0dXJhdGlvbiAqIDEwMH0lLCAke2hzbC5saWdodG5lc3MgKiAxMDB9JSR7XG5cdFx0XHRcdGhzbC5hbHBoYSAhPT0gMSA/IGAsICR7aHNsLmFscGhhfWAgOiAnJ1xuXHRcdFx0fSlgO1xuXG5cdFx0Y2FzZSAnaHN2Jzpcblx0XHRcdGNvbnN0IGhzdiA9IGNvbG9yLnZhbHVlIGFzIEhTVlsndmFsdWUnXTtcblx0XHRcdHJldHVybiBgaHN2KCR7aHN2Lmh1ZX0sICR7aHN2LnNhdHVyYXRpb24gKiAxMDB9JSwgJHtoc3YudmFsdWUgKiAxMDB9JSR7XG5cdFx0XHRcdGhzdi5hbHBoYSAhPT0gMSA/IGAsICR7aHN2LmFscGhhfWAgOiAnJ1xuXHRcdFx0fSlgO1xuXG5cdFx0Y2FzZSAnbGFiJzpcblx0XHRcdGNvbnN0IGxhYiA9IGNvbG9yLnZhbHVlIGFzIExBQlsndmFsdWUnXTtcblx0XHRcdHJldHVybiBgbGFiKCR7bGFiLmx9LCAke2xhYi5hfSwgJHtsYWIuYn0ke1xuXHRcdFx0XHRsYWIuYWxwaGEgIT09IDEgPyBgLCAke2xhYi5hbHBoYX1gIDogJydcblx0XHRcdH0pYDtcblxuXHRcdGNhc2UgJ3JnYic6XG5cdFx0XHRjb25zdCByZ2IgPSBjb2xvci52YWx1ZSBhcyBSR0JbJ3ZhbHVlJ107XG5cdFx0XHRyZXR1cm4gYHJnYigke3JnYi5yZWR9LCAke3JnYi5ncmVlbn0sICR7cmdiLmJsdWV9JHtcblx0XHRcdFx0cmdiLmFscGhhICE9PSAxID8gYCwgJHtyZ2IuYWxwaGF9YCA6ICcnXG5cdFx0XHR9KWA7XG5cblx0XHRjYXNlICd4eXonOlxuXHRcdFx0Y29uc3QgeHl6ID0gY29sb3IudmFsdWUgYXMgWFlaWyd2YWx1ZSddO1xuXHRcdFx0cmV0dXJuIGB4eXooJHt4eXoueH0sICR7eHl6Lnl9LCAke3h5ei56fSR7XG5cdFx0XHRcdHh5ei5hbHBoYSAhPT0gMSA/IGAsICR7eHl6LmFscGhhfWAgOiAnJ1xuXHRcdFx0fSlgO1xuXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgY29sb3IgZm9ybWF0OiAke2NvbG9yLmZvcm1hdH1gKTtcblx0fVxufVxuIl19