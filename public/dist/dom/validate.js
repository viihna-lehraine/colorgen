// File: dom/validate.js
import { domData } from '../data/dom.js';
import { createLogger } from '../logger/index.js';
import { modeData as mode } from '../data/mode.js';
const logMode = mode.logging;
const thisModule = 'dom/validate.js';
const logger = await createLogger();
function validateStaticElements() {
    const thisFunction = 'validateElements()';
    const ids = domData.ids.static;
    const missingElements = [];
    // flattens the nested structure into a single array of IDs, then extracts their values
    const allIDs = Object.values(ids).flatMap(category => Object.values(category));
    allIDs.forEach((id) => {
        const element = document.getElementById(id);
        if (!element) {
            if (logMode.error)
                logger.error(`Element with ID "${id}" not found`, `${thisModule} > ${thisFunction}`);
            missingElements.push(id);
        }
    });
    if (missingElements.length) {
        if (logMode.warn)
            logger.warn(`Some DOM elements are missing (${missingElements.length}): ${missingElements.join(', ')}`, `${thisModule} > ${thisFunction}`);
    }
    else {
        if (logMode.info && mode.debug && logMode.verbosity > 1)
            logger.info('All required DOM elements are present.', `${thisModule} > ${thisFunction}`);
    }
}
export const validate = {
    staticElements: validateStaticElements
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZG9tL3ZhbGlkYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHdCQUF3QjtBQUd4QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxRQUFRLElBQUksSUFBSSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFbkQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUM3QixNQUFNLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQztBQUVyQyxNQUFNLE1BQU0sR0FBRyxNQUFNLFlBQVksRUFBRSxDQUFDO0FBRXBDLFNBQVMsc0JBQXNCO0lBQzlCLE1BQU0sWUFBWSxHQUFHLG9CQUFvQixDQUFDO0lBQzFDLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQy9CLE1BQU0sZUFBZSxHQUFhLEVBQUUsQ0FBQztJQUVyQyx1RkFBdUY7SUFDdkYsTUFBTSxNQUFNLEdBQWEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FDOUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FDdkIsQ0FBQztJQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFVLEVBQUUsRUFBRTtRQUM3QixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTVDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNkLElBQUksT0FBTyxDQUFDLEtBQUs7Z0JBQ2hCLE1BQU0sQ0FBQyxLQUFLLENBQ1gsb0JBQW9CLEVBQUUsYUFBYSxFQUNuQyxHQUFHLFVBQVUsTUFBTSxZQUFZLEVBQUUsQ0FDakMsQ0FBQztZQUVILGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUIsQ0FBQztJQUNGLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDNUIsSUFBSSxPQUFPLENBQUMsSUFBSTtZQUNmLE1BQU0sQ0FBQyxJQUFJLENBQ1Ysa0NBQWtDLGVBQWUsQ0FBQyxNQUFNLE1BQU0sZUFBZSxDQUFDLElBQUksQ0FDakYsSUFBSSxDQUNKLEVBQUUsRUFDSCxHQUFHLFVBQVUsTUFBTSxZQUFZLEVBQUUsQ0FDakMsQ0FBQztJQUNKLENBQUM7U0FBTSxDQUFDO1FBQ1AsSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDO1lBQ3RELE1BQU0sQ0FBQyxJQUFJLENBQ1Ysd0NBQXdDLEVBQ3hDLEdBQUcsVUFBVSxNQUFNLFlBQVksRUFBRSxDQUNqQyxDQUFDO0lBQ0osQ0FBQztBQUNGLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQXNDO0lBQzFELGNBQWMsRUFBRSxzQkFBc0I7Q0FDdEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEZpbGU6IGRvbS92YWxpZGF0ZS5qc1xuXG5pbXBvcnQgeyBET01Gbl9NYXN0ZXJJbnRlcmZhY2UgfSBmcm9tICcuLi90eXBlcy9pbmRleC5qcyc7XG5pbXBvcnQgeyBkb21EYXRhIH0gZnJvbSAnLi4vZGF0YS9kb20uanMnO1xuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSAnLi4vbG9nZ2VyL2luZGV4LmpzJztcbmltcG9ydCB7IG1vZGVEYXRhIGFzIG1vZGUgfSBmcm9tICcuLi9kYXRhL21vZGUuanMnO1xuXG5jb25zdCBsb2dNb2RlID0gbW9kZS5sb2dnaW5nO1xuY29uc3QgdGhpc01vZHVsZSA9ICdkb20vdmFsaWRhdGUuanMnO1xuXG5jb25zdCBsb2dnZXIgPSBhd2FpdCBjcmVhdGVMb2dnZXIoKTtcblxuZnVuY3Rpb24gdmFsaWRhdGVTdGF0aWNFbGVtZW50cygpOiB2b2lkIHtcblx0Y29uc3QgdGhpc0Z1bmN0aW9uID0gJ3ZhbGlkYXRlRWxlbWVudHMoKSc7XG5cdGNvbnN0IGlkcyA9IGRvbURhdGEuaWRzLnN0YXRpYztcblx0Y29uc3QgbWlzc2luZ0VsZW1lbnRzOiBzdHJpbmdbXSA9IFtdO1xuXG5cdC8vIGZsYXR0ZW5zIHRoZSBuZXN0ZWQgc3RydWN0dXJlIGludG8gYSBzaW5nbGUgYXJyYXkgb2YgSURzLCB0aGVuIGV4dHJhY3RzIHRoZWlyIHZhbHVlc1xuXHRjb25zdCBhbGxJRHM6IHN0cmluZ1tdID0gT2JqZWN0LnZhbHVlcyhpZHMpLmZsYXRNYXAoY2F0ZWdvcnkgPT5cblx0XHRPYmplY3QudmFsdWVzKGNhdGVnb3J5KVxuXHQpO1xuXG5cdGFsbElEcy5mb3JFYWNoKChpZDogc3RyaW5nKSA9PiB7XG5cdFx0Y29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblxuXHRcdGlmICghZWxlbWVudCkge1xuXHRcdFx0aWYgKGxvZ01vZGUuZXJyb3IpXG5cdFx0XHRcdGxvZ2dlci5lcnJvcihcblx0XHRcdFx0XHRgRWxlbWVudCB3aXRoIElEIFwiJHtpZH1cIiBub3QgZm91bmRgLFxuXHRcdFx0XHRcdGAke3RoaXNNb2R1bGV9ID4gJHt0aGlzRnVuY3Rpb259YFxuXHRcdFx0XHQpO1xuXG5cdFx0XHRtaXNzaW5nRWxlbWVudHMucHVzaChpZCk7XG5cdFx0fVxuXHR9KTtcblxuXHRpZiAobWlzc2luZ0VsZW1lbnRzLmxlbmd0aCkge1xuXHRcdGlmIChsb2dNb2RlLndhcm4pXG5cdFx0XHRsb2dnZXIud2Fybihcblx0XHRcdFx0YFNvbWUgRE9NIGVsZW1lbnRzIGFyZSBtaXNzaW5nICgke21pc3NpbmdFbGVtZW50cy5sZW5ndGh9KTogJHttaXNzaW5nRWxlbWVudHMuam9pbihcblx0XHRcdFx0XHQnLCAnXG5cdFx0XHRcdCl9YCxcblx0XHRcdFx0YCR7dGhpc01vZHVsZX0gPiAke3RoaXNGdW5jdGlvbn1gXG5cdFx0XHQpO1xuXHR9IGVsc2Uge1xuXHRcdGlmIChsb2dNb2RlLmluZm8gJiYgbW9kZS5kZWJ1ZyAmJiBsb2dNb2RlLnZlcmJvc2l0eSA+IDEpXG5cdFx0XHRsb2dnZXIuaW5mbyhcblx0XHRcdFx0J0FsbCByZXF1aXJlZCBET00gZWxlbWVudHMgYXJlIHByZXNlbnQuJyxcblx0XHRcdFx0YCR7dGhpc01vZHVsZX0gPiAke3RoaXNGdW5jdGlvbn1gXG5cdFx0XHQpO1xuXHR9XG59XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZTogRE9NRm5fTWFzdGVySW50ZXJmYWNlWyd2YWxpZGF0ZSddID0ge1xuXHRzdGF0aWNFbGVtZW50czogdmFsaWRhdGVTdGF0aWNFbGVtZW50c1xufTtcbiJdfQ==