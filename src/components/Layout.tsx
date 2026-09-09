import { Link, Outlet, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { ChevronDown, Menu, X, Play, X as CloseIcon } from 'lucide-react';
import { useState } from 'react';
import { useI18n, type Language } from '../i18n';
import './language-picker.css';
import './grunge.css';
import '../logo.css';

type Props = { cartCount?: number; likedCount?: number; onCartClick?: () => void };
export type PodcastEpisode = { num: string; title: string; url: string; embed: string };
type LayoutContext = { playPodcast: (episode: PodcastEpisode) => void };
const logo = '/images/aderiva-logo.jpg';

export function usePodcastPlayer() {
  return useOutletContext<LayoutContext>();
}

export function Layout({}: Props) {
  const { language, setLanguage } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [podcastEpisode, setPodcastEpisode] = useState<PodcastEpisode | null>(null);
  const languages: Language[] = ['EN', 'ES', 'FR', 'DE'];
  const closeMenu = () => setMenuOpen(false);
  const goToCollection = () => { closeMenu(); if (location.pathname === '/') { document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); } else { navigate('/'); window.setTimeout(() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100); } };

  return <div className="site-shell">
    <div className="announcement">ADeriva.Store — Indie · Rock · Alternative</div>
    <header className="site-header" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      <button className="mobile-menu" type="button" onClick={() => setMenuOpen(o => !o)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X size={21} strokeWidth={1.7} /> : <Menu size={21} strokeWidth={1.7} />}</button>
      <Link className="wordmark" to="/" aria-label="ADeriva home" onClick={closeMenu}><img className="site-logo" src={logo} alt="ADeriva" /></Link>
      <nav className={`main-nav${menuOpen ? ' open' : ''}`}>
        <Link to="/" onClick={closeMenu} className={location.pathname === '/' ? 'active' : undefined}>HOME</Link>
        <button type="button" onClick={goToCollection} className="nav-link-button">COLLECTION</button>
        <Link to="/about" onClick={closeMenu} className={location.pathname === '/about' ? 'active' : undefined}>ABOUT</Link>
        <Link to="/podcast" onClick={closeMenu} className={location.pathname === '/podcast' ? 'active' : undefined}>PODCAST</Link>
        <a href="https://www.instagram.com/aderiva.store/" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>INSTAGRAM</a>
        <div className="language-picker"><select value={language} onChange={e => setLanguage(e.target.value as Language)} aria-label="Language">{languages.map(item => <option key={item} value={item}>{item}</option>)}</select><ChevronDown size={13} aria-hidden="true" /></div>
      </nav>
    </header>
    <main id="top"><Outlet context={{ playPodcast: setPodcastEpisode }} /></main>

    {podcastEpisode && <div className="persistent-podcast-player" role="region" aria-label="Podcast player">
      <div className="persistent-podcast-info"><span>AD/FM</span><strong>EP. {podcastEpisode.num}</strong><small>{podcastEpisode.title}</small></div>
      <div className="persistent-podcast-frame"><iframe title={`ADeriva episode ${podcastEpisode.num} persistent player`} src={podcastEpisode.embed} allow="autoplay; encrypted-media" scrolling="no" frameBorder="0" /></div>
      <button className="persistent-podcast-close" type="button" onClick={() => setPodcastEpisode(null)} aria-label="Close podcast player"><CloseIcon size={18} /></button>
    </div>}

    <style>{`
      .persistent-podcast-player{position:fixed;left:18px;right:18px;bottom:18px;z-index:2000;display:flex;align-items:center;gap:16px;padding:10px 14px;background:#111;color:#fff;box-shadow:0 8px 30px rgba(0,0,0,.28);border:1px solid rgba(255,255,255,.14)}
      .persistent-podcast-info{display:flex;align-items:center;gap:10px;min-width:0;flex:1}.persistent-podcast-info span{font-size:11px;font-weight:800;letter-spacing:.12em;opacity:.7}.persistent-podcast-info strong{font-size:12px;white-space:nowrap}.persistent-podcast-info small{font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;opacity:.82}
      .persistent-podcast-frame{width:min(520px,55vw);height:80px;flex:none}.persistent-podcast-frame iframe{display:block;width:100%;height:80px;border:0}
      .persistent-podcast-close{display:grid;place-items:center;width:34px;height:34px;flex:none;border:0;background:transparent;color:#fff;cursor:pointer}
      @media(max-width:700px){.persistent-podcast-player{left:8px;right:8px;bottom:8px;gap:8px;padding:8px}.persistent-podcast-info{display:none}.persistent-podcast-frame{width:calc(100vw - 68px);height:76px}.persistent-podcast-frame iframe{height:76px}}
    `}</style>

    <footer><Link className="wordmark" to="/"><img className="site-logo footer-logo" src={logo} alt="ADeriva" /></Link><p>© 2026 ADeriva Store.</p><a href="https://www.instagram.com/aderiva.store/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a></footer>
  </div>;
}
