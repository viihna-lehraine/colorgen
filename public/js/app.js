// ColorGen - version 0.6.0-dev
// Author: Viihna Leraine (viihna@ViihnaTech.com / viihna.78 (Signal) / Viihna-Lehraine (Github))
// Licensed under GNU GPLv3 (https://www.gnu.org/licenses/gpl-3.0.html)
// You may use this code for any purpose EXCEPT for the creation of proprietary derivatives. I encourage you to improve on my code or to include it in other projects if you find it helpful. Please credit me as the original author.
// This application comes with ABSOLUTELY NO WARRANTY OR GUARANTEE OF ANY KIND.
import { domHelpers } from './helpers/dom.js';
import { applyCustomColor, applyInitialColorSpace, desaturateColor, saturateColor, showCustomColorPopupDiv } from './dom/dom-main.js';
import { startPaletteGen } from './palette-gen/generate.js';
import { parseColor } from './utils/transforms.js';
import { storage } from './dom/storage.js';
let customColor = null;
function getElement(id) {
    return document.getElementById(id);
}
// applies all event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded - Initializing application');
    // define buttons within the main UI
    const generateButton = getElement('generate-button');
    const saturateButton = getElement('saturate-button');
    const desaturateButton = getElement('desaturate-button');
    const popupDivButton = getElement('custom-color-button');
    const applyCustomColorButton = getElement('apply-custom-color-button');
    const clearCustomColorButton = getElement('clear-custom-color-button');
    const advancedMenuToggleButton = getElement('advanced-menu-toggle-button');
    const applyInitialColorSpaceButton = getElement('apply-initial-color-space-button');
    const selectedColorOptions = getElement('selected-color-options');
    // confirm that all elements are accessible
    console.log(`generateButton: ${generateButton}\nsaturateButton: ${saturateButton}\ndesaturateButton: ${desaturateButton}\npopupDivButton: ${popupDivButton}\napplyCustomColorButton: ${applyCustomColorButton}\nclearCustomColorButton: ${clearCustomColorButton}\nadvancedMenuToggleButton: ${advancedMenuToggleButton}\napplyInitialColorSpaceButton: ${applyInitialColorSpaceButton}\nselectedColorOptions: ${selectedColorOptions}`);
    const selectedColor = selectedColorOptions
        ? parseInt(selectedColorOptions.value, 10)
        : 0;
    console.log(`Selected color: ${selectedColor}`);
    try {
        domHelpers.addConversionButtonEventListeners();
        console.log('Conversion button event listeners attached');
    }
    catch (error) {
        console.error(`Unable to attach conversion button event listeners: ${error}`);
    }
    generateButton?.addEventListener('click', e => {
        e.preventDefault();
        console.log('generateButton clicked');
        const { paletteType, numBoxes, initialColorSpace } = domHelpers.pullParamsFromUI();
        const color = customColor
            ? parseColor(customColor.format, customColor.value)
            : null;
        startPaletteGen(paletteType, numBoxes, initialColorSpace, color);
    });
    saturateButton?.addEventListener('click', e => {
        e.preventDefault();
        console.log('saturateButton clicked');
        saturateColor(selectedColor);
    });
    desaturateButton?.addEventListener('click', e => {
        e.preventDefault();
        console.log('desaturateButton clicked');
        desaturateColor(selectedColor);
    });
    popupDivButton?.addEventListener('click', e => {
        e.preventDefault();
        console.log('popupDivButton clicked');
        showCustomColorPopupDiv();
    });
    applyCustomColorButton?.addEventListener('click', e => {
        e.preventDefault();
        const hslColorFlat = applyCustomColor();
        const customColor = hslColorFlat;
        storage.setAppStorage({ customColor });
        showCustomColorPopupDiv();
    });
    applyInitialColorSpaceButton?.addEventListener('click', e => {
        e.preventDefault();
        const initialColorSpace = applyInitialColorSpace();
        const currentStorage = storage.getAppStorage() || {};
        const newStorage = { ...currentStorage, initialColorSpace };
        storage.setAppStorage(newStorage);
    });
    clearCustomColorButton?.addEventListener('click', e => {
        e.preventDefault();
        storage.updateAppStorage({ customColor: null });
        customColor = null;
        showCustomColorPopupDiv();
    });
    advancedMenuToggleButton?.addEventListener('click', e => {
        e.preventDefault();
        const advancedMenu = getElement('advanced-menu');
        if (advancedMenu) {
            advancedMenu.classList.toggle('hidden');
            advancedMenu.style.display = advancedMenu.classList.contains('hidden')
                ? 'none'
                : 'block';
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFFL0IsaUdBQWlHO0FBQ2pHLHVFQUF1RTtBQUV2RSxzT0FBc087QUFFdE8sK0VBQStFO0FBRS9FLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUNOLGdCQUFnQixFQUNoQixzQkFBc0IsRUFDdEIsZUFBZSxFQUNmLGFBQWEsRUFDYix1QkFBdUIsRUFDdkIsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHeEMsSUFBSSxXQUFXLEdBQTZDLElBQUksQ0FBQztBQUVqRSxTQUFTLFVBQVUsQ0FBd0IsRUFBVTtJQUNwRCxPQUFPLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFhLENBQUM7QUFDaEQsQ0FBQztBQUVELGlEQUFpRDtBQUNqRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFO0lBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsK0NBQStDLENBQUMsQ0FBQztJQUU3RCxvQ0FBb0M7SUFDcEMsTUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFvQixpQkFBaUIsQ0FBQyxDQUFDO0lBQ3hFLE1BQU0sY0FBYyxHQUFHLFVBQVUsQ0FBb0IsaUJBQWlCLENBQUMsQ0FBQztJQUN4RSxNQUFNLGdCQUFnQixHQUFHLFVBQVUsQ0FBb0IsbUJBQW1CLENBQUMsQ0FBQztJQUM1RSxNQUFNLGNBQWMsR0FBRyxVQUFVLENBQW9CLHFCQUFxQixDQUFDLENBQUM7SUFDNUUsTUFBTSxzQkFBc0IsR0FBRyxVQUFVLENBQ3hDLDJCQUEyQixDQUMz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QUMsU0FBUyxDQUFDLFFBQVEsQ0FDM0QsUUFBUSxDQUNSO2dCQUNBLENBQUMsQ0FBQyxNQUFNO2dCQUNSLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDWixDQUFDO0lBQ0YsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvbG9yR2VuIC0gdmVyc2lvbiAwLjYuMC1kZXZcblxuLy8gQXV0aG9yOiBWaWlobmEgTGVyYWluZSAodmlpaG5hQFZpaWhuYVRlY2guY29tIC8gdmlpaG5hLjc4IChTaWduYWwpIC8gVmlpaG5hLUxlaHJhaW5lIChHaXRodWIpKVxuLy8gTGljZW5zZWQgdW5kZXIgR05VIEdQTHYzIChodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzL2dwbC0zLjAuaHRtbClcblxuLy8gWW91IG1heSB1c2UgdGhpcyBjb2RlIGZvciBhbnkgcHVycG9zZSBFWENFUFQgZm9yIHRoZSBjcmVhdGlvbiBvZiBwcm9wcmlldGFyeSBkZXJpdmF0aXZlcy4gSSBlbmNvdXJhZ2UgeW91IHRvIGltcHJvdmUgb24gbXkgY29kZSBvciB0byBpbmNsdWRlIGl0IGluIG90aGVyIHByb2plY3RzIGlmIHlvdSBmaW5kIGl0IGhlbHBmdWwuIFBsZWFzZSBjcmVkaXQgbWUgYXMgdGhlIG9yaWdpbmFsIGF1dGhvci5cblxuLy8gVGhpcyBhcHBsaWNhdGlvbiBjb21lcyB3aXRoIEFCU09MVVRFTFkgTk8gV0FSUkFOVFkgT1IgR1VBUkFOVEVFIE9GIEFOWSBLSU5ELlxuXG5pbXBvcnQgeyBkb21IZWxwZXJzIH0gZnJvbSAnLi9oZWxwZXJzL2RvbSc7XG5pbXBvcnQge1xuXHRhcHBseUN1c3RvbUNvbG9yLFxuXHRhcHBseUluaXRpYWxDb2xvclNwYWNlLFxuXHRkZXNhdHVyYXRlQ29sb3IsXG5cdHNhdHVyYXRlQ29sb3IsXG5cdHNob3dDdXN0b21Db2xvclBvcHVwRGl2XG59IGZyb20gJy4vZG9tL2RvbS1tYWluJztcbmltcG9ydCB7IHN0YXJ0UGFsZXR0ZUdlbiB9IGZyb20gJy4vcGFsZXR0ZS1nZW4vZ2VuZXJhdGUnO1xuaW1wb3J0IHsgcGFyc2VDb2xvciB9IGZyb20gJy4vdXRpbHMvdHJhbnNmb3Jtcyc7XG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSAnLi9kb20vc3RvcmFnZSc7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuL2luZGV4JztcblxubGV0IGN1c3RvbUNvbG9yOiB7IGZvcm1hdDogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH0gfCBudWxsID0gbnVsbDtcblxuZnVuY3Rpb24gZ2V0RWxlbWVudDxUIGV4dGVuZHMgSFRNTEVsZW1lbnQ+KGlkOiBzdHJpbmcpOiBUIHwgbnVsbCB7XG5cdHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkgYXMgVCB8IG51bGw7XG59XG5cbi8vIGFwcGxpZXMgYWxsIGV2ZW50IGxpc3RlbmVycyB3aGVuIERPTSBpcyBsb2FkZWRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG5cdGNvbnNvbGUubG9nKCdET00gY29udGVudCBsb2FkZWQgLSBJbml0aWFsaXppbmcgYXBwbGljYXRpb24nKTtcblxuXHQvLyBkZWZpbmUgYnV0dG9ucyB3aXRoaW4gdGhlIG1haW4gVUlcblx0Y29uc3QgZ2VuZXJhdGVCdXR0b24gPSBnZXRFbGVtZW50PEhUTUxCdXR0b25FbGVtZW50PignZ2VuZXJhdGUtYnV0dG9uJyk7XG5cdGNvbnN0IHNhdHVyYXRlQnV0dG9uID0gZ2V0RWxlbWVudDxIVE1MQnV0dG9uRWxlbWVudD4oJ3NhdHVyYXRlLWJ1dHRvbicpO1xuXHRjb25zdCBkZXNhdHVyYXRlQnV0dG9uID0gZ2V0RWxlbWVudDxIVE1MQnV0dG9uRWxlbWVudD4oJ2Rlc2F0dXJhdGUtYnV0dG9uJyk7XG5cdGNvbnN0IHBvcHVwRGl2QnV0dG9uID0gZ2V0RWxlbWVudDxIVE1MQnV0dG9uRWxlbWVudD4oJ2N1c3RvbS1jb2xvci1idXR0b24nKTtcblx0Y29uc3QgYXBwbHlDdXN0b21Db2xvckJ1dHRvbiA9IGdldEVsZW1lbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KFxuXHRcdCdhcHBseS1jdXN0b20tY29sb3ItYnV0dG9uJ1xuXHQpO1xuXHRjb25zdCBjbGVhckN1c3RvbUNvbG9yQnV0dG9uID0gZ2V0RWxlbWVudDxIVE1MQnV0dG9uRWxlbWVudD4oXG5cdFx0J2NsZWFyLWN1c3RvbS1jb2xvci1idXR0b24nXG5cdCk7XG5cdGNvbnN0IGFkdmFuY2VkTWVudVRvZ2dsZUJ1dHRvbiA9IGdldEVsZW1lbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KFxuXHRcdCdhZHZhbmNlZC1tZW51LXRvZ2dsZS1idXR0b24nXG5cdCk7XG5cdGNvbnN0IGFwcGx5SW5pdGlhbENvbG9yU3BhY2VCdXR0b24gPSBnZXRFbGVtZW50PEhUTUxCdXR0b25FbGVtZW50Pihcblx0XHQnYXBwbHktaW5pdGlhbC1jb2xvci1zcGFjZS1idXR0b24nXG5cdCk7XG5cdGNvbnN0IHNlbGVjdGVkQ29sb3JPcHRpb25zID0gZ2V0RWxlbWVudDxIVE1MU2VsZWN0RWxlbWVudD4oXG5cdFx0J3NlbGVjdGVkLWNvbG9yLW9wdGlvbnMnXG5cdCk7XG5cblx0Ly8gY29uZmlybSB0aGF0IGFsbCBlbGVtZW50cyBhcmUgYWNjZXNzaWJsZVxuXHRjb25zb2xlLmxvZyhcblx0XHRgZ2VuZXJhdGVCdXR0b246ICR7Z2VuZXJhdGVCdXR0b259XFxuc2F0dXJhdGVCdXR0b246ICR7c2F0dXJhdGVCdXR0b259XFxuZGVzYXR1cmF0ZUJ1dHRvbjogJHtkZXNhdHVyYXRlQnV0dG9ufVxcbnBvcHVwRGl2QnV0dG9uOiAke3BvcHVwRGl2QnV0dG9ufVxcbmFwcGx5Q3VzdG9tQ29sb3JCdXR0b246ICR7YXBwbHlDdXN0b21Db2xvckJ1dHRvbn1cXG5jbGVhckN1c3RvbUNvbG9yQnV0dG9uOiAke2NsZWFyQ3VzdG9tQ29sb3JCdXR0b259XFxuYWR2YW5jZWRNZW51VG9nZ2xlQnV0dG9uOiAke2FkdmFuY2VkTWVudVRvZ2dsZUJ1dHRvbn1cXG5hcHBseUluaXRpYWxDb2xvclNwYWNlQnV0dG9uOiAke2FwcGx5SW5pdGlhbENvbG9yU3BhY2VCdXR0b259XFxuc2VsZWN0ZWRDb2xvck9wdGlvbnM6ICR7c2VsZWN0ZWRDb2xvck9wdGlvbnN9YFxuXHQpO1xuXG5cdGNvbnN0IHNlbGVjdGVkQ29sb3IgPSBzZWxlY3RlZENvbG9yT3B0aW9uc1xuXHRcdD8gcGFyc2VJbnQoc2VsZWN0ZWRDb2xvck9wdGlvbnMudmFsdWUsIDEwKVxuXHRcdDogMDtcblx0Y29uc29sZS5sb2coYFNlbGVjdGVkIGNvbG9yOiAke3NlbGVjdGVkQ29sb3J9YCk7XG5cblx0dHJ5IHtcblx0XHRkb21IZWxwZXJzLmFkZENvbnZlcnNpb25CdXR0b25FdmVudExpc3RlbmVycygpO1xuXHRcdGNvbnNvbGUubG9nKCdDb252ZXJzaW9uIGJ1dHRvbiBldmVudCBsaXN0ZW5lcnMgYXR0YWNoZWQnKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRjb25zb2xlLmVycm9yKFxuXHRcdFx0YFVuYWJsZSB0byBhdHRhY2ggY29udmVyc2lvbiBidXR0b24gZXZlbnQgbGlzdGVuZXJzOiAke2Vycm9yfWBcblx0XHQpO1xuXHR9XG5cblx0Z2VuZXJhdGVCdXR0b24/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0Y29uc29sZS5sb2coJ2dlbmVyYXRlQnV0dG9uIGNsaWNrZWQnKTtcblxuXHRcdGNvbnN0IHsgcGFsZXR0ZVR5cGUsIG51bUJveGVzLCBpbml0aWFsQ29sb3JTcGFjZSB9ID1cblx0XHRcdGRvbUhlbHBlcnMucHVsbFBhcmFtc0Zyb21VSSgpO1xuXG5cdFx0Y29uc3QgY29sb3I6IHR5cGVzLkNvbG9yIHwgbnVsbCA9IGN1c3RvbUNvbG9yXG5cdFx0XHQ/IHBhcnNlQ29sb3IoXG5cdFx0XHRcdFx0Y3VzdG9tQ29sb3IuZm9ybWF0IGFzIHR5cGVzLkNvbG9yU3BhY2UsXG5cdFx0XHRcdFx0Y3VzdG9tQ29sb3IudmFsdWVcblx0XHRcdFx0KVxuXHRcdFx0OiBudWxsO1xuXG5cdFx0c3RhcnRQYWxldHRlR2VuKHBhbGV0dGVUeXBlLCBudW1Cb3hlcywgaW5pdGlhbENvbG9yU3BhY2UsIGNvbG9yKTtcblx0fSk7XG5cblx0c2F0dXJhdGVCdXR0b24/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGNvbnNvbGUubG9nKCdzYXR1cmF0ZUJ1dHRvbiBjbGlja2VkJyk7XG5cdFx0c2F0dXJhdGVDb2xvcihzZWxlY3RlZENvbG9yKTtcblx0fSk7XG5cblx0ZGVzYXR1cmF0ZUJ1dHRvbj8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Y29uc29sZS5sb2coJ2Rlc2F0dXJhdGVCdXR0b24gY2xpY2tlZCcpO1xuXHRcdGRlc2F0dXJhdGVDb2xvcihzZWxlY3RlZENvbG9yKTtcblx0fSk7XG5cblx0cG9wdXBEaXZCdXR0b24/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGNvbnNvbGUubG9nKCdwb3B1cERpdkJ1dHRvbiBjbGlja2VkJyk7XG5cdFx0c2hvd0N1c3RvbUNvbG9yUG9wdXBEaXYoKTtcblx0fSk7XG5cblx0YXBwbHlDdXN0b21Db2xvckJ1dHRvbj8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Y29uc3QgaHNsQ29sb3JGbGF0ID0gYXBwbHlDdXN0b21Db2xvcigpO1xuXHRcdGNvbnN0IGN1c3RvbUNvbG9yOiB0eXBlcy5Db2xvciA9IGhzbENvbG9yRmxhdDtcblx0XHRzdG9yYWdlLnNldEFwcFN0b3JhZ2UoeyBjdXN0b21Db2xvciB9KTtcblx0XHRzaG93Q3VzdG9tQ29sb3JQb3B1cERpdigpO1xuXHR9KTtcblxuXHRhcHBseUluaXRpYWxDb2xvclNwYWNlQnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRjb25zdCBpbml0aWFsQ29sb3JTcGFjZTogdHlwZXMuQ29sb3JTcGFjZSA9IGFwcGx5SW5pdGlhbENvbG9yU3BhY2UoKTtcblx0XHRjb25zdCBjdXJyZW50U3RvcmFnZSA9IHN0b3JhZ2UuZ2V0QXBwU3RvcmFnZSgpIHx8IHt9O1xuXHRcdGNvbnN0IG5ld1N0b3JhZ2UgPSB7IC4uLmN1cnJlbnRTdG9yYWdlLCBpbml0aWFsQ29sb3JTcGFjZSB9O1xuXHRcdHN0b3JhZ2Uuc2V0QXBwU3RvcmFnZShuZXdTdG9yYWdlKTtcblx0fSk7XG5cblx0Y2xlYXJDdXN0b21Db2xvckJ1dHRvbj8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0c3RvcmFnZS51cGRhdGVBcHBTdG9yYWdlKHsgY3VzdG9tQ29sb3I6IG51bGwgfSk7XG5cdFx0Y3VzdG9tQ29sb3IgPSBudWxsO1xuXHRcdHNob3dDdXN0b21Db2xvclBvcHVwRGl2KCk7XG5cdH0pO1xuXG5cdGFkdmFuY2VkTWVudVRvZ2dsZUJ1dHRvbj8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Y29uc3QgYWR2YW5jZWRNZW51ID0gZ2V0RWxlbWVudDxIVE1MRGl2RWxlbWVudD4oJ2FkdmFuY2VkLW1lbnUnKTtcblx0XHRpZiAoYWR2YW5jZWRNZW51KSB7XG5cdFx0XHRhZHZhbmNlZE1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG5cdFx0XHRhZHZhbmNlZE1lbnUuc3R5bGUuZGlzcGxheSA9IGFkdmFuY2VkTWVudS5jbGFzc0xpc3QuY29udGFpbnMoXG5cdFx0XHRcdCdoaWRkZW4nXG5cdFx0XHQpXG5cdFx0XHRcdD8gJ25vbmUnXG5cdFx0XHRcdDogJ2Jsb2NrJztcblx0XHR9XG5cdH0pO1xufSk7XG4iXX0=