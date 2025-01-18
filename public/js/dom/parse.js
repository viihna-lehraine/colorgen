// File: src/dom/parse.ts
import { data } from '../data/index.js';
import { log as logger } from '../classes/logger/index.js';
const domIDs = data.consts.dom.ids;
const logMode = data.mode.logging;
const mode = data.mode;
function paletteExportFormat() {
    const formatSelectionMenu = document.getElementById(domIDs.exportPaletteFormatOptions);
    if (!formatSelectionMenu) {
        if (logMode.errors && !mode.quiet)
            logger.error('Export format selection dropdown not found');
    }
    const selectedFormat = formatSelectionMenu.value;
    if (selectedFormat !== 'CSS' &&
        selectedFormat !== 'JSON' &&
        selectedFormat !== 'XML') {
        if (logMode.errors && !mode.quiet)
            logger.error('Invalid export format selected');
        return;
    }
    else {
        return selectedFormat;
    }
}
export const parse = {
    paletteExportFormat
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZG9tL3BhcnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHlCQUF5QjtBQUd6QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDeEMsT0FBTyxFQUFFLEdBQUcsSUFBSSxNQUFNLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUzRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7QUFDbkMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDbEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztBQUV2QixTQUFTLG1CQUFtQjtJQUMzQixNQUFNLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQ2xELE1BQU0sQ0FBQywwQkFBMEIsQ0FDWixDQUFDO0lBRXZCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzFCLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLO1lBQ2hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsTUFBTSxjQUFjLEdBQUcsbUJBQW1CLENBQUMsS0FBSyxDQUFDO0lBRWpELElBQ0MsY0FBYyxLQUFLLEtBQUs7UUFDeEIsY0FBYyxLQUFLLE1BQU07UUFDekIsY0FBYyxLQUFLLEtBQUssRUFDdkIsQ0FBQztRQUNGLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLO1lBQ2hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUVoRCxPQUFPO0lBQ1IsQ0FBQztTQUFNLENBQUM7UUFDUCxPQUFPLGNBQWMsQ0FBQztJQUN2QixDQUFDO0FBQ0YsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLEtBQUssR0FBd0I7SUFDekMsbUJBQW1CO0NBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBGaWxlOiBzcmMvZG9tL3BhcnNlLnRzXG5cbmltcG9ydCB7IERPTVBhcnNlRm5JbnRlcmZhY2UgfSBmcm9tICcuLi9pbmRleC9pbmRleC5qcyc7XG5pbXBvcnQgeyBkYXRhIH0gZnJvbSAnLi4vZGF0YS9pbmRleC5qcyc7XG5pbXBvcnQgeyBsb2cgYXMgbG9nZ2VyIH0gZnJvbSAnLi4vY2xhc3Nlcy9sb2dnZXIvaW5kZXguanMnO1xuXG5jb25zdCBkb21JRHMgPSBkYXRhLmNvbnN0cy5kb20uaWRzO1xuY29uc3QgbG9nTW9kZSA9IGRhdGEubW9kZS5sb2dnaW5nO1xuY29uc3QgbW9kZSA9IGRhdGEubW9kZTtcblxuZnVuY3Rpb24gcGFsZXR0ZUV4cG9ydEZvcm1hdCgpOiBzdHJpbmcgfCB2b2lkIHtcblx0Y29uc3QgZm9ybWF0U2VsZWN0aW9uTWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuXHRcdGRvbUlEcy5leHBvcnRQYWxldHRlRm9ybWF0T3B0aW9uc1xuXHQpIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xuXG5cdGlmICghZm9ybWF0U2VsZWN0aW9uTWVudSkge1xuXHRcdGlmIChsb2dNb2RlLmVycm9ycyAmJiAhbW9kZS5xdWlldClcblx0XHRcdGxvZ2dlci5lcnJvcignRXhwb3J0IGZvcm1hdCBzZWxlY3Rpb24gZHJvcGRvd24gbm90IGZvdW5kJyk7XG5cdH1cblxuXHRjb25zdCBzZWxlY3RlZEZvcm1hdCA9IGZvcm1hdFNlbGVjdGlvbk1lbnUudmFsdWU7XG5cblx0aWYgKFxuXHRcdHNlbGVjdGVkRm9ybWF0ICE9PSAnQ1NTJyAmJlxuXHRcdHNlbGVjdGVkRm9ybWF0ICE9PSAnSlNPTicgJiZcblx0XHRzZWxlY3RlZEZvcm1hdCAhPT0gJ1hNTCdcblx0KSB7XG5cdFx0aWYgKGxvZ01vZGUuZXJyb3JzICYmICFtb2RlLnF1aWV0KVxuXHRcdFx0bG9nZ2VyLmVycm9yKCdJbnZhbGlkIGV4cG9ydCBmb3JtYXQgc2VsZWN0ZWQnKTtcblxuXHRcdHJldHVybjtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gc2VsZWN0ZWRGb3JtYXQ7XG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IHBhcnNlOiBET01QYXJzZUZuSW50ZXJmYWNlID0ge1xuXHRwYWxldHRlRXhwb3J0Rm9ybWF0XG59O1xuIl19