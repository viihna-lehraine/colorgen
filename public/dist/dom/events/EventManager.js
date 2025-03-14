const caller = 'EventManager';
class EventManager {
    static #instance = null;
    static #listeners = new Map();
    static #errors;
    static #log;
    constructor(services) {
        try {
            services.log.info(`Constructing EventManager instance`, `${caller} constructor`);
            EventManager.#errors = services.errors;
            EventManager.#log = services.log;
        }
        catch (error) {
            throw new Error(`[${caller} constructor]: ${error instanceof Error ? error.message : error}`);
        }
    }
    static getInstance(services) {
        return services.errors.handleSync(() => {
            if (!EventManager.#instance) {
                EventManager.#instance = new EventManager(services);
            }
            return EventManager.#instance;
        }, `[${caller}.getInstance]: Failed to create EventManager instance.`);
    }
    static add(element, eventType, handler) {
        return EventManager.#errors.handleSync(() => {
            element.addEventListener(eventType, handler);
            EventManager.#listeners.set(`${eventType}_${handler}`, {
                element,
                handler
            });
        }, `[${caller}]: Failed to add event listener for ${eventType}.`);
    }
    static async listAll() {
        return await EventManager.#errors.handleAsync(async () => {
            if (!EventManager.#listeners.size) {
                EventManager.#log.info('No active listeners found.', `${caller}.listAll`);
                return;
            }
            console.groupCollapsed('Active Listeners:');
            EventManager.#listeners.forEach(({ element, handler }, key) => {
                EventManager.#log.info(`Event: ${key.split('_')[0]}`, `${caller}.listAll`);
                console.log({ element, handler });
            });
            console.groupEnd();
        }, `[${caller}]: Failed to list all event listeners.`);
    }
    static async listByType(eventType) {
        return await EventManager.#errors.handleAsync(async () => {
            const listeners = Array.from(EventManager.#listeners.entries()).filter(([key]) => key.startsWith(`${eventType}_`));
            if (listeners.length === 0) {
                EventManager.#log.info(`No listeners found for event type "${eventType}".`, `${caller}.listByType`);
                return;
            }
            console.groupCollapsed(`🛠️ Event Listeners for: ${eventType}`);
            listeners.forEach(([_, { element, handler }]) => {
                EventManager.#log.info(`Listener for ${eventType}`, `${caller}.listByType`);
                console.log({ element, handler });
            });
            console.groupEnd();
        }, `[${caller}]: Failed to list event listeners for ${eventType}.`);
    }
    static async remove(element, eventType, handler) {
        return await EventManager.#errors.handleAsync(async () => {
            element.removeEventListener(eventType, handler);
            const listenerKey = `${eventType}_${handler}`;
            const wasRemoved = EventManager.#listeners.delete(listenerKey);
            if (wasRemoved) {
                EventManager.#log.info(`Removed listener for ${eventType}`, `${caller}.remove`);
            }
            else {
                EventManager.#log.info(`No matching listener found for ${eventType}`, `${caller}.remove`);
            }
        }, `[${caller}]: Failed to remove event listener for ${eventType}.`);
    }
    static async removeAll() {
        return await EventManager.#errors.handleAsync(async () => {
            if (EventManager.#listeners.size === 0) {
                EventManager.#log.info('No active listeners to remove.', `${caller}.removeAll`);
                return;
            }
            EventManager.#listeners.forEach(({ element, handler }, key) => {
                const [eventType] = key.split('_');
                element.removeEventListener(eventType, handler);
                EventManager.#log.debug(`Removed listener: ${eventType}`, `${caller}.removeAll`);
            });
            EventManager.#listeners.clear();
            EventManager.#log.info('All listeners have been removed.', `${caller}.removeAll`);
        }, `[${caller}]: Failed to remove all event listeners.`);
    }
}

export { EventManager };
//# sourceMappingURL=EventManager.js.map
