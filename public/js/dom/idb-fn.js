import { openDB } from 'idb';
import { defaults } from '../config/defaults.js';
//
// ******** DB Initialization ********
const dbPromise = openDB('paletteDatabase', 1, {
    upgrade(db) {
        try {
            const stores = [
                'customColor',
                'mutations',
                'settings',
                'tables'
            ];
            stores.forEach(store => {
                if (!db.objectStoreNames.contains(store)) {
                    db.createObjectStore(store, {
                        keyPath: store === 'mutations' ? 'timestamp' : 'key'
                    });
                }
            });
        }
        catch (error) {
            console.error('Error during IndexedDB upgrade:', error);
            throw error;
        }
    }
});
//
// ******** Utility Functions ********
function createMutationLogger(obj, key) {
    return new Proxy(obj, {
        set(target, property, value) {
            const oldValue = target[property];
            const success = Reflect.set(target, property, value);
            if (success) {
                logMutation({
                    timestamp: new Date().toISOString(),
                    key,
                    action: 'update',
                    newValue: { [property]: value },
                    oldValue: { [property]: oldValue },
                    origin: 'Proxy'
                });
            }
            return success;
        }
    });
}
async function getDB() {
    return dbPromise;
}
async function getNextTableID() {
    const settings = await getSettings();
    const nextID = settings.lastTableID + 1;
    await saveData('settings', 'appSettings', {
        ...settings,
        lastTableID: nextID
    });
    return `palette_${nextID}`;
}
//
// ******** IndexedDB Operations ********
function getLoggedObject(obj, key) {
    if (obj) {
        return createMutationLogger(obj, key);
    }
    return null;
}
async function getTable(id) {
    const db = await getDB();
    const result = await db.get('tables', id);
    if (!result)
        console.warn(`Table with ID ${id} not found.`);
    return result;
}
async function saveData(storeName, key, data, oldValue) {
    try {
        const db = await getDB();
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        await store.put({ key, ...data });
        await tx.done;
        console.log(`${key} saved to ${storeName}.`);
        await logMutation({
            timestamp: new Date().toISOString(),
            key,
            action: 'update',
            newValue: data,
            oldValue: oldValue ? oldValue : null,
            origin: 'saveData'
        });
    }
    catch (error) {
        console.error(`Failed to save data to ${storeName}:`, error);
        throw error;
    }
}
async function getStore(storeName, mode) {
    const db = await getDB();
    return db.transaction(storeName, mode).objectStore(storeName);
}
async function renderPalette(tableId) {
    try {
        const storedPalette = await getTable(tableId);
        const paletteRow = document.getElementById('palette-row');
        if (!storedPalette)
            throw new Error(`Palette ${tableId} not found.`);
        if (!paletteRow)
            throw new Error('Palette row element not found.');
        paletteRow.innerHTML = '';
        const fragment = document.createDocumentFragment();
        const table = document.createElement('table');
        table.classList.add('palette-table');
        storedPalette.palette.items.forEach((item, index) => {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            const colorBox = document.createElement('div');
            cell.textContent = `Color ${index + 1}`;
            colorBox.classList.add('color-box');
            colorBox.style.backgroundColor = item.cssStrings.hexCSSString;
            row.appendChild(colorBox);
            row.appendChild(cell);
            table.appendChild(row);
        });
        fragment.appendChild(table);
        paletteRow.appendChild(fragment);
        console.log(`Rendered palette ${tableId}.`);
    }
    catch (error) {
        console.error(`Failed to render palette: ${error}`);
    }
}
async function savePalette(id, newPalette) {
    try {
        const store = await getStore('tables', 'readwrite');
        const paletteToSave = {
            tableID: newPalette.tableID,
            palette: newPalette.palette
        };
        await store.put({ key: id, ...paletteToSave });
        console.log(`Palette ${id} saved successfully.`);
    }
    catch (error) {
        console.error(`Failed to save palette ${id}: ${error}`);
        throw error;
    }
}
async function updateEntryInPalette(tableID, entryIndex, newEntry) {
    try {
        const storedPalette = await getTable(tableID);
        if (!storedPalette)
            throw new Error(`Palette ${tableID} not found.`);
        const { items } = storedPalette.palette;
        if (entryIndex >= items.length)
            throw new Error(`Entry ${entryIndex} not found in palette ${tableID}.`);
        const oldEntry = items[entryIndex];
        items[entryIndex] = newEntry;
        await saveData('tables', tableID, storedPalette);
        await logMutation({
            timestamp: new Date().toISOString(),
            key: `${tableID}-${entryIndex}]`,
            action: 'update',
            newValue: newEntry,
            oldValue: oldEntry,
            origin: 'updateEntryInPalette'
        });
        console.log(`Entry ${entryIndex} in palette ${tableID} updated.`);
    }
    catch (error) {
        console.error(`Failed to update entry in palette: ${error}`);
        throw error;
    }
}
//
// ******** Settings and Custom Color Operations ********
async function getCustomColor() {
    const db = await getDB();
    const entry = await db.get('customColor', 'customColor');
    return entry?.color
        ? createMutationLogger(entry.color, 'customColor')
        : null;
}
async function getSettings() {
    try {
        const db = await idbFn.getDB();
        const settings = await db.get('settings', 'appSettings');
        return settings ?? defaults.defaultSettings;
    }
    catch (error) {
        console.error('Error fetching settings:', error);
        return { colorSpace: 'hex', lastTableID: 0 };
    }
}
async function saveSettings(newSettings) {
    try {
        await saveData('settings', 'appSettings', newSettings);
        console.log('Settings updated');
    }
    catch (error) {
        console.error(`Failed to save settings: ${error}`);
        throw error;
    }
}
// ******** Logging and Transactions ********
async function logMutation(log) {
    const db = await getDB();
    await db.put('mutations', log);
    console.log(`Logged mutation: ${JSON.stringify(log)}`);
}
async function trackedTransaction(storeName, mode, callback) {
    try {
        const store = mode === 'readonly'
            ? await getStore(storeName, 'readonly')
            : await getStore(storeName, 'readwrite');
        await callback(store);
        console.log(`Transaction on ${storeName} completed.`);
    }
    catch (error) {
        console.error(`Transaction on ${storeName} failed: ${error}`);
        throw error;
    }
}
// ******** Bundled Export ********
export const idbFn = {
    createMutationLogger,
    deleteTable: async (id) => {
        const db = await getDB();
        await db.delete('tables', id);
        console.log(`Table ${id} deleted.`);
    },
    getCustomColor,
    getDB,
    getLoggedObject,
    getNextTableID,
    getSettings,
    getStore,
    getTable,
    listTables: async () => {
        const db = await getDB();
        const keys = await db.getAllKeys('tables');
        return keys.map(String);
    },
    logMutation,
    renderPalette,
    saveData,
    savePalette,
    saveSettings,
    trackedTransaction,
    updateEntryInPalette
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRiLWZuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RvbS9pZGItZm4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFtQixNQUFNLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDOUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBTTlDLEVBQUU7QUFDRixzQ0FBc0M7QUFFdEMsTUFBTSxTQUFTLEdBQTJCLE1BQU0sQ0FDL0MsaUJBQWlCLEVBQ2pCLENBQUMsRUFDRDtJQUNDLE9BQU8sQ0FBQyxFQUFFO1FBQ1QsSUFBSSxDQUFDO1lBQ0osTUFBTSxNQUFNLEdBQUc7Z0JBQ2QsYUFBYTtnQkFDYixXQUFXO2dCQUNYLFVBQVU7Z0JBQ1YsUUFBUTthQUNSLENBQUM7WUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN0QixJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO29CQUMxQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFO3dCQUMzQixPQUFPLEVBQUUsS0FBSyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLO3FCQUNwRCxDQUFDLENBQUM7Z0JBQ0osQ0FBQztZQUNGLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN4RCxNQUFNLEtBQUssQ0FBQztRQUNiLENBQUM7SUFDRixDQUFDO0NBQ0QsQ0FDRCxDQUFDO0FBRUYsRUFBRTtBQUNGLHNDQUFzQztBQUV0QyxTQUFTLG9CQUFvQixDQUFtQixHQUFNLEVBQUUsR0FBVztJQUNsRSxPQUFPLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRTtRQUNyQixH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SyxDQUFDLGtCQUFrQixTQUFTLFlBQVksS0FBSyxFQUFFLENBQUMsQ0FBQztRQUU5RCxNQUFNLEtBQUssQ0FBQztJQUNiLENBQUM7QUFDRixDQUFDO0FBRUQsbUNBQW1DO0FBRW5DLE1BQU0sQ0FBQyxNQUFNLEtBQUssR0FBb0I7SUFDckMsb0JBQW9CO0lBQ3BCLFdBQVcsRUFBRSxLQUFLLEVBQUUsRUFBVSxFQUFFLEVBQUU7UUFDakMsTUFBTSxFQUFFLEdBQUcsTUFBTSxLQUFLLEVBQUUsQ0FBQztRQUN6QixNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFDRCxjQUFjO0lBQ2QsS0FBSztJQUNMLGVBQWU7SUFDZixjQUFjO0lBQ2QsV0FBVztJQUNYLFFBQVE7SUFDUixRQUFRO0lBQ1IsVUFBVSxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ3RCLE1BQU0sRUFBRSxHQUFHLE1BQU0sS0FBSyxFQUFFLENBQUM7UUFDekIsTUFBTSxJQUFJLEdBQUcsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQ0QsV0FBVztJQUNYLGFBQWE7SUFDYixRQUFRO0lBQ1IsV0FBVztJQUNYLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsb0JBQW9CO0NBQ3BCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJREJQT2JqZWN0U3RvcmUsIG9wZW5EQiB9IGZyb20gJ2lkYic7XG5pbXBvcnQgeyBkZWZhdWx0cyB9IGZyb20gJy4uL2NvbmZpZy9kZWZhdWx0cyc7XG5pbXBvcnQgKiBhcyBjb2xvcnMgZnJvbSAnLi4vaW5kZXgvY29sb3JzJztcbmltcG9ydCAqIGFzIGZuT2JqZWN0cyBmcm9tICcuLi9pbmRleC9mbi1vYmplY3RzJztcbmltcG9ydCAqIGFzIGlkYiBmcm9tICcuLi9pbmRleC9pZGInO1xuaW1wb3J0ICogYXMgcGFsZXR0ZSBmcm9tICcuLi9pbmRleC9wYWxldHRlJztcblxuLy9cbi8vICoqKioqKioqIERCIEluaXRpYWxpemF0aW9uICoqKioqKioqXG5cbmNvbnN0IGRiUHJvbWlzZTogUHJvbWlzZTxpZGIuUGFsZXR0ZURCPiA9IG9wZW5EQjxpZGIuUGFsZXR0ZVNjaGVtYT4oXG5cdCdwYWxldHRlRGF0YWJhc2UnLFxuXHQxLFxuXHR7XG5cdFx0dXBncmFkZShkYikge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3Qgc3RvcmVzID0gW1xuXHRcdFx0XHRcdCdjdXN0b21Db2xvcicsXG5cdFx0XHRcdFx0J211dGF0aW9ucycsXG5cdFx0XHRcdFx0J3NldHRpbmdzJyxcblx0XHRcdFx0XHQndGFibGVzJ1xuXHRcdFx0XHRdO1xuXG5cdFx0XHRcdHN0b3Jlcy5mb3JFYWNoKHN0b3JlID0+IHtcblx0XHRcdFx0XHRpZiAoIWRiLm9iamVjdFN0b3JlTmFtZXMuY29udGFpbnMoc3RvcmUpKSB7XG5cdFx0XHRcdFx0XHRkYi5jcmVhdGVPYmplY3RTdG9yZShzdG9yZSwge1xuXHRcdFx0XHRcdFx0XHRrZXlQYXRoOiBzdG9yZSA9PT0gJ211dGF0aW9ucycgPyAndGltZXN0YW1wJyA6ICdrZXknXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcignRXJyb3IgZHVyaW5nIEluZGV4ZWREQiB1cGdyYWRlOicsIGVycm9yKTtcblx0XHRcdFx0dGhyb3cgZXJyb3I7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG4pO1xuXG4vL1xuLy8gKioqKioqKiogVXRpbGl0eSBGdW5jdGlvbnMgKioqKioqKipcblxuZnVuY3Rpb24gY3JlYXRlTXV0YXRpb25Mb2dnZXI8VCBleHRlbmRzIG9iamVjdD4ob2JqOiBULCBrZXk6IHN0cmluZyk6IFQge1xuXHRyZXR1cm4gbmV3IFByb3h5KG9iaiwge1xuXHRcdHNldCh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSkge1xuXHRcdFx0Y29uc3Qgb2xkVmFsdWUgPSB0YXJnZXRbcHJvcGVydHkgYXMga2V5b2YgVF07XG5cdFx0XHRjb25zdCBzdWNjZXNzID0gUmVmbGVjdC5zZXQodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUpO1xuXG5cdFx0XHRpZiAoc3VjY2Vzcykge1xuXHRcdFx0XHRsb2dNdXRhdGlvbih7XG5cdFx0XHRcdFx0dGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG5cdFx0XHRcdFx0a2V5LFxuXHRcdFx0XHRcdGFjdGlvbjogJ3VwZGF0ZScsXG5cdFx0XHRcdFx0bmV3VmFsdWU6IHsgW3Byb3BlcnR5XTogdmFsdWUgfSxcblx0XHRcdFx0XHRvbGRWYWx1ZTogeyBbcHJvcGVydHldOiBvbGRWYWx1ZSB9LFxuXHRcdFx0XHRcdG9yaWdpbjogJ1Byb3h5J1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHN1Y2Nlc3M7XG5cdFx0fVxuXHR9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0REIoKTogUHJvbWlzZTxpZGIuUGFsZXR0ZURCPiB7XG5cdHJldHVybiBkYlByb21pc2U7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldE5leHRUYWJsZUlEKCk6IFByb21pc2U8c3RyaW5nPiB7XG5cdGNvbnN0IHNldHRpbmdzID0gYXdhaXQgZ2V0U2V0dGluZ3MoKTtcblx0Y29uc3QgbmV4dElEID0gc2V0dGluZ3MubGFzdFRhYmxlSUQgKyAxO1xuXG5cdGF3YWl0IHNhdmVEYXRhKCdzZXR0aW5ncycsICdhcHBTZXR0aW5ncycsIHtcblx0XHQuLi5zZXR0aW5ncyxcblx0XHRsYXN0VGFibGVJRDogbmV4dElEXG5cdH0pO1xuXG5cdHJldHVybiBgcGFsZXR0ZV8ke25leHRJRH1gO1xufVxuXG4vL1xuLy8gKioqKioqKiogSW5kZXhlZERCIE9wZXJhdGlvbnMgKioqKioqKipcblxuZnVuY3Rpb24gZ2V0TG9nZ2VkT2JqZWN0PFQgZXh0ZW5kcyBvYmplY3Q+KFxuXHRvYmo6IFQgfCBudWxsLFxuXHRrZXk6IHN0cmluZ1xuKTogVCB8IG51bGwge1xuXHRpZiAob2JqKSB7XG5cdFx0cmV0dXJuIGNyZWF0ZU11dGF0aW9uTG9nZ2VyKG9iaiwga2V5KTtcblx0fVxuXG5cdHJldHVybiBudWxsO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRUYWJsZShpZDogc3RyaW5nKTogUHJvbWlzZTxpZGIuU3RvcmVkUGFsZXR0ZSB8IG51bGw+IHtcblx0Y29uc3QgZGIgPSBhd2FpdCBnZXREQigpO1xuXHRjb25zdCByZXN1bHQgPSBhd2FpdCBkYi5nZXQoJ3RhYmxlcycsIGlkKTtcblxuXHRpZiAoIXJlc3VsdCkgY29uc29sZS53YXJuKGBUYWJsZSB3aXRoIElEICR7aWR9IG5vdCBmb3VuZC5gKTtcblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2F2ZURhdGE8VD4oXG5cdHN0b3JlTmFtZToga2V5b2YgaWRiLlBhbGV0dGVTY2hlbWEsXG5cdGtleTogc3RyaW5nLFxuXHRkYXRhOiBULFxuXHRvbGRWYWx1ZT86IFRcbik6IFByb21pc2U8dm9pZD4ge1xuXHR0cnkge1xuXHRcdGNvbnN0IGRiID0gYXdhaXQgZ2V0REIoKTtcblx0XHRjb25zdCB0eCA9IGRiLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWR3cml0ZScpO1xuXHRcdGNvbnN0IHN0b3JlID0gdHgub2JqZWN0U3RvcmUoc3RvcmVOYW1lKTtcblxuXHRcdGF3YWl0IHN0b3JlLnB1dCh7IGtleSwgLi4uZGF0YSB9KTtcblx0XHRhd2FpdCB0eC5kb25lO1xuXG5cdFx0Y29uc29sZS5sb2coYCR7a2V5fSBzYXZlZCB0byAke3N0b3JlTmFtZX0uYCk7XG5cblx0XHRhd2FpdCBsb2dNdXRhdGlvbih7XG5cdFx0XHR0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcblx0XHRcdGtleSxcblx0XHRcdGFjdGlvbjogJ3VwZGF0ZScsXG5cdFx0XHRuZXdWYWx1ZTogZGF0YSxcblx0XHRcdG9sZFZhbHVlOiBvbGRWYWx1ZSA/IG9sZFZhbHVlIDogbnVsbCxcblx0XHRcdG9yaWdpbjogJ3NhdmVEYXRhJ1xuXHRcdH0pO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGNvbnNvbGUuZXJyb3IoYEZhaWxlZCB0byBzYXZlIGRhdGEgdG8gJHtzdG9yZU5hbWV9OmAsIGVycm9yKTtcblx0XHR0aHJvdyBlcnJvcjtcblx0fVxufVxuXG4vL1xuLy8gKioqKioqKiogQ1JVRCBGdW5jdGlvbnMgZm9yIEVudHJpZXMgKioqKioqKipcblxuYXN5bmMgZnVuY3Rpb24gZ2V0U3RvcmU8U3RvcmVOYW1lIGV4dGVuZHMga2V5b2YgaWRiLlBhbGV0dGVTY2hlbWE+KFxuXHRzdG9yZU5hbWU6IFN0b3JlTmFtZSxcblx0bW9kZTogJ3JlYWRvbmx5J1xuKTogUHJvbWlzZTxcblx0SURCUE9iamVjdFN0b3JlPGlkYi5QYWxldHRlU2NoZW1hLCBbU3RvcmVOYW1lXSwgU3RvcmVOYW1lLCAncmVhZG9ubHknPlxuPjtcblxuYXN5bmMgZnVuY3Rpb24gZ2V0U3RvcmU8U3RvcmVOYW1lIGV4dGVuZHMga2V5b2YgaWRiLlBhbGV0dGVTY2hlbWE+KFxuXHRzdG9yZU5hbWU6IFN0b3JlTmFtZSxcblx0bW9kZTogJ3JlYWR3cml0ZSdcbik6IFByb21pc2U8XG5cdElEQlBPYmplY3RTdG9yZTxpZGIuUGFsZXR0ZVNjaGVtYSwgW1N0b3JlTmFtZV0sIFN0b3JlTmFtZSwgJ3JlYWR3cml0ZSc+XG4+O1xuXG5hc3luYyBmdW5jdGlvbiBnZXRTdG9yZTxTdG9yZU5hbWUgZXh0ZW5kcyBrZXlvZiBpZGIuUGFsZXR0ZVNjaGVtYT4oXG5cdHN0b3JlTmFtZTogU3RvcmVOYW1lLFxuXHRtb2RlOiAncmVhZG9ubHknIHwgJ3JlYWR3cml0ZSdcbikge1xuXHRjb25zdCBkYiA9IGF3YWl0IGdldERCKCk7XG5cdHJldHVybiBkYi50cmFuc2FjdGlvbihzdG9yZU5hbWUsIG1vZGUpLm9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlbmRlclBhbGV0dGUodGFibGVJZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG5cdHRyeSB7XG5cdFx0Y29uc3Qgc3RvcmVkUGFsZXR0ZSA9IGF3YWl0IGdldFRhYmxlKHRhYmxlSWQpO1xuXHRcdGNvbnN0IHBhbGV0dGVSb3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFsZXR0ZS1yb3cnKTtcblxuXHRcdGlmICghc3RvcmVkUGFsZXR0ZSkgdGhyb3cgbmV3IEVycm9yKGBQYWxldHRlICR7dGFibGVJZH0gbm90IGZvdW5kLmApO1xuXHRcdGlmICghcGFsZXR0ZVJvdykgdGhyb3cgbmV3IEVycm9yKCdQYWxldHRlIHJvdyBlbGVtZW50IG5vdCBmb3VuZC4nKTtcblxuXHRcdHBhbGV0dGVSb3cuaW5uZXJIVE1MID0gJyc7XG5cblx0XHRjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblx0XHRjb25zdCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyk7XG5cdFx0dGFibGUuY2xhc3NMaXN0LmFkZCgncGFsZXR0ZS10YWJsZScpO1xuXG5cdFx0c3RvcmVkUGFsZXR0ZS5wYWxldHRlLml0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG5cdFx0XHRjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuXHRcdFx0Y29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG5cdFx0XHRjb25zdCBjb2xvckJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0XHRjZWxsLnRleHRDb250ZW50ID0gYENvbG9yICR7aW5kZXggKyAxfWA7XG5cdFx0XHRjb2xvckJveC5jbGFzc0xpc3QuYWRkKCdjb2xvci1ib3gnKTtcblx0XHRcdGNvbG9yQm94LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGl0ZW0uY3NzU3RyaW5ncy5oZXhDU1NTdHJpbmc7XG5cblx0XHRcdHJvdy5hcHBlbmRDaGlsZChjb2xvckJveCk7XG5cdFx0XHRyb3cuYXBwZW5kQ2hpbGQoY2VsbCk7XG5cdFx0XHR0YWJsZS5hcHBlbmRDaGlsZChyb3cpO1xuXHRcdH0pO1xuXG5cdFx0ZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGFibGUpO1xuXHRcdHBhbGV0dGVSb3cuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xuXG5cdFx0Y29uc29sZS5sb2coYFJlbmRlcmVkIHBhbGV0dGUgJHt0YWJsZUlkfS5gKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gcmVuZGVyIHBhbGV0dGU6ICR7ZXJyb3J9YCk7XG5cdH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gc2F2ZVBhbGV0dGUoXG5cdGlkOiBzdHJpbmcsXG5cdG5ld1BhbGV0dGU6IGlkYi5TdG9yZWRQYWxldHRlXG4pOiBQcm9taXNlPHZvaWQ+IHtcblx0dHJ5IHtcblx0XHRjb25zdCBzdG9yZSA9IGF3YWl0IGdldFN0b3JlKCd0YWJsZXMnLCAncmVhZHdyaXRlJyk7XG5cdFx0Y29uc3QgcGFsZXR0ZVRvU2F2ZTogaWRiLlN0b3JlZFBhbGV0dGUgPSB7XG5cdFx0XHR0YWJsZUlEOiBuZXdQYWxldHRlLnRhYmxlSUQsXG5cdFx0XHRwYWxldHRlOiBuZXdQYWxldHRlLnBhbGV0dGVcblx0XHR9O1xuXG5cdFx0YXdhaXQgc3RvcmUucHV0KHsga2V5OiBpZCwgLi4ucGFsZXR0ZVRvU2F2ZSB9KTtcblxuXHRcdGNvbnNvbGUubG9nKGBQYWxldHRlICR7aWR9IHNhdmVkIHN1Y2Nlc3NmdWxseS5gKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gc2F2ZSBwYWxldHRlICR7aWR9OiAke2Vycm9yfWApO1xuXHRcdHRocm93IGVycm9yO1xuXHR9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUVudHJ5SW5QYWxldHRlKFxuXHR0YWJsZUlEOiBzdHJpbmcsXG5cdGVudHJ5SW5kZXg6IG51bWJlcixcblx0bmV3RW50cnk6IHBhbGV0dGUuUGFsZXR0ZUl0ZW1cbik6IFByb21pc2U8dm9pZD4ge1xuXHR0cnkge1xuXHRcdGNvbnN0IHN0b3JlZFBhbGV0dGUgPSBhd2FpdCBnZXRUYWJsZSh0YWJsZUlEKTtcblxuXHRcdGlmICghc3RvcmVkUGFsZXR0ZSkgdGhyb3cgbmV3IEVycm9yKGBQYWxldHRlICR7dGFibGVJRH0gbm90IGZvdW5kLmApO1xuXG5cdFx0Y29uc3QgeyBpdGVtcyB9ID0gc3RvcmVkUGFsZXR0ZS5wYWxldHRlO1xuXG5cdFx0aWYgKGVudHJ5SW5kZXggPj0gaXRlbXMubGVuZ3RoKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRgRW50cnkgJHtlbnRyeUluZGV4fSBub3QgZm91bmQgaW4gcGFsZXR0ZSAke3RhYmxlSUR9LmBcblx0XHRcdCk7XG5cblx0XHRjb25zdCBvbGRFbnRyeSA9IGl0ZW1zW2VudHJ5SW5kZXhdO1xuXHRcdGl0ZW1zW2VudHJ5SW5kZXhdID0gbmV3RW50cnk7XG5cblx0XHRhd2FpdCBzYXZlRGF0YSgndGFibGVzJywgdGFibGVJRCwgc3RvcmVkUGFsZXR0ZSk7XG5cdFx0YXdhaXQgbG9nTXV0YXRpb24oe1xuXHRcdFx0dGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG5cdFx0XHRrZXk6IGAke3RhYmxlSUR9LSR7ZW50cnlJbmRleH1dYCxcblx0XHRcdGFjdGlvbjogJ3VwZGF0ZScsXG5cdFx0XHRuZXdWYWx1ZTogbmV3RW50cnksXG5cdFx0XHRvbGRWYWx1ZTogb2xkRW50cnksXG5cdFx0XHRvcmlnaW46ICd1cGRhdGVFbnRyeUluUGFsZXR0ZSdcblx0XHR9KTtcblxuXHRcdGNvbnNvbGUubG9nKGBFbnRyeSAke2VudHJ5SW5kZXh9IGluIHBhbGV0dGUgJHt0YWJsZUlEfSB1cGRhdGVkLmApO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGNvbnNvbGUuZXJyb3IoYEZhaWxlZCB0byB1cGRhdGUgZW50cnkgaW4gcGFsZXR0ZTogJHtlcnJvcn1gKTtcblx0XHR0aHJvdyBlcnJvcjtcblx0fVxufVxuXG4vL1xuLy8gKioqKioqKiogU2V0dGluZ3MgYW5kIEN1c3RvbSBDb2xvciBPcGVyYXRpb25zICoqKioqKioqXG5cbmFzeW5jIGZ1bmN0aW9uIGdldEN1c3RvbUNvbG9yKCk6IFByb21pc2U8Y29sb3JzLkNvbG9yIHwgbnVsbD4ge1xuXHRjb25zdCBkYiA9IGF3YWl0IGdldERCKCk7XG5cdGNvbnN0IGVudHJ5ID0gYXdhaXQgZGIuZ2V0KCdjdXN0b21Db2xvcicsICdjdXN0b21Db2xvcicpO1xuXG5cdHJldHVybiBlbnRyeT8uY29sb3Jcblx0XHQ/IGNyZWF0ZU11dGF0aW9uTG9nZ2VyKGVudHJ5LmNvbG9yLCAnY3VzdG9tQ29sb3InKVxuXHRcdDogbnVsbDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0U2V0dGluZ3MoKTogUHJvbWlzZTxpZGIuU2V0dGluZ3M+IHtcblx0dHJ5IHtcblx0XHRjb25zdCBkYiA9IGF3YWl0IGlkYkZuLmdldERCKCk7XG5cdFx0Y29uc3Qgc2V0dGluZ3MgPSBhd2FpdCBkYi5nZXQoJ3NldHRpbmdzJywgJ2FwcFNldHRpbmdzJyk7XG5cblx0XHRyZXR1cm4gc2V0dGluZ3MgPz8gZGVmYXVsdHMuZGVmYXVsdFNldHRpbmdzO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHNldHRpbmdzOicsIGVycm9yKTtcblxuXHRcdHJldHVybiB7IGNvbG9yU3BhY2U6ICdoZXgnLCBsYXN0VGFibGVJRDogMCB9O1xuXHR9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNhdmVTZXR0aW5ncyhuZXdTZXR0aW5nczogaWRiLlNldHRpbmdzKTogUHJvbWlzZTx2b2lkPiB7XG5cdHRyeSB7XG5cdFx0YXdhaXQgc2F2ZURhdGEoJ3NldHRpbmdzJywgJ2FwcFNldHRpbmdzJywgbmV3U2V0dGluZ3MpO1xuXG5cdFx0Y29uc29sZS5sb2coJ1NldHRpbmdzIHVwZGF0ZWQnKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gc2F2ZSBzZXR0aW5nczogJHtlcnJvcn1gKTtcblxuXHRcdHRocm93IGVycm9yO1xuXHR9XG59XG5cbi8vICoqKioqKioqIExvZ2dpbmcgYW5kIFRyYW5zYWN0aW9ucyAqKioqKioqKlxuXG5hc3luYyBmdW5jdGlvbiBsb2dNdXRhdGlvbihsb2c6IGlkYi5NdXRhdGlvbkxvZyk6IFByb21pc2U8dm9pZD4ge1xuXHRjb25zdCBkYiA9IGF3YWl0IGdldERCKCk7XG5cblx0YXdhaXQgZGIucHV0KCdtdXRhdGlvbnMnLCBsb2cpO1xuXG5cdGNvbnNvbGUubG9nKGBMb2dnZWQgbXV0YXRpb246ICR7SlNPTi5zdHJpbmdpZnkobG9nKX1gKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdHJhY2tlZFRyYW5zYWN0aW9uPFN0b3JlTmFtZSBleHRlbmRzIGtleW9mIGlkYi5QYWxldHRlU2NoZW1hPihcblx0c3RvcmVOYW1lOiBTdG9yZU5hbWUsXG5cdG1vZGU6ICdyZWFkb25seScgfCAncmVhZHdyaXRlJyxcblx0Y2FsbGJhY2s6IChcblx0XHRzdG9yZTogSURCUE9iamVjdFN0b3JlPFxuXHRcdFx0aWRiLlBhbGV0dGVTY2hlbWEsXG5cdFx0XHRbU3RvcmVOYW1lXSxcblx0XHRcdFN0b3JlTmFtZSxcblx0XHRcdCdyZWFkb25seScgfCAncmVhZHdyaXRlJ1xuXHRcdD5cblx0KSA9PiBQcm9taXNlPHZvaWQ+XG4pOiBQcm9taXNlPHZvaWQ+IHtcblx0dHJ5IHtcblx0XHRjb25zdCBzdG9yZSA9XG5cdFx0XHRtb2RlID09PSAncmVhZG9ubHknXG5cdFx0XHRcdD8gYXdhaXQgZ2V0U3RvcmUoc3RvcmVOYW1lLCAncmVhZG9ubHknKVxuXHRcdFx0XHQ6IGF3YWl0IGdldFN0b3JlKHN0b3JlTmFtZSwgJ3JlYWR3cml0ZScpO1xuXG5cdFx0YXdhaXQgY2FsbGJhY2soc3RvcmUpO1xuXG5cdFx0Y29uc29sZS5sb2coYFRyYW5zYWN0aW9uIG9uICR7c3RvcmVOYW1lfSBjb21wbGV0ZWQuYCk7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Y29uc29sZS5lcnJvcihgVHJhbnNhY3Rpb24gb24gJHtzdG9yZU5hbWV9IGZhaWxlZDogJHtlcnJvcn1gKTtcblxuXHRcdHRocm93IGVycm9yO1xuXHR9XG59XG5cbi8vICoqKioqKioqIEJ1bmRsZWQgRXhwb3J0ICoqKioqKioqXG5cbmV4cG9ydCBjb25zdCBpZGJGbjogZm5PYmplY3RzLklEQkZuID0ge1xuXHRjcmVhdGVNdXRhdGlvbkxvZ2dlcixcblx0ZGVsZXRlVGFibGU6IGFzeW5jIChpZDogc3RyaW5nKSA9PiB7XG5cdFx0Y29uc3QgZGIgPSBhd2FpdCBnZXREQigpO1xuXHRcdGF3YWl0IGRiLmRlbGV0ZSgndGFibGVzJywgaWQpO1xuXHRcdGNvbnNvbGUubG9nKGBUYWJsZSAke2lkfSBkZWxldGVkLmApO1xuXHR9LFxuXHRnZXRDdXN0b21Db2xvcixcblx0Z2V0REIsXG5cdGdldExvZ2dlZE9iamVjdCxcblx0Z2V0TmV4dFRhYmxlSUQsXG5cdGdldFNldHRpbmdzLFxuXHRnZXRTdG9yZSxcblx0Z2V0VGFibGUsXG5cdGxpc3RUYWJsZXM6IGFzeW5jICgpID0+IHtcblx0XHRjb25zdCBkYiA9IGF3YWl0IGdldERCKCk7XG5cdFx0Y29uc3Qga2V5cyA9IGF3YWl0IGRiLmdldEFsbEtleXMoJ3RhYmxlcycpO1xuXHRcdHJldHVybiBrZXlzLm1hcChTdHJpbmcpO1xuXHR9LFxuXHRsb2dNdXRhdGlvbixcblx0cmVuZGVyUGFsZXR0ZSxcblx0c2F2ZURhdGEsXG5cdHNhdmVQYWxldHRlLFxuXHRzYXZlU2V0dGluZ3MsXG5cdHRyYWNrZWRUcmFuc2FjdGlvbixcblx0dXBkYXRlRW50cnlJblBhbGV0dGVcbn07XG4iXX0=