import { convertColors, showTooltip } from '../dom/dom-main.js';
import { attachDragAndDropEventListeners } from '../dom/drag-and-drop.js';
import { guards } from '../utils/type-guards.js';
// defines buttons for the main UI
function defineUIButtons() {
    const generateButton = document.getElementById('generate-button');
    const saturateButton = document.getElementById('saturate-button');
    const desaturateButton = document.getElementById('desaturate-button');
    const popupDivButton = document.getElementById('custom-color-button');
    const applyCustomColorButton = document.getElementById('apply-custom-color-button');
    const clearCustomColorButton = document.getElementById('clear-custom-color-button');
    const advancedMenuToggleButton = document.getElementById('advanced-menu-toggle-button');
    const applyInitialColorSpaceButton = document.getElementById('apply-initial-color-space-button');
    const selectedColorOptions = document.getElementById('selected-color-options');
    const selectedColor = selectedColorOptions
        ? parseInt(selectedColorOptions.value, 10)
        : 0;
    return {
        generateButton,
        saturateButton,
        desaturateButton,
        popupDivButton,
        applyCustomColorButton,
        clearCustomColorButton,
        advancedMenuToggleButton,
        applyInitialColorSpaceButton,
        selectedColor
    };
}
// add conversion button event listeners
function addConversionButtonEventListeners() {
    const addListener = (id, colorSpace) => {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', () => convertColors(colorSpace));
        }
        else {
            console.warn(`Element with id "${id}" not found.`);
        }
    };
    addListener('hex-conversion-button', 'hex');
    addListener('rgb-conversion-button', 'rgb');
    addListener('hsv-conversion-button', 'hsv');
    addListener('hsl-conversion-button', 'hsl');
    addListener('cmyk-conversion-button', 'cmyk');
    addListener('lab-conversion-button', 'lab');
}
function makePaletteBox(colorValues, paletteBoxCount) {
    const paletteBox = document.createElement('div');
    paletteBox.className = 'palette-box';
    paletteBox.id = `palette-box-${paletteBoxCount}`;
    const paletteBoxTopHalf = document.createElement('div');
    paletteBoxTopHalf.className = 'palette-box-half palette-box-top-half';
    paletteBoxTopHalf.id = `palette-box-top-half-${paletteBoxCount}`;
    const colorTextOutputBox = document.createElement('input');
    colorTextOutputBox.type = 'text';
    colorTextOutputBox.className = 'color-text-output-box tooltip';
    colorTextOutputBox.id = `color-text-output-box-${paletteBoxCount}`;
    colorTextOutputBox.setAttribute('data-format', 'hex');
    // access nested properties safely using type guard(s)
    if (colorValues.format === 'hex' && 'value' in colorValues) {
        colorTextOutputBox.value = colorValues.value.hex;
    }
    else {
        console.warn(`Hex value not found for palette-box #${paletteBoxCount}`);
        colorTextOutputBox.value = '';
    }
    // store color values within input element
    colorTextOutputBox.colorValues = colorValues;
    colorTextOutputBox.readOnly = false;
    colorTextOutputBox.style.cursor = 'text';
    // create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.textContent = 'Copy';
    const tooltipText = document.createElement('span');
    tooltipText.className = 'tooltiptext';
    tooltipText.textContent = 'Copied to clipboard!';
    // add clipboard functionality to copy button
    copyButton.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(colorTextOutputBox.value);
            showTooltip(colorTextOutputBox);
        }
        catch (error) {
            console.error(`Failed to copy: ${error}`);
        }
    });
    // add event listener for input changes
    colorTextOutputBox.addEventListener('input', e => {
        const target = e.target;
        if (target && /^#[0-9A-F]{6}$%/i.test(target.value)) {
            const boxElement = document.getElementById(`color-box-${paletteBoxCount}`);
            const stripeElement = document.getElementById(`color-stripe-${paletteBoxCount}`);
            if (boxElement)
                boxElement.style.backgroundColor = target.value;
            if (stripeElement)
                stripeElement.style.backgroundColor = target.value;
        }
    });
    // appends elements to top half
    paletteBoxTopHalf.appendChild(colorTextOutputBox);
    paletteBoxTopHalf.appendChild(copyButton);
    // create bottom half of palette box
    const paletteBoxBottomHalf = document.createElement('div');
    paletteBoxBottomHalf.className = 'palette-box-half palette-box-bottom-half';
    paletteBoxBottomHalf.id = `palette-box-bottom-half-${paletteBoxCount}`;
    // create color box
    const colorBox = document.createElement('div');
    colorBox.className = 'color-box';
    colorBox.id = `color-box-${paletteBoxCount}`;
    if (colorValues.value && 'hsl' in colorValues.value) {
        const hslString = colorValues.value.hsl;
        colorBox.style.backgroundColor = hslString;
    }
    else {
        colorBox.style.backgroundColor = '#ffffff'; // default color
    }
    paletteBoxBottomHalf.appendChild(colorBox);
    // append halves to main palette box
    paletteBox.appendChild(paletteBoxTopHalf);
    paletteBox.appendChild(paletteBoxBottomHalf);
    // create color stripe
    const colorStripe = document.createElement('div');
    colorStripe.className = 'color-stripe';
    colorStripe.id = `color-stripe-${paletteBoxCount}`;
    if (colorValues.value && 'hsl' in colorValues.value) {
        colorStripe.style.backgroundColor = colorValues.value.hsl;
    }
    colorStripe.setAttribute('draggable', 'true');
    attachDragAndDropEventListeners(colorStripe);
    // append palette box to color stripe
    colorStripe.appendChild(paletteBox);
    return {
        colorStripe,
        paletteBoxCount: paletteBoxCount + 1
    };
}
function pullParamsFromUI() {
    const paletteTypeElement = document.getElementById('palette-type-options');
    const numBoxesElement = document.getElementById('palette-number-options');
    const initialColorSpaceElement = document.getElementById('initial-color-space-options');
    const paletteType = paletteTypeElement
        ? parseInt(paletteTypeElement.value, 10)
        : 0;
    const numBoxes = numBoxesElement ? parseInt(numBoxesElement.value, 10) : 0;
    const initialColorSpace = initialColorSpaceElement &&
        guards.isColorSpace(initialColorSpaceElement.value)
        ? initialColorSpaceElement.value
        : 'hex';
    return {
        paletteType,
        numBoxes,
        initialColorSpace
    };
}
export const domHelpers = {
    defineUIButtons,
    addConversionButtonEventListeners,
    makePaletteBox,
    pullParamsFromUI
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2hlbHBlcnMvZG9tLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0QsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTlDLGtDQUFrQztBQUNsQyxTQUFTLGVBQWU7SUFDdkIsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ2xFLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNsRSxNQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUN0RSxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDdEUsTUFBTSxzQkFBc0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUNyRCwyQkFBMkIsQ0FDM0IsQ0FBQztJQUNGLE1BQU0sc0JBQXNCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FDckQsMkJBQTJCLENBQzNCLENBQUM7SUFDRixNQUFNLHdCQUF3QixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQ3ZELDZCQUE2QixDQUM3QixDQUFDO0lBQ0YsTUFBTSw0QkFBNEIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUMzRCxrQ0FBa0MsQ0FDbEMsQ0FBQztJQUNGLE1BQU0sb0JBQW9CLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FDbkQsd0JBQXdCLENBQ0ksQ0FBQztJQUM5QixNQUFNLGFBQWEsR0FBRyxvQkFBb0I7UUFDekMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFTCxPQUFPO1FBQ04sY0FBYztRQUNkLGNBQWM7UUFDZCxnQkFBZ0I7UUFDaEIsY0FBYztRQUNkLHNCQUFzQjtRQUN0QixzQkFBc0I7UUFDdEIsd0JBQXdCO1FBQ3hCLDRCQUE0QjtRQUM1QixhQUFhO0tBQ2IsQ0FBQztBQUNILENBQUM7QUFFRCx3Q0FBd0M7QUFDeEMsU0FBUyxpQ0FBaUM7SUFDekMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxFQUFVLEVBQUUsVUFBNEIsRUFBRSxFQUFFO1FBQ2hFLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUE2QixDQUFDO1FBRXZFLElBQUksTUFBTSxFQUFFLENBQUM7WUFDWixNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ25FLENBQUM7YUFBTSxDQUFDO1lBQ1AsT0FBTyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUNwRCxDQUFDO0lBQ0YsQ0FBQyxDQUFDO0lBRUYsV0FBVyxDQUFDLHVCQUF1QixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzVDLFdBQVcsQ0FBQyx1QkFBdUIsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM1QyxXQUFXLENBQUMsdUJBQXVCLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDNUMsV0FBVyxDQUFDLHVCQUF1QixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzVDLFdBQVcsQ0FBQyx3QkFBd0IsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM5QyxXQUFXLENBQUMsdUJBQXVCLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDN0MsQ0FBQztBQUVELFNBQVMsY0FBYyxDQUN0QixXQUF3QixFQUN4QixlQUF1QjtJQUV2QixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pELFVBQVUsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3JDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsZUFBZSxlQUFlLEVBQUUsQ0FBQztJQUVqRCxNQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEQsaUJBQWlCLENBQUMsU0FBUyxHQUFHLHVDQUF1QyxDQUFDO0lBQ3RFLGlCQUFpQixDQUFDLEVBQUUsR0FBRyx3QkFBd0IsZUFBZSxFQUFFLENBQUM7SUFFakUsTUFBTSxrQkFBa0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNoRCxPQUFPLENBQ29CLENBQUM7SUFDN0Isa0JBQWtCLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztJQUNqQyxrQkFBa0IsQ0FBQyxTQUFTLEdBQUcsK0JBQStCLENBQUM7SUFDL0Qsa0JBQWtCLENBQUMsRUFBRSxHQUFHLHlCQUF5QixlQUFlLEVBQUUsQ0FBQztJQUNuRSxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRXRELHNEQUFzRDtJQUN0RCxJQUFJLFdBQVcsQ0FBQyxNQUFNLEtBQUssS0FBSyxJQUFJLE9BQU8sSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUM1RCxrQkFBa0IsQ0FBQyxLQUFLLEdBQUksV0FBeUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ2pFLENBQUM7U0FBTSxDQUFDO1FBQ1AsT0FBTyxDQUFDLElBQUksQ0FBQyx3Q0FBd0MsZUFBZSxFQUFFLENBQUMsQ0FBQztRQUN4RSxrQkFBa0IsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCwwQ0FBMEM7SUFDMUMsa0JBQWtCLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUM3QyxrQkFBa0IsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3BDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBRXpDLHFCQUFxQjtJQUNyQixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BELFVBQVUsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3JDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO0lBRWhDLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkQsV0FBVyxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDdEMsV0FBVyxDQUFDLFdBQVcsR0FBRyxzQkFBc0IsQ0FBQztJQUVqRCw2Q0FBNkM7SUFDN0MsVUFBVSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksRUFBRTtRQUMvQyxJQUFJLENBQUM7WUFDSixNQUFNLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlELFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDM0MsQ0FBQztJQUNGLENBQUMsQ0FBQyxDQUFDO0lBRUgsdUNBQXVDO0lBQ3ZDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRTtRQUNoRCxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBaUMsQ0FBQztRQUNuRCxJQUFJLE1BQU0sSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDckQsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FDekMsYUFBYSxlQUFlLEVBQUUsQ0FDOUIsQ0FBQztZQUNGLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQzVDLGdCQUFnQixlQUFlLEVBQUUsQ0FDakMsQ0FBQztZQUNGLElBQUksVUFBVTtnQkFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2hFLElBQUksYUFBYTtnQkFDaEIsYUFBYSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNyRCxDQUFDO0lBQ0YsQ0FBQyxDQUFDLENBQUM7SUFFSCwrQkFBK0I7SUFDL0IsaUJBQWlCLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDbEQsaUJBQWlCLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRTFDLG9DQUFvQztJQUNwQyxNQUFNLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0Qsb0JBQW9CLENBQUMsU0FBUyxHQUFHLDBDQUEwQyxDQUFDO0lBQzVFLG9CQUFvQixDQUFDLEVBQUUsR0FBRywyQkFBMkIsZUFBZSxFQUFFLENBQUM7SUFFdkUsbUJBQW1CO0lBQ25CLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0MsUUFBUSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7SUFDakMsUUFBUSxDQUFDLEVBQUUsR0FBRyxhQUFhLGVBQWUsRUFBRSxDQUFDO0lBRTdDLElBQUksV0FBVyxDQUFDLEtBQUssSUFBSSxLQUFLLElBQUksV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JELE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBYSxDQUFDO1FBQ2xELFFBQVEsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztJQUM1QyxDQUFDO1NBQU0sQ0FBQztRQUNQLFFBQVEsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQyxDQUFDLGdCQUFnQjtJQUM3RCxDQUFDO0lBRUQsb0JBQW9CLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRTNDLG9DQUFvQztJQUNwQyxVQUFVLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDMUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBRTdDLHNCQUFzQjtJQUN0QixNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xELFdBQVcsQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDO0lBQ3ZDLFdBQVcsQ0FBQyxFQUFFLEdBQUcsZ0JBQWdCLGVBQWUsRUFBRSxDQUFDO0lBRW5ELElBQUksV0FBVyxDQUFDLEtBQUssSUFBSSxLQUFLLElBQUksV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JELFdBQVcsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBYSxDQUFDO0lBQ3JFLENBQUM7SUFFRCxXQUFXLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM5QywrQkFBK0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUU3QyxxQ0FBcUM7SUFDckMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVwQyxPQUFPO1FBQ04sV0FBVztRQUNYLGVBQWUsRUFBRSxlQUFlLEdBQUcsQ0FBQztLQUNwQyxDQUFDO0FBQ0gsQ0FBQztBQUVELFNBQVMsZ0JBQWdCO0lBQ3hCLE1BQU0sa0JBQWtCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FDakQsc0JBQXNCLENBQ00sQ0FBQztJQUM5QixNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUM5Qyx3QkFBd0IsQ0FDSSxDQUFDO0lBQzlCLE1BQU0sd0JBQXdCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FDdkQsNkJBQTZCLENBQ0QsQ0FBQztJQUU5QixNQUFNLFdBQVcsR0FBRyxrQkFBa0I7UUFDckMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDTCxNQUFNLFFBQVEsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0UsTUFBTSxpQkFBaUIsR0FDdEIsd0JBQXdCO1FBQ3hCLE1BQU0sQ0FBQyxZQUFZLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDO1FBQ2xELENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLO1FBQ2hDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFFVixPQUFPO1FBQ04sV0FBVztRQUNYLFFBQVE7UUFDUixpQkFBaUI7S0FDakIsQ0FBQztBQUNILENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUc7SUFDekIsZUFBZTtJQUNmLGlDQUFpQztJQUNqQyxjQUFjO0lBQ2QsZ0JBQWdCO0NBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuLi9pbmRleCc7XG5pbXBvcnQgeyBjb252ZXJ0Q29sb3JzLCBzaG93VG9vbHRpcCB9IGZyb20gJy4uL2RvbS9kb20tbWFpbic7XG5pbXBvcnQgeyBhdHRhY2hEcmFnQW5kRHJvcEV2ZW50TGlzdGVuZXJzIH0gZnJvbSAnLi4vZG9tL2RyYWctYW5kLWRyb3AnO1xuaW1wb3J0IHsgZ3VhcmRzIH0gZnJvbSAnLi4vdXRpbHMvdHlwZS1ndWFyZHMnO1xuXG4vLyBkZWZpbmVzIGJ1dHRvbnMgZm9yIHRoZSBtYWluIFVJXG5mdW5jdGlvbiBkZWZpbmVVSUJ1dHRvbnMoKTogdHlwZXMuVUlCdXR0b25zIHtcblx0Y29uc3QgZ2VuZXJhdGVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2VuZXJhdGUtYnV0dG9uJyk7XG5cdGNvbnN0IHNhdHVyYXRlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdHVyYXRlLWJ1dHRvbicpO1xuXHRjb25zdCBkZXNhdHVyYXRlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2F0dXJhdGUtYnV0dG9uJyk7XG5cdGNvbnN0IHBvcHVwRGl2QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1c3RvbS1jb2xvci1idXR0b24nKTtcblx0Y29uc3QgYXBwbHlDdXN0b21Db2xvckJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuXHRcdCdhcHBseS1jdXN0b20tY29sb3ItYnV0dG9uJ1xuXHQpO1xuXHRjb25zdCBjbGVhckN1c3RvbUNvbG9yQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG5cdFx0J2NsZWFyLWN1c3RvbS1jb2xvci1idXR0b24nXG5cdCk7XG5cdGNvbnN0IGFkdmFuY2VkTWVudVRvZ2dsZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuXHRcdCdhZHZhbmNlZC1tZW51LXRvZ2dsZS1idXR0b24nXG5cdCk7XG5cdGNvbnN0IGFwcGx5SW5pdGlhbENvbG9yU3BhY2VCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcblx0XHQnYXBwbHktaW5pdGlhbC1jb2xvci1zcGFjZS1idXR0b24nXG5cdCk7XG5cdGNvbnN0IHNlbGVjdGVkQ29sb3JPcHRpb25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG5cdFx0J3NlbGVjdGVkLWNvbG9yLW9wdGlvbnMnXG5cdCkgYXMgSFRNTFNlbGVjdEVsZW1lbnQgfCBudWxsO1xuXHRjb25zdCBzZWxlY3RlZENvbG9yID0gc2VsZWN0ZWRDb2xvck9wdGlvbnNcblx0XHQ/IHBhcnNlSW50KHNlbGVjdGVkQ29sb3JPcHRpb25zLnZhbHVlLCAxMClcblx0XHQ6IDA7XG5cblx0cmV0dXJuIHtcblx0XHRnZW5lcmF0ZUJ1dHRvbixcblx0XHRzYXR1cmF0ZUJ1dHRvbixcblx0XHRkZXNhdHVyYXRlQnV0dG9uLFxuXHRcdHBvcHVwRGl2QnV0dG9uLFxuXHRcdGFwcGx5Q3VzdG9tQ29sb3JCdXR0b24sXG5cdFx0Y2xlYXJDdXN0b21Db2xvckJ1dHRvbixcblx0XHRhZHZhbmNlZE1lbnVUb2dnbGVCdXR0b24sXG5cdFx0YXBwbHlJbml0aWFsQ29sb3JTcGFjZUJ1dHRvbixcblx0XHRzZWxlY3RlZENvbG9yXG5cdH07XG59XG5cbi8vIGFkZCBjb252ZXJzaW9uIGJ1dHRvbiBldmVudCBsaXN0ZW5lcnNcbmZ1bmN0aW9uIGFkZENvbnZlcnNpb25CdXR0b25FdmVudExpc3RlbmVycygpOiB2b2lkIHtcblx0Y29uc3QgYWRkTGlzdGVuZXIgPSAoaWQ6IHN0cmluZywgY29sb3JTcGFjZTogdHlwZXMuQ29sb3JTcGFjZSkgPT4ge1xuXHRcdGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSBhcyBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5cblx0XHRpZiAoYnV0dG9uKSB7XG5cdFx0XHRidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjb252ZXJ0Q29sb3JzKGNvbG9yU3BhY2UpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc29sZS53YXJuKGBFbGVtZW50IHdpdGggaWQgXCIke2lkfVwiIG5vdCBmb3VuZC5gKTtcblx0XHR9XG5cdH07XG5cblx0YWRkTGlzdGVuZXIoJ2hleC1jb252ZXJzaW9uLWJ1dHRvbicsICdoZXgnKTtcblx0YWRkTGlzdGVuZXIoJ3JnYi1jb252ZXJzaW9uLWJ1dHRvbicsICdyZ2InKTtcblx0YWRkTGlzdGVuZXIoJ2hzdi1jb252ZXJzaW9uLWJ1dHRvbicsICdoc3YnKTtcblx0YWRkTGlzdGVuZXIoJ2hzbC1jb252ZXJzaW9uLWJ1dHRvbicsICdoc2wnKTtcblx0YWRkTGlzdGVuZXIoJ2NteWstY29udmVyc2lvbi1idXR0b24nLCAnY215aycpO1xuXHRhZGRMaXN0ZW5lcignbGFiLWNvbnZlcnNpb24tYnV0dG9uJywgJ2xhYicpO1xufVxuXG5mdW5jdGlvbiBtYWtlUGFsZXR0ZUJveChcblx0Y29sb3JWYWx1ZXM6IHR5cGVzLkNvbG9yLFxuXHRwYWxldHRlQm94Q291bnQ6IG51bWJlclxuKTogdHlwZXMuTWFrZVBhbGV0dGVCb3gge1xuXHRjb25zdCBwYWxldHRlQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdHBhbGV0dGVCb3guY2xhc3NOYW1lID0gJ3BhbGV0dGUtYm94Jztcblx0cGFsZXR0ZUJveC5pZCA9IGBwYWxldHRlLWJveC0ke3BhbGV0dGVCb3hDb3VudH1gO1xuXG5cdGNvbnN0IHBhbGV0dGVCb3hUb3BIYWxmID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdHBhbGV0dGVCb3hUb3BIYWxmLmNsYXNzTmFtZSA9ICdwYWxldHRlLWJveC1oYWxmIHBhbGV0dGUtYm94LXRvcC1oYWxmJztcblx0cGFsZXR0ZUJveFRvcEhhbGYuaWQgPSBgcGFsZXR0ZS1ib3gtdG9wLWhhbGYtJHtwYWxldHRlQm94Q291bnR9YDtcblxuXHRjb25zdCBjb2xvclRleHRPdXRwdXRCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFxuXHRcdCdpbnB1dCdcblx0KSBhcyB0eXBlcy5Db2xvcklucHV0RWxlbWVudDtcblx0Y29sb3JUZXh0T3V0cHV0Qm94LnR5cGUgPSAndGV4dCc7XG5cdGNvbG9yVGV4dE91dHB1dEJveC5jbGFzc05hbWUgPSAnY29sb3ItdGV4dC1vdXRwdXQtYm94IHRvb2x0aXAnO1xuXHRjb2xvclRleHRPdXRwdXRCb3guaWQgPSBgY29sb3ItdGV4dC1vdXRwdXQtYm94LSR7cGFsZXR0ZUJveENvdW50fWA7XG5cdGNvbG9yVGV4dE91dHB1dEJveC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZm9ybWF0JywgJ2hleCcpO1xuXG5cdC8vIGFjY2VzcyBuZXN0ZWQgcHJvcGVydGllcyBzYWZlbHkgdXNpbmcgdHlwZSBndWFyZChzKVxuXHRpZiAoY29sb3JWYWx1ZXMuZm9ybWF0ID09PSAnaGV4JyAmJiAndmFsdWUnIGluIGNvbG9yVmFsdWVzKSB7XG5cdFx0Y29sb3JUZXh0T3V0cHV0Qm94LnZhbHVlID0gKGNvbG9yVmFsdWVzIGFzIHR5cGVzLkhleCkudmFsdWUuaGV4O1xuXHR9IGVsc2Uge1xuXHRcdGNvbnNvbGUud2FybihgSGV4IHZhbHVlIG5vdCBmb3VuZCBmb3IgcGFsZXR0ZS1ib3ggIyR7cGFsZXR0ZUJveENvdW50fWApO1xuXHRcdGNvbG9yVGV4dE91dHB1dEJveC52YWx1ZSA9ICcnO1xuXHR9XG5cblx0Ly8gc3RvcmUgY29sb3IgdmFsdWVzIHdpdGhpbiBpbnB1dCBlbGVtZW50XG5cdGNvbG9yVGV4dE91dHB1dEJveC5jb2xvclZhbHVlcyA9IGNvbG9yVmFsdWVzO1xuXHRjb2xvclRleHRPdXRwdXRCb3gucmVhZE9ubHkgPSBmYWxzZTtcblx0Y29sb3JUZXh0T3V0cHV0Qm94LnN0eWxlLmN1cnNvciA9ICd0ZXh0JztcblxuXHQvLyBjcmVhdGUgY29weSBidXR0b25cblx0Y29uc3QgY29weUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRjb3B5QnV0dG9uLmNsYXNzTmFtZSA9ICdjb3B5LWJ1dHRvbic7XG5cdGNvcHlCdXR0b24udGV4dENvbnRlbnQgPSAnQ29weSc7XG5cblx0Y29uc3QgdG9vbHRpcFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdHRvb2x0aXBUZXh0LmNsYXNzTmFtZSA9ICd0b29sdGlwdGV4dCc7XG5cdHRvb2x0aXBUZXh0LnRleHRDb250ZW50ID0gJ0NvcGllZCB0byBjbGlwYm9hcmQhJztcblxuXHQvLyBhZGQgY2xpcGJvYXJkIGZ1bmN0aW9uYWxpdHkgdG8gY29weSBidXR0b25cblx0Y29weUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcblx0XHR0cnkge1xuXHRcdFx0YXdhaXQgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoY29sb3JUZXh0T3V0cHV0Qm94LnZhbHVlKTtcblx0XHRcdHNob3dUb29sdGlwKGNvbG9yVGV4dE91dHB1dEJveCk7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoYEZhaWxlZCB0byBjb3B5OiAke2Vycm9yfWApO1xuXHRcdH1cblx0fSk7XG5cblx0Ly8gYWRkIGV2ZW50IGxpc3RlbmVyIGZvciBpbnB1dCBjaGFuZ2VzXG5cdGNvbG9yVGV4dE91dHB1dEJveC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGUgPT4ge1xuXHRcdGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xuXHRcdGlmICh0YXJnZXQgJiYgL14jWzAtOUEtRl17Nn0kJS9pLnRlc3QodGFyZ2V0LnZhbHVlKSkge1xuXHRcdFx0Y29uc3QgYm94RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuXHRcdFx0XHRgY29sb3ItYm94LSR7cGFsZXR0ZUJveENvdW50fWBcblx0XHRcdCk7XG5cdFx0XHRjb25zdCBzdHJpcGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG5cdFx0XHRcdGBjb2xvci1zdHJpcGUtJHtwYWxldHRlQm94Q291bnR9YFxuXHRcdFx0KTtcblx0XHRcdGlmIChib3hFbGVtZW50KSBib3hFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRhcmdldC52YWx1ZTtcblx0XHRcdGlmIChzdHJpcGVFbGVtZW50KVxuXHRcdFx0XHRzdHJpcGVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRhcmdldC52YWx1ZTtcblx0XHR9XG5cdH0pO1xuXG5cdC8vIGFwcGVuZHMgZWxlbWVudHMgdG8gdG9wIGhhbGZcblx0cGFsZXR0ZUJveFRvcEhhbGYuYXBwZW5kQ2hpbGQoY29sb3JUZXh0T3V0cHV0Qm94KTtcblx0cGFsZXR0ZUJveFRvcEhhbGYuYXBwZW5kQ2hpbGQoY29weUJ1dHRvbik7XG5cblx0Ly8gY3JlYXRlIGJvdHRvbSBoYWxmIG9mIHBhbGV0dGUgYm94XG5cdGNvbnN0IHBhbGV0dGVCb3hCb3R0b21IYWxmID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdHBhbGV0dGVCb3hCb3R0b21IYWxmLmNsYXNzTmFtZSA9ICdwYWxldHRlLWJveC1oYWxmIHBhbGV0dGUtYm94LWJvdHRvbS1oYWxmJztcblx0cGFsZXR0ZUJveEJvdHRvbUhhbGYuaWQgPSBgcGFsZXR0ZS1ib3gtYm90dG9tLWhhbGYtJHtwYWxldHRlQm94Q291bnR9YDtcblxuXHQvLyBjcmVhdGUgY29sb3IgYm94XG5cdGNvbnN0IGNvbG9yQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGNvbG9yQm94LmNsYXNzTmFtZSA9ICdjb2xvci1ib3gnO1xuXHRjb2xvckJveC5pZCA9IGBjb2xvci1ib3gtJHtwYWxldHRlQm94Q291bnR9YDtcblxuXHRpZiAoY29sb3JWYWx1ZXMudmFsdWUgJiYgJ2hzbCcgaW4gY29sb3JWYWx1ZXMudmFsdWUpIHtcblx0XHRjb25zdCBoc2xTdHJpbmcgPSBjb2xvclZhbHVlcy52YWx1ZS5oc2wgYXMgc3RyaW5nO1xuXHRcdGNvbG9yQm94LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGhzbFN0cmluZztcblx0fSBlbHNlIHtcblx0XHRjb2xvckJveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZmZmZic7IC8vIGRlZmF1bHQgY29sb3Jcblx0fVxuXG5cdHBhbGV0dGVCb3hCb3R0b21IYWxmLmFwcGVuZENoaWxkKGNvbG9yQm94KTtcblxuXHQvLyBhcHBlbmQgaGFsdmVzIHRvIG1haW4gcGFsZXR0ZSBib3hcblx0cGFsZXR0ZUJveC5hcHBlbmRDaGlsZChwYWxldHRlQm94VG9wSGFsZik7XG5cdHBhbGV0dGVCb3guYXBwZW5kQ2hpbGQocGFsZXR0ZUJveEJvdHRvbUhhbGYpO1xuXG5cdC8vIGNyZWF0ZSBjb2xvciBzdHJpcGVcblx0Y29uc3QgY29sb3JTdHJpcGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y29sb3JTdHJpcGUuY2xhc3NOYW1lID0gJ2NvbG9yLXN0cmlwZSc7XG5cdGNvbG9yU3RyaXBlLmlkID0gYGNvbG9yLXN0cmlwZS0ke3BhbGV0dGVCb3hDb3VudH1gO1xuXG5cdGlmIChjb2xvclZhbHVlcy52YWx1ZSAmJiAnaHNsJyBpbiBjb2xvclZhbHVlcy52YWx1ZSkge1xuXHRcdGNvbG9yU3RyaXBlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yVmFsdWVzLnZhbHVlLmhzbCBhcyBzdHJpbmc7XG5cdH1cblxuXHRjb2xvclN0cmlwZS5zZXRBdHRyaWJ1dGUoJ2RyYWdnYWJsZScsICd0cnVlJyk7XG5cdGF0dGFjaERyYWdBbmREcm9wRXZlbnRMaXN0ZW5lcnMoY29sb3JTdHJpcGUpO1xuXG5cdC8vIGFwcGVuZCBwYWxldHRlIGJveCB0byBjb2xvciBzdHJpcGVcblx0Y29sb3JTdHJpcGUuYXBwZW5kQ2hpbGQocGFsZXR0ZUJveCk7XG5cblx0cmV0dXJuIHtcblx0XHRjb2xvclN0cmlwZSxcblx0XHRwYWxldHRlQm94Q291bnQ6IHBhbGV0dGVCb3hDb3VudCArIDFcblx0fTtcbn1cblxuZnVuY3Rpb24gcHVsbFBhcmFtc0Zyb21VSSgpOiB0eXBlcy5QdWxsUGFyYW1zRnJvbVVJIHtcblx0Y29uc3QgcGFsZXR0ZVR5cGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG5cdFx0J3BhbGV0dGUtdHlwZS1vcHRpb25zJ1xuXHQpIGFzIEhUTUxTZWxlY3RFbGVtZW50IHwgbnVsbDtcblx0Y29uc3QgbnVtQm94ZXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG5cdFx0J3BhbGV0dGUtbnVtYmVyLW9wdGlvbnMnXG5cdCkgYXMgSFRNTFNlbGVjdEVsZW1lbnQgfCBudWxsO1xuXHRjb25zdCBpbml0aWFsQ29sb3JTcGFjZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcblx0XHQnaW5pdGlhbC1jb2xvci1zcGFjZS1vcHRpb25zJ1xuXHQpIGFzIEhUTUxTZWxlY3RFbGVtZW50IHwgbnVsbDtcblxuXHRjb25zdCBwYWxldHRlVHlwZSA9IHBhbGV0dGVUeXBlRWxlbWVudFxuXHRcdD8gcGFyc2VJbnQocGFsZXR0ZVR5cGVFbGVtZW50LnZhbHVlLCAxMClcblx0XHQ6IDA7XG5cdGNvbnN0IG51bUJveGVzID0gbnVtQm94ZXNFbGVtZW50ID8gcGFyc2VJbnQobnVtQm94ZXNFbGVtZW50LnZhbHVlLCAxMCkgOiAwO1xuXHRjb25zdCBpbml0aWFsQ29sb3JTcGFjZSA9XG5cdFx0aW5pdGlhbENvbG9yU3BhY2VFbGVtZW50ICYmXG5cdFx0Z3VhcmRzLmlzQ29sb3JTcGFjZShpbml0aWFsQ29sb3JTcGFjZUVsZW1lbnQudmFsdWUpXG5cdFx0XHQ/IGluaXRpYWxDb2xvclNwYWNlRWxlbWVudC52YWx1ZVxuXHRcdFx0OiAnaGV4JztcblxuXHRyZXR1cm4ge1xuXHRcdHBhbGV0dGVUeXBlLFxuXHRcdG51bUJveGVzLFxuXHRcdGluaXRpYWxDb2xvclNwYWNlXG5cdH07XG59XG5cbmV4cG9ydCBjb25zdCBkb21IZWxwZXJzID0ge1xuXHRkZWZpbmVVSUJ1dHRvbnMsXG5cdGFkZENvbnZlcnNpb25CdXR0b25FdmVudExpc3RlbmVycyxcblx0bWFrZVBhbGV0dGVCb3gsXG5cdHB1bGxQYXJhbXNGcm9tVUlcbn07XG4iXX0=