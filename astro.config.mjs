// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Your live web address. Change this if you connect a custom domain.
const SITE = 'https://tinsincomesystem-portfolio.netlify.app';

export default defineConfig({
  site: SITE,
  output: 'static',
  scopedStyleStrategy: 'class',
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (p) => !p.includes('/thank-you') })],
  image: { responsiveStyles: false },
  build: { inlineStylesheets: 'always' },
  vite: { build: { assetsInlineLimit: 2048 } },
});
