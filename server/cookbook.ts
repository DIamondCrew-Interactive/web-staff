import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import type { Root, RootContent } from 'mdast';
import type { CookbookEntry, CookbookPage } from '../src/shared/types.js';

export const validSlug = (value: string) => /^[a-z0-9]+(?:[a-z0-9-]*[a-z0-9])?(?:\/[a-z0-9]+(?:[a-z0-9-]*[a-z0-9])?)*$/.test(value) && value.length < 240;
const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export function headingId(value: string) { return normalize(value).replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-'); }
const parser = unified().use(remarkParse);
function markdownStructure(body: string) {
  const tree = parser.parse(body), links: string[] = [], headings: CookbookPage['headings'] = [], counts = new Map<string, number>();
  const definitions = new Map<string, string>(), references: string[] = [];
  function text(node: Root | RootContent): string {
    if ('value' in node) return node.value;
    if ('children' in node) return node.children.map(text).join('');
    return '';
  }
  function walk(node: Root | RootContent) {
    if (node.type === 'heading') {
      const label = text(node), base = headingId(label), n = counts.get(base) ?? 0;
      counts.set(base, n + 1); headings.push({ id: n ? `${base}-${n}` : base, text: label, depth: node.depth });
    }
    if (node.type === 'link' || node.type === 'image') links.push(node.url);
    if (node.type === 'definition') definitions.set(node.identifier, node.url);
    if (node.type === 'linkReference' || node.type === 'imageReference') references.push(node.identifier);
    if ('children' in node) node.children.forEach(walk);
  }
  walk(tree);
  for (const reference of references) { const target = definitions.get(reference); if (target) links.push(target); }
  return { headings, links };
}
function fencedContent(body: string, file: string) {
  let fence = '', size = 0; const outside: string[] = [];
  for (const line of body.split('\n')) {
    const marker = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
    if (marker) {
      if (!fence) { fence = marker[1][0]; size = marker[1].length; }
      else if (marker[1][0] === fence && marker[1].length >= size && !marker[2].trim()) { fence = ''; size = 0; }
      outside.push('');
    } else outside.push(fence ? '' : line);
  }
  if (fence) throw new Error(`Unclosed code fence: ${file}`);
  return outside.join('\n');
}
export async function loadCookbook(directory = 'docs/internal'): Promise<CookbookPage[]> {
  const root = path.resolve(directory);
  if ((await fs.lstat(root)).isSymbolicLink()) throw new Error('Cookbook root may not be a symlink');
  const canonical = await fs.realpath(root);
  const pages: CookbookPage[] = [], slugs = new Set<string>();
  async function walk(dir: string) {
    for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
      const file = path.join(dir, entry.name), stat = await fs.lstat(file);
      if (stat.isSymbolicLink()) throw new Error('Cookbook symlinks are not allowed');
      const real = await fs.realpath(file), relativeReal = path.relative(canonical, real);
      if (relativeReal.startsWith('..') || path.isAbsolute(relativeReal)) throw new Error('Cookbook path escaped root');
      if (stat.isDirectory()) { await walk(file); continue; }
      if (!stat.isFile() || !entry.name.endsWith('.md')) continue;
      if (stat.size > 512 * 1024) throw new Error('Cookbook page too large');
      const raw = await fs.readFile(real, 'utf8');
      if (!raw.startsWith('---\n') && !raw.startsWith('---\r\n')) throw new Error(`Missing frontmatter: ${entry.name}`);
      const parsed = matter(raw), m = parsed.data;
      const relative = path.relative(root, file).replaceAll('\\', '/').slice(0, -3);
      const slug = m.slug ?? relative;
      if (typeof slug !== 'string' || !validSlug(slug) || slugs.has(slug.toLowerCase())) throw new Error(`Invalid or duplicate slug: ${String(slug)}`);
      if (typeof m.title !== 'string' || !m.title.trim() || typeof m.category !== 'string' || !m.category.trim() || !Number.isInteger(m.order)
        || !Array.isArray(m.audience) || !m.audience.length || !m.audience.every((a: unknown) => ['user', 'admin', 'ai'].includes(String(a)))
        || !Array.isArray(m.tags) || !m.tags.every((tag: unknown) => typeof tag === 'string') || (m.categoryTitle !== undefined && typeof m.categoryTitle !== 'string')) throw new Error(`Malformed frontmatter: ${relative}`);
      if (m.category !== relative.split('/')[0]) throw new Error(`Category/path mismatch: ${relative}`);
      slugs.add(slug.toLowerCase());
      fencedContent(parsed.content, relative);
      const { headings } = markdownStructure(parsed.content);
      pages.push({ slug, title: m.title, category: m.category, categoryTitle: m.categoryTitle ?? m.category.replace(/^\d+-/, '').replaceAll('-', ' '), order: m.order, audience: m.audience, tags: m.tags, headings, markdown: parsed.content.trim() });
      if (pages.length > 1500) throw new Error('Too many Cookbook pages');
    }
  }
  await walk(root);
  if (!pages.length) throw new Error('Cookbook is empty');
  const lookup = new Map(pages.map(p => [p.slug, p]));
  for (const page of pages) {
    const { links } = markdownStructure(page.markdown);
    for (const link of links) {
      if (/^https?:\/\//.test(link) || link.startsWith('mailto:')) continue;
      const [target, hash] = decodeURIComponent(link).split('#');
      const resolved = target ? path.posix.normalize(path.posix.join(path.posix.dirname(page.slug), target.replace(/\.md$/, ''))) : page.slug;
      const destination = lookup.get(resolved);
      if (!destination || (hash && !destination.headings.some(h => h.id === hash))) throw new Error(`Broken internal link in ${page.slug}: ${link}`);
    }
  }
  return pages.sort((a, b) => a.category.localeCompare(b.category) || a.order - b.order || a.slug.localeCompare(b.slug));
}
export function metadata(pages: CookbookPage[]): CookbookEntry[] { return pages.map(({ markdown: _, ...entry }) => entry); }
export function searchCookbook(pages: CookbookPage[], query: string, filter = 'all') {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return pages.filter(p => filter === 'all' || (filter === 'user' && p.category.startsWith('18-')) || (filter === 'ai' && p.category.startsWith('19-')) || (filter === 'troubleshooting' && p.category.startsWith('20-')) || (filter === 'infrastructure' && !/^(18|19|20)-/.test(p.category)))
    .map(p => {
      const body = normalize(`${p.title} ${p.tags.join(' ')} ${p.markdown}`);
      if (!terms.every(term => body.includes(term))) return null;
      const offset = Math.max(0, normalize(p.markdown).indexOf(terms[0]) - 60);
      return { slug: p.slug, title: p.title, category: p.categoryTitle, preview: p.markdown.slice(offset, offset + 220).replace(/[#`*]/g, ''), score: terms.reduce((s, term) => s + (normalize(p.title).includes(term) ? 10 : 1), 0) };
    }).filter(x => x !== null).sort((a, b) => b.score - a.score).slice(0, 40);
}
export function aiEntry(pages: CookbookPage[]) {
  const introPage = pages.find(p => p.slug === '01-getting-started/ai-entrypoint');
  const intro = (introPage?.markdown ?? '# DiamondCrew Infrastructure Cookbook — AI Entry Point').replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, href) => {
    if (/^https?:|^mailto:|^#/.test(href)) return match;
    const target = path.posix.normalize(path.posix.join(path.posix.dirname(introPage!.slug), href.replace(/\.md(?=#|$)/, '')));
    return `[${label}](/api/cookbook/raw/${target})`;
  });
  return `${intro}\n\n## Cookbook index\n\n${pages.map(p => `- [${p.title}](/api/cookbook/raw/${p.slug})`).join('\n')}\n\nSearch: /api/cookbook/search?q=...&filter=all\nBundle: /api/cookbook/bundle\n`;
}
