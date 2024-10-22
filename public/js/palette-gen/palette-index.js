import { genAnalogousHues, genAnalogousPalette } from './analogous.js';
import { genComplementaryPalette } from './complementary.js';
import { genDiadicHues, genDiadicPalette } from './diadic.js';
import { genHexadicHues, genHexadicPalette } from './hexadic.js';
import { genMonochromaticPalette } from './monochromatic.js';
import { genRandomPalette } from './random.js';
import { genSplitComplementaryHues, genSplitComplementaryPalette } from './split-complementary.js';
import { genTetradicHues, genTetradicPalette } from './tetradic.js';
import { genTriadicHues, genTriadicPalette } from './triadic.js';
export const palette = {
    genAnalogousHues,
    genAnalogousPalette,
    genComplementaryPalette,
    genDiadicHues,
    genDiadicPalette,
    genHexadicHues,
    genHexadicPalette,
    genMonochromaticPalette,
    genRandomPalette,
    genSplitComplementaryHues,
    genSplitComplementaryPalette,
    genTetradicHues,
    genTetradicPalette,
    genTriadicHues,
    genTriadicPalette
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFsZXR0ZS1pbmRleC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYWxldHRlLWdlbi9wYWxldHRlLWluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzNELE9BQU8sRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDOUQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzVDLE9BQU8sRUFDTix5QkFBeUIsRUFDekIsNEJBQTRCLEVBQzVCLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUNqRSxPQUFPLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRTlELE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRztJQUN0QixnQkFBZ0I7SUFDaEIsbUJBQW1CO0lBQ25CLHVCQUF1QjtJQUN2QixhQUFhO0lBQ2IsZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCxpQkFBaUI7SUFDakIsdUJBQXVCO0lBQ3ZCLGdCQUFnQjtJQUNoQix5QkFBeUI7SUFDekIsNEJBQTRCO0lBQzVCLGVBQWU7SUFDZixrQkFBa0I7SUFDbEIsY0FBYztJQUNkLGlCQUFpQjtDQUNqQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2VuQW5hbG9nb3VzSHVlcywgZ2VuQW5hbG9nb3VzUGFsZXR0ZSB9IGZyb20gJy4vYW5hbG9nb3VzJztcbmltcG9ydCB7IGdlbkNvbXBsZW1lbnRhcnlQYWxldHRlIH0gZnJvbSAnLi9jb21wbGVtZW50YXJ5JztcbmltcG9ydCB7IGdlbkRpYWRpY0h1ZXMsIGdlbkRpYWRpY1BhbGV0dGUgfSBmcm9tICcuL2RpYWRpYyc7XG5pbXBvcnQgeyBnZW5IZXhhZGljSHVlcywgZ2VuSGV4YWRpY1BhbGV0dGUgfSBmcm9tICcuL2hleGFkaWMnO1xuaW1wb3J0IHsgZ2VuTW9ub2Nocm9tYXRpY1BhbGV0dGUgfSBmcm9tICcuL21vbm9jaHJvbWF0aWMnO1xuaW1wb3J0IHsgZ2VuUmFuZG9tUGFsZXR0ZSB9IGZyb20gJy4vcmFuZG9tJztcbmltcG9ydCB7XG5cdGdlblNwbGl0Q29tcGxlbWVudGFyeUh1ZXMsXG5cdGdlblNwbGl0Q29tcGxlbWVudGFyeVBhbGV0dGVcbn0gZnJvbSAnLi9zcGxpdC1jb21wbGVtZW50YXJ5JztcbmltcG9ydCB7IGdlblRldHJhZGljSHVlcywgZ2VuVGV0cmFkaWNQYWxldHRlIH0gZnJvbSAnLi90ZXRyYWRpYyc7XG5pbXBvcnQgeyBnZW5UcmlhZGljSHVlcywgZ2VuVHJpYWRpY1BhbGV0dGUgfSBmcm9tICcuL3RyaWFkaWMnO1xuXG5leHBvcnQgY29uc3QgcGFsZXR0ZSA9IHtcblx0Z2VuQW5hbG9nb3VzSHVlcyxcblx0Z2VuQW5hbG9nb3VzUGFsZXR0ZSxcblx0Z2VuQ29tcGxlbWVudGFyeVBhbGV0dGUsXG5cdGdlbkRpYWRpY0h1ZXMsXG5cdGdlbkRpYWRpY1BhbGV0dGUsXG5cdGdlbkhleGFkaWNIdWVzLFxuXHRnZW5IZXhhZGljUGFsZXR0ZSxcblx0Z2VuTW9ub2Nocm9tYXRpY1BhbGV0dGUsXG5cdGdlblJhbmRvbVBhbGV0dGUsXG5cdGdlblNwbGl0Q29tcGxlbWVudGFyeUh1ZXMsXG5cdGdlblNwbGl0Q29tcGxlbWVudGFyeVBhbGV0dGUsXG5cdGdlblRldHJhZGljSHVlcyxcblx0Z2VuVGV0cmFkaWNQYWxldHRlLFxuXHRnZW5UcmlhZGljSHVlcyxcblx0Z2VuVHJpYWRpY1BhbGV0dGVcbn07XG4iXX0=