// File: common/services/DataObserver.js
export class DataObserver {
    data;
    listeners = {};
    constructor(initialData) {
        this.data = new Proxy(initialData, {
            set: (obj, prop, value) => {
                if (typeof prop === 'string' && prop in obj) {
                    const typedProp = prop;
                    const oldValue = obj[typedProp];
                    obj[typedProp] = value;
                    console.log(`[Proxy] ${prop} changed from`, oldValue, 'to', value);
                    this.notify(prop, value, oldValue);
                }
                return true;
            },
            deleteProperty: (obj, prop) => {
                if (typeof prop === 'string' && prop in obj) {
                    const typedProp = prop;
                    console.log(`[Proxy] ${typedProp} deleted.`);
                    this.notify(typedProp, undefined, obj[typedProp]);
                    delete obj[typedProp];
                }
                return true;
            }
        });
    }
    // subscribe to property changes
    on(prop, callback) {
        if (!this.listeners[prop])
            this.listeners[prop] = [];
        this.listeners[prop].push(callback);
    }
    // notify listeners when a property changes
    notify(prop, newValue, oldValue) {
        this.listeners[prop]?.forEach(callback => callback(newValue, oldValue));
    }
    get(prop) {
        return this.data[prop];
    }
    set(prop, value) {
        this.data[prop] = value;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YU9ic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbW1vbi9zZXJ2aWNlcy9EYXRhT2JzZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsd0NBQXdDO0FBSXhDLE1BQU0sT0FBTyxZQUFZO0lBQ2hCLElBQUksQ0FBSTtJQUNSLFNBQVMsR0FDaEIsRUFBNkMsQ0FBQztJQUUvQyxZQUFZLFdBQWM7UUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUU7WUFDbEMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLElBQXFCLEVBQUUsS0FBYyxFQUFFLEVBQUU7Z0JBQ25ELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztvQkFDN0MsTUFBTSxTQUFTLEdBQUcsSUFBZSxDQUFDO29CQUNsQyxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBRWhDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxLQUFtQixDQUFDO29CQUVyQyxPQUFPLENBQUMsR0FBRyxDQUNWLFdBQVcsSUFBYyxlQUFlLEVBQ3hDLFFBQVEsRUFDUixJQUFJLEVBQ0osS0FBSyxDQUNMLENBQUM7b0JBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDbEQsQ0FBQztnQkFFRCxPQUFPLElBQUksQ0FBQztZQUNiLENBQUM7WUFDRCxjQUFjLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBcUIsRUFBRSxFQUFFO2dCQUM5QyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7b0JBQzdDLE1BQU0sU0FBUyxHQUFHLElBQWUsQ0FBQztvQkFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLFNBQW1CLFdBQVcsQ0FBQyxDQUFDO29CQUN2RCxJQUFJLENBQUMsTUFBTSxDQUNWLFNBQW1CLEVBQ25CLFNBQXVCLEVBQ3ZCLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FDZCxDQUFDO29CQUNGLE9BQU8sR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN2QixDQUFDO2dCQUVELE9BQU8sSUFBSSxDQUFDO1lBQ2IsQ0FBQztTQUNELENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxnQ0FBZ0M7SUFDaEMsRUFBRSxDQUFvQixJQUFPLEVBQUUsUUFBd0I7UUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDcEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQXNCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCwyQ0FBMkM7SUFDbkMsTUFBTSxDQUFvQixJQUFPLEVBQUUsUUFBYyxFQUFFLFFBQWM7UUFDeEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELEdBQUcsQ0FBb0IsSUFBTztRQUM3QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELEdBQUcsQ0FBb0IsSUFBTyxFQUFFLEtBQVc7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztDQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRmlsZTogY29tbW9uL3NlcnZpY2VzL0RhdGFPYnNlcnZlci5qc1xuXG5pbXBvcnQgeyBMaXN0ZW5lciB9IGZyb20gJy4uLy4uL3R5cGVzL2luZGV4LmpzJztcblxuZXhwb3J0IGNsYXNzIERhdGFPYnNlcnZlcjxUIGV4dGVuZHMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4+IHtcblx0cHJpdmF0ZSBkYXRhOiBUO1xuXHRwcml2YXRlIGxpc3RlbmVyczogUGFydGlhbDxSZWNvcmQ8a2V5b2YgVCwgTGlzdGVuZXI8VFtrZXlvZiBUXT5bXT4+ID1cblx0XHR7fSBhcyBSZWNvcmQ8a2V5b2YgVCwgTGlzdGVuZXI8VFtrZXlvZiBUXT5bXT47XG5cblx0Y29uc3RydWN0b3IoaW5pdGlhbERhdGE6IFQpIHtcblx0XHR0aGlzLmRhdGEgPSBuZXcgUHJveHkoaW5pdGlhbERhdGEsIHtcblx0XHRcdHNldDogKG9iaiwgcHJvcDogc3RyaW5nIHwgc3ltYm9sLCB2YWx1ZTogdW5rbm93bikgPT4ge1xuXHRcdFx0XHRpZiAodHlwZW9mIHByb3AgPT09ICdzdHJpbmcnICYmIHByb3AgaW4gb2JqKSB7XG5cdFx0XHRcdFx0Y29uc3QgdHlwZWRQcm9wID0gcHJvcCBhcyBrZXlvZiBUO1xuXHRcdFx0XHRcdGNvbnN0IG9sZFZhbHVlID0gb2JqW3R5cGVkUHJvcF07XG5cblx0XHRcdFx0XHRvYmpbdHlwZWRQcm9wXSA9IHZhbHVlIGFzIFRba2V5b2YgVF07XG5cblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcblx0XHRcdFx0XHRcdGBbUHJveHldICR7cHJvcCBhcyBzdHJpbmd9IGNoYW5nZWQgZnJvbWAsXG5cdFx0XHRcdFx0XHRvbGRWYWx1ZSxcblx0XHRcdFx0XHRcdCd0bycsXG5cdFx0XHRcdFx0XHR2YWx1ZVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0dGhpcy5ub3RpZnkocHJvcCwgdmFsdWUgYXMgVFtrZXlvZiBUXSwgb2xkVmFsdWUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9LFxuXHRcdFx0ZGVsZXRlUHJvcGVydHk6IChvYmosIHByb3A6IHN0cmluZyB8IHN5bWJvbCkgPT4ge1xuXHRcdFx0XHRpZiAodHlwZW9mIHByb3AgPT09ICdzdHJpbmcnICYmIHByb3AgaW4gb2JqKSB7XG5cdFx0XHRcdFx0Y29uc3QgdHlwZWRQcm9wID0gcHJvcCBhcyBrZXlvZiBUO1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGBbUHJveHldICR7dHlwZWRQcm9wIGFzIHN0cmluZ30gZGVsZXRlZC5gKTtcblx0XHRcdFx0XHR0aGlzLm5vdGlmeShcblx0XHRcdFx0XHRcdHR5cGVkUHJvcCBhcyBzdHJpbmcsXG5cdFx0XHRcdFx0XHR1bmRlZmluZWQgYXMgVFtrZXlvZiBUXSxcblx0XHRcdFx0XHRcdG9ialt0eXBlZFByb3BdXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRkZWxldGUgb2JqW3R5cGVkUHJvcF07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdC8vIHN1YnNjcmliZSB0byBwcm9wZXJ0eSBjaGFuZ2VzXG5cdG9uPEsgZXh0ZW5kcyBrZXlvZiBUPihwcm9wOiBLLCBjYWxsYmFjazogTGlzdGVuZXI8VFtLXT4pOiB2b2lkIHtcblx0XHRpZiAoIXRoaXMubGlzdGVuZXJzW3Byb3BdKSB0aGlzLmxpc3RlbmVyc1twcm9wXSA9IFtdO1xuXHRcdCh0aGlzLmxpc3RlbmVyc1twcm9wXSBhcyBMaXN0ZW5lcjxUW0tdPltdKS5wdXNoKGNhbGxiYWNrKTtcblx0fVxuXG5cdC8vIG5vdGlmeSBsaXN0ZW5lcnMgd2hlbiBhIHByb3BlcnR5IGNoYW5nZXNcblx0cHJpdmF0ZSBub3RpZnk8SyBleHRlbmRzIGtleW9mIFQ+KHByb3A6IEssIG5ld1ZhbHVlOiBUW0tdLCBvbGRWYWx1ZTogVFtLXSkge1xuXHRcdHRoaXMubGlzdGVuZXJzW3Byb3BdPy5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpO1xuXHR9XG5cblx0Z2V0PEsgZXh0ZW5kcyBrZXlvZiBUPihwcm9wOiBLKTogVFtLXSB7XG5cdFx0cmV0dXJuIHRoaXMuZGF0YVtwcm9wXTtcblx0fVxuXG5cdHNldDxLIGV4dGVuZHMga2V5b2YgVD4ocHJvcDogSywgdmFsdWU6IFRbS10pOiB2b2lkIHtcblx0XHR0aGlzLmRhdGFbcHJvcF0gPSB2YWx1ZTtcblx0fVxufVxuIl19