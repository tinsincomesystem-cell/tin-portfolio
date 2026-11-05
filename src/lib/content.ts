// Loads every YAML file in src/content/ so components can use them.
// You never need to edit this file. Edit the .yaml files instead.
import { load as parseYaml } from 'js-yaml';

const files = import.meta.glob('../content/*.yaml', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function load<T = any>(name: string): T {
  const key = `../content/${name}.yaml`;
  const raw = files[key];
  if (raw === undefined) throw new Error(`Missing content file: src/content/${name}.yaml`);
  try {
    return parseYaml(raw) as T;
  } catch (e: any) {
    // Friendly error when a YAML file has a typo (usually a missing quote or bad indentation)
    throw new Error(`There's a typo in src/content/${name}.yaml → ${e.message}`);
  }
}

export const site = load('site');
export const services = load('services');
export const pricing = load('pricing');
export const quiz = load('quiz');
export const brands = load('brands');
export const websites = load('websites');
export const automation = load('automation');
export const testimonials = load('testimonials');
export const process = load('process');
export const about = load('about');
export const faq = load('faq');
export const scene = load('scene');
export const assistant = load('assistant');
export const stance = load('stance');
export const funnels = load('funnels');
export const intro = load('intro');

/** Turns "Brands that *sell* homes" into HTML with <em> for the starred words. */
export function rich(text: string = ''): string {
  const esc = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return esc.replace(/\*(.+?)\*/g, '<em>$1</em>');
}

export const showTodos: boolean = site.showTodos !== false;
