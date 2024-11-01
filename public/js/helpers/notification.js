import { config } from '../config/constants.js';
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('fade-out');
        toast.addEventListener('transitioned', () => toast.remove());
    }, config.toastTimeout || 3000);
}
export const notification = {
    showToast
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2hlbHBlcnMvbm90aWZpY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUc3QyxTQUFTLFNBQVMsQ0FBQyxPQUFlO0lBQ2pDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFNUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUM7SUFFbEMsS0FBSyxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7SUFFNUIsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFakMsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNmLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDOUQsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBMkI7SUFDbkQsU0FBUztDQUNULENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi9jb25maWcvY29uc3RhbnRzJztcbmltcG9ydCAqIGFzIGZuT2JqZWN0cyBmcm9tICcuLi9pbmRleC9mbi1vYmplY3RzJztcblxuZnVuY3Rpb24gc2hvd1RvYXN0KG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuXHRjb25zdCB0b2FzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdHRvYXN0LmNsYXNzTmFtZSA9ICd0b2FzdC1tZXNzYWdlJztcblxuXHR0b2FzdC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG5cblx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0b2FzdCk7XG5cblx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0dG9hc3QuY2xhc3NMaXN0LmFkZCgnZmFkZS1vdXQnKTtcblx0XHR0b2FzdC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZWQnLCAoKSA9PiB0b2FzdC5yZW1vdmUoKSk7XG5cdH0sIGNvbmZpZy50b2FzdFRpbWVvdXQgfHwgMzAwMCk7XG59XG5cbmV4cG9ydCBjb25zdCBub3RpZmljYXRpb246IGZuT2JqZWN0cy5Ob3RpZmljYXRpb24gPSB7XG5cdHNob3dUb2FzdFxufTtcbiJdfQ==