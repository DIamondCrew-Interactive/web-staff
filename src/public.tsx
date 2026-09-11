import { createRoot } from 'react-dom/client';
import { ArrowUpRight } from 'lucide-react';
import { Footer, PublicHeader, StatusSection } from './components/ui';
import './styles.css';

function App() {
  return <div className="site-shell status-only"><a className="skip" href="#main">Skip to content</a><PublicHeader subtitle="Service Status"><a className="text-link" href="https://staff.diamondcrew.net">Staff Center<ArrowUpRight size={14}/></a></PublicHeader><main id="main"><section className="intro"><span className="eyebrow">DIAMONDCREW ECOSYSTEM</span><h1>Stay connected<span>.</span></h1><p>Current availability of our servers and infrastructure.</p></section><StatusSection/></main><Footer/></div>;
}
createRoot(document.getElementById('root')!).render(<App/>);
