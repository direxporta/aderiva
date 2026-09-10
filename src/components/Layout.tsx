import { Link, Outlet, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { ChevronDown, Menu, X, Maximize2, Minimize2, ExternalLink } from 'lucide-react';
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
  const [playerExpanded, setPlayerExpanded] = useState(true);
  const languages: Language[] = ['EN', 'ES', 'FR', 'DE'];
  const closeMenu = () => setMenuOpen(false);
  const goToCollection = () => { closeMenu(); if (location.pathname === '/') { document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); } else { navigate('/'); window.setTimeout(() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100); } };
  const startPodcast = (episode: PodcastEpisode) => { setPodcastEpisode(episode); setPlayerExpanded(true); };
  const closePodcast = () => { setPodcastEpisode(null); setPlayerExpanded(false); };

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
    <main id="top"><Outlet context={{ playPodcast: startPodcast }} /></main>

    {podcastEpisode && <div className={`persistent-podcast-player${playerExpanded ? ' expanded' : ' collapsed'}`} role="region" aria-label="Podcast player">
      <div className="persistent-podcast-top">
        <div className="persistent-podcast-badge">AD/FM</div>
        <div className="persistent-podcast-copy">
          <strong>EP. {podcastEpisode.num}</strong>
          <span>{podcastEpisode.title}</span>
        </div>
        <div className="persistent-podcast-actions">
          <button type="button" onClick={() => setPlayerExpanded(v => !v)} aria-label={playerExpanded ? 'Minimize player' : 'Open player'} title={playerExpanded ? 'Minimize player' : 'Open player'}>{playerExpanded ? <Minimize2 size={17} /> : <Maximize2 size={17} />}</button>
          <a href={podcastEpisode.url} target="_blank" rel="noreferrer" aria-label="Open episode on iVoox" title="Open on iVoox"><ExternalLink size={17} /></a>
          <button type="button" onClick={closePodcast} aria-label="Close podcast player" title="Close"><X size={19} /></button>
        </div>
      </div>
      {playerExpanded && <div className="persistent-podcast-frame"><iframe title={`ADeriva episode ${podcastEpisode.num} player`} src={podcastEpisode.embed} allow="autoplay; encrypted-media; fullscreen" allowFullScreen scrolling="no" frameBorder="0" /></div>}
    </div>}

    <style>{`
      .persistent-podcast-player{position:fixed;right:18px;left:auto;bottom:18px;transform:none;z-index:2000;width:420px;max-width:calc(100vw - 28px);background:#111;color:#fff;box-shadow:0 12px 40px rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.16);overflow:hidden;border-radius:3px}
      .persistent-podcast-top{height:58px;display:flex;align-items:center;gap:10px;padding:6px 8px 6px 10px}
      .persistent-podcast-badge{width:42px;height:42px;display:grid;place-items:center;flex:none;background:#a5241f;color:#fff;font-size:9px;font-weight:900;letter-spacing:.08em;border-radius:2px}
      .persistent-podcast-copy{min-width:0;display:flex;align-items:center;gap:9px;flex:1}.persistent-podcast-copy strong{font-size:11px;white-space:nowrap;letter-spacing:.04em}.persistent-podcast-copy span{font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:rgba(255,255,255,.82)}
      .persistent-podcast-actions{display:flex;align-items:center;gap:1px;flex:none}.persistent-podcast-actions button,.persistent-podcast-actions a{width:32px;height:32px;display:grid;place-items:center;border:0;background:transparent;color:#fff;cursor:pointer;text-decoration:none;opacity:.78;border-radius:50%}.persistent-podcast-actions button:hover,.persistent-podcast-actions a:hover{background:rgba(255,255,255,.1);opacity:1}
      .persistent-podcast-frame{width:100%;height:185px;background:#111;overflow:hidden;position:relative}.persistent-podcast-frame iframe{display:block;width:500px;height:220px;border:0;transform:scale(.84);transform-origin:top left}
      .persistent-podcast-player.collapsed .persistent-podcast-top{height:58px}
      @media(max-width:700px){.persistent-podcast-player{right:8px;bottom:8px;width:calc(100vw - 16px);max-width:none}.persistent-podcast-top{height:54px;padding:5px 6px 5px 8px;gap:7px}.persistent-podcast-badge{width:38px;height:38px;font-size:8px}.persistent-podcast-copy{display:block}.persistent-podcast-copy strong{display:block;margin-bottom:2px}.persistent-podcast-copy span{display:block;font-size:10px}.persistent-podcast-actions button,.persistent-podcast-actions a{width:30px;height:30px}.persistent-podcast-frame{height:176px}.persistent-podcast-frame iframe{width:480px;height:215px;transform:scale(calc((100vw - 16px) / 480));transform-origin:top left}}
    `}</style>

    <footer><Link className="wordmark" to="/"><img className="site-logo footer-logo" src={logo} alt="ADeriva" /></Link><p>© 2026 ADeriva Store.</p><a href="https://www.instagram.com/aderiva.store/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a></footer>
  </div>;
}
