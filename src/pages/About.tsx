import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { heroImages } from '../data';
import { useI18n } from '../i18n';
import '../about.css';

export function About() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const c = t.about;
  const goToCollection = () => navigate('/#collection');
  return <main className="about-page">
    <section className="about-hero-image" style={{ backgroundImage: `url(${heroImages.about})` }}><div className="about-hero-overlay" /><div className="about-hero-content"><p className="eyebrow">{t.nav.about}</p><h2>{c.title}<br /><em>{c.em}</em></h2></div></section>
    <section className="about-content">
      <div className="about-manifesto"><div className="manifesto-stamp">EST.<br /><strong>2026</strong><br />ADERIVA</div><h3>{c.manifesto}</h3></div>
      <div className="about-cards"><article className="about-card"><p className="eyebrow">{c.startedEyebrow}</p><h3>{c.startedTitle}</h3><p>{c.startedText}</p></article><article className="about-card"><p className="eyebrow">{c.makeEyebrow}</p><h3>{c.makeTitle}</h3><p>{c.makeText}</p></article><article className="about-card"><p className="eyebrow">{c.shipEyebrow}</p><h3>{c.shipTitle}</h3><p>{c.shipText}</p></article></div>
      <div className="about-contact"><h3>{c.contact}</h3><p><a href="mailto:aderiva.indierock@gmail.com">aderiva.indierock@gmail.com</a></p><p><a href="https://www.instagram.com/aderiva.store/" target="_blank" rel="noreferrer">Instagram</a> · Zaragoza, Aragón, Spain</p></div>
      <button type="button" className="button button-dark" onClick={goToCollection}>{c.shop} <ArrowRight size={16} /></button>
    </section>
  </main>;
}
