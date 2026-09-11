import { lazy, Suspense, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Activity, ArrowRight, BookOpen, Gamepad2, Image, LogIn, LogOut, Server, Shield, Terminal, Users } from 'lucide-react';
import { infrastructureServices, services } from './config/services';
import type { PublicSnapshot, Service, SessionInfo } from './shared/types';
import { useResource } from './components/ui';
import './styles.css';
import './launcher.css';
const Cookbook = lazy(() => import('./components/Cookbook').then(m => ({ default: m.Cookbook })));
const icons = { panel: Server, terminal: Terminal, network: Shield, game: Gamepad2, status: Activity, image: Image };
function Tile({ service, compact = false }: { service: Service; compact?: boolean }) {
  const Icon = icons[service.icon];
  const body = <>{!compact && <div className={`card-scene scene-${service.visual}`} aria-hidden="true"><div className="scene-pattern"/>{service.logo ? <img className={`project-logo ${service.project === 'Prismatic' ? 'prismatic-logo' : ''}`} src={service.logo} alt=""/> : <Icon className="service-symbol" strokeWidth={1.5}/>}</div>}{compact && <Icon className="infra-icon" size={28}/>}<div className="card-copy"><h2>{service.name}</h2><p>{service.description}</p></div>{!service.enabled && <span className="launch-progress">IN PROGRESS</span>}{service.environment === 'DEV' && <span className="dev-ribbon" aria-label="Development server">DEV</span>}{service.enabled && <span className="launch-arrow" aria-hidden="true"><ArrowRight size={22}/></span>}</>;
  const className = `${compact ? 'infra-card' : 'launch-card'} ${service.enabled ? 'enabled' : 'disabled'} card-${service.id}`;
  return service.enabled ? <a className={className} href={service.url} target="_blank" rel="noopener noreferrer">{body}</a> : <article className={className} aria-disabled="true">{body}</article>;
}
function SimpleStatus() {
  const { data, error } = useResource<PublicSnapshot>('/api/public/status');
  return <section className="simple-status" aria-label="Server status"><h2>SERVICE STATUS</h2>{error && <p className="access-note" role="alert">Status není dostupný. Poslední známé údaje mohou být zastaralé.</p>}{data?.incident && <p className="notice" role="alert">{data.incident.title} — {data.incident.message}</p>}{data?.maintenance.active && <p className="notice">{data.maintenance.message}</p>}<div className="status-rows">{[...(data?.servers || []), ...(data?.webServices || [])].map(s => <div className="status-row" key={s.id}><span className={`status-dot dot-${s.state.toLowerCase()}`}/><span>{s.name.replace(' PROD', ' Roleplay').replace(/^(Prismatic|DiamondCrew) DEV$/, '$1 Roleplay DEV')}</span>{s.players !== null && <small><Users size={12}/>{s.players}</small>}<strong>{s.state}</strong></div>)}</div>{!data && <p className="access-note">Načítání stavu serverů…</p>}<a className="detailed-status" href="https://status.diamondcrew.net" target="_blank" rel="noreferrer">View detailed status <ArrowRight size={15}/></a></section>;
}
function App() {
  const launcher = useResource<{services:Service[];infrastructureServices:Service[]}>('/api/launcher', 60000);
  const session = useResource<SessionInfo>('/api/session');
  const [logoutError, setLogoutError] = useState(false);
  const docs = location.pathname === '/docs';
  const name = session.data?.user?.displayName || session.data?.user?.username;
  async function logout() {
    try { const r = await fetch('/auth/logout', { method: 'POST', headers: { 'X-CSRF-Token': session.data?.csrfToken || '' } }); if (!r.ok && r.status !== 403) throw Error(); if (docs) location.assign('/'); else await session.refresh(); }
    catch { setLogoutError(true); }
  }
  return <div className="launcher"><a className="skip" href="#main">Skip to content</a><header className="launcher-header"><a className="launcher-brand" href="/"><img src="/diamondcrew-logo.png" alt="DiamondCrew"/><span><strong>DiamondCrew Interactive</strong><small>PLAY • CREATE • TOGETHER</small></span></a><div className="launcher-account">{session.data?.internalAccess && <a className="docs-link" href="/docs"><BookOpen size={17}/>Dokumentace</a>}{session.data?.authenticated ? <><img className="discord-avatar" src={session.data.user?.avatarUrl} alt="Discord avatar"/><span className="display-name">{name}</span><button className="button subtle" onClick={logout} aria-label="Sign out"><LogOut size={16}/></button></> : session.data?.loginAvailable ? <a className="button discord" href="/auth/discord"><LogIn size={17}/>Login with Discord</a> : <button className="button discord" disabled><LogIn size={17}/>Login with Discord</button>}</div><div className="header-shards" aria-hidden="true"/></header><main id="main" className="launcher-main">{docs ? <><a className="back-home" href="/">← Staff Center</a>{session.data?.internalAccess && !session.error ? <Suspense fallback={<p>Načítání příručky…</p>}><Cookbook onExpired={session.refresh}/></Suspense> : <p role="status">Pro dokumentaci je potřeba autorizované přihlášení.</p>}</> : <><section className="launcher-hero"><div><h1>Vítej{name ? <>, <span>{name}!</span></> : '!'}</h1><p>Vyber si službu, se kterou chceš pracovat.</p></div><blockquote>Buď v tom s námi!</blockquote></section>{session.data?.authenticated && !session.data.internalAccess && <p className="access-note">No internal access</p>}{(session.error || logoutError) && <p role="alert" className="access-note">Přihlášení není dostupné. Veřejné služby zůstávají přístupné.</p>}{new URLSearchParams(location.search).has('login') && <p className="access-note">Discord přihlášení nebylo dokončeno. Zkus to znovu.</p>}<section className="launcher-grid" aria-label="Services">{(launcher.data?.services || services).map(service => <Tile key={service.id} service={service}/>)}</section><section className="infrastructure"><h2>Infrastructure Services</h2><div className="infra-grid">{(launcher.data?.infrastructureServices || infrastructureServices).map(service => <Tile compact key={service.id} service={service}/>)}</div></section><SimpleStatus/></>}</main><footer className="launcher-footer"><div><strong>DiamondCrew Interactive</strong><small>PLAY<br/>CREATE<br/>TOGETHER</small></div><p>© {new Date().getFullYear()} <span>DiamondCrew Interactive.</span> All rights reserved.</p><img src="/diamondcrew-logo.png" alt=""/></footer></div>;
}
createRoot(document.getElementById('root')!).render(<App/>);
