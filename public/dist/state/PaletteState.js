// File: state/PaletteState.ts
class PaletteState {
    stateManager;
    utils;
    constructor(stateManager, utils) {
        this.stateManager = stateManager;
        this.utils = utils;
    }
    updatePaletteItemColor(columnID, newColor) {
        const currentState = this.stateManager.getState();
        const latestPalette = currentState.paletteHistory[0];
        if (!latestPalette)
            return;
        // find the PaletteItem corresponding to this column
        const updatedItems = latestPalette.items.map(item => {
            if (item.itemID !== columnID)
                return item;
            const parsedNewColor = this.utils.color.convertCSSToColor(newColor);
            if (!parsedNewColor)
                throw new Error('Invalid color value');
            // ensure color is in HSL format for further processing
            const hslColor = parsedNewColor.format === 'hsl'
                ? parsedNewColor
                : this.utils.color.convertToHSL(parsedNewColor);
            // generate all color representations
            const allColors = this.utils.palette.generateAllColorValues(hslColor);
            return {
                ...item,
                colors: {
                    cmyk: allColors.cmyk.value,
                    hex: allColors.hex.value,
                    hsl: allColors.hsl.value,
                    hsv: allColors.hsv.value,
                    lab: allColors.lab.value,
                    rgb: allColors.rgb.value,
                    xyz: allColors.xyz.value
                },
                css: {
                    cmyk: this.utils.color.convertColorToCSS(allColors.cmyk),
                    hex: this.utils.color.convertColorToCSS(allColors.hex),
                    hsl: this.utils.color.convertColorToCSS(allColors.hsl),
                    hsv: this.utils.color.convertColorToCSS(allColors.hsv),
                    lab: this.utils.color.convertColorToCSS(allColors.lab),
                    rgb: this.utils.color.convertColorToCSS(allColors.rgb),
                    xyz: this.utils.color.convertColorToCSS(allColors.xyz)
                }
            };
        });
        // ensure column state is updated
        const updatedColumns = updatedItems.map((item, index) => {
            return {
                id: item.itemID,
                isLocked: currentState.paletteContainer.columns[index].isLocked,
                position: index + 1,
                size: currentState.paletteContainer.columns[index].size
            };
        });
        // update palette history
        const updatedPaletteHistory = [
            { ...latestPalette, items: updatedItems },
            ...currentState.paletteHistory.slice(1)
        ];
        // track in state history
        this.stateManager.updatePaletteColumns(updatedColumns, true, 3);
        // update state history with new palette items
        this.stateManager.updatePaletteHistory(updatedPaletteHistory);
    }
}

export { PaletteState };
//# sourceMappingURL=PaletteState.js.map
