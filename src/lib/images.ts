// Finds images in src/assets/ by their path, e.g. img('websites/mcmillen-home.png').
// To swap a photo: drop a new file into src/assets/ and update the path in the .yaml file
// (or replace the file and keep the exact same name).
import type { ImageMetadata } from 'astro';

const all = import.meta.glob<{ default: ImageMetadata }>('/src/assets/**/*.{png,jpg,jpeg,webp,avif}', { eager: true });

export function img(path?: string): ImageMetadata | undefined {
  if (!path) return undefined;
  const hit = all[`/src/assets/${path.replace(/^\/+/, '')}`];
  if (!hit) {
    console.warn(`[images] Not found: src/assets/${path}. Check the filename in your .yaml file.`);
    return undefined;
  }
  return hit.default;
}
