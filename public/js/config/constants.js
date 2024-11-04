function getElement(id) {
    return document.getElementById(id);
}
const adjustSLAmount = 10;
const xyzMaxX = 95.047;
const xyzMaxY = 100;
const xyzMaxZ = 108.883;
const xyzMinX = 0;
const xyzMinY = 0;
const xyzMinZ = 0;
const buttonDebounce = 300;
const inputDebounce = 200;
const applyCustomColorButton = getElement('apply-custom-color-button');
const clearCustomColorButton = getElement('clear-custom-color-button');
const closeHelpMenuButton = getElement('close-help-menu-button');
const closeHistoryMenuButton = getElement('close-history-menu-button');
const closeSubMenuAButton = getElement('close-sub-menu-A-button');
const closeSubMenuBButton = getElement('close-sub-menu-B-button');
const customColorElement = getElement('custom-color');
const customColorToggleButton = getElement('custom-color-toggle-button');
const desaturateButton = getElement('desaturate-button');
const enableAlphaCheckbox = getElement('enable-alpha-checkbox');
const generateButton = getElement('generate-button');
const helpMenu = getElement('help-modal');
const historyMenu = getElement('history-modal');
const limitBrightCheckbox = getElement('limit-light-checkbox');
const limitDarkCheckbox = getElement('limit-dark-checkbox');
const limitGrayCheckbox = getElement('limit-gray-checkbox');
const paletteNumberOptions = getElement('palette-number-options');
const paletteTypeOptions = getElement('palette-type-options');
const popupDivButton = getElement('custom-color-button');
const saturateButton = getElement('saturate-button');
const selectedColorOptions = getElement('selected-color-options');
const showAsCMYKButton = getElement('show-as-cmyk-button');
const showAsHexButton = getElement('show-as-hex-button');
const showAsHSLButton = getElement('show-as-hsl-button');
const showAsHSVButton = getElement('show-as-hsv-button');
const showAsLABButton = getElement('show-as-lab-button');
const showAsRGBButton = getElement('show-as-rgb-button');
const showHelpMenuButton = getElement('help-button');
const showHistoryMenuButton = getElement('show-history-menu-button');
const subMenuA = getElement('sub-menu-menu-A');
const subMenuB = getElement('sub-menu-menu-B');
const subMenuToggleButtonA = getElement('sub-menu-toggle-button-A');
const subMenuToggleButtonB = getElement('sub-menu-toggle-button-B');
const complementaryHueShiftRange = 10;
const diadicLightnessShiftRange = 30;
const diadicSaturationShiftRange = 30;
const hexadicLightnessShiftRange = 30;
const hexadicSaturationShiftRange = 30;
const splitComplementaryLightnessShiftRange = 30;
const splitComplementarySaturationShiftRange = 30;
const tetradicLightnessShiftRange = 30;
const tetradicSaturationShiftRange = 30;
const triadicLightnessShiftRange = 30;
const triadicSaturationShiftRange = 30;
const probabilities = [40, 45, 50, 55, 60, 65, 70];
const weights = [0.1, 0.15, 0.2, 0.3, 0.15, 0.05, 0.05];
const brightnessThreshold = 75;
const darknessThreshold = 25;
const grayThreshold = 20;
const copyButtonTextTimeout = 1000;
const toastTimeout = 3000;
const tooltipTimeout = 1000;
// ***** Constructed Constants *****
const adjustments = {
    adjustSLAmount
};
const boundaries = {
    xyzMaxX,
    xyzMaxY,
    xyzMaxZ,
    xyzMinX,
    xyzMinY,
    xyzMinZ
};
const debounce = {
    buttonDebounce,
    inputDebounce
};
const domElements = {
    applyCustomColorButton,
    clearCustomColorButton,
    closeHelpMenuButton,
    closeHistoryMenuButton,
    closeSubMenuAButton,
    closeSubMenuBButton,
    customColorElement,
    customColorToggleButton,
    desaturateButton,
    enableAlphaCheckbox,
    generateButton,
    helpMenu,
    historyMenu,
    limitBrightCheckbox,
    limitDarkCheckbox,
    limitGrayCheckbox,
    paletteNumberOptions,
    paletteTypeOptions,
    popupDivButton,
    saturateButton,
    selectedColorOptions,
    showAsCMYKButton,
    showAsHexButton,
    showAsHSLButton,
    showAsHSVButton,
    showAsLABButton,
    showAsRGBButton,
    showHelpMenuButton,
    showHistoryMenuButton,
    subMenuA,
    subMenuB,
    subMenuToggleButtonA,
    subMenuToggleButtonB
};
const paletteShiftRanges = {
    complementaryHueShiftRange,
    diadicLightnessShiftRange,
    diadicSaturationShiftRange,
    hexadicLightnessShiftRange,
    hexadicSaturationShiftRange,
    splitComplementaryLightnessShiftRange,
    splitComplementarySaturationShiftRange,
    tetradicLightnessShiftRange,
    tetradicSaturationShiftRange,
    triadicLightnessShiftRange,
    triadicSaturationShiftRange
};
const probabilityConstants = {
    probabilities,
    weights
};
const thresholds = {
    brightnessThreshold,
    darknessThreshold,
    grayThreshold
};
const timeouts = {
    copyButtonTextTimeout,
    toastTimeout,
    tooltipTimeout
};
// **** Master Config Object ****
export const config = {
    ...adjustments,
    ...boundaries,
    ...debounce,
    ...domElements,
    ...paletteShiftRanges,
    ...probabilityConstants,
    ...thresholds,
    ...timeouts
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbmZpZy9jb25zdGFudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsU0FBUyxVQUFVLENBQXdCLEVBQVU7SUFDcEQsT0FBTyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBYSxDQUFDO0FBQ2hELENBQUM7QUFFRCxNQUFNLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFFMUIsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDO0FBQ3ZCLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNwQixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDeEIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQ2xCLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQztBQUNsQixNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFFbEIsTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFDO0FBQzNCLE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQztBQUUxQixNQUFNLHNCQUFzQixHQUFHLFVBQVUsQ0FDeEMsMkJBQTJCLENBQzNCLENBQUM7QUFDRixNQUFNLHNCQUFzQixHQUFHLFVBQVUsQ0FDeEMsMkJBQTJCLENBQzNCLENBQUM7QUFDRixNQUFNLG1CQUFtQixHQUFHLFVBQVUsQ0FDckMsd0JBQXdCLENBQ3hCLENBQUM7QUFDRixNQUFNLHNCQUFzQixHQUFHLFVBQVUsQ0FDeEMsMkJBQTJCLENBQzNCLENBQUM7QUFDRixNQUFNLG1CQUFtQixHQUFHLFVBQVUsQ0FDckMseUJBQXlCLENBQ3pCLENBQUM7QUFDRixNQUFNLG1CQUFtQixHQUFHLFVBQVUsQ0FDckMseUJBQXlCLENBQ3pCLENBQUM7QUFDRixNQUFNLGtCQUFrQixHQUFHLFVBQVUsQ0FBbUIsY0FBYyxDQUFDLENBQUM7QUFDeEUsTUFBTSx1QkFBdUIsR0FBRyxVQUFVLENBQ3pDLDRCQUE0QixDQUM1QixDQUFDO0FBQ0YsTUFBTSxn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MkI7SUFDM0IscUNBQXFDO0lBQ3JDLHNDQUFzQztJQUN0QywyQkFBMkI7SUFDM0IsNEJBQTRCO0lBQzVCLDBCQUEwQjtJQUMxQiwyQkFBMkI7Q0FDM0IsQ0FBQztBQUVGLE1BQU0sb0JBQW9CLEdBQW1DO0lBQzVELGFBQWE7SUFDYixPQUFPO0NBQ1AsQ0FBQztBQUVGLE1BQU0sVUFBVSxHQUF5QjtJQUN4QyxtQkFBbUI7SUFDbkIsaUJBQWlCO0lBQ2pCLGFBQWE7Q0FDYixDQUFDO0FBRUYsTUFBTSxRQUFRLEdBQXVCO0lBQ3BDLHFCQUFxQjtJQUNyQixZQUFZO0lBQ1osY0FBYztDQUNkLENBQUM7QUFFRixpQ0FBaUM7QUFFakMsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFxQjtJQUN2QyxHQUFHLFdBQVc7SUFDZCxHQUFHLFVBQVU7SUFDYixHQUFHLFFBQVE7SUFDWCxHQUFHLFdBQVc7SUFDZCxHQUFHLGtCQUFrQjtJQUNyQixHQUFHLG9CQUFvQjtJQUN2QixHQUFHLFVBQVU7SUFDYixHQUFHLFFBQVE7Q0FDWCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY29uc3RhbnRzIGZyb20gJy4uL2luZGV4L2NvbmZpZyc7XG5cbmZ1bmN0aW9uIGdldEVsZW1lbnQ8VCBleHRlbmRzIEhUTUxFbGVtZW50PihpZDogc3RyaW5nKTogVCB8IG51bGwge1xuXHRyZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpIGFzIFQgfCBudWxsO1xufVxuXG5jb25zdCBhZGp1c3RTTEFtb3VudCA9IDEwO1xuXG5jb25zdCB4eXpNYXhYID0gOTUuMDQ3O1xuY29uc3QgeHl6TWF4WSA9IDEwMDtcbmNvbnN0IHh5ek1heFogPSAxMDguODgzO1xuY29uc3QgeHl6TWluWCA9IDA7XG5jb25zdCB4eXpNaW5ZID0gMDtcbmNvbnN0IHh5ek1pblogPSAwO1xuXG5jb25zdCBidXR0b25EZWJvdW5jZSA9IDMwMDtcbmNvbnN0IGlucHV0RGVib3VuY2UgPSAyMDA7XG5cbmNvbnN0IGFwcGx5Q3VzdG9tQ29sb3JCdXR0b24gPSBnZXRFbGVtZW50PEhUTUxCdXR0b25FbGVtZW50Pihcblx0J2FwcGx5LWN1c3RvbS1jb2xvci1idXR0b24nXG4pO1xuY29uc3QgY2xlYXJDdXN0b21Db2xvckJ1dHRvbiA9IGdldEVsZW1lbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KFxuXHQnY2xlYXItY3VzdG9tLWNvbG9yLWJ1dHRvbidcbik7XG5jb25zdCBjbG9zZUhlbHBNZW51QnV0dG9uID0gZ2V0RWxlbWVudDxIVE1MQnV0dG9uRWxlbWVudD4oXG5cdCdjbG9zZS1oZWxwLW1lbnUtYnV0dG9uJ1xuKTtcbmNvbnN0IGNsb3NlSGlzdG9yeU1lbnVCdXR0b24gPSBnZXRFbGVtZW50PEhUTUxCdXR0b25FbGVtZW50Pihcblx0J2Nsb3NlLWhpc3RvcnktbWVudS1idXR0b24nXG4pO1xuY29uc3QgY2xvc2VTdWJNZW51QUJ1dHRvbiA9IGdldEVsZW1lbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KFxuXHQnY2xvc2Utc3ViLW1lbnUtQS1idXR0b24nXG4pO1xuY29uc3QgY2xvc2VTdWJNZW51QkJ1dHRvbiA9IGdldEVsZW1lbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KFxuXHQnY2xvc2Utc3ViLW1lbnUtQi1idXR0b24nXG4pO1xuY29uc3QgY3VzdG9tQ29sb3JFbGVtZW50ID0gZ2V0RWxlbWVudDxIVE1MSW5wdXRFbGVtZW50PignY3VzdG9tLWNvbG9yJyk7XG5jb25zdCBjdXN0b21Db2xvclRvZ2dsZUJ1dHRvbiA9IGdldEVsZW1lbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KFxuXHQnY3VzdG9tLWNvbG9yLXRvZ2dsZS1idXR0b24nXG4pO1xuY29uc3QgZGVzYXR1cmF0ZUJ1dHRvbiA9IGdldEVsZW1lbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KCdkZXNhdHVyYXRlLWJ1dHRvbicpO1xuY29uc3QgZW5hYmxlQWxwaGFDaGVja2JveCA9IGdldEVsZW1lbnQ8SFRNTElucHV0RWxlbWVudD4oXG5cdCdlbmFibGUtYWxwaGEtY2hlY2tib3gnXG4pO1xuY29uc3QgZ2VuZXJhdGVCdXR0b24gPSBnZXRFbGVtZW50PEhUTUxCdXR0b25FbGVtZW50PignZ2VuZXJhdGUtYnV0dG9uJyk7XG5jb25zdCBoZWxwTWVudSA9IGdldEVsZW1lbnQ8SFRNTERpdkVsZW1lbnQ+KCdoZWxwLW1vZGFsJyk7XG5jb25zdCBoaXN0b3J5TWVudSA9IGdldEVsZW1lbnQ8SFRNTERpdkVsZW1lbnQ+KCdoaXN0b3J5LW1vZGFsJyk7XG5jb25zdCBsaW1pdEJyaWdodENoZWNrYm94ID0gZ2V0RWxlbWVudDxIVE1MSW5wdXRFbGVtZW50Pihcblx0J2xpbWl0LWxpZ2h0LWNoZWNrYm94J1xuKTtcbmNvbnN0IGxpbWl0RGFya0NoZWNrYm94ID0gZ2V0RWxlbWVudDxIVE1MSW5wdXRFbGVtZW50PignbGltaXQtZGFyay1jaGVja2JveCcpO1xuY29uc3QgbGltaXRHcmF5Q2hlY2tib3ggPSBnZXRFbGVtZW50PEhUTUxJbnB1dEVsZW1lbnQ+KCdsaW1pdC1ncmF5LWNoZWNrYm94Jyk7XG5jb25zdCBwYWxldHRlTnVtYmVyT3B0aW9ucyA9IGdldEVsZW1lbnQ8SFRNTElucHV0RWxlbWVudD4oXG5cdCdwYWxldHRlLW51bWJlci1vcHRpb25zJ1xuKTtcbmNvbnN0IHBhbGV0dGVUeXBlT3B0aW9ucyA9IGdldEVsZW1lbnQ8SFRNTFNlbGVjdEVsZW1lbnQ+KFxuXHQncGFsZXR0ZS10eXBlLW9wdGlvbnMnXG4pO1xuY29uc3QgcG9wdXBEaXZCdXR0b24gPSBnZXRFbGVtZW50PEhUTUxCdXR0b25FbGVtZW50PignY3VzdG9tLWNvbG9yLWJ1dHRvbicpO1xuY29uc3Qgc2F0dXJhdGVCdXR0b24gPSBnZXRFbGVtZW50PEhUTUxCdXR0b25FbGVtZW50Pignc2F0dXJhdGUtYnV0dG9uJyk7XG5jb25zdCBzZWxlY3RlZENvbG9yT3B0aW9ucyA9IGdldEVsZW1lbnQ8SFRNTFNlbGVjdEVsZW1lbnQ+KFxuXHQnc2VsZWN0ZWQtY29sb3Itb3B0aW9ucydcbikgYXMgSFRNTFNlbGVjdEVsZW1lbnQgfCBudWxsO1xuY29uc3Qgc2hvd0FzQ01ZS0J1dHRvbiA9IGdldEVsZW1lbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KCdzaG93LWFzLWNteWstYnV0dG9uJyk7XG5jb25zdCBzaG93QXNIZXhCdXR0b24gPSBnZXRFbGVtZW50PEhUTUxCdXR0b25FbGVtZW50Pignc2hvdy1hcy1oZXgtYnV0dG9uJyk7XG5jb25zdCBzaG93QXNIU0xCdXR0b24gPSBnZXRFbGVtZW50PEhUTUxCdXR0b25FbGVtZW50Pignc2hvdy1hcy1oc2wtYnV0dG9uJyk7XG5jb25zdCBzaG93QXNIU1ZCdXR0b24gPSBnZXRFbGVtZW50PEhUTUxCdXR0b25FbGVtZW50Pignc2hvdy1hcy1oc3YtYnV0dG9uJyk7XG5jb25zdCBzaG93QXNMQUJCdXR0b24gPSBnZXRFbGVtZW50PEhUTUxCdXR0b25FbGVtZW50Pignc2hvdy1hcy1sYWItYnV0dG9uJyk7XG5jb25zdCBzaG93QXNSR0JCdXR0b24gPSBnZXRFbGVtZW50PEhUTUxCdXR0b25FbGVtZW50Pignc2hvdy1hcy1yZ2ItYnV0dG9uJyk7XG5jb25zdCBzaG93SGVscE1lbnVCdXR0b24gPSBnZXRFbGVtZW50PEhUTUxCdXR0b25FbGVtZW50PignaGVscC1idXR0b24nKTtcbmNvbnN0IHNob3dIaXN0b3J5TWVudUJ1dHRvbiA9IGdldEVsZW1lbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KFxuXHQnc2hvdy1oaXN0b3J5LW1lbnUtYnV0dG9uJ1xuKTtcbmNvbnN0IHN1Yk1lbnVBID0gZ2V0RWxlbWVudDxIVE1MRGl2RWxlbWVudD4oJ3N1Yi1tZW51LW1lbnUtQScpO1xuY29uc3Qgc3ViTWVudUIgPSBnZXRFbGVtZW50PEhUTUxEaXZFbGVtZW50Pignc3ViLW1lbnUtbWVudS1CJyk7XG5jb25zdCBzdWJNZW51VG9nZ2xlQnV0dG9uQSA9IGdldEVsZW1lbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KFxuXHQnc3ViLW1lbnUtdG9nZ2xlLWJ1dHRvbi1BJ1xuKTtcbmNvbnN0IHN1Yk1lbnVUb2dnbGVCdXR0b25CID0gZ2V0RWxlbWVudDxIVE1MQnV0dG9uRWxlbWVudD4oXG5cdCdzdWItbWVudS10b2dnbGUtYnV0dG9uLUInXG4pO1xuXG5jb25zdCBjb21wbGVtZW50YXJ5SHVlU2hpZnRSYW5nZSA9IDEwO1xuY29uc3QgZGlhZGljTGlnaHRuZXNzU2hpZnRSYW5nZSA9IDMwO1xuY29uc3QgZGlhZGljU2F0dXJhdGlvblNoaWZ0UmFuZ2UgPSAzMDtcbmNvbnN0IGhleGFkaWNMaWdodG5lc3NTaGlmdFJhbmdlID0gMzA7XG5jb25zdCBoZXhhZGljU2F0dXJhdGlvblNoaWZ0UmFuZ2UgPSAzMDtcbmNvbnN0IHNwbGl0Q29tcGxlbWVudGFyeUxpZ2h0bmVzc1NoaWZ0UmFuZ2UgPSAzMDtcbmNvbnN0IHNwbGl0Q29tcGxlbWVudGFyeVNhdHVyYXRpb25TaGlmdFJhbmdlID0gMzA7XG5jb25zdCB0ZXRyYWRpY0xpZ2h0bmVzc1NoaWZ0UmFuZ2UgPSAzMDtcbmNvbnN0IHRldHJhZGljU2F0dXJhdGlvblNoaWZ0UmFuZ2UgPSAzMDtcbmNvbnN0IHRyaWFkaWNMaWdodG5lc3NTaGlmdFJhbmdlID0gMzA7XG5jb25zdCB0cmlhZGljU2F0dXJhdGlvblNoaWZ0UmFuZ2UgPSAzMDtcblxuY29uc3QgcHJvYmFiaWxpdGllcyA9IFs0MCwgNDUsIDUwLCA1NSwgNjAsIDY1LCA3MF07XG5jb25zdCB3ZWlnaHRzID0gWzAuMSwgMC4xNSwgMC4yLCAwLjMsIDAuMTUsIDAuMDUsIDAuMDVdO1xuXG5jb25zdCBicmlnaHRuZXNzVGhyZXNob2xkID0gNzU7XG5jb25zdCBkYXJrbmVzc1RocmVzaG9sZCA9IDI1O1xuY29uc3QgZ3JheVRocmVzaG9sZCA9IDIwO1xuXG5jb25zdCBjb3B5QnV0dG9uVGV4dFRpbWVvdXQgPSAxMDAwO1xuY29uc3QgdG9hc3RUaW1lb3V0ID0gMzAwMDtcbmNvbnN0IHRvb2x0aXBUaW1lb3V0ID0gMTAwMDtcblxuLy8gKioqKiogQ29uc3RydWN0ZWQgQ29uc3RhbnRzICoqKioqXG5cbmNvbnN0IGFkanVzdG1lbnRzOiBjb25zdGFudHMuQWRqdXN0bWVudHMgPSB7XG5cdGFkanVzdFNMQW1vdW50XG59O1xuXG5jb25zdCBib3VuZGFyaWVzOiBjb25zdGFudHMuQm91bmRhcmllcyA9IHtcblx0eHl6TWF4WCxcblx0eHl6TWF4WSxcblx0eHl6TWF4Wixcblx0eHl6TWluWCxcblx0eHl6TWluWSxcblx0eHl6TWluWlxufTtcblxuY29uc3QgZGVib3VuY2U6IGNvbnN0YW50cy5EZWJvdW5jZSA9IHtcblx0YnV0dG9uRGVib3VuY2UsXG5cdGlucHV0RGVib3VuY2Vcbn07XG5cbmNvbnN0IGRvbUVsZW1lbnRzOiBjb25zdGFudHMuRE9NRWxlbWVudHMgPSB7XG5cdGFwcGx5Q3VzdG9tQ29sb3JCdXR0b24sXG5cdGNsZWFyQ3VzdG9tQ29sb3JCdXR0b24sXG5cdGNsb3NlSGVscE1lbnVCdXR0b24sXG5cdGNsb3NlSGlzdG9yeU1lbnVCdXR0b24sXG5cdGNsb3NlU3ViTWVudUFCdXR0b24sXG5cdGNsb3NlU3ViTWVudUJCdXR0b24sXG5cdGN1c3RvbUNvbG9yRWxlbWVudCxcblx0Y3VzdG9tQ29sb3JUb2dnbGVCdXR0b24sXG5cdGRlc2F0dXJhdGVCdXR0b24sXG5cdGVuYWJsZUFscGhhQ2hlY2tib3gsXG5cdGdlbmVyYXRlQnV0dG9uLFxuXHRoZWxwTWVudSxcblx0aGlzdG9yeU1lbnUsXG5cdGxpbWl0QnJpZ2h0Q2hlY2tib3gsXG5cdGxpbWl0RGFya0NoZWNrYm94LFxuXHRsaW1pdEdyYXlDaGVja2JveCxcblx0cGFsZXR0ZU51bWJlck9wdGlvbnMsXG5cdHBhbGV0dGVUeXBlT3B0aW9ucyxcblx0cG9wdXBEaXZCdXR0b24sXG5cdHNhdHVyYXRlQnV0dG9uLFxuXHRzZWxlY3RlZENvbG9yT3B0aW9ucyxcblx0c2hvd0FzQ01ZS0J1dHRvbixcblx0c2hvd0FzSGV4QnV0dG9uLFxuXHRzaG93QXNIU0xCdXR0b24sXG5cdHNob3dBc0hTVkJ1dHRvbixcblx0c2hvd0FzTEFCQnV0dG9uLFxuXHRzaG93QXNSR0JCdXR0b24sXG5cdHNob3dIZWxwTWVudUJ1dHRvbixcblx0c2hvd0hpc3RvcnlNZW51QnV0dG9uLFxuXHRzdWJNZW51QSxcblx0c3ViTWVudUIsXG5cdHN1Yk1lbnVUb2dnbGVCdXR0b25BLFxuXHRzdWJNZW51VG9nZ2xlQnV0dG9uQlxufTtcblxuY29uc3QgcGFsZXR0ZVNoaWZ0UmFuZ2VzOiBjb25zdGFudHMuUGFsZXR0ZVNoaWZ0UmFuZ2VzID0ge1xuXHRjb21wbGVtZW50YXJ5SHVlU2hpZnRSYW5nZSxcblx0ZGlhZGljTGlnaHRuZXNzU2hpZnRSYW5nZSxcblx0ZGlhZGljU2F0dXJhdGlvblNoaWZ0UmFuZ2UsXG5cdGhleGFkaWNMaWdodG5lc3NTaGlmdFJhbmdlLFxuXHRoZXhhZGljU2F0dXJhdGlvblNoaWZ0UmFuZ2UsXG5cdHNwbGl0Q29tcGxlbWVudGFyeUxpZ2h0bmVzc1NoaWZ0UmFuZ2UsXG5cdHNwbGl0Q29tcGxlbWVudGFyeVNhdHVyYXRpb25TaGlmdFJhbmdlLFxuXHR0ZXRyYWRpY0xpZ2h0bmVzc1NoaWZ0UmFuZ2UsXG5cdHRldHJhZGljU2F0dXJhdGlvblNoaWZ0UmFuZ2UsXG5cdHRyaWFkaWNMaWdodG5lc3NTaGlmdFJhbmdlLFxuXHR0cmlhZGljU2F0dXJhdGlvblNoaWZ0UmFuZ2Vcbn07XG5cbmNvbnN0IHByb2JhYmlsaXR5Q29uc3RhbnRzOiBjb25zdGFudHMuUHJvYmFiaWxpdHlDb25zdGFudHMgPSB7XG5cdHByb2JhYmlsaXRpZXMsXG5cdHdlaWdodHNcbn07XG5cbmNvbnN0IHRocmVzaG9sZHM6IGNvbnN0YW50cy5UaHJlc2hvbGRzID0ge1xuXHRicmlnaHRuZXNzVGhyZXNob2xkLFxuXHRkYXJrbmVzc1RocmVzaG9sZCxcblx0Z3JheVRocmVzaG9sZFxufTtcblxuY29uc3QgdGltZW91dHM6IGNvbnN0YW50cy5UaW1lb3V0cyA9IHtcblx0Y29weUJ1dHRvblRleHRUaW1lb3V0LFxuXHR0b2FzdFRpbWVvdXQsXG5cdHRvb2x0aXBUaW1lb3V0XG59O1xuXG4vLyAqKioqIE1hc3RlciBDb25maWcgT2JqZWN0ICoqKipcblxuZXhwb3J0IGNvbnN0IGNvbmZpZzogY29uc3RhbnRzLkNvbmZpZyA9IHtcblx0Li4uYWRqdXN0bWVudHMsXG5cdC4uLmJvdW5kYXJpZXMsXG5cdC4uLmRlYm91bmNlLFxuXHQuLi5kb21FbGVtZW50cyxcblx0Li4ucGFsZXR0ZVNoaWZ0UmFuZ2VzLFxuXHQuLi5wcm9iYWJpbGl0eUNvbnN0YW50cyxcblx0Li4udGhyZXNob2xkcyxcblx0Li4udGltZW91dHNcbn07XG4iXX0=