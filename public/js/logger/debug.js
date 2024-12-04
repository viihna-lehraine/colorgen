// File: src/logger/debug.ts
import { config } from '../config';
const elements = config.consts.dom;
function validateDOMElements() {
    console.log(`Advanced Menu Button: ${elements.advancedMenuButton ? 'found' : 'not found'}\nApply Custom Color Button: ${elements.applyCustomColorButton ? 'found' : 'not found'}\nClear Custom Color Button: ${elements.clearCustomColorButton ? 'found' : 'not found'}\nClose Custom Color Menu Button: ${elements.closeCustomColorMenuButton ? 'found' : 'not found'}\nClose Help Menu Button: ${elements.closeHelpMenuButton ? 'found' : 'not found'}\nClose History Menu Button: ${elements.closeHistoryMenuButton ? 'found' : 'not found'}\nDesaturate Button: ${elements.desaturateButton ? 'found' : 'not found'}\nGenerate Button: ${elements.generateButton ? 'found' : 'not found'}\nHelp Menu Button: ${elements.helpMenuButton ? 'found' : 'not found'}\nHistory Menu Button: ${elements.historyMenuButton ? 'found' : 'not found'}\nSaturate Button: ${elements.saturateButton ? 'found' : 'not found'}\nShow as CMYK Button: ${elements.showAsCMYKButton ? 'found' : 'not found'}\nShow as Hex Button: ${elements.showAsHexButton ? 'found' : 'not found'}\nShow as HSL Button: ${elements.showAsHSLButton ? 'found' : 'not found'}\nShow as HSV Button: ${elements.showAsHSVButton ? 'found' : 'not found'}\nShow as LAB Button: ${elements.showAsLABButton ? 'found' : 'not found'}\nShow as RGB Button: ${elements.showAsRGBButton ? 'found' : 'not found'}`);
}
export const debug = {
    validateDOMElements
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbG9nZ2VyL2RlYnVnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDRCQUE0QjtBQUU1QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRW5DLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO0FBRW5DLFNBQVMsbUJBQW1CO0lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQ1YseUJBQXlCLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxXQUFXLGdDQUFnQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsV0FBVyxnQ0FBZ0MsUUFBUSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFdBQVcscUNBQXFDLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxXQUFXLDZCQUE2QixRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsV0FBVyxnQ0FBZ0MsUUFBUSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFdBQVcsd0JBQXdCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxXQUFXLHNCQUFzQixRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFdBQVcsdUJBQXVCLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsV0FBVywwQkFBMEIsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFdBQVcsc0JBQXNCLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsV0FBVywwQkFBMEIsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFdBQVcseUJBQXlCLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsV0FBVyx5QkFBeUIsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxXQUFXLHlCQUF5QixRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFdBQVcseUJBQXlCLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsV0FBVyx5QkFBeUIsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FDanlDLENBQUM7QUFDSCxDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sS0FBSyxHQUFHO0lBQ3BCLG1CQUFtQjtDQUNuQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRmlsZTogc3JjL2xvZ2dlci9kZWJ1Zy50c1xuXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi9jb25maWcnO1xuXG5jb25zdCBlbGVtZW50cyA9IGNvbmZpZy5jb25zdHMuZG9tO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZURPTUVsZW1lbnRzKCk6IHZvaWQge1xuXHRjb25zb2xlLmxvZyhcblx0XHRgQWR2YW5jZWQgTWVudSBCdXR0b246ICR7ZWxlbWVudHMuYWR2YW5jZWRNZW51QnV0dG9uID8gJ2ZvdW5kJyA6ICdub3QgZm91bmQnfVxcbkFwcGx5IEN1c3RvbSBDb2xvciBCdXR0b246ICR7ZWxlbWVudHMuYXBwbHlDdXN0b21Db2xvckJ1dHRvbiA/ICdmb3VuZCcgOiAnbm90IGZvdW5kJ31cXG5DbGVhciBDdXN0b20gQ29sb3IgQnV0dG9uOiAke2VsZW1lbnRzLmNsZWFyQ3VzdG9tQ29sb3JCdXR0b24gPyAnZm91bmQnIDogJ25vdCBmb3VuZCd9XFxuQ2xvc2UgQ3VzdG9tIENvbG9yIE1lbnUgQnV0dG9uOiAke2VsZW1lbnRzLmNsb3NlQ3VzdG9tQ29sb3JNZW51QnV0dG9uID8gJ2ZvdW5kJyA6ICdub3QgZm91bmQnfVxcbkNsb3NlIEhlbHAgTWVudSBCdXR0b246ICR7ZWxlbWVudHMuY2xvc2VIZWxwTWVudUJ1dHRvbiA/ICdmb3VuZCcgOiAnbm90IGZvdW5kJ31cXG5DbG9zZSBIaXN0b3J5IE1lbnUgQnV0dG9uOiAke2VsZW1lbnRzLmNsb3NlSGlzdG9yeU1lbnVCdXR0b24gPyAnZm91bmQnIDogJ25vdCBmb3VuZCd9XFxuRGVzYXR1cmF0ZSBCdXR0b246ICR7ZWxlbWVudHMuZGVzYXR1cmF0ZUJ1dHRvbiA/ICdmb3VuZCcgOiAnbm90IGZvdW5kJ31cXG5HZW5lcmF0ZSBCdXR0b246ICR7ZWxlbWVudHMuZ2VuZXJhdGVCdXR0b24gPyAnZm91bmQnIDogJ25vdCBmb3VuZCd9XFxuSGVscCBNZW51IEJ1dHRvbjogJHtlbGVtZW50cy5oZWxwTWVudUJ1dHRvbiA/ICdmb3VuZCcgOiAnbm90IGZvdW5kJ31cXG5IaXN0b3J5IE1lbnUgQnV0dG9uOiAke2VsZW1lbnRzLmhpc3RvcnlNZW51QnV0dG9uID8gJ2ZvdW5kJyA6ICdub3QgZm91bmQnfVxcblNhdHVyYXRlIEJ1dHRvbjogJHtlbGVtZW50cy5zYXR1cmF0ZUJ1dHRvbiA/ICdmb3VuZCcgOiAnbm90IGZvdW5kJ31cXG5TaG93IGFzIENNWUsgQnV0dG9uOiAke2VsZW1lbnRzLnNob3dBc0NNWUtCdXR0b24gPyAnZm91bmQnIDogJ25vdCBmb3VuZCd9XFxuU2hvdyBhcyBIZXggQnV0dG9uOiAke2VsZW1lbnRzLnNob3dBc0hleEJ1dHRvbiA/ICdmb3VuZCcgOiAnbm90IGZvdW5kJ31cXG5TaG93IGFzIEhTTCBCdXR0b246ICR7ZWxlbWVudHMuc2hvd0FzSFNMQnV0dG9uID8gJ2ZvdW5kJyA6ICdub3QgZm91bmQnfVxcblNob3cgYXMgSFNWIEJ1dHRvbjogJHtlbGVtZW50cy5zaG93QXNIU1ZCdXR0b24gPyAnZm91bmQnIDogJ25vdCBmb3VuZCd9XFxuU2hvdyBhcyBMQUIgQnV0dG9uOiAke2VsZW1lbnRzLnNob3dBc0xBQkJ1dHRvbiA/ICdmb3VuZCcgOiAnbm90IGZvdW5kJ31cXG5TaG93IGFzIFJHQiBCdXR0b246ICR7ZWxlbWVudHMuc2hvd0FzUkdCQnV0dG9uID8gJ2ZvdW5kJyA6ICdub3QgZm91bmQnfWBcblx0KTtcbn1cblxuZXhwb3J0IGNvbnN0IGRlYnVnID0ge1xuXHR2YWxpZGF0ZURPTUVsZW1lbnRzXG59O1xuIl19