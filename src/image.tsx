import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, Check, ChevronRight, Copy, Folder, FolderPlus, Image, LogIn, LogOut, Move, Pencil, Search, Trash2, Upload, X } from 'lucide-react';
import { useResource } from './components/ui';
import type { SessionInfo } from './shared/types';
import type { MediaEntry, MediaListing } from './shared/media';
import './styles.css';
import './image.css';

const parentOf = (p: string) => p.split('/').slice(0, -1).join('/');
const size = (n: number) => n < 1024 ? `${n} B` : n < 1048576 ? `${(n / 1024).toFixed(1)} KB` : `${(n / 1048576).toFixed(1)} MB`;
type Operation = { kind: 'folder' | 'rename' | 'move' | 'copy' | 'delete'; entry?: MediaEntry };
function App() {
  const session = useResource<SessionInfo>('/api/session');
  const [folder, setFolder] = useState(''), [query, setQuery] = useState(''), [listing, setListing] = useState<MediaListing | null>(null), [selected, setSelected] = useState<MediaEntry | null>(null);
  const [error, setError] = useState(''), [notice, setNotice] = useState(''), [busy, setBusy] = useState(false), [refresh, setRefresh] = useState(0);
  const [operation, setOperation] = useState<Operation | null>(null), [value, setValue] = useState('');
  const [files, setFiles] = useState<File[]>([]), [overwrite, setOverwrite] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const allowed = session.data?.internalAccess && !session.error;
  useEffect(() => {
    if (!allowed) { setListing(null); setSelected(null); return; }
    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetch(`/api/media?${new URLSearchParams({ path: folder, q: query })}`, { signal: controller.signal, cache: 'no-store' }).then(async r => { if (!r.ok) { if ([401,403].includes(r.status)) void session.refresh(); throw Error((await r.json()).error); } return r.json(); }).then(data => { if (!controller.signal.aborted) setListing(data); }).catch(e => { if (!controller.signal.aborted) setError(e.message); });
    }, query ? 250 : 0);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [folder, query, refresh, allowed]);
  function navigate(path: string) { setFolder(path); setQuery(''); setSelected(null); setListing(null); setError(''); }
  async function write(url: string, method: string, body: object | FormData) {
    const multipart = body instanceof FormData;
    const res = await fetch(url, { method, headers: { 'X-CSRF-Token': session.data?.csrfToken || '', ...(!multipart ? { 'Content-Type': 'application/json' } : {}) }, body: multipart ? body : JSON.stringify(body) });
    if (!res.ok) { if ([401,403].includes(res.status)) void session.refresh(); const problem = await res.json(); throw Error(problem.error); }
    return res.status === 204 ? null : res.json();
  }
  async function execute(fn: () => Promise<void>) {
    setBusy(true); setError(''); setNotice('');
    try { await fn(); } catch(e) { setError((e as Error).message); } finally { setBusy(false); setRefresh(n => n + 1); }
  }
  async function upload() {
    if (!files.length) return;
    await execute(async () => {
      const data = new FormData(); for (const file of files) data.append('files', file);
      const result = await write(`/api/media/upload?${new URLSearchParams({ path: folder, overwrite: String(overwrite) })}`, 'POST', data);
      setNotice(`Nahráno ${result.entries.length} obrázků.`); setSelected(result.entries[0]); setFiles([]); setOverwrite(false); if (input.current) input.current.value = '';
    });
  }
  function open(kind: Operation['kind'], entry?: MediaEntry) { setError(''); setOperation({ kind, entry }); setValue(kind === 'rename' ? entry?.name || '' : kind === 'move' || kind === 'copy' ? entry?.path || '' : ''); }
  async function commitOperation(e: React.FormEvent) {
    e.preventDefault(); if (!operation) return;
    await execute(async () => {
      if (operation.kind === 'folder') await write('/api/media/folder', 'POST', { path: folder ? `${folder}/${value}` : value });
      else if (operation.kind === 'delete') await write(`/api/media/${operation.entry!.kind}`, 'DELETE', { path: operation.entry!.path, confirmation: value });
      else {
        const parent = parentOf(operation.entry!.path);
        const target = operation.kind === 'rename' ? `${parent ? `${parent}/` : ''}${value}` : value;
        await write(`/api/media/${operation.kind}`, 'PATCH', { source: operation.entry!.path, target });
      }
      setSelected(null); setOperation(null); setNotice('Změna byla uložena.');
    });
  }
  async function copyUrl(entry: MediaEntry) { try { await navigator.clipboard.writeText(entry.publicUrl!); setNotice('Veřejná URL zkopírována.'); } catch { setError('URL zkopíruj ručně z detailu obrázku.'); } }
  async function logout() { await execute(async () => { await write('/auth/logout', 'POST', {}); await session.refresh(); }); }
  const operationTitle = { folder: 'Vytvořit složku', rename: 'Přejmenovat', move: 'Přesunout', copy: 'Kopírovat obrázek', delete: 'Potvrdit smazání' };
  return <div className="media-shell"><header className="media-header"><a className="brand" href="/manage"><img src="/diamondcrew-logo.png" width="55" height="55" alt=""/><span><strong>DiamondCrew</strong><small>IMAGE SERVICE</small></span></a><div className="media-account">{session.data?.authenticated ? <><span>{session.data.user?.displayName || session.data.user?.username}</span><button className="button subtle" onClick={logout} disabled={busy}><LogOut size={15}/>Sign out</button></> : session.data?.loginAvailable ? <a className="button discord" href="/auth/discord"><LogIn size={16}/>Login with Discord</a> : <button className="button discord" disabled>Login with Discord</button>}</div></header><main className="media-main"><div className="media-title"><div><span className="eyebrow">DIAMONDCREW ASSET LIBRARY</span><h1>Image Service<span>.</span></h1><p>Jedno místo pro obrázky. Jeden odkaz pro všechny projekty.</p></div><span className="media-mode"><Image size={16}/>Images & static delivery</span></div>{!allowed ? <div className="media-login"><Image size={44}/><h2>Správa médií</h2><p>{session.data?.authenticated ? 'No internal access' : 'Pro správu obrázků se přihlas povoleným Discord účtem.'}</p><small>Veřejné odkazy na obrázky fungují bez přihlášení.</small></div> : <><div className="media-toolbar"><div className="media-search"><Search size={17}/><input aria-label="Search media" placeholder="Hledat podle názvu nebo cesty…" value={query} onChange={e => setQuery(e.target.value)} maxLength={100}/></div><button className="button subtle" disabled={busy} onClick={() => open('folder')}><FolderPlus size={17}/>Nová složka</button><button className="button upload-button" disabled={busy} onClick={() => input.current?.click()}><Upload size={17}/>Vybrat obrázky</button><input ref={input} aria-label="Upload images" className="file-input" type="file" accept="image/png,image/jpeg,image/webp,image/gif" multiple onChange={e => { setFiles(Array.from(e.target.files || [])); setOverwrite(false); }}/></div>{files.length > 0 && <section className="upload-review"><strong>{files.length} vybraných obrázků · {size(files.reduce((n,f) => n+f.size,0))}</strong><p>{files.map(f => f.name).join(', ')}</p><label><input type="checkbox" checked={overwrite} onChange={e => setOverwrite(e.target.checked)}/>Výslovně povoluji přepsání shodných názvů v této složce.</label><button className="button upload-button" disabled={busy} onClick={upload}>{busy ? 'Nahrávání…' : 'Nahrát obrázky'}</button><button className="button subtle" disabled={busy} onClick={() => setFiles([])}>Zrušit</button></section>}<nav className="media-breadcrumb" aria-label="Media folders"><button onClick={() => navigate('')}><Folder size={15}/>Media</button>{folder.split('/').filter(Boolean).map((part,i,all) => <span key={i}><ChevronRight size={13}/><button onClick={() => navigate(all.slice(0,i+1).join('/'))}>{part}</button></span>)}</nav><div className="media-workspace"><section className="media-library" aria-label="Media library"><div className="library-heading"><span>Název</span><span>Velikost / typ</span></div>{folder && !query && <button className="media-entry parent-entry" onClick={() => navigate(parentOf(folder))}><ArrowLeft size={17}/><span>Zpět do nadřazené složky</span></button>}{listing?.entries.map(entry => <button key={entry.path} className={`media-entry ${selected?.path === entry.path ? 'selected' : ''}`} onClick={() => setSelected(entry)} onDoubleClick={() => { if (entry.kind === 'folder') navigate(entry.path); }}><span className={`media-thumbnail ${entry.kind}`}>{entry.kind === 'folder' ? <Folder size={28}/> : <img src={`/${entry.path.split('/').map(encodeURIComponent).join('/')}?v=${encodeURIComponent(entry.modified)}`} alt="" loading="lazy"/>}</span><span className="media-filename"><strong>{entry.name}</strong><small>{query ? entry.path : entry.kind === 'folder' ? 'Složka' : entry.mime}</small></span><span className="media-file-size">{entry.kind === 'file' ? size(entry.size) : '—'}</span><ChevronRight size={14}/></button>)}{!listing ? <p className="library-empty">Načítání…</p> : !listing.entries.length ? <p className="library-empty">{query ? 'Žádné výsledky.' : 'Složka je prázdná. Přidej první obrázek.'}</p> : null}{listing?.truncated && <p className="library-empty">Výpis dosáhl limitu. Otevři konkrétní podsložku a upřesni hledání.</p>}<div className="library-foot">{listing?.entries.length ?? 0} položek{query ? ' ve výsledcích' : ' v této složce'}<span>PNG · JPG · WEBP · GIF</span></div></section><aside className="media-detail" aria-label="Media details">{selected ? <><div className="preview">{selected.kind === 'folder' ? <Folder size={70}/> : <img src={`/${selected.path}?v=${encodeURIComponent(selected.modified)}`} alt={selected.name}/>}</div><h2>{selected.name}</h2><p className="detail-path">{selected.path}</p>{selected.kind === 'file' ? <><dl><div><dt>Typ</dt><dd>{selected.mime}</dd></div><div><dt>Velikost</dt><dd>{size(selected.size)}</dd></div></dl><label className="url-label">PUBLIC URL<input readOnly aria-label="Public URL" value={selected.publicUrl!} onFocus={e => e.target.select()}/></label><button className="button copy-url" onClick={() => copyUrl(selected)}><Copy size={15}/>COPY URL</button></> : <button className="button copy-url" onClick={() => navigate(selected.path)}>Otevřít složku<ChevronRight size={15}/></button>}<div className="detail-actions"><button onClick={() => open('rename', selected)} disabled={busy}><Pencil size={14}/>Přejmenovat</button><button onClick={() => open('move', selected)} disabled={busy}><Move size={14}/>Přesunout</button>{selected.kind === 'file' && <button onClick={() => open('copy', selected)} disabled={busy}><Copy size={14}/>Kopírovat</button>}<button className="danger" onClick={() => open('delete', selected)} disabled={busy}><Trash2 size={14}/>Smazat</button></div></> : <div className="detail-empty"><Image size={44}/><p>Vyber obrázek nebo složku</p><small>Náhled, veřejná URL a možnosti správy.</small></div>}</aside></div></>}{error && <p className="media-message error" role="alert">{error}</p>}{notice && <p className="media-message success" role="status"><Check size={16}/>{notice}</p>}</main><footer><span>DiamondCrew Interactive</span><span>Public read · Authorized management</span></footer>{operation && <div className="modal-backdrop"><form className="media-dialog" role="dialog" aria-modal="true" aria-label={operationTitle[operation.kind]} onSubmit={commitOperation}><button type="button" className="dialog-close" aria-label="Close dialog" disabled={busy} onClick={() => setOperation(null)}><X size={19}/></button><h2>{operationTitle[operation.kind]}</h2>{operation.kind === 'delete' ? <><p>Smazat <strong>{operation.entry!.path}</strong>? Veřejný odkaz poté přestane fungovat.</p>{operation.entry!.kind === 'folder' && <label>Pro smazání složky včetně obsahu opiš celou cestu:<input aria-label="Folder deletion confirmation" value={value} onChange={e => setValue(e.target.value)}/></label>}</> : <label>{operation.kind === 'folder' ? 'Název nebo vnořená cesta (např. inventory/food)' : operation.kind === 'rename' ? 'Nový název' : 'Cílová cesta od kořene včetně názvu'}<input required autoFocus aria-label="Destination" value={value} onChange={e => setValue(e.target.value)} maxLength={600}/></label>}{error && <p className="media-message error" role="alert">{error}</p>}<div className="dialog-actions"><button type="button" className="button subtle" disabled={busy} onClick={() => setOperation(null)}>Zrušit</button><button className={`button ${operation.kind === 'delete' ? 'danger' : 'upload-button'}`} disabled={busy}>{busy ? 'Ukládání…' : operation.kind === 'delete' ? 'Smazat' : 'Uložit'}</button></div></form></div>}</div>;
}
createRoot(document.getElementById('root')!).render(<App/>);
