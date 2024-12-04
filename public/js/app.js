// ColorGen - version 0.6.0-dev
import { config } from './config';
import { core } from './common';
import { dom } from './dom';
import { idb } from './idb';
import { logger } from './logger';
import { start } from './palette';
import { utils } from './common';
const consts = config.consts;
const mode = config.mode;
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded - Initializing application');
    const buttons = dom.defineUIElements();
    if (!buttons) {
        console.error('Failed to initialize UI buttons');
        return;
    }
    const selectedColorOption = consts.dom.selectedColorOption;
    const { advancedMenuButton, applyCustomColorButton, clearCustomColorButton, closeCustomColorMenuButton, closeHelpMenuButton, closeHistoryMenuButton, desaturateButton, generateButton, helpMenuButton, historyMenuButton, saturateButton, showAsCMYKButton, showAsHexButton, showAsHSLButton, showAsHSVButton, showAsLABButton, showAsRGBButton } = buttons;
    // confirm that all elements are accessible
    if (mode.debug) {
        logger.debug.validateDOMElements();
        if (mode.verbose) {
            logger.verbose.validateDOMElements();
        }
    }
    else {
        if (!mode.quiet) {
            console.log('Skipping DOM element validation');
        }
    }
    const selectedColor = selectedColorOption
        ? parseInt(selectedColorOption.value, 10)
        : 0;
    if (!mode.quiet)
        console.log(`Selected color: ${selectedColor}`);
    try {
        dom.addConversionButtonEventListeners();
        if (!mode.quiet)
            console.log('Conversion button event listeners attached');
    }
    catch (error) {
        if (mode.logErrors)
            console.error(`Unable to attach conversion button event listeners: ${error}`);
    }
    advancedMenuButton?.addEventListener('click', e => {
        e.preventDefault();
        const advancedMenuContent = document.querySelector('.advanced-menu-content');
        if (advancedMenuContent) {
            const isHidden = getComputedStyle(advancedMenuContent).display === 'none';
            advancedMenuContent.style.display = isHidden ? 'flex' : 'none';
        }
        if (!mode.quiet)
            console.log('advancedMenuToggleButton clicked');
    });
    applyCustomColorButton?.addEventListener('click', async (e) => {
        e.preventDefault();
        const customHSLColor = dom.applyCustomColor();
        const customHSLColorClone = core.clone(customHSLColor);
        await idb.saveData('customColor', 'appSettings', customHSLColorClone);
        if (!mode.quiet)
            console.log('Custom color saved to IndexedDB');
    });
    clearCustomColorButton?.addEventListener('click', async (e) => {
        e.preventDefault();
        await idb.deleteTable('customColor');
        if (!mode.quiet)
            console.log('Custom color cleared from IndexedDB');
        dom.showCustomColorPopupDiv();
    });
    closeCustomColorMenuButton?.addEventListener('click', async (e) => {
        e.preventDefault();
        console.log('closeCustomColorMenuButton clicked');
    });
    closeHelpMenuButton?.addEventListener('click', e => {
        e.preventDefault();
        if (!mode.quiet)
            console.log('closeHelpMenuButton clicked');
    });
    closeHistoryMenuButton?.addEventListener('click', e => {
        e.preventDefault();
        if (!mode.quiet)
            console.log('closeHistoryMenuButton clicked');
    });
    desaturateButton?.addEventListener('click', e => {
        e.preventDefault();
        if (!mode.quiet)
            console.log('desaturateButton clicked');
        dom.desaturateColor(selectedColor);
    });
    generateButton?.addEventListener('click', async (e) => {
        e.preventDefault();
        if (!mode.quiet)
            console.log('generateButton clicked');
        const { paletteType, numBoxes, enableAlpha, limitDarkness, limitGrayness, limitLightness } = dom.pullParamsFromUI();
        let customColor = (await idb.getCustomColor());
        if (!customColor) {
            if (!mode.quiet)
                console.info('No custom color found. Using a random color');
            customColor = utils.random.hsl(true);
        }
        const paletteOptions = {
            paletteType,
            numBoxes,
            customColor: core.clone(customColor),
            enableAlpha,
            limitDarkness,
            limitGrayness,
            limitLightness
        };
        await start.paletteGen(paletteOptions);
    });
    helpMenuButton?.addEventListener('click', e => {
        e.preventDefault();
        const helpMenuContent = document.querySelector('.help-menu-content');
        if (helpMenuContent) {
            const isHidden = getComputedStyle(helpMenuContent).display === 'none';
            helpMenuContent.style.display = isHidden ? 'flex' : 'none';
        }
        if (!mode.quiet)
            console.log('helpMenuToggleButton clicked');
    });
    historyMenuButton?.addEventListener('click', e => {
        e.preventDefault();
        const historyMenuContent = document.querySelector('history-menu-content');
        if (historyMenuContent) {
            const isHidden = getComputedStyle(historyMenuContent).display === 'none';
            historyMenuContent.style.display = isHidden ? 'flex' : 'none';
        }
        if (!mode.quiet)
            console.log('historyMenuToggleButton clicked');
    });
    saturateButton?.addEventListener('click', e => {
        e.preventDefault();
        if (!mode.quiet)
            console.log('saturateButton clicked');
        dom.saturateColor(selectedColor);
    });
    showAsCMYKButton?.addEventListener('click', e => {
        e.preventDefault();
        if (!mode.quiet)
            console.log('showAsCMYKButton clicked');
    });
    showAsHexButton?.addEventListener('click', e => {
        e.preventDefault();
        if (!mode.quiet)
            console.log('showAsHexButton clicked');
    });
    showAsHSLButton?.addEventListener('click', e => {
        e.preventDefault();
        if (!mode.quiet)
            console.log('showAsHSLButton clicked');
    });
    showAsHSVButton?.addEventListener('click', e => {
        e.preventDefault();
        if (!mode.quiet)
            console.log('showAsHSVButton clicked');
    });
    showAsLABButton?.addEventListener('click', e => {
        e.preventDefault();
        if (!mode.quiet)
            console.log('showAsLABButton clicked');
    });
    showAsRGBButton?.addEventListener('click', e => {
        e.preventDefault();
        if (!mode.quiet)
            console.log('showAsRGBButton clicked');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFVL0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNsQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDNUIsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUM1QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDbEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVqQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQzdCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFFekIsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRTtJQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFDLCtDQUErQyxDQUFDLENBQUM7SUFFN0QsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFFdkMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1FBQ2pELE9BQU87SUFDUixDQUFDO0lBRUQsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDO0lBRTNELE1BQU0sRUFDTCxrQkFBa0IsRUFDbEIsc0JBQXNCLEVBQ3RCLHNCQUFzQixFQUN0QiwwQkFBMEIsRUFDMUIsbUJBQW1CLEVBQ25CLHNCQUFzQixFQUN0QixnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLGNBQWMsRUFDZCxpQkFB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YyxFQUFFLENBQUM7UUFFbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLO1lBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQ3pELENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb2xvckdlbiAtIHZlcnNpb24gMC42LjAtZGV2XG5cbi8vIEF1dGhvcjogVmlpaG5hIExlcmFpbmUgKHZpaWhuYUBWaWlobmFUZWNoLmNvbSAvIHZpaWhuYS43OCAoU2lnbmFsKSAvIFZpaWhuYS1MZWhyYWluZSAoR2l0aHViKSlcbi8vIExpY2Vuc2VkIHVuZGVyIEdOVSBHUEx2MyAoaHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy9ncGwtMy4wLmh0bWwpXG5cbi8vIFlvdSBtYXkgdXNlIHRoaXMgY29kZSBmb3IgYW55IHB1cnBvc2UgRVhDRVBUIGZvciB0aGUgY3JlYXRpb24gb2YgcHJvcHJpZXRhcnkgZGVyaXZhdGl2ZXMuIEkgZW5jb3VyYWdlIHlvdSB0byBpbXByb3ZlIG9uIG15IGNvZGUgb3IgdG8gaW5jbHVkZSBpdCBpbiBvdGhlciBwcm9qZWN0cyBpZiB5b3UgZmluZCBpdCBoZWxwZnVsLiBQbGVhc2UgY3JlZGl0IG1lIGFzIHRoZSBvcmlnaW5hbCBhdXRob3IuXG5cbi8vIFRoaXMgYXBwbGljYXRpb24gY29tZXMgd2l0aCBBQlNPTFVURUxZIE5PIFdBUlJBTlRZIE9SIEdVQVJBTlRFRSBPRiBBTlkgS0lORC5cblxuaW1wb3J0IHsgSFNMLCBQYWxldHRlT3B0aW9ucyB9IGZyb20gJy4vaW5kZXgnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgY29yZSB9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7IGRvbSB9IGZyb20gJy4vZG9tJztcbmltcG9ydCB7IGlkYiB9IGZyb20gJy4vaWRiJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7IHN0YXJ0IH0gZnJvbSAnLi9wYWxldHRlJztcbmltcG9ydCB7IHV0aWxzIH0gZnJvbSAnLi9jb21tb24nO1xuXG5jb25zdCBjb25zdHMgPSBjb25maWcuY29uc3RzO1xuY29uc3QgbW9kZSA9IGNvbmZpZy5tb2RlO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuXHRjb25zb2xlLmxvZygnRE9NIGNvbnRlbnQgbG9hZGVkIC0gSW5pdGlhbGl6aW5nIGFwcGxpY2F0aW9uJyk7XG5cblx0Y29uc3QgYnV0dG9ucyA9IGRvbS5kZWZpbmVVSUVsZW1lbnRzKCk7XG5cblx0aWYgKCFidXR0b25zKSB7XG5cdFx0Y29uc29sZS5lcnJvcignRmFpbGVkIHRvIGluaXRpYWxpemUgVUkgYnV0dG9ucycpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IHNlbGVjdGVkQ29sb3JPcHRpb24gPSBjb25zdHMuZG9tLnNlbGVjdGVkQ29sb3JPcHRpb247XG5cblx0Y29uc3Qge1xuXHRcdGFkdmFuY2VkTWVudUJ1dHRvbixcblx0XHRhcHBseUN1c3RvbUNvbG9yQnV0dG9uLFxuXHRcdGNsZWFyQ3VzdG9tQ29sb3JCdXR0b24sXG5cdFx0Y2xvc2VDdXN0b21Db2xvck1lbnVCdXR0b24sXG5cdFx0Y2xvc2VIZWxwTWVudUJ1dHRvbixcblx0XHRjbG9zZUhpc3RvcnlNZW51QnV0dG9uLFxuXHRcdGRlc2F0dXJhdGVCdXR0b24sXG5cdFx0Z2VuZXJhdGVCdXR0b24sXG5cdFx0aGVscE1lbnVCdXR0b24sXG5cdFx0aGlzdG9yeU1lbnVCdXR0b24sXG5cdFx0c2F0dXJhdGVCdXR0b24sXG5cdFx0c2hvd0FzQ01ZS0J1dHRvbixcblx0XHRzaG93QXNIZXhCdXR0b24sXG5cdFx0c2hvd0FzSFNMQnV0dG9uLFxuXHRcdHNob3dBc0hTVkJ1dHRvbixcblx0XHRzaG93QXNMQUJCdXR0b24sXG5cdFx0c2hvd0FzUkdCQnV0dG9uXG5cdH0gPSBidXR0b25zO1xuXG5cdC8vIGNvbmZpcm0gdGhhdCBhbGwgZWxlbWVudHMgYXJlIGFjY2Vzc2libGVcblx0aWYgKG1vZGUuZGVidWcpIHtcblx0XHRsb2dnZXIuZGVidWcudmFsaWRhdGVET01FbGVtZW50cygpO1xuXG5cdFx0aWYgKG1vZGUudmVyYm9zZSkge1xuXHRcdFx0bG9nZ2VyLnZlcmJvc2UudmFsaWRhdGVET01FbGVtZW50cygpO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRpZiAoIW1vZGUucXVpZXQpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdTa2lwcGluZyBET00gZWxlbWVudCB2YWxpZGF0aW9uJyk7XG5cdFx0fVxuXHR9XG5cblx0Y29uc3Qgc2VsZWN0ZWRDb2xvciA9IHNlbGVjdGVkQ29sb3JPcHRpb25cblx0XHQ/IHBhcnNlSW50KHNlbGVjdGVkQ29sb3JPcHRpb24udmFsdWUsIDEwKVxuXHRcdDogMDtcblxuXHRpZiAoIW1vZGUucXVpZXQpIGNvbnNvbGUubG9nKGBTZWxlY3RlZCBjb2xvcjogJHtzZWxlY3RlZENvbG9yfWApO1xuXG5cdHRyeSB7XG5cdFx0ZG9tLmFkZENvbnZlcnNpb25CdXR0b25FdmVudExpc3RlbmVycygpO1xuXG5cdFx0aWYgKCFtb2RlLnF1aWV0KVxuXHRcdFx0Y29uc29sZS5sb2coJ0NvbnZlcnNpb24gYnV0dG9uIGV2ZW50IGxpc3RlbmVycyBhdHRhY2hlZCcpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGlmIChtb2RlLmxvZ0Vycm9ycylcblx0XHRcdGNvbnNvbGUuZXJyb3IoXG5cdFx0XHRcdGBVbmFibGUgdG8gYXR0YWNoIGNvbnZlcnNpb24gYnV0dG9uIGV2ZW50IGxpc3RlbmVyczogJHtlcnJvcn1gXG5cdFx0XHQpO1xuXHR9XG5cblx0YWR2YW5jZWRNZW51QnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGNvbnN0IGFkdmFuY2VkTWVudUNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuXHRcdFx0Jy5hZHZhbmNlZC1tZW51LWNvbnRlbnQnXG5cdFx0KSBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG5cblx0XHRpZiAoYWR2YW5jZWRNZW51Q29udGVudCkge1xuXHRcdFx0Y29uc3QgaXNIaWRkZW4gPVxuXHRcdFx0XHRnZXRDb21wdXRlZFN0eWxlKGFkdmFuY2VkTWVudUNvbnRlbnQpLmRpc3BsYXkgPT09ICdub25lJztcblxuXHRcdFx0YWR2YW5jZWRNZW51Q29udGVudC5zdHlsZS5kaXNwbGF5ID0gaXNIaWRkZW4gPyAnZmxleCcgOiAnbm9uZSc7XG5cdFx0fVxuXG5cdFx0aWYgKCFtb2RlLnF1aWV0KSBjb25zb2xlLmxvZygnYWR2YW5jZWRNZW51VG9nZ2xlQnV0dG9uIGNsaWNrZWQnKTtcblx0fSk7XG5cblx0YXBwbHlDdXN0b21Db2xvckJ1dHRvbj8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyBlID0+IHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRjb25zdCBjdXN0b21IU0xDb2xvciA9IGRvbS5hcHBseUN1c3RvbUNvbG9yKCk7XG5cdFx0Y29uc3QgY3VzdG9tSFNMQ29sb3JDbG9uZTogSFNMID0gY29yZS5jbG9uZShjdXN0b21IU0xDb2xvcik7XG5cblx0XHRhd2FpdCBpZGIuc2F2ZURhdGEoJ2N1c3RvbUNvbG9yJywgJ2FwcFNldHRpbmdzJywgY3VzdG9tSFNMQ29sb3JDbG9uZSk7XG5cblx0XHRpZiAoIW1vZGUucXVpZXQpIGNvbnNvbGUubG9nKCdDdXN0b20gY29sb3Igc2F2ZWQgdG8gSW5kZXhlZERCJyk7XG5cdH0pO1xuXG5cdGNsZWFyQ3VzdG9tQ29sb3JCdXR0b24/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgZSA9PiB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0YXdhaXQgaWRiLmRlbGV0ZVRhYmxlKCdjdXN0b21Db2xvcicpO1xuXG5cdFx0aWYgKCFtb2RlLnF1aWV0KSBjb25zb2xlLmxvZygnQ3VzdG9tIGNvbG9yIGNsZWFyZWQgZnJvbSBJbmRleGVkREInKTtcblxuXHRcdGRvbS5zaG93Q3VzdG9tQ29sb3JQb3B1cERpdigpO1xuXHR9KTtcblxuXHRjbG9zZUN1c3RvbUNvbG9yTWVudUJ1dHRvbj8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyBlID0+IHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRjb25zb2xlLmxvZygnY2xvc2VDdXN0b21Db2xvck1lbnVCdXR0b24gY2xpY2tlZCcpO1xuXHR9KTtcblxuXHRjbG9zZUhlbHBNZW51QnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGlmICghbW9kZS5xdWlldCkgY29uc29sZS5sb2coJ2Nsb3NlSGVscE1lbnVCdXR0b24gY2xpY2tlZCcpO1xuXHR9KTtcblxuXHRjbG9zZUhpc3RvcnlNZW51QnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGlmICghbW9kZS5xdWlldCkgY29uc29sZS5sb2coJ2Nsb3NlSGlzdG9yeU1lbnVCdXR0b24gY2xpY2tlZCcpO1xuXHR9KTtcblxuXHRkZXNhdHVyYXRlQnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGlmICghbW9kZS5xdWlldCkgY29uc29sZS5sb2coJ2Rlc2F0dXJhdGVCdXR0b24gY2xpY2tlZCcpO1xuXG5cdFx0ZG9tLmRlc2F0dXJhdGVDb2xvcihzZWxlY3RlZENvbG9yKTtcblx0fSk7XG5cblx0Z2VuZXJhdGVCdXR0b24/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgZSA9PiB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0aWYgKCFtb2RlLnF1aWV0KSBjb25zb2xlLmxvZygnZ2VuZXJhdGVCdXR0b24gY2xpY2tlZCcpO1xuXG5cdFx0Y29uc3Qge1xuXHRcdFx0cGFsZXR0ZVR5cGUsXG5cdFx0XHRudW1Cb3hlcyxcblx0XHRcdGVuYWJsZUFscGhhLFxuXHRcdFx0bGltaXREYXJrbmVzcyxcblx0XHRcdGxpbWl0R3JheW5lc3MsXG5cdFx0XHRsaW1pdExpZ2h0bmVzc1xuXHRcdH0gPSBkb20ucHVsbFBhcmFtc0Zyb21VSSgpO1xuXG5cdFx0bGV0IGN1c3RvbUNvbG9yID0gKGF3YWl0IGlkYi5nZXRDdXN0b21Db2xvcigpKSBhcyBIU0wgfCBudWxsO1xuXG5cdFx0aWYgKCFjdXN0b21Db2xvcikge1xuXHRcdFx0aWYgKCFtb2RlLnF1aWV0KVxuXHRcdFx0XHRjb25zb2xlLmluZm8oJ05vIGN1c3RvbSBjb2xvciBmb3VuZC4gVXNpbmcgYSByYW5kb20gY29sb3InKTtcblxuXHRcdFx0Y3VzdG9tQ29sb3IgPSB1dGlscy5yYW5kb20uaHNsKHRydWUpO1xuXHRcdH1cblxuXHRcdGNvbnN0IHBhbGV0dGVPcHRpb25zOiBQYWxldHRlT3B0aW9ucyA9IHtcblx0XHRcdHBhbGV0dGVUeXBlLFxuXHRcdFx0bnVtQm94ZXMsXG5cdFx0XHRjdXN0b21Db2xvcjogY29yZS5jbG9uZShjdXN0b21Db2xvciksXG5cdFx0XHRlbmFibGVBbHBoYSxcblx0XHRcdGxpbWl0RGFya25lc3MsXG5cdFx0XHRsaW1pdEdyYXluZXNzLFxuXHRcdFx0bGltaXRMaWdodG5lc3Ncblx0XHR9O1xuXG5cdFx0YXdhaXQgc3RhcnQucGFsZXR0ZUdlbihwYWxldHRlT3B0aW9ucyk7XG5cdH0pO1xuXG5cdGhlbHBNZW51QnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGNvbnN0IGhlbHBNZW51Q29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG5cdFx0XHQnLmhlbHAtbWVudS1jb250ZW50J1xuXHRcdCkgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuXG5cdFx0aWYgKGhlbHBNZW51Q29udGVudCkge1xuXHRcdFx0Y29uc3QgaXNIaWRkZW4gPVxuXHRcdFx0XHRnZXRDb21wdXRlZFN0eWxlKGhlbHBNZW51Q29udGVudCkuZGlzcGxheSA9PT0gJ25vbmUnO1xuXG5cdFx0XHRoZWxwTWVudUNvbnRlbnQuc3R5bGUuZGlzcGxheSA9IGlzSGlkZGVuID8gJ2ZsZXgnIDogJ25vbmUnO1xuXHRcdH1cblxuXHRcdGlmICghbW9kZS5xdWlldCkgY29uc29sZS5sb2coJ2hlbHBNZW51VG9nZ2xlQnV0dG9uIGNsaWNrZWQnKTtcblx0fSk7XG5cblx0aGlzdG9yeU1lbnVCdXR0b24/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0Y29uc3QgaGlzdG9yeU1lbnVDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihcblx0XHRcdCdoaXN0b3J5LW1lbnUtY29udGVudCdcblx0XHQpIGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcblxuXHRcdGlmIChoaXN0b3J5TWVudUNvbnRlbnQpIHtcblx0XHRcdGNvbnN0IGlzSGlkZGVuID1cblx0XHRcdFx0Z2V0Q29tcHV0ZWRTdHlsZShoaXN0b3J5TWVudUNvbnRlbnQpLmRpc3BsYXkgPT09ICdub25lJztcblxuXHRcdFx0aGlzdG9yeU1lbnVDb250ZW50LnN0eWxlLmRpc3BsYXkgPSBpc0hpZGRlbiA/ICdmbGV4JyA6ICdub25lJztcblx0XHR9XG5cblx0XHRpZiAoIW1vZGUucXVpZXQpIGNvbnNvbGUubG9nKCdoaXN0b3J5TWVudVRvZ2dsZUJ1dHRvbiBjbGlja2VkJyk7XG5cdH0pO1xuXG5cdHNhdHVyYXRlQnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGlmICghbW9kZS5xdWlldCkgY29uc29sZS5sb2coJ3NhdHVyYXRlQnV0dG9uIGNsaWNrZWQnKTtcblxuXHRcdGRvbS5zYXR1cmF0ZUNvbG9yKHNlbGVjdGVkQ29sb3IpO1xuXHR9KTtcblxuXHRzaG93QXNDTVlLQnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGlmICghbW9kZS5xdWlldCkgY29uc29sZS5sb2coJ3Nob3dBc0NNWUtCdXR0b24gY2xpY2tlZCcpO1xuXHR9KTtcblxuXHRzaG93QXNIZXhCdXR0b24/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0aWYgKCFtb2RlLnF1aWV0KSBjb25zb2xlLmxvZygnc2hvd0FzSGV4QnV0dG9uIGNsaWNrZWQnKTtcblx0fSk7XG5cblx0c2hvd0FzSFNMQnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGlmICghbW9kZS5xdWlldCkgY29uc29sZS5sb2coJ3Nob3dBc0hTTEJ1dHRvbiBjbGlja2VkJyk7XG5cdH0pO1xuXG5cdHNob3dBc0hTVkJ1dHRvbj8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRpZiAoIW1vZGUucXVpZXQpIGNvbnNvbGUubG9nKCdzaG93QXNIU1ZCdXR0b24gY2xpY2tlZCcpO1xuXHR9KTtcblxuXHRzaG93QXNMQUJCdXR0b24/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0aWYgKCFtb2RlLnF1aWV0KSBjb25zb2xlLmxvZygnc2hvd0FzTEFCQnV0dG9uIGNsaWNrZWQnKTtcblx0fSk7XG5cblx0c2hvd0FzUkdCQnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGlmICghbW9kZS5xdWlldCkgY29uc29sZS5sb2coJ3Nob3dBc1JHQkJ1dHRvbiBjbGlja2VkJyk7XG5cdH0pO1xufSk7XG4iXX0=