function clone(value) {
    return structuredClone(value);
}
function debounce(func, delay) {
    let timeout = null;
    return (...args) => {
        if (timeout)
            clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, delay);
    };
}
function isInRange(value, min, max) {
    return value >= min && value <= max;
}
export const core = { clone, debounce, isInRange };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9jb3JlLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLFNBQVMsS0FBSyxDQUFJLEtBQVE7SUFDekIsT0FBTyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUVELFNBQVMsUUFBUSxDQUNoQixJQUFPLEVBQ1AsS0FBYTtJQUViLElBQUksT0FBTyxHQUF5QyxJQUFJLENBQUM7SUFFekQsT0FBTyxDQUFDLEdBQUcsSUFBbUIsRUFBUSxFQUFFO1FBQ3ZDLElBQUksT0FBTztZQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVuQyxPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUN6QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNmLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNYLENBQUMsQ0FBQztBQUNILENBQUM7QUFFRCxTQUFTLFNBQVMsQ0FBQyxLQUFhLEVBQUUsR0FBVyxFQUFFLEdBQVc7SUFDekQsT0FBTyxLQUFLLElBQUksR0FBRyxJQUFJLEtBQUssSUFBSSxHQUFHLENBQUM7QUFDckMsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBbUIsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZm5PYmplY3RzIGZyb20gJy4uL2luZGV4L2ZuLW9iamVjdHMnO1xuXG5mdW5jdGlvbiBjbG9uZTxUPih2YWx1ZTogVCk6IFQge1xuXHRyZXR1cm4gc3RydWN0dXJlZENsb25lKHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gZGVib3VuY2U8VCBleHRlbmRzICguLi5hcmdzOiBQYXJhbWV0ZXJzPFQ+KSA9PiB2b2lkPihcblx0ZnVuYzogVCxcblx0ZGVsYXk6IG51bWJlclxuKSB7XG5cdGxldCB0aW1lb3V0OiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IG51bGwgPSBudWxsO1xuXG5cdHJldHVybiAoLi4uYXJnczogUGFyYW1ldGVyczxUPik6IHZvaWQgPT4ge1xuXHRcdGlmICh0aW1lb3V0KSBjbGVhclRpbWVvdXQodGltZW91dCk7XG5cblx0XHR0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRmdW5jKC4uLmFyZ3MpO1xuXHRcdH0sIGRlbGF5KTtcblx0fTtcbn1cblxuZnVuY3Rpb24gaXNJblJhbmdlKHZhbHVlOiBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IGJvb2xlYW4ge1xuXHRyZXR1cm4gdmFsdWUgPj0gbWluICYmIHZhbHVlIDw9IG1heDtcbn1cblxuZXhwb3J0IGNvbnN0IGNvcmU6IGZuT2JqZWN0cy5Db3JlID0geyBjbG9uZSwgZGVib3VuY2UsIGlzSW5SYW5nZSB9O1xuIl19