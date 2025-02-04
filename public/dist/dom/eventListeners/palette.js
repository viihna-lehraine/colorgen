// File: dom/eventListeners/palette.js
import { createLogger } from '../../logger/factory.js';
import { domData } from '../../data/dom.js';
import { modeData as mode } from '../../data/mode.js';
import { parse as parseDom } from '../parse.js';
const domClasses = domData.classes;
const logMode = mode.logging;
const thisModule = 'dom/eventListeners/groups/palette.js';
const logger = await createLogger();
function initLiveColorRender() {
    document.querySelectorAll(domClasses.colorInput).forEach(input => {
        input.addEventListener('input', (e) => {
            const target = e.target;
            const parsedColor = parseDom.colorInput(target);
            if (parsedColor) {
                if (!mode.quiet && logMode.debug && logMode.verbosity > 1) {
                    logger.debug(`Parsed color: ${JSON.stringify(parsedColor)}`, `${thisModule}`);
                }
                const swatch = target
                    .closest(domClasses.colorStripe)
                    ?.querySelector(domClasses.colorSwatch);
                if (swatch) {
                    swatch.style.backgroundColor =
                        parsedColor.format === 'hex'
                            ? parsedColor.value.hex
                            : parsedColor.format === 'rgb'
                                ? `rgb(${parsedColor.value.red}, ${parsedColor.value.green}, ${parsedColor.value.blue})`
                                : `hsl(${parsedColor.value.hue}, ${parsedColor.value.saturation}%, ${parsedColor.value.lightness}%)`;
                }
            }
            else {
                if (!mode.quiet && logMode.warn) {
                    logger.warn(`Invalid color input: ${target.value}`, `${thisModule}`);
                }
            }
        });
    });
}
export const paletteListeners = {
    initialize: {
        liveColorRender: initLiveColorRender
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFsZXR0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb20vZXZlbnRMaXN0ZW5lcnMvcGFsZXR0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxzQ0FBc0M7QUFFdEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM1QyxPQUFPLEVBQUUsUUFBUSxJQUFJLElBQUksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxLQUFLLElBQUksUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRWhELE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7QUFDbkMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUU3QixNQUFNLFVBQVUsR0FBRyxzQ0FBc0MsQ0FBQztBQUUxRCxNQUFNLE1BQU0sR0FBRyxNQUFNLFlBQVksRUFBRSxDQUFDO0FBRXBDLFNBQVMsbUJBQW1CO0lBQzNCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2hFLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFRLEVBQUUsRUFBRTtZQUM1QyxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBMEIsQ0FBQztZQUM1QyxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRWhELElBQUksV0FBVyxFQUFFLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDM0QsTUFBTSxDQUFDLEtBQUssQ0FDWCxpQkFBaUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUM5QyxHQUFHLFVBQVUsRUFBRSxDQUNmLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCxNQUFNLE1BQU0sR0FBRyxNQUFNO3FCQUNuQixPQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztvQkFDaEMsRUFBRSxhQUFhLENBQ2QsVUFBVSxDQUFDLFdBQVcsQ0FDQSxDQUFDO2dCQUV6QixJQUFJLE1BQU0sRUFBRSxDQUFDO29CQUNaLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZTt3QkFDM0IsV0FBVyxDQUFDLE1BQU0sS0FBSyxLQUFLOzRCQUMzQixDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHOzRCQUN2QixDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sS0FBSyxLQUFLO2dDQUM3QixDQUFDLENBQUMsT0FBTyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRztnQ0FDeEYsQ0FBQyxDQUFDLE9BQU8sV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssV0FBVyxDQUFDLEtBQUssQ0FBQyxVQUFVLE1BQU0sV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksQ0FBQztnQkFDekcsQ0FBQztZQUNGLENBQUM7aUJBQU0sQ0FBQztnQkFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQ1Ysd0JBQXdCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFDdEMsR0FBRyxVQUFVLEVBQUUsQ0FDZixDQUFDO2dCQUNILENBQUM7WUFDRixDQUFDO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRztJQUMvQixVQUFVLEVBQUU7UUFDWCxlQUFlLEVBQUUsbUJBQW1CO0tBQ3BDO0NBQ0QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEZpbGU6IGRvbS9ldmVudExpc3RlbmVycy9wYWxldHRlLmpzXG5cbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gJy4uLy4uL2xvZ2dlci9mYWN0b3J5LmpzJztcbmltcG9ydCB7IGRvbURhdGEgfSBmcm9tICcuLi8uLi9kYXRhL2RvbS5qcyc7XG5pbXBvcnQgeyBtb2RlRGF0YSBhcyBtb2RlIH0gZnJvbSAnLi4vLi4vZGF0YS9tb2RlLmpzJztcbmltcG9ydCB7IHBhcnNlIGFzIHBhcnNlRG9tIH0gZnJvbSAnLi4vcGFyc2UuanMnO1xuXG5jb25zdCBkb21DbGFzc2VzID0gZG9tRGF0YS5jbGFzc2VzO1xuY29uc3QgbG9nTW9kZSA9IG1vZGUubG9nZ2luZztcblxuY29uc3QgdGhpc01vZHVsZSA9ICdkb20vZXZlbnRMaXN0ZW5lcnMvZ3JvdXBzL3BhbGV0dGUuanMnO1xuXG5jb25zdCBsb2dnZXIgPSBhd2FpdCBjcmVhdGVMb2dnZXIoKTtcblxuZnVuY3Rpb24gaW5pdExpdmVDb2xvclJlbmRlcigpOiB2b2lkIHtcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChkb21DbGFzc2VzLmNvbG9ySW5wdXQpLmZvckVhY2goaW5wdXQgPT4ge1xuXHRcdGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGU6IEV2ZW50KSA9PiB7XG5cdFx0XHRjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuXHRcdFx0Y29uc3QgcGFyc2VkQ29sb3IgPSBwYXJzZURvbS5jb2xvcklucHV0KHRhcmdldCk7XG5cblx0XHRcdGlmIChwYXJzZWRDb2xvcikge1xuXHRcdFx0XHRpZiAoIW1vZGUucXVpZXQgJiYgbG9nTW9kZS5kZWJ1ZyAmJiBsb2dNb2RlLnZlcmJvc2l0eSA+IDEpIHtcblx0XHRcdFx0XHRsb2dnZXIuZGVidWcoXG5cdFx0XHRcdFx0XHRgUGFyc2VkIGNvbG9yOiAke0pTT04uc3RyaW5naWZ5KHBhcnNlZENvbG9yKX1gLFxuXHRcdFx0XHRcdFx0YCR7dGhpc01vZHVsZX1gXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IHN3YXRjaCA9IHRhcmdldFxuXHRcdFx0XHRcdC5jbG9zZXN0KGRvbUNsYXNzZXMuY29sb3JTdHJpcGUpXG5cdFx0XHRcdFx0Py5xdWVyeVNlbGVjdG9yKFxuXHRcdFx0XHRcdFx0ZG9tQ2xhc3Nlcy5jb2xvclN3YXRjaFxuXHRcdFx0XHRcdCkgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuXG5cdFx0XHRcdGlmIChzd2F0Y2gpIHtcblx0XHRcdFx0XHRzd2F0Y2guc3R5bGUuYmFja2dyb3VuZENvbG9yID1cblx0XHRcdFx0XHRcdHBhcnNlZENvbG9yLmZvcm1hdCA9PT0gJ2hleCdcblx0XHRcdFx0XHRcdFx0PyBwYXJzZWRDb2xvci52YWx1ZS5oZXhcblx0XHRcdFx0XHRcdFx0OiBwYXJzZWRDb2xvci5mb3JtYXQgPT09ICdyZ2InXG5cdFx0XHRcdFx0XHRcdFx0PyBgcmdiKCR7cGFyc2VkQ29sb3IudmFsdWUucmVkfSwgJHtwYXJzZWRDb2xvci52YWx1ZS5ncmVlbn0sICR7cGFyc2VkQ29sb3IudmFsdWUuYmx1ZX0pYFxuXHRcdFx0XHRcdFx0XHRcdDogYGhzbCgke3BhcnNlZENvbG9yLnZhbHVlLmh1ZX0sICR7cGFyc2VkQ29sb3IudmFsdWUuc2F0dXJhdGlvbn0lLCAke3BhcnNlZENvbG9yLnZhbHVlLmxpZ2h0bmVzc30lKWA7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICghbW9kZS5xdWlldCAmJiBsb2dNb2RlLndhcm4pIHtcblx0XHRcdFx0XHRsb2dnZXIud2Fybihcblx0XHRcdFx0XHRcdGBJbnZhbGlkIGNvbG9yIGlucHV0OiAke3RhcmdldC52YWx1ZX1gLFxuXHRcdFx0XHRcdFx0YCR7dGhpc01vZHVsZX1gXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcbn1cblxuZXhwb3J0IGNvbnN0IHBhbGV0dGVMaXN0ZW5lcnMgPSB7XG5cdGluaXRpYWxpemU6IHtcblx0XHRsaXZlQ29sb3JSZW5kZXI6IGluaXRMaXZlQ29sb3JSZW5kZXJcblx0fVxufTtcbiJdfQ==