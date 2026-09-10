import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Podcast } from './pages/Podcast';
import { About } from './pages/About';
import { Product } from './pages/Product';
import { Cart } from './pages/Cart';
import { I18nProvider } from './i18n';
import { CartProvider, useCart } from './cart';

function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();
  useEffect(() => {
    const savePosition = () => sessionStorage.setItem(`aderiva-scroll:${location.key}`, String(window.scrollY));
    window.addEventListener('scroll', savePosition, { passive: true });
    return () => window.removeEventListener('scroll', savePosition);
  }, [location.key]);
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (location.hash) {
        const target = document.getElementById(location.hash.slice(1));
        if (target) { const header = document.querySelector('.site-header') as HTMLElement | null; const offset = (header?.getBoundingClientRect().height ?? 0) + 12; window.scrollTo(0, Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset)); return; }
      }
      if (navigationType === 'POP') window.scrollTo(0, Number(sessionStorage.getItem(`aderiva-scroll:${location.key}`) ?? 0)); else window.scrollTo(0, 0);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location.key, location.hash, navigationType]);
  return null;
}

function ShopRoutes() {
  const { items, addItem } = useCart();
  return <Routes><Route element={<Layout />}><Route index element={<Home />} /><Route path="collections" element={<Home />} /><Route path="product/:id" element={<Product liked={[]} toggleLiked={() => {}} onAddToCart={addItem} />} /><Route path="podcast" element={<Podcast />} /><Route path="about" element={<About />} /><Route path="cart" element={<Cart />} /></Route></Routes>;
}

function App() {
  return <I18nProvider><BrowserRouter><CartProvider><ScrollManager /><ShopRoutes /></CartProvider></BrowserRouter></I18nProvider>;
}

export default App;
