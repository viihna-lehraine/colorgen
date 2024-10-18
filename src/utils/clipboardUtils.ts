import { showTooltip } from '../export';

// copy color values to clipboard on Click
function copyToClipboard(text: string, tooltipElement: HTMLElement) {
    const colorValue = text.replace('Copied to clipboard!', '').trim(); // clean the color value

    navigator.clipboard.writeText(colorValue).then(() => {
        showTooltip(tooltipElement);
        console.log(`Copied color value: ${colorValue}`);
    }).catch(err => {
        console.error('Error copying to clipboard:', err);
    });
}

export { copyToClipboard };
