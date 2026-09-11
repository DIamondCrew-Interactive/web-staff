import { useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { ArrowLeft, ArrowRight, BookOpen, ChevronDown, ChevronRight, Copy, List, Search, X } from 'lucide-react';
import type { CookbookEntry, CookbookPage } from '../shared/types';
import './cookbook.css';

const navigationGroups = [
  { title: 'Začínáme a používání', tone: 'blue', prefixes: ['01', '18'] },
  { title: 'Servery a aplikace', tone: 'pink', prefixes: ['02', '03', '04', '05', '06', '10', '11', '22'] },
  { title: 'Web, sítě a data', tone: 'blue', prefixes: ['07', '08', '09', '13', '14'] },
  { title: 'Provoz a řešení problémů', tone: 'gold', prefixes: ['12', '15', '16', '17', '20', '21'] },
  { title: 'Automatizace', tone: 'purple', prefixes: ['19'] },
];
const subcategories: Record<string, string> = { fivem: 'FiveM', minecraft: 'Minecraft', 'nests-eggs': 'Nests a Eggs', 'new-game': 'Přidání nové hry', servers: 'Správa serverů', 'source-engine': 'Source a SteamCMD', users: 'Uživatelé a oprávnění' };
// Group each real Markdown section in a visual panel; preserve server heading IDs.
function rehypeSections() {
  return (tree: any) => {
    const result: any[] = []; let section: any;
    const text = (node: any): string => node.value || node.children?.map(text).join('') || '';
    for (const node of tree.children) {
      if (node.tagName === 'h2') {
        const heading = text(node).toLocaleLowerCase('cs');
        const tone = /ověření|kontrola výsledku/.test(heading) ? 'success' : /rollback|záloh|než začneš|zastavit|oprav|problém|havár/.test(heading) ? 'warning' : /postup|instalace|nastavit/.test(heading) ? 'action' : 'neutral';
        section = { type: 'element', tagName: 'section', properties: { className: ['guide-section', `guide-${tone}`] }, children: [] };
        result.push(section);
      }
      (section ? section.children : result).push(node);
    }
    tree.children = result;
  };
}

interface SearchResult { slug: string; title: string; category: string; preview: string }
function CodeBlock({ children }: { children?: React.ReactNode }) {
  const code = useRef<HTMLPreElement>(null);
  const [result, setResult] = useState('Kopírovat');
  async function copy() {
    try { await navigator.clipboard.writeText(code.current?.textContent || ''); setResult('Zkopírováno'); }
    catch { setResult('Označ text a zkopíruj ho'); }
  }
  return <div className="code-block"><button className="copy-code" onClick={copy}><Copy size={12}/>{result}</button><pre ref={code}>{children}</pre></div>;
}
export function Cookbook({ onExpired }: { onExpired: () => void }) {
  const [index, setIndex] = useState<CookbookEntry[]>([]);
  const [selected, setSelected] = useState(new URLSearchParams(location.search).get('cookbook') || '01-getting-started/index');
  const [page, setPage] = useState<CookbookPage | null>(null), [error, setError] = useState(''), [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(''), [filter, setFilter] = useState('all'), [results, setResults] = useState<SearchResult[]>([]), [searching, setSearching] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['01-getting-started']));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pendingHash, setPendingHash] = useState('');
  const article = useRef<HTMLElement>(null);
  async function get<T,>(url: string, signal: AbortSignal): Promise<T> {
    const response = await fetch(url, { signal, cache: 'no-store' });
    if (response.status === 401 || response.status === 403) { setPage(null); onExpired(); throw new Error('Přihlášení vypršelo. Přihlas se znovu.'); }
    if (!response.ok) throw new Error('Návod se nepodařilo načíst. Zkus obnovit stránku.');
    return response.json();
  }
  useEffect(() => {
    const controller = new AbortController();
    get<CookbookEntry[]>('/api/internal/docs/index', controller.signal).then(setIndex).catch(e => { if (!controller.signal.aborted) setError(e.message); });
    return () => controller.abort();
  }, [onExpired]);
  useEffect(() => {
    const controller = new AbortController(); setLoading(true); setPage(null); setError('');
    const path = selected.split('/').map(encodeURIComponent).join('/');
    get<CookbookPage>(`/api/internal/docs/page/${path}`, controller.signal).then(next => {
      if (controller.signal.aborted) return;
      setPage(next); setExpanded(new Set([next.category]));
    }).catch(e => { if (!controller.signal.aborted) setError(e.message); }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [selected, onExpired]);
  useEffect(() => {
    if (!query.trim()) { setResults([]); setSearching(false); return; }
    const controller = new AbortController(); setSearching(true);
    const timer = setTimeout(() => {
      get<SearchResult[]>(`/api/internal/docs/search?${new URLSearchParams({ q: query, filter })}`, controller.signal).then(setResults).catch(e => { if (!controller.signal.aborted) setError(e.message); }).finally(() => { if (!controller.signal.aborted) setSearching(false); });
    }, 250);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [query, filter, onExpired]);
  useEffect(() => {
    if (!page || !pendingHash) return;
    document.getElementById(pendingHash)?.scrollIntoView(); setPendingHash('');
  }, [page, pendingHash]);
  function choose(slug: string, hash = '') {
    setSelected(slug); setQuery(''); setMobileOpen(false); setPendingHash(hash);
    history.replaceState(null, '', `/docs?${new URLSearchParams({ cookbook: slug })}#cookbook`);
    if (!hash) document.getElementById('cookbook')?.scrollIntoView({ block: 'start' });
  }
  function followLink(event: React.MouseEvent, href: string | undefined) {
    if (!href || /^https?:|^mailto:/.test(href)) return;
    event.preventDefault();
    if (href.startsWith('#')) { document.getElementById(decodeURIComponent(href.slice(1)))?.scrollIntoView(); return; }
    const current = new URL(`https://cookbook.local/${selected}.md`);
    const next = new URL(href, current);
    const slug = decodeURIComponent(next.pathname.slice(1)).replace(/\.md$/, '');
    if (index.some(p => p.slug === slug)) choose(slug, decodeURIComponent(next.hash.slice(1)));
  }
  const categories = [...new Map(index.map(p => [p.category, p.categoryTitle])).entries()];
  const position = index.findIndex(p => p.slug === selected), previous = index[position - 1], next = index[position + 1];
  // Assign exactly the server-indexed heading IDs; no document text enters the bundle.
  const remarkHeadingIds = () => (tree: any) => {
    let cursor = 0;
    function walk(node: any) {
      if (node.type === 'heading') { node.data ||= {}; node.data.hProperties ||= {}; node.data.hProperties.id = page?.headings[cursor++]?.id; }
      node.children?.forEach(walk);
    }
    walk(tree);
  };
  return <section id="cookbook" className="documentation cookbook">
    <div className="section-heading"><div><span className="eyebrow">DOKUMENTACE DIAMONDCREW</span><h2><BookOpen size={28}/>Provozní příručka</h2></div></div>
    <div className="cookbook-shortcuts" aria-label="Rychlý výběr návodu">
      {[['18-server-manager-user-guide/index', 'Spravovat herní server'], ['03-server-manager-installation/index', 'Nainstalovat Server Manager'], ['20-troubleshooting/index', 'Vyřešit problém'], ['21-disaster-recovery/index', 'Obnovit po havárii']].map(([slug, title]) => <button key={slug} onClick={() => choose(slug)}>{title}<ArrowRight size={17}/></button>)}
    </div>
    <div className="cookbook-search"><Search size={21}/><input aria-label="Hledat v příručce" placeholder="Co potřebuješ udělat? Hledej návod, službu nebo chybu…" value={query} maxLength={200} onChange={e => setQuery(e.target.value)}/>{query && <button className="clear-search" aria-label="Vymazat hledání" onClick={() => setQuery('')}><X size={18}/></button>}<select aria-label="Oblast hledání" value={filter} onChange={e => setFilter(e.target.value)}><option value="all">Všechny návody</option><option value="user">Používání panelu</option><option value="infrastructure">Infrastruktura</option><option value="ai">Postupy pro AI</option><option value="troubleshooting">Řešení problémů</option></select></div>
    {query.trim() && <div className="search-results" aria-live="polite">{searching ? <p>Hledám…</p> : results.length ? results.map(r => <button key={r.slug} onClick={() => choose(r.slug)}><small>{r.category}</small><strong>{r.title}</strong><span>{r.preview}</span></button>) : <p>Žádný odpovídající návod. Zkus jiný výraz nebo oblast hledání.</p>}</div>}
    <button className="button cookbook-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen}><List size={18}/>{mobileOpen ? 'Zavřít kategorie' : 'Procházet kategorie'}</button>
    <div className="cookbook-layout">
      <nav className={`cookbook-nav ${mobileOpen ? 'mobile-open' : ''}`} aria-label="Kategorie příručky">
        {navigationGroups.map(group => <div className={`nav-group nav-${group.tone}`} key={group.title}><h3>{group.title}</h3>{categories.filter(([id]) => group.prefixes.includes(id.slice(0, 2))).map(([id, title]) => {
          const pages = index.filter(p => p.category === id);
          const sections = [...new Set(pages.map(p => p.slug.split('/').length > 2 ? p.slug.split('/')[1] : ''))];
          return <div className="cookbook-category" key={id}><button className="category-toggle" aria-expanded={expanded.has(id)} onClick={() => setExpanded(expanded.has(id) ? new Set() : new Set([id]))}>{expanded.has(id) ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}<span>{title}</span><small>{pages.length}</small></button>{expanded.has(id) && <div className="category-pages">{sections.map(section => <div className="category-subgroup" key={section}>{section && <h4>{subcategories[section] || section}</h4>}{pages.filter(p => (p.slug.split('/').length > 2 ? p.slug.split('/')[1] : '') === section).map(p => <button key={p.slug} aria-current={p.slug === selected ? 'page' : undefined} onClick={() => choose(p.slug)}>{p.title}</button>)}</div>)}</div>}</div>;
        })}</div>)}
      </nav>
      <div className="cookbook-document"><div className="cookbook-breadcrumb"><span>{page?.categoryTitle || 'Načítání…'}</span><ChevronRight size={15}/><strong>{page?.title}</strong></div>
        <article ref={article} className="markdown" aria-busy={loading}>{loading && <p role="status">Načítání návodu…</p>}{error && <p role="alert">{error}</p>}{page && <Markdown skipHtml remarkPlugins={[remarkGfm, remarkHeadingIds]} rehypePlugins={[rehypeHighlight, rehypeSections]} components={{ img: () => null, pre: CodeBlock, a: ({ children, href }) => <a href={href} onClick={event => followLink(event, href)} target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{children}</a> }}>{page.markdown}</Markdown>}</article>
        {page && <div className="page-pagination">{previous ? <button onClick={() => choose(previous.slug)}><ArrowLeft size={18}/><span><small>Předchozí návod</small>{previous.title}</span></button> : <span/>}{next && <button onClick={() => choose(next.slug)}><span><small>Další návod</small>{next.title}</span><ArrowRight size={18}/></button>}</div>}
      </div>
      <aside className="cookbook-toc" aria-label="Obsah návodu"><span className="eyebrow">V TOMTO NÁVODU</span>{page?.headings.filter(h => h.depth === 2).map(h => <a key={h.id} href={`#${h.id}`}>{h.text}</a>)}</aside>
    </div>
  </section>;
}
