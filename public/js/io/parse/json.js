// File: src/io/parse/json.ts
import { data } from '../../data/index.js';
import { logger } from '../../logger/factory.js';
const logMode = data.mode.logging;
const mode = data.mode;
function file(jsonData) {
    try {
        const parsed = JSON.parse(jsonData);
        // Validate that the parsed object matches the expected structure
        if (!parsed.items || !Array.isArray(parsed.items)) {
            throw new Error('Invalid JSON structure for Palette');
        }
        return Promise.resolve(parsed);
    }
    catch (error) {
        if (!mode.quiet && logMode.errors && logMode.verbosity > 1) {
            logger.error(`Error parsing JSON file: ${error}`);
            if (mode.showAlerts)
                alert(`Error parsing JSON file. See console for details.`);
        }
        return Promise.resolve(null);
    }
}
export const json = {
    file
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9pby9wYXJzZS9qc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDZCQUE2QjtBQUc3QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRWpELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ2xDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7QUFFdkIsU0FBUyxJQUFJLENBQUMsUUFBZ0I7SUFDN0IsSUFBSSxDQUFDO1FBQ0osTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVwQyxpRUFBaUU7UUFDakUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ25ELE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztRQUN2RCxDQUFDO1FBRUQsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQWlCLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDNUQsTUFBTSxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUVsRCxJQUFJLElBQUksQ0FBQyxVQUFVO2dCQUNsQixLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQztRQUM3RCxDQUFDO1FBRUQsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7QUFDRixDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHO0lBQ25CLElBQUk7Q0FDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRmlsZTogc3JjL2lvL3BhcnNlL2pzb24udHNcblxuaW1wb3J0IHsgUGFsZXR0ZSB9IGZyb20gJy4uLy4uL2luZGV4L2luZGV4LmpzJztcbmltcG9ydCB7IGRhdGEgfSBmcm9tICcuLi8uLi9kYXRhL2luZGV4LmpzJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4uLy4uL2xvZ2dlci9mYWN0b3J5LmpzJztcblxuY29uc3QgbG9nTW9kZSA9IGRhdGEubW9kZS5sb2dnaW5nO1xuY29uc3QgbW9kZSA9IGRhdGEubW9kZTtcblxuZnVuY3Rpb24gZmlsZShqc29uRGF0YTogc3RyaW5nKTogUHJvbWlzZTxQYWxldHRlIHwgbnVsbD4ge1xuXHR0cnkge1xuXHRcdGNvbnN0IHBhcnNlZCA9IEpTT04ucGFyc2UoanNvbkRhdGEpO1xuXG5cdFx0Ly8gVmFsaWRhdGUgdGhhdCB0aGUgcGFyc2VkIG9iamVjdCBtYXRjaGVzIHRoZSBleHBlY3RlZCBzdHJ1Y3R1cmVcblx0XHRpZiAoIXBhcnNlZC5pdGVtcyB8fCAhQXJyYXkuaXNBcnJheShwYXJzZWQuaXRlbXMpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgSlNPTiBzdHJ1Y3R1cmUgZm9yIFBhbGV0dGUnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHBhcnNlZCBhcyBQYWxldHRlKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRpZiAoIW1vZGUucXVpZXQgJiYgbG9nTW9kZS5lcnJvcnMgJiYgbG9nTW9kZS52ZXJib3NpdHkgPiAxKSB7XG5cdFx0XHRsb2dnZXIuZXJyb3IoYEVycm9yIHBhcnNpbmcgSlNPTiBmaWxlOiAke2Vycm9yfWApO1xuXG5cdFx0XHRpZiAobW9kZS5zaG93QWxlcnRzKVxuXHRcdFx0XHRhbGVydChgRXJyb3IgcGFyc2luZyBKU09OIGZpbGUuIFNlZSBjb25zb2xlIGZvciBkZXRhaWxzLmApO1xuXHRcdH1cblxuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IGpzb24gPSB7XG5cdGZpbGVcbn07XG4iXX0=