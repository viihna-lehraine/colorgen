import { convert } from './conversion-index.js';
import { defaults } from '../utils/defaults.js';
export function xyzToLAB(xyz) {
    try {
        const refX = 95.047, refY = 100.0, refZ = 108.883;
        xyz.value.x = xyz.value.x / refX;
        xyz.value.y = xyz.value.y / refY;
        xyz.value.z = xyz.value.z / refZ;
        xyz.value.x =
            xyz.value.x > 0.008856
                ? Math.pow(xyz.value.x, 1 / 3)
                : 7.787 * xyz.value.x + 16 / 116;
        xyz.value.y =
            xyz.value.y > 0.008856
                ? Math.pow(xyz.value.y, 1 / 3)
                : 7.787 * xyz.value.y + 16 / 116;
        xyz.value.z =
            xyz.value.z > 0.008856
                ? Math.pow(xyz.value.z, 1 / 3)
                : 7.787 * xyz.value.z + 16 / 116;
        let l = parseFloat((116 * xyz.value.y - 16).toFixed(2));
        let a = parseFloat((500 * (xyz.value.x - xyz.value.y)).toFixed(2));
        let b = parseFloat((200 * (xyz.value.y - xyz.value.z)).toFixed(2));
        return { value: { l, a, b }, format: 'lab' };
    }
    catch (error) {
        console.error(`xyzToLab() error: ${error}`);
        return defaults.defaultLAB();
    }
}
export function hexToLAB(hex) {
    try {
        const rgb = convert.hexToRGB(hex);
        const xyz = convert.rgbToXYZ(rgb);
        return xyzToLAB(xyz);
    }
    catch (error) {
        console.error(`hexToLAB() error: ${error}`);
        return defaults.defaultLAB();
    }
}
export function rgbToLAB(rgb) {
    try {
        const xyz = convert.rgbToXYZ(rgb);
        return xyzToLAB(xyz);
    }
    catch (error) {
        console.error(`rgbToLab() error: ${error}`);
        return defaults.defaultLAB();
    }
}
export function hslToLAB(hsl) {
    try {
        const rgb = convert.hslToRGB(hsl);
        const xyz = convert.rgbToXYZ(rgb);
        return xyzToLAB(xyz);
    }
    catch (error) {
        console.error(`hslToLab() error: ${error}`);
        return defaults.defaultLAB();
    }
}
export function hsvToLAB(hsv) {
    try {
        const rgb = convert.hsvToRGB(hsv);
        const xyz = convert.rgbToXYZ(rgb);
        return xyzToLAB(xyz);
    }
    catch (error) {
        console.error(`hsvToLab() error: ${error}`);
        return defaults.defaultLAB();
    }
}
export function cmykToLAB(cmyk) {
    try {
        const rgb = convert.cmykToRGB(cmyk);
        const xyz = convert.rgbToXYZ(rgb);
        return xyzToLAB(xyz);
    }
    catch (error) {
        console.error(`cmykToLab() error: ${error}`);
        return defaults.defaultLAB();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9MQUIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29sb3ItY29udmVyc2lvbi90b0xBQi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFN0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTdDLE1BQU0sVUFBVSxRQUFRLENBQUMsR0FBYztJQUN0QyxJQUFJLENBQUM7UUFDSixNQUFNLElBQUksR0FBRyxNQUFNLEVBQ2xCLElBQUksR0FBRyxLQUFLLEVBQ1osSUFBSSxHQUFHLE9BQU8sQ0FBQztRQUVoQixHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDakMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUVqQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDVixHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxRQUFRO2dCQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM5QixDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDbkMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ1YsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsUUFBUTtnQkFDckIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FB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b20gJy4vY29udmVyc2lvbi1pbmRleCc7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuLi9pbmRleCc7XG5pbXBvcnQgeyBkZWZhdWx0cyB9IGZyb20gJy4uL3V0aWxzL2RlZmF1bHRzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHh5elRvTEFCKHh5ejogdHlwZXMuWFlaKTogdHlwZXMuTEFCIHtcblx0dHJ5IHtcblx0XHRjb25zdCByZWZYID0gOTUuMDQ3LFxuXHRcdFx0cmVmWSA9IDEwMC4wLFxuXHRcdFx0cmVmWiA9IDEwOC44ODM7XG5cblx0XHR4eXoudmFsdWUueCA9IHh5ei52YWx1ZS54IC8gcmVmWDtcblx0XHR4eXoudmFsdWUueSA9IHh5ei52YWx1ZS55IC8gcmVmWTtcblx0XHR4eXoudmFsdWUueiA9IHh5ei52YWx1ZS56IC8gcmVmWjtcblxuXHRcdHh5ei52YWx1ZS54ID1cblx0XHRcdHh5ei52YWx1ZS54ID4gMC4wMDg4NTZcblx0XHRcdFx0PyBNYXRoLnBvdyh4eXoudmFsdWUueCwgMSAvIDMpXG5cdFx0XHRcdDogNy43ODcgKiB4eXoudmFsdWUueCArIDE2IC8gMTE2O1xuXHRcdHh5ei52YWx1ZS55ID1cblx0XHRcdHh5ei52YWx1ZS55ID4gMC4wMDg4NTZcblx0XHRcdFx0PyBNYXRoLnBvdyh4eXoudmFsdWUueSwgMSAvIDMpXG5cdFx0XHRcdDogNy43ODcgKiB4eXoudmFsdWUueSArIDE2IC8gMTE2O1xuXHRcdHh5ei52YWx1ZS56ID1cblx0XHRcdHh5ei52YWx1ZS56ID4gMC4wMDg4NTZcblx0XHRcdFx0PyBNYXRoLnBvdyh4eXoudmFsdWUueiwgMSAvIDMpXG5cdFx0XHRcdDogNy43ODcgKiB4eXoudmFsdWUueiArIDE2IC8gMTE2O1xuXG5cdFx0bGV0IGwgPSBwYXJzZUZsb2F0KCgxMTYgKiB4eXoudmFsdWUueSAtIDE2KS50b0ZpeGVkKDIpKTtcblx0XHRsZXQgYSA9IHBhcnNlRmxvYXQoKDUwMCAqICh4eXoudmFsdWUueCAtIHh5ei52YWx1ZS55KSkudG9GaXhlZCgyKSk7XG5cdFx0bGV0IGIgPSBwYXJzZUZsb2F0KCgyMDAgKiAoeHl6LnZhbHVlLnkgLSB4eXoudmFsdWUueikpLnRvRml4ZWQoMikpO1xuXG5cdFx0cmV0dXJuIHsgdmFsdWU6IHsgbCwgYSwgYiB9LCBmb3JtYXQ6ICdsYWInIH07XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Y29uc29sZS5lcnJvcihgeHl6VG9MYWIoKSBlcnJvcjogJHtlcnJvcn1gKTtcblx0XHRyZXR1cm4gZGVmYXVsdHMuZGVmYXVsdExBQigpO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoZXhUb0xBQihoZXg6IHR5cGVzLkhleCk6IHR5cGVzLkxBQiB7XG5cdHRyeSB7XG5cdFx0Y29uc3QgcmdiID0gY29udmVydC5oZXhUb1JHQihoZXgpO1xuXHRcdGNvbnN0IHh5eiA9IGNvbnZlcnQucmdiVG9YWVoocmdiKTtcblxuXHRcdHJldHVybiB4eXpUb0xBQih4eXopO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGNvbnNvbGUuZXJyb3IoYGhleFRvTEFCKCkgZXJyb3I6ICR7ZXJyb3J9YCk7XG5cdFx0cmV0dXJuIGRlZmF1bHRzLmRlZmF1bHRMQUIoKTtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmdiVG9MQUIocmdiOiB0eXBlcy5SR0IpOiB0eXBlcy5MQUIge1xuXHR0cnkge1xuXHRcdGNvbnN0IHh5eiA9IGNvbnZlcnQucmdiVG9YWVoocmdiKTtcblx0XHRyZXR1cm4geHl6VG9MQUIoeHl6KTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRjb25zb2xlLmVycm9yKGByZ2JUb0xhYigpIGVycm9yOiAke2Vycm9yfWApO1xuXHRcdHJldHVybiBkZWZhdWx0cy5kZWZhdWx0TEFCKCk7XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhzbFRvTEFCKGhzbDogdHlwZXMuSFNMKTogdHlwZXMuTEFCIHtcblx0dHJ5IHtcblx0XHRjb25zdCByZ2IgPSBjb252ZXJ0LmhzbFRvUkdCKGhzbCk7XG5cdFx0Y29uc3QgeHl6ID0gY29udmVydC5yZ2JUb1hZWihyZ2IpO1xuXG5cdFx0cmV0dXJuIHh5elRvTEFCKHh5eik7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Y29uc29sZS5lcnJvcihgaHNsVG9MYWIoKSBlcnJvcjogJHtlcnJvcn1gKTtcblx0XHRyZXR1cm4gZGVmYXVsdHMuZGVmYXVsdExBQigpO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoc3ZUb0xBQihoc3Y6IHR5cGVzLkhTVik6IHR5cGVzLkxBQiB7XG5cdHRyeSB7XG5cdFx0Y29uc3QgcmdiID0gY29udmVydC5oc3ZUb1JHQihoc3YpO1xuXHRcdGNvbnN0IHh5eiA9IGNvbnZlcnQucmdiVG9YWVoocmdiKTtcblxuXHRcdHJldHVybiB4eXpUb0xBQih4eXopO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGNvbnNvbGUuZXJyb3IoYGhzdlRvTGFiKCkgZXJyb3I6ICR7ZXJyb3J9YCk7XG5cdFx0cmV0dXJuIGRlZmF1bHRzLmRlZmF1bHRMQUIoKTtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY215a1RvTEFCKGNteWs6IHR5cGVzLkNNWUspOiB0eXBlcy5MQUIge1xuXHR0cnkge1xuXHRcdGNvbnN0IHJnYiA9IGNvbnZlcnQuY215a1RvUkdCKGNteWspO1xuXHRcdGNvbnN0IHh5eiA9IGNvbnZlcnQucmdiVG9YWVoocmdiKTtcblxuXHRcdHJldHVybiB4eXpUb0xBQih4eXopO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGNvbnNvbGUuZXJyb3IoYGNteWtUb0xhYigpIGVycm9yOiAke2Vycm9yfWApO1xuXHRcdHJldHVybiBkZWZhdWx0cy5kZWZhdWx0TEFCKCk7XG5cdH1cbn1cbiJdfQ==