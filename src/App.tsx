import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Podcast } from './pages/Podcast';
import { About } from './pages/About';
import { ProductDetail } from './pages/ProductDetail';
import { I18nProvider } from './i18n';

function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const savePosition = () => {
      sessionStorage.setItem(`aderiva-scroll:${location.key}`, String(window.scrollY));
    };

    window.addEventListener('scroll', savePosition, { passive: true });
    return () => window.removeEventListener('scroll', savePosition);
  }, [location.key]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (location.hash) {
        const target = document.getElementById(location.hash.slice(1));
        if (target) {
          const header = document.querySelector('.site-header') as HTMLElement | null;
          const offset = (header?.getBoundingClientRect().height ?? 0) + 12;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo(0, Math.max(0, top));
          return;
        }
      }

      if (navigationType === 'POP') {
        const savedPosition = Number(sessionStorage.getItem(`aderiva-scroll:${location.key}`) ?? 0);
        window.scrollTo(0, savedPosition);
      } else {
        window.scrollTo(0, 0);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.key, location.hash, navigationType]);

  return null;
}

function App() {
  return <I18nProvider><BrowserRouter><ScrollManager /><Routes><Route element={<Layout />}><Route index element={<Home />} /><Route path="collections" element={<Home />} /><Route path="product/:id" element={<ProductDetail />} /><Route path="podcast" element={<Podcast />} /><Route path="about" element={<About />} /></Route></Routes></BrowserRouter></I18nProvider>;
}

export default App;
