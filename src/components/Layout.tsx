import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useI18n, type Language } from '../i18n';
import './language-picker.css';
import './grunge.css';
import '../logo.css';

type Props = { cartCount?: number; likedCount?: number; onCartClick?: () => void };
const logo = '/images/aderiva-logo.jpg';
export function Layout({}: Props) {
  const { language, setLanguage } = useI18n(); const location = useLocation(); const navigate = useNavigate(); const [menuOpen,setMenuOpen]=useState(false); const languages: Language[]=['EN','ES','FR','DE'];
  const closeMenu=()=>setMenuOpen(false);
  const goToCollection=()=>{ closeMenu(); if(location.pathname==='/'){ document.getElementById('collection')?.scrollIntoView({behavior:'smooth', block:'start'}); } else { navigate('/'); window.setTimeout(()=>document.getElementById('collection')?.scrollIntoView({behavior:'smooth', block:'start'}),100); } };
  return <div className="site-shell"><div className="announcement">ADeriva.Store — Indie · Rock · Alternative</div><header className="site-header" style={{position:'sticky',top:0,zIndex:1000}}><button className="mobile-menu" type="button" onClick={()=>setMenuOpen(o=>!o)} aria-label={menuOpen?'Close menu':'Open menu'} aria-expanded={menuOpen}>{menuOpen?<X size={21} strokeWidth={1.7}/>:<Menu size={21} strokeWidth={1.7}/>}</button><Link className="wordmark" to="/" aria-label="ADeriva home" onClick={closeMenu}><img className="site-logo" src={logo} alt="ADeriva"/></Link><nav className={`main-nav${menuOpen?' open':''}`}>
    <Link to="/" onClick={closeMenu} className={location.pathname==='/'?'active':undefined}>HOME</Link>
    <button type="button" onClick={goToCollection} className="nav-link-button">COLLECTION</button>
    <Link to="/about" onClick={closeMenu} className={location.pathname==='/about'?'active':undefined}>ABOUT</Link>
    <Link to="/podcast" onClick={closeMenu} className={location.pathname==='/podcast'?'active':undefined}>PODCAST</Link>
    <a href="https://www.instagram.com/aderiva.store/" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>INSTAGRAM</a>
    <div className="language-picker"><select value={language} onChange={e=>setLanguage(e.target.value as Language)} aria-label="Language">{languages.map(item=><option key={item} value={item}>{item}</option>)}</select><ChevronDown size={13} aria-hidden="true"/></div>
  </nav></header><main id="top"><Outlet/></main><footer><Link className="wordmark" to="/"><img className="site-logo footer-logo" src={logo} alt="ADeriva"/></Link><p>© 2026 ADeriva Store.</p><a href="https://www.instagram.com/aderiva.store/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a></footer></div>;
}
