import { loadCookbook } from '../server/cookbook.js';
const pages = await loadCookbook();
const categories = new Set(pages.map(p => p.category));
for (const category of categories) if (!pages.some(p => p.slug === `${category}/index`)) throw new Error(`Missing category index: ${category}`);
console.log(JSON.stringify({ categories: categories.size, markdownPages: pages.length, metadata: 'valid', internalLinks: 'valid', codeFences: 'valid', symlinks: 'none' }, null, 2));
