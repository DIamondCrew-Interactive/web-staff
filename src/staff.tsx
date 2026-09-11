import { lazy, Suspense, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
const Cookbook = lazy(() => import('./components/Cookbook').then(module => ({ default: module.Cookbook })));
import { ArrowUpRight, BookOpen, Check, Gamepad2, LockKeyhole, LogIn, LogOut, Network, PanelTop, Terminal } from 'lucide-react';
import { services } from './config/services';
import type { Service, SessionInfo } from './shared/types';
import { Footer, PublicHeader, StatusLink, StatusSection, useResource } from './components/ui';
import './styles.css';

const icons = { panel: PanelTop, terminal: Terminal, network: Network, game: Gamepad2 };
function Tile({ service }: { service: Service }) {
  const Icon = icons[service.icon];
  const body = <><div className="tile-top"><span className={`tile-icon ${service.project === 'Prismatic' ? 'pink' : ''}`}><Icon size={24}/></span>{service.enabled ? <span className="available"><Check size={12}/> AVAILABLE</span> : <span className="progress">IN PROGRESS</span>}</div><h3>{service.name}</h3>{service.enabled && <p>{service.description}</p>}<div className="tile-bottom">{service.enabled ? <><span>Open Server Manager</span><ArrowUpRight size={17}/></> : <><span>IN PROGRESS</span><LockKeyhole size={13}/></>}</div></>;
  return service.enabled ? <a className="tile enabled" href={service.url} target="_blank" rel="noreferrer">{body}</a> : <article className="tile disabled" aria-disabled="true">{body}</article>;
}
function App() {
  const session = useResource<SessionInfo>('/api/session');
  const [logoutError, setLogoutError] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const loginResult = new URLSearchParams(location.search).get('login');
  useEffect(() => { if (loginResult) history.replaceState(null, '', '/'); }, []);
  async function logout() {
    setLoggingOut(true); setLogoutError(false);
    try {
      const response = await fetch('/auth/logout', { method: 'POST', headers: { 'X-CSRF-Token': session.data?.csrfToken || '' } });
      if (!response.ok && response.status !== 403) throw new Error('Logout failed');
      await session.refresh();
    } catch { setLogoutError(true); } finally { setLoggingOut(false); }
  }
  return <div className="site-shell"><a className="skip" href="#main">Skip to content</a><PublicHeader><StatusLink/>{session.data?.authenticated ? <div className="account"><span>{session.data.user?.username}</span><button className="button subtle" onClick={logout} disabled={loggingOut}><LogOut size={14}/>Sign out</button></div> : session.data?.loginAvailable ? <a className="button discord" href="/auth/discord"><LogIn size={16}/>Login with Discord</a> : <button className="button discord" disabled title="Discord login has not been configured"><LogIn size={16}/>Login with Discord</button>}</PublicHeader>
    <main id="main"><section className="intro"><span className="eyebrow">WELCOME TO THE CREW</span><h1>Your DiamondCrew<br/>starting point<span>.</span></h1><p>Our tools, our servers. Everything in one place.</p><div className="intro-links"><a href="#tools">Explore tools <span>↓</span></a><a href="#status">Server status</a>{session.data?.internalAccess && <a href="#cookbook">Cookbook</a>}</div></section>
      {session.data?.authenticated && !session.data.internalAccess && <p className="access-note">No internal access</p>}
      {session.error && <p className="access-note" role="status">Login status is unavailable. Public tools and server status remain available.</p>}
      {logoutError && <p className="notice" role="alert">Sign out failed. Please try again.</p>}
      {loginResult && <p className="access-note">{loginResult === 'cancelled' ? 'Discord sign-in was cancelled.' : loginResult === 'unavailable' ? 'Discord login is not configured yet.' : 'Discord sign-in could not be completed. Please try again.'}</p>}
      <section id="tools"><div className="section-heading"><div><span className="eyebrow">QUICK ACCESS</span><h2>Tools & consoles</h2></div><span className="section-note">Built for the DiamondCrew ecosystem</span></div><div className="tile-grid">{services.map(service => <Tile key={service.id} service={service}/>)}</div></section>
      <StatusSection/>
      {session.data?.internalAccess && !session.error && <Suspense fallback={<p role="status">Loading Cookbook…</p>}><Cookbook onExpired={session.refresh}/></Suspense>}
      {!session.data?.internalAccess && <div className="staff-note"><BookOpen size={17}/><span>Part of the team? Sign in with Discord to access internal documentation.</span></div>}
    </main><Footer/></div>;
}
createRoot(document.getElementById('root')!).render(<App/>);
