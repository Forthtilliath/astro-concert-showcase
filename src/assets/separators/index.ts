import { getImage } from "astro:assets";

export const separatorBackgrounds = await Promise.all([
  getImage({src: import('./IMG_2256.webp'), format: 'webp'}),
  getImage({src: import('./IMG_2314.webp'), format: 'webp'}),
  getImage({src: import('./IMG_2526.webp'), format: 'webp'}),
  getImage({src: import('./IMG_2958.webp'), format: 'webp'}),
]);