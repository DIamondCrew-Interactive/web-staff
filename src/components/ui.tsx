import { useCallback, useEffect, useRef, useState } from 'react';
import { Activity, ArrowUpRight, CircleAlert, Clock3, Gamepad2, RefreshCw, Server, Users } from 'lucide-react';
import type { PublicSnapshot } from '../shared/types';

export function Brand({ subtitle = 'Staff Center' }: { subtitle?: string }) {
  return <a className="brand" href="/" aria-label={`DiamondCrew Interactive ${subtitle}`}><img src="/diamondcrew-logo.png" alt="" width="54" height="54"/><span><strong>DiamondCrew Interactive</strong><small>{subtitle}</small></span></a>;
}
export function useResource<T>(url: string, interval = 30000) {
  const [data, setData] = useState<T | null>(null), [error, setError] = useState(false), [loading, setLoading] = useState(true);
  const current = useRef<AbortController | null>(null);
  const refresh = useCallback(async () => {
    current.current?.abort();
    const controller = new AbortController(); current.current = controller;
    setLoading(true);
    const timer = window.setTimeout(() => controller.abort(), 12000);
    try {
      const res = await fetch(url, { cache: 'no-store', signal: controller.signal });
      if (!res.ok) throw new Error('Unavailable');
      const next: T = await res.json();
      if (current.current === controller) { setData(next); setError(false); }
    } catch { if (current.current === controller) setError(true); }
    finally { clearTimeout(timer); if (current.current === controller) setLoading(false); }
  }, [url]);
  useEffect(() => {
    void refresh(); const timer = setInterval(() => void refresh(), interval);
    return () => { clearInterval(timer); const controller = current.current; current.current = null; controller?.abort(); };
  }, [refresh, interval]);
  return { data, error, loading, refresh };
}
export function StatusSection() {
  const { data, error, loading, refresh } = useResource<PublicSnapshot>('/api/public/status');
  return <section id="status" className="status-section"><div className="section-heading"><div><span className="eyebrow">ACROSS THE ECOSYSTEM</span><h2>Server status</h2></div><button className="button subtle" disabled={loading} onClick={refresh}><RefreshCw size={14} className={loading ? 'spin' : ''}/>{loading ? 'Checking…' : 'Refresh status'}</button></div>
    {error && <div className="notice" role="alert">Status updates are unavailable.{data ? ' Last known readings are shown and may be out of date.' : ' Please try again shortly.'}</div>}
    {data?.incident && <div className="notice incident" role="alert"><CircleAlert size={18}/><div><strong>{data.incident.title}</strong><p>{data.incident.message}</p></div></div>}
    {data?.maintenance.active && <div className="notice"><Clock3 size={16}/>{data.maintenance.message}</div>}
    <div className="status-grid">{data?.servers.map(server => <article className="status-card" key={server.id}><div className="status-card-heading"><span className="status-icon">{server.id === 'dia-01' ? <Server size={19}/> : <Gamepad2 size={19}/>}</span><h3>{server.name}</h3><span className={`state state-${server.state.toLowerCase()}`}><i/>{server.state}</span></div><div className="status-details">{server.players !== null && <span><Users size={13}/>{server.players} players</span>}<span><Activity size={13}/>{server.state === 'MAINTENANCE' ? 'Scheduled maintenance' : server.responseMs !== null ? `${server.responseMs} ms response` : server.response === 'NOT CONFIGURED' ? 'Awaiting status source' : server.response === 'UNREACHABLE' ? 'Healthcheck not responding' : 'Reading unavailable'}</span></div></article>)}</div>
    {!data && <div className="empty">{loading ? 'Checking server availability…' : 'Status is temporarily unavailable.'}</div>}
    <div className="status-foot"><span>{data ? `Last checked ${new Date(data.updatedAt).toLocaleTimeString()}` : 'No readings yet'}</span><span>Auto refresh · 30 seconds</span></div>
  </section>;
}
export function Footer() { return <footer><span>© {new Date().getFullYear()} DiamondCrew Interactive</span><span>One crew. One ecosystem.<img src="/diamondcrew-logo.png" alt="" width="22" height="22"/></span></footer>; }
export function PublicHeader({ children, subtitle }: { children?: React.ReactNode; subtitle?: string }) {
  return <header className="site-header"><Brand subtitle={subtitle}/><div className="header-actions">{children}</div></header>;
}
export function StatusLink() { return <a className="text-link" href="https://status.diamondcrew.net" target="_blank" rel="noreferrer">Service status<ArrowUpRight size={14}/></a>; }
