// File: src/io/index.ts
import { file, exportPalette, importPalette } from './base.js';
import { deserialize } from './deserialize.js';
import { parse } from './parse/index.js';
import { serialize } from './serialize.js';
export const io = {
    deserialize,
    exportPalette,
    file,
    importPalette,
    parse,
    serialize
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW8vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsd0JBQXdCO0FBR3hCLE9BQU8sRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUMvRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDL0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQTBCO0lBQ3hDLFdBQVc7SUFDWCxhQUFhO0lBQ2IsSUFBSTtJQUNKLGFBQWE7SUFDYixLQUFLO0lBQ0wsU0FBUztDQUNULENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBGaWxlOiBzcmMvaW8vaW5kZXgudHNcblxuaW1wb3J0IHsgSU9fRm5fTWFzdGVySW50ZXJmYWNlIH0gZnJvbSAnLi4vaW5kZXgvaW5kZXguanMnO1xuaW1wb3J0IHsgZmlsZSwgZXhwb3J0UGFsZXR0ZSwgaW1wb3J0UGFsZXR0ZSB9IGZyb20gJy4vYmFzZS5qcyc7XG5pbXBvcnQgeyBkZXNlcmlhbGl6ZSB9IGZyb20gJy4vZGVzZXJpYWxpemUuanMnO1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICcuL3BhcnNlL2luZGV4LmpzJztcbmltcG9ydCB7IHNlcmlhbGl6ZSB9IGZyb20gJy4vc2VyaWFsaXplLmpzJztcblxuZXhwb3J0IGNvbnN0IGlvOiBJT19Gbl9NYXN0ZXJJbnRlcmZhY2UgPSB7XG5cdGRlc2VyaWFsaXplLFxuXHRleHBvcnRQYWxldHRlLFxuXHRmaWxlLFxuXHRpbXBvcnRQYWxldHRlLFxuXHRwYXJzZSxcblx0c2VyaWFsaXplXG59O1xuIl19