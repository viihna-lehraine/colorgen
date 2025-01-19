// File: src/classes/logger/factory.ts
import { AppLogger } from './AppLogger.js';
import { data } from '../../data/index.js';
const debugLevel = data.mode.debugLevel;
const appLogger = AppLogger.getInstance(data.mode);
// Synchronous Log Functions
function logDebug(message) {
    appLogger.log(message, 'debug', debugLevel);
}
function logInfo(message) {
    appLogger.log(message, 'info', debugLevel);
}
function logWarning(message) {
    appLogger.log(message, 'warn', debugLevel);
}
function logError(message) {
    appLogger.log(message, 'error', debugLevel);
}
function logMutation(data, logCallback = () => { }) {
    appLogger.logMutation(data, logCallback);
}
// Async Log Functions
async function logAsyncDebug(message) {
    appLogger.logAsync(message, 'debug', debugLevel);
}
async function logAsyncInfo(message) {
    appLogger.logAsync(message, 'info', debugLevel);
}
async function logAsyncWarning(message) {
    appLogger.logAsync(message, 'warn', debugLevel);
}
async function logAsyncError(message) {
    appLogger.logAsync(message, 'error', debugLevel);
}
async function logAsyncMutation(data, logCallback = () => { }) {
    appLogger.logMutation(data, logCallback);
}
export const log = {
    debug: logDebug,
    info: logInfo,
    warning: logWarning,
    error: logError,
    mutation: logMutation
};
export const logger = log;
export const logAsync = {
    debug: logAsyncDebug,
    info: logAsyncInfo,
    warning: logAsyncWarning,
    error: logAsyncError,
    mutation: logAsyncMutation
};
export const asyncLogger = logAsync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jbGFzc2VzL2xvZ2dlci9mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHNDQUFzQztBQU90QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRTNDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0FBRXhDLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRW5ELDRCQUE0QjtBQUU1QixTQUFTLFFBQVEsQ0FBQyxPQUFlO0lBQ2hDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBRUQsU0FBUyxPQUFPLENBQUMsT0FBZTtJQUMvQixTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDNUMsQ0FBQztBQUVELFNBQVMsVUFBVSxDQUFDLE9BQWU7SUFDbEMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFFRCxTQUFTLFFBQVEsQ0FBQyxPQUFlO0lBQ2hDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBRUQsU0FBUyxXQUFXLENBQ25CLElBQWlCLEVBQ2pCLGNBQTJDLEdBQUcsRUFBRSxHQUFFLENBQUM7SUFFbkQsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDMUMsQ0FBQztBQUVELHNCQUFzQjtBQUV0QixLQUFLLFVBQVUsYUFBYSxDQUFDLE9BQWU7SUFDM0MsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFFRCxLQUFLLFVBQVUsWUFBWSxDQUFDLE9BQWU7SUFDMUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxLQUFLLFVBQVUsZUFBZSxDQUFDLE9BQWU7SUFDN0MsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxLQUFLLFVBQVUsYUFBYSxDQUFDLE9BQWU7SUFDM0MsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFFRCxLQUFLLFVBQVUsZ0JBQWdCLENBQzlCLElBQWlCLEVBQ2pCLGNBQTJDLEdBQUcsRUFBRSxHQUFFLENBQUM7SUFFbkQsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDMUMsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBc0I7SUFDckMsS0FBSyxFQUFFLFFBQVE7SUFDZixJQUFJLEVBQUUsT0FBTztJQUNiLE9BQU8sRUFBRSxVQUFVO0lBQ25CLEtBQUssRUFBRSxRQUFRO0lBQ2YsUUFBUSxFQUFFLFdBQVc7Q0FDckIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFFMUIsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUF1QjtJQUMzQyxLQUFLLEVBQUUsYUFBYTtJQUNwQixJQUFJLEVBQUUsWUFBWTtJQUNsQixPQUFPLEVBQUUsZUFBZTtJQUN4QixLQUFLLEVBQUUsYUFBYTtJQUNwQixRQUFRLEVBQUUsZ0JBQWdCO0NBQzFCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRmlsZTogc3JjL2NsYXNzZXMvbG9nZ2VyL2ZhY3RvcnkudHNcblxuaW1wb3J0IHtcblx0QXN5bmNMb2dnZXJGYWN0b3J5LFxuXHRNdXRhdGlvbkxvZyxcblx0U3luY0xvZ2dlckZhY3Rvcnlcbn0gZnJvbSAnLi4vLi4vaW5kZXgvaW5kZXguanMnO1xuaW1wb3J0IHsgQXBwTG9nZ2VyIH0gZnJvbSAnLi9BcHBMb2dnZXIuanMnO1xuaW1wb3J0IHsgZGF0YSB9IGZyb20gJy4uLy4uL2RhdGEvaW5kZXguanMnO1xuXG5jb25zdCBkZWJ1Z0xldmVsID0gZGF0YS5tb2RlLmRlYnVnTGV2ZWw7XG5cbmNvbnN0IGFwcExvZ2dlciA9IEFwcExvZ2dlci5nZXRJbnN0YW5jZShkYXRhLm1vZGUpO1xuXG4vLyBTeW5jaHJvbm91cyBMb2cgRnVuY3Rpb25zXG5cbmZ1bmN0aW9uIGxvZ0RlYnVnKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuXHRhcHBMb2dnZXIubG9nKG1lc3NhZ2UsICdkZWJ1ZycsIGRlYnVnTGV2ZWwpO1xufVxuXG5mdW5jdGlvbiBsb2dJbmZvKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuXHRhcHBMb2dnZXIubG9nKG1lc3NhZ2UsICdpbmZvJywgZGVidWdMZXZlbCk7XG59XG5cbmZ1bmN0aW9uIGxvZ1dhcm5pbmcobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG5cdGFwcExvZ2dlci5sb2cobWVzc2FnZSwgJ3dhcm4nLCBkZWJ1Z0xldmVsKTtcbn1cblxuZnVuY3Rpb24gbG9nRXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG5cdGFwcExvZ2dlci5sb2cobWVzc2FnZSwgJ2Vycm9yJywgZGVidWdMZXZlbCk7XG59XG5cbmZ1bmN0aW9uIGxvZ011dGF0aW9uKFxuXHRkYXRhOiBNdXRhdGlvbkxvZyxcblx0bG9nQ2FsbGJhY2s6IChkYXRhOiBNdXRhdGlvbkxvZykgPT4gdm9pZCA9ICgpID0+IHt9XG4pOiB2b2lkIHtcblx0YXBwTG9nZ2VyLmxvZ011dGF0aW9uKGRhdGEsIGxvZ0NhbGxiYWNrKTtcbn1cblxuLy8gQXN5bmMgTG9nIEZ1bmN0aW9uc1xuXG5hc3luYyBmdW5jdGlvbiBsb2dBc3luY0RlYnVnKG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuXHRhcHBMb2dnZXIubG9nQXN5bmMobWVzc2FnZSwgJ2RlYnVnJywgZGVidWdMZXZlbCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxvZ0FzeW5jSW5mbyhtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcblx0YXBwTG9nZ2VyLmxvZ0FzeW5jKG1lc3NhZ2UsICdpbmZvJywgZGVidWdMZXZlbCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxvZ0FzeW5jV2FybmluZyhtZXNzYWdlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcblx0YXBwTG9nZ2VyLmxvZ0FzeW5jKG1lc3NhZ2UsICd3YXJuJywgZGVidWdMZXZlbCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxvZ0FzeW5jRXJyb3IobWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG5cdGFwcExvZ2dlci5sb2dBc3luYyhtZXNzYWdlLCAnZXJyb3InLCBkZWJ1Z0xldmVsKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbG9nQXN5bmNNdXRhdGlvbihcblx0ZGF0YTogTXV0YXRpb25Mb2csXG5cdGxvZ0NhbGxiYWNrOiAoZGF0YTogTXV0YXRpb25Mb2cpID0+IHZvaWQgPSAoKSA9PiB7fVxuKTogUHJvbWlzZTx2b2lkPiB7XG5cdGFwcExvZ2dlci5sb2dNdXRhdGlvbihkYXRhLCBsb2dDYWxsYmFjayk7XG59XG5cbmV4cG9ydCBjb25zdCBsb2c6IFN5bmNMb2dnZXJGYWN0b3J5ID0ge1xuXHRkZWJ1ZzogbG9nRGVidWcsXG5cdGluZm86IGxvZ0luZm8sXG5cdHdhcm5pbmc6IGxvZ1dhcm5pbmcsXG5cdGVycm9yOiBsb2dFcnJvcixcblx0bXV0YXRpb246IGxvZ011dGF0aW9uXG59O1xuXG5leHBvcnQgY29uc3QgbG9nZ2VyID0gbG9nO1xuXG5leHBvcnQgY29uc3QgbG9nQXN5bmM6IEFzeW5jTG9nZ2VyRmFjdG9yeSA9IHtcblx0ZGVidWc6IGxvZ0FzeW5jRGVidWcsXG5cdGluZm86IGxvZ0FzeW5jSW5mbyxcblx0d2FybmluZzogbG9nQXN5bmNXYXJuaW5nLFxuXHRlcnJvcjogbG9nQXN5bmNFcnJvcixcblx0bXV0YXRpb246IGxvZ0FzeW5jTXV0YXRpb25cbn07XG5cbmV4cG9ydCBjb25zdCBhc3luY0xvZ2dlciA9IGxvZ0FzeW5jO1xuIl19