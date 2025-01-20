// File: src/common/utils/conversion.js
import { convert } from '../convert/index.js';
import { core } from '../core/index.js';
import { data } from '../../data/index.js';
import { logger } from '../../logger/index.js';
const mode = data.mode;
const logMode = mode.logging;
function getConversionFn(from, to) {
    try {
        const fnName = `${from}To${to[0].toUpperCase() + to.slice(1)}`;
        if (!(fnName in convert))
            return undefined;
        const conversionFn = convert[fnName];
        return (value) => structuredClone(conversionFn(value));
    }
    catch (error) {
        if (logMode.errors)
            logger.error(`Error getting conversion function: ${error}`);
        return undefined;
    }
}
function genAllColorValues(color) {
    const result = {};
    try {
        const clonedColor = core.base.clone(color);
        if (!core.validate.colorValues(clonedColor)) {
            if (logMode.errors)
                logger.error(`Invalid color: ${JSON.stringify(clonedColor)}`);
            return {};
        }
        result.cmyk = convert.hslTo(clonedColor, 'cmyk');
        result.hex = convert.hslTo(clonedColor, 'hex');
        result.hsl = clonedColor;
        result.hsv = convert.hslTo(clonedColor, 'hsv');
        result.lab = convert.hslTo(clonedColor, 'lab');
        result.rgb = convert.hslTo(clonedColor, 'rgb');
        result.sl = convert.hslTo(clonedColor, 'sl');
        result.sv = convert.hslTo(clonedColor, 'sv');
        result.xyz = convert.hslTo(clonedColor, 'xyz');
        return result;
    }
    catch (error) {
        if (logMode.errors)
            logger.error(`Error generating all color values: ${error}`);
        return {};
    }
}
export const conversion = {
    genAllColorValues,
    getConversionFn
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21tb24vdXRpbHMvY29udmVyc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx1Q0FBdUM7QUFnQnZDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDeEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUvQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3ZCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7QUFFN0IsU0FBUyxlQUFlLENBSXZCLElBQVUsRUFDVixFQUFNO0lBRU4sSUFBSSxDQUFDO1FBQ0osTUFBTSxNQUFNLEdBQ1gsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQTBCLENBQUM7UUFFekUsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQztZQUFFLE9BQU8sU0FBUyxDQUFDO1FBRTNDLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBRVIsQ0FBQztRQUU1QixPQUFPLENBQUMsS0FBK0IsRUFBMEIsRUFBRSxDQUNsRSxlQUFlLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDaEIsSUFBSSxPQUFPLENBQUMsTUFBTTtZQUNqQixNQUFNLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRTdELE9BQU8sU0FBUyxDQUFDO0lBQ2xCLENBQUM7QUFDRixDQUFDO0FBRUQsU0FBUyxpQkFBaUIsQ0FBQyxLQUFVO0lBQ3BDLE1BQU0sTUFBTSxHQUErQixFQUFFLENBQUM7SUFFOUMsSUFBSSxDQUFDO1FBQ0osTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7WUFDN0MsSUFBSSxPQUFPLENBQUMsTUFBTTtnQkFDakIsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFL0QsT0FBTyxFQUFFLENBQUM7UUFDWCxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQVMsQ0FBQztRQUN6RCxNQUFNLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBUSxDQUFDO1FBQ3RELE1BQU0sQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFRLENBQUM7UUFDdEQsTUFBTSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQVEsQ0FBQztRQUN0RCxNQUFNLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBUSxDQUFDO1FBQ3RELE1BQU0sQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFPLENBQUM7UUFDbkQsTUFBTSxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQU8sQ0FBQztRQUNuRCxNQUFNLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBUSxDQUFDO1FBRXRELE9BQU8sTUFBTSxDQUFDO0lBQ2YsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDaEIsSUFBSSxPQUFPLENBQUMsTUFBTTtZQUNqQixNQUFNLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRTdELE9BQU8sRUFBRSxDQUFDO0lBQ1gsQ0FBQztBQUNGLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQTRCO0lBQ2xELGlCQUFpQjtJQUNqQixlQUFlO0NBQ04sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEZpbGU6IHNyYy9jb21tb24vdXRpbHMvY29udmVyc2lvbi5qc1xuXG5pbXBvcnQge1xuXHRDTVlLLFxuXHRDb2xvckRhdGFBc3NlcnRpb24sXG5cdENvbG9yRGF0YUV4dGVuZGVkLFxuXHRDb21tb25VdGlsc0ZuQ29udmVyc2lvbixcblx0SGV4LFxuXHRIU0wsXG5cdEhTVixcblx0TEFCLFxuXHRSR0IsXG5cdFNMLFxuXHRTVixcblx0WFlaXG59IGZyb20gJy4uLy4uL2luZGV4L2luZGV4LmpzJztcbmltcG9ydCB7IGNvbnZlcnQgfSBmcm9tICcuLi9jb252ZXJ0L2luZGV4LmpzJztcbmltcG9ydCB7IGNvcmUgfSBmcm9tICcuLi9jb3JlL2luZGV4LmpzJztcbmltcG9ydCB7IGRhdGEgfSBmcm9tICcuLi8uLi9kYXRhL2luZGV4LmpzJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4uLy4uL2xvZ2dlci9pbmRleC5qcyc7XG5cbmNvbnN0IG1vZGUgPSBkYXRhLm1vZGU7XG5jb25zdCBsb2dNb2RlID0gbW9kZS5sb2dnaW5nO1xuXG5mdW5jdGlvbiBnZXRDb252ZXJzaW9uRm48XG5cdEZyb20gZXh0ZW5kcyBrZXlvZiBDb2xvckRhdGFBc3NlcnRpb24sXG5cdFRvIGV4dGVuZHMga2V5b2YgQ29sb3JEYXRhQXNzZXJ0aW9uXG4+KFxuXHRmcm9tOiBGcm9tLFxuXHR0bzogVG9cbik6ICgodmFsdWU6IENvbG9yRGF0YUFzc2VydGlvbltGcm9tXSkgPT4gQ29sb3JEYXRhQXNzZXJ0aW9uW1RvXSkgfCB1bmRlZmluZWQge1xuXHR0cnkge1xuXHRcdGNvbnN0IGZuTmFtZSA9XG5cdFx0XHRgJHtmcm9tfVRvJHt0b1swXS50b1VwcGVyQ2FzZSgpICsgdG8uc2xpY2UoMSl9YCBhcyBrZXlvZiB0eXBlb2YgY29udmVydDtcblxuXHRcdGlmICghKGZuTmFtZSBpbiBjb252ZXJ0KSkgcmV0dXJuIHVuZGVmaW5lZDtcblxuXHRcdGNvbnN0IGNvbnZlcnNpb25GbiA9IGNvbnZlcnRbZm5OYW1lXSBhcyB1bmtub3duIGFzIChcblx0XHRcdGlucHV0OiBDb2xvckRhdGFBc3NlcnRpb25bRnJvbV1cblx0XHQpID0+IENvbG9yRGF0YUFzc2VydGlvbltUb107XG5cblx0XHRyZXR1cm4gKHZhbHVlOiBDb2xvckRhdGFBc3NlcnRpb25bRnJvbV0pOiBDb2xvckRhdGFBc3NlcnRpb25bVG9dID0+XG5cdFx0XHRzdHJ1Y3R1cmVkQ2xvbmUoY29udmVyc2lvbkZuKHZhbHVlKSk7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0aWYgKGxvZ01vZGUuZXJyb3JzKVxuXHRcdFx0bG9nZ2VyLmVycm9yKGBFcnJvciBnZXR0aW5nIGNvbnZlcnNpb24gZnVuY3Rpb246ICR7ZXJyb3J9YCk7XG5cblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGdlbkFsbENvbG9yVmFsdWVzKGNvbG9yOiBIU0wpOiBQYXJ0aWFsPENvbG9yRGF0YUV4dGVuZGVkPiB7XG5cdGNvbnN0IHJlc3VsdDogUGFydGlhbDxDb2xvckRhdGFFeHRlbmRlZD4gPSB7fTtcblxuXHR0cnkge1xuXHRcdGNvbnN0IGNsb25lZENvbG9yID0gY29yZS5iYXNlLmNsb25lKGNvbG9yKTtcblxuXHRcdGlmICghY29yZS52YWxpZGF0ZS5jb2xvclZhbHVlcyhjbG9uZWRDb2xvcikpIHtcblx0XHRcdGlmIChsb2dNb2RlLmVycm9ycylcblx0XHRcdFx0bG9nZ2VyLmVycm9yKGBJbnZhbGlkIGNvbG9yOiAke0pTT04uc3RyaW5naWZ5KGNsb25lZENvbG9yKX1gKTtcblxuXHRcdFx0cmV0dXJuIHt9O1xuXHRcdH1cblxuXHRcdHJlc3VsdC5jbXlrID0gY29udmVydC5oc2xUbyhjbG9uZWRDb2xvciwgJ2NteWsnKSBhcyBDTVlLO1xuXHRcdHJlc3VsdC5oZXggPSBjb252ZXJ0LmhzbFRvKGNsb25lZENvbG9yLCAnaGV4JykgYXMgSGV4O1xuXHRcdHJlc3VsdC5oc2wgPSBjbG9uZWRDb2xvcjtcblx0XHRyZXN1bHQuaHN2ID0gY29udmVydC5oc2xUbyhjbG9uZWRDb2xvciwgJ2hzdicpIGFzIEhTVjtcblx0XHRyZXN1bHQubGFiID0gY29udmVydC5oc2xUbyhjbG9uZWRDb2xvciwgJ2xhYicpIGFzIExBQjtcblx0XHRyZXN1bHQucmdiID0gY29udmVydC5oc2xUbyhjbG9uZWRDb2xvciwgJ3JnYicpIGFzIFJHQjtcblx0XHRyZXN1bHQuc2wgPSBjb252ZXJ0LmhzbFRvKGNsb25lZENvbG9yLCAnc2wnKSBhcyBTTDtcblx0XHRyZXN1bHQuc3YgPSBjb252ZXJ0LmhzbFRvKGNsb25lZENvbG9yLCAnc3YnKSBhcyBTVjtcblx0XHRyZXN1bHQueHl6ID0gY29udmVydC5oc2xUbyhjbG9uZWRDb2xvciwgJ3h5eicpIGFzIFhZWjtcblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0aWYgKGxvZ01vZGUuZXJyb3JzKVxuXHRcdFx0bG9nZ2VyLmVycm9yKGBFcnJvciBnZW5lcmF0aW5nIGFsbCBjb2xvciB2YWx1ZXM6ICR7ZXJyb3J9YCk7XG5cblx0XHRyZXR1cm4ge307XG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IGNvbnZlcnNpb246IENvbW1vblV0aWxzRm5Db252ZXJzaW9uID0ge1xuXHRnZW5BbGxDb2xvclZhbHVlcyxcblx0Z2V0Q29udmVyc2lvbkZuXG59IGFzIGNvbnN0O1xuIl19