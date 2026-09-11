import { useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronDown, ChevronRight, Copy, List, Search, X } from 'lucide-react';
import type { CookbookEntry, CookbookPage } from '../shared/types';

interface SearchResult { slug: string; title: string; category: string; preview: string }
function CodeBlock({ children }: { children?: React.ReactNode }) {
  const code = useRef<HTMLPreElement>(null);
  const [result, setResult] = useState('Copy');
  async function copy() {
    try { await navigator.clipboard.writeText(code.current?.textContent || ''); setResult('Copied'); }
    catch { setResult('Select text to copy'); }
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
    if (response.status === 401 || response.status === 403) { setPage(null); onExpired(); throw new Error('Your Cookbook session has ended. Sign in again.'); }
    if (!response.ok) throw new Error('Cookbook could not be loaded. Please try again.');
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
      setPage(next); setExpanded(prev => new Set([...prev, next.category]));
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
    history.replaceState(null, '', `/?${new URLSearchParams({ cookbook: slug })}#cookbook`);
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
  return <section id="cookbook" className="documentation cookbook"><div className="section-heading"><div><span className="eyebrow">DIAMONDCREW KNOWLEDGE BASE</span><h2><BookOpen size={22}/>Infrastructure Cookbook</h2></div><span className="access-label"><Check size={13}/>Access granted</span></div>
    <div className="cookbook-search"><Search size={17}/><input aria-label="Search Cookbook" placeholder="Search guides, commands and troubleshooting…" value={query} maxLength={200} onChange={e => setQuery(e.target.value)}/><select aria-label="Cookbook search filter" value={filter} onChange={e => setFilter(e.target.value)}><option value="all">All guides</option><option value="user">User Guides</option><option value="infrastructure">Infrastructure</option><option value="ai">AI Runbooks</option><option value="troubleshooting">Troubleshooting</option></select></div>
    {query.trim() && <div className="search-results" aria-live="polite">{searching ? <p>Searching…</p> : results.length ? results.map(r => <button key={r.slug} onClick={() => choose(r.slug)}><small>{r.category}</small><strong>{r.title}</strong><span>{r.preview}</span></button>) : <p>No matching guides. Try another term or category.</p>}</div>}
    <button className="button cookbook-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen}><List size={16}/>{mobileOpen ? 'Close guide navigation' : 'Browse guide categories'}</button>
    <div className="cookbook-layout"><nav className={`cookbook-nav ${mobileOpen ? 'mobile-open' : ''}`} aria-label="Cookbook categories">{categories.map(([id,title]) => <div className="cookbook-category" key={id}><button className="category-toggle" aria-expanded={expanded.has(id)} onClick={() => setExpanded(current => { const value = new Set(current); value.has(id) ? value.delete(id) : value.add(id); return value; })}>{expanded.has(id) ? <ChevronDown size={13}/> : <ChevronRight size={13}/>}<span>{title}</span></button>{expanded.has(id) && <div className="category-pages">{index.filter(p => p.category === id).map(p => <button key={p.slug} aria-current={p.slug === selected ? 'page' : undefined} onClick={() => choose(p.slug)}>{p.title}</button>)}</div>}</div>)}</nav>
      <div className="cookbook-document"><div className="cookbook-breadcrumb">Cookbook <ChevronRight size={12}/><span>{page?.categoryTitle || 'Loading'}</span><ChevronRight size={12}/><strong>{page?.title}</strong></div>
        <article ref={article} className="markdown">{loading && <p role="status">Loading guide…</p>}{error && <p role="alert">{error}</p>}{page && <Markdown skipHtml remarkPlugins={[remarkGfm, remarkHeadingIds]} rehypePlugins={[rehypeHighlight]} components={{ img: () => null, pre: CodeBlock, a: ({ children, href }) => <a href={href} onClick={event => followLink(event, href)} target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{children}</a> }}>{page.markdown}</Markdown>}</article>
        {page && <div className="page-pagination">{previous ? <button onClick={() => choose(previous.slug)}><ArrowLeft size={15}/><span><small>Previous</small>{previous.title}</span></button> : <span/>}{next && <button onClick={() => choose(next.slug)}><span><small>Next</small>{next.title}</span><ArrowRight size={15}/></button>}</div>}
      </div><aside className="cookbook-toc" aria-label="Table of contents"><span className="eyebrow">ON THIS PAGE</span>{page?.headings.filter(h => h.depth > 1 && h.depth < 4).map(h => <a key={h.id} className={`depth-${h.depth}`} href={`#${h.id}`}>{h.text}</a>)}</aside></div>
  </section>;
}
