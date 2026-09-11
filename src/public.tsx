import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Activity, ArrowRight, CalendarCheck, CalendarDays, CircleAlert, Clock3, Gamepad2, Home, LogIn, Monitor, RefreshCw, Server, Users } from 'lucide-react';
import { useResource } from './components/ui';
import type { PublicSnapshot, ServerState, ServerStatus, WebServiceStatus } from './shared/types';
import './styles.css';
import './launcher.css';
import './status.css';

const states: { state: ServerState; label: string; description: string }[] = [
  { state: 'ONLINE', label: 'Online', description: 'Služby v provozu' },
  { state: 'OFFLINE', label: 'Výpadek', description: 'Nedostupné služby' },
  { state: 'MAINTENANCE', label: 'Údržba', description: 'Probíhající odstávka' },
  { state: 'UNKNOWN', label: 'Neznámý', description: 'Bez ověřených dat' },
];
const presentation: Record<string, { logo?: string; scene: string; description: string }> = {
  'prismatic-prod': { logo: '/branding/prismatic.png', scene: 'city', description: 'Hlavní produkční server' },
  'diamond-prod': { logo: '/branding/dcrp.svg', scene: 'city-night', description: 'Hlavní produkční server' },
  minecraft: { scene: 'console', description: 'Minecraft server' },
  'dia-01': { scene: 'datacenter', description: 'Obecný stav infrastruktury' },
};
function StatusCard({ server, updatedAt }: { server: ServerStatus | WebServiceStatus; updatedAt: string }) {
  const [expanded, setExpanded] = useState(false);
  const visual = presentation[server.id] || {scene:'datacenter',description:'Dostupnost webové služby'}, label = states.find(s => s.state === server.state)!.label;
  const Icon = server.id === 'dia-01' ? Server : Gamepad2;
  return <article className={`status-card service-status-card status-${server.state.toLowerCase()}`}>
    <div className={`service-status-top status-scene-${visual.scene}`}>
      {visual.logo ? <img className="status-project-logo" src={visual.logo} alt=""/> : <Icon className="status-service-icon" size={44} strokeWidth={1.6}/>}
      <div className="status-service-name"><h2>{server.name}</h2><p>{visual.description}</p></div>
      <span className={`status-pill pill-${server.state.toLowerCase()}`}><i/>{label}</span>
    </div>
    <div className="service-status-metrics"><div><small>Stav</small><strong>{server.state}</strong></div><div><small>Odezva zdroje</small><strong>{server.responseMs === null ? '—' : `${server.responseMs} ms`}</strong></div>{server.players !== null && <div><small>Hráči</small><strong><Users size={13}/>{server.players}</strong></div>}<button className="status-detail-button" aria-label={`Detail: ${server.name}`} aria-expanded={expanded} aria-controls={`detail-${server.id}`} onClick={() => setExpanded(!expanded)}><ArrowRight size={18}/></button></div>
    {expanded && <div className="service-status-detail" id={`detail-${server.id}`}><p>{server.response === 'NOT CONFIGURED' ? 'Pro tuto službu zatím není připojen zdroj stavu.' : server.state === 'MAINTENANCE' ? 'Služba má nastavenou údržbu.' : server.response === 'OK' ? 'Poslední kontrola zdroje proběhla úspěšně.' : 'Zdroj neposkytl úspěšnou odpověď. Stav vychází z poslední kontroly.'}</p><p>Poslední kontrola: {new Date(updatedAt).toLocaleString('cs-CZ')}. Odezva označuje HTTP kontrolu zdroje, nikoliv herní ping.</p></div>}
  </article>;
}
function App() {
  const { data, error, loading, refresh } = useResource<PublicSnapshot>('/api/public/status');
  const allServices = data ? [...data.servers,...(data.webServices || [])] : [];
  const issues = allServices.filter(s => s.state === 'OFFLINE') || [];
  const maintenanceServices = allServices.filter(s => s.state === 'MAINTENANCE') || [];
  const maintenanceActive = !!data?.maintenance.active || maintenanceServices.length > 0;
  return <div className="launcher public-status-page"><a className="skip" href="#main">Skip to content</a><header className="launcher-header status-header"><a className="launcher-brand" href="https://staff.diamondcrew.net" aria-label="DiamondCrew Interactive Staff Center"><img src="/diamondcrew-logo.png" alt="DiamondCrew Interactive"/><span><strong>DiamondCrew Interactive</strong><small>PLAY • CREATE • TOGETHER</small></span></a><nav className="status-navigation" aria-label="Hlavní navigace"><a href="https://staff.diamondcrew.net"><Home size={18}/><span>Home</span></a><a href="#services"><Monitor size={18}/><span>Services</span></a><a href="#main" aria-current="page"><Activity size={18}/><span>Status</span></a></nav><a className="button discord status-login" href="https://staff.diamondcrew.net/auth/discord"><LogIn size={15}/>Login with Discord</a><div className="header-shards" aria-hidden="true"/></header>
    <main id="main" className="status-main"><section className="status-hero"><div><h1>Services <span>Status</span></h1><p>Aktuální stav našich serverů a infrastruktury.</p><small>{data ? `Poslední aktualizace: ${new Date(data.updatedAt).toLocaleString('cs-CZ')}` : 'Načítání stavu služeb…'}</small></div><div className="status-hero-actions"><p>Buď v tom s námi!</p><button className="button subtle" disabled={loading} onClick={refresh}><RefreshCw size={14} className={loading ? 'spin' : ''}/>{loading ? 'Aktualizuji…' : 'Aktualizovat stav'}</button></div></section>
    {error && <div className="notice" role="alert">Aktualizace stavu není dostupná.{data ? ' Zobrazené údaje mohou být zastaralé.' : ' Zkus to prosím za chvíli.'}</div>}
    <section className="status-summary" aria-label="Souhrn stavů">{states.map(item => <div className={`status-summary-item summary-${item.state.toLowerCase()}`} key={item.state}><span className="summary-light"/><div><strong>{data ? allServices.filter(s => s.state === item.state).length : '—'}</strong><h2>{item.label}</h2><p>{item.description}</p></div></div>)}</section>
    <section id="services" className="public-service-grid" aria-label="Stav služeb">{allServices.map(server => <StatusCard key={server.id} server={server} updatedAt={data?.updatedAt || ''}/>)}{!data && <div className="status-loading">{loading ? 'Zjišťuji dostupnost služeb…' : 'Údaje o službách nyní nejsou dostupné.'}</div>}</section>
    <div className="status-bottom-grid"><section className="status-info-panel"><h2><Clock3 size={19}/>Aktuální hlášení</h2>{data?.incident && <div className="status-incident" role="alert"><CircleAlert size={20}/><div><h3>{data.incident.title}</h3><p>{data.incident.message}</p></div></div>}{issues.map(s => <div key={s.id} className="current-issue"><span className={`status-dot dot-${s.state.toLowerCase()}`}/><strong>{s.name}</strong><span>{states.find(item => item.state === s.state)!.label}</span></div>)}{!data?.incident && !issues.length && <div className="status-panel-empty"><Activity size={36}/><h3>{data ? 'Žádný nahlášený incident' : 'Hlášení se načítají'}</h3><p>{allServices.some(s => s.state === 'UNKNOWN') ? 'U služeb bez zdroje dat zatím nelze dostupnost potvrdit.' : 'Zde se zobrazí aktuální oznámení a zjištěné výpadky.'}</p></div>}</section>
    <section className="status-info-panel"><h2><CalendarDays size={19}/>Údržba</h2><div className={`status-panel-empty ${maintenanceActive ? 'maintenance-active' : ''}`}><CalendarCheck size={46}/><h3>{!data ? 'Načítání údržby' : maintenanceActive ? 'Probíhá údržba' : 'Žádná oznámená údržba'}</h3><p>{data?.maintenance.active ? data.maintenance.message : maintenanceServices.length ? maintenanceServices.map(s => s.name).join(', ') : 'Aktuální oznámení o údržbě najdeš na tomto místě.'}</p></div></section></div>
    </main><footer className="launcher-footer"><div><strong>DiamondCrew Interactive</strong><small>PLAY<br/>CREATE<br/>TOGETHER</small></div><p>© {new Date().getFullYear()} <span>DiamondCrew Interactive.</span> All rights reserved.</p><img src="/diamondcrew-logo.png" alt=""/></footer></div>;
}
createRoot(document.getElementById('root')!).render(<App/>);
