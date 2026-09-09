import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart, Minus, Plus, ShoppingBag, Truck, RefreshCw, ShieldCheck, X } from 'lucide-react';
import { products } from '../data';
import { ProductCard } from '../components/ProductCard';
import { useI18n } from '../i18n';
import { getProductCopy } from '../productTranslations';

type Props = { liked: number[]; toggleLiked: (index: number) => void; onAddToCart: (productIndex: number, size: string, quantity: number) => void };

export function Product({ liked, toggleLiked, onAddToCart }: Props) {
  const { id } = useParams();
  const index = Number(id);
  const product = products[index];
  const { language, t } = useI18n();
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return <section className="shop-section"><div className="empty-state"><h3>Product not found</h3><p>This piece may have sold out or been removed.</p><Link to="/" className="empty-cta">{t.viewAll}</Link></div></section>;

  const localized = getProductCopy(index, language);
  const gallery = product.gallery.length ? product.gallery.slice(0, 6) : [product.image];
  const isLiked = liked.includes(index);
  const lowStock = product.stock <= 10;
  const pairWithProducts = product.pairWith.map((i) => ({ originalIndex: i, product: products[i] })).filter((entry) => entry.product);
  const othersLoveProducts = product.othersLove.map((i) => ({ originalIndex: i, product: products[i] })).filter((entry) => entry.product);
  const handleAddToBag = () => { const size = selectedSize ?? product.sizes[0]; onAddToCart(index, size, qty); setAdded(true); setTimeout(() => setAdded(false), 2000); };
  const discountedPrice = (parseFloat(product.price) * 0.9).toFixed(2);
  const bundleSavings = (parseFloat(product.price) * 0.1).toFixed(2);
  const categoryPath = product.category === 'WOMEN' ? 'women' : product.category === 'MEN' ? 'men' : 'unisex';
  const previousImage = () => setActiveImage((current) => (current - 1 + gallery.length) % gallery.length);
  const nextImage = () => setActiveImage((current) => (current + 1) % gallery.length);
  const openGallery = () => setLightboxOpen(true);

  return <>
    <section className="shop-section" style={{ paddingTop: '30px' }}>
      <nav className="breadcrumb"><Link to="/">Home</Link><ChevronRight size={12} /><Link to={`/${categoryPath}`}>{localized.category}</Link><ChevronRight size={12} /><span>{localized.name}</span></nav>
      <div className="product-detail-grid">
        <div className="product-gallery" style={{ position: 'relative', zIndex: 100 }}>
          <button className="product-gallery-main" type="button" onClick={openGallery} aria-label={`${localized.name} — open image gallery`} title="Open image gallery" style={{ display: 'block', position: 'relative', zIndex: 101, width: '100%', padding: 0, margin: 0, border: 0, background: '#030303', cursor: 'zoom-in', pointerEvents: 'auto' }}>
            <img src={gallery[activeImage]} alt={localized.name} draggable={false} style={{ display: 'block', width: '100%', pointerEvents: 'none', userSelect: 'none' }} />
          </button>
          <div className="product-gallery-thumbs" style={{ position: 'relative', zIndex: 102 }}>{gallery.map((img, i) => <button type="button" key={`${img}-${i}`} className={activeImage === i ? 'active' : ''} onClick={() => setActiveImage(i)} aria-label={`${localized.name} — image ${i + 1}`} style={{ cursor: 'pointer', pointerEvents: 'auto' }}><img src={img} alt="" loading="lazy" draggable={false} style={{ pointerEvents: 'none' }} /></button>)}</div>
        </div>
        <div className="product-info">
          <p className="eyebrow">{localized.category}</p><h1 className="product-detail-title">{localized.name}</h1><span className="product-detail-price">€{product.price}</span>
          <div className={`stock-badge ${lowStock ? 'low' : 'in'}`}>{product.stock > 0 ? lowStock ? `${product.stock} ${language === 'ES' ? 'unidades disponibles' : language === 'FR' ? 'pièces restantes' : language === 'DE' ? 'Stück übrig' : 'left in stock'}` : language === 'ES' ? 'En stock' : language === 'FR' ? 'En stock' : language === 'DE' ? 'Auf Lager' : 'In stock' : language === 'ES' ? 'Agotado' : language === 'FR' ? 'Épuisé' : language === 'DE' ? 'Ausverkauft' : 'Sold out'}</div>
          <p className="product-detail-description">{localized.description}</p>
          <div className="product-detail-section"><p className="detail-label">{t.size}</p><div className="size-selector">{product.sizes.map((size) => <button type="button" key={size} className={selectedSize === size ? 'active' : ''} onClick={() => setSelectedSize(size)}>{size}</button>)}</div></div>
          <div className="product-detail-section"><p className="detail-label">{t.quantity}</p><div className="qty-selector"><button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label={t.quantity}><Minus size={15} /></button><span>{qty}</span><button type="button" onClick={() => setQty((q) => q + 1)} aria-label={t.quantity}><Plus size={15} /></button></div></div>
          <div className="product-actions"><button type="button" className={`add-to-bag-btn ${added ? 'added' : ''}`} onClick={handleAddToBag} disabled={!selectedSize && product.sizes.length > 1}>{added ? t.success : t.addToBag} <ShoppingBag size={17} /></button><button type="button" className={isLiked ? 'like-detail liked' : 'like-detail'} onClick={() => toggleLiked(index)} aria-label={isLiked ? t.remove : t.favourites}><Heart size={19} fill={isLiked ? 'currentColor' : 'none'} /></button></div>
          {!selectedSize && product.sizes.length > 1 && <p className="size-hint">{t.selectSize}</p>}
          <div className="product-perks"><div><Truck size={17} /><span>{t.shipping}</span></div><div><RefreshCw size={17} /><span>30-day easy returns</span></div><div><ShieldCheck size={17} /><span>{t.orderEmail}</span></div></div>
        </div>
      </div>
      <div className="product-detail-section size-chart-section"><details className="size-chart"><summary>Size chart & fit guide</summary><div className="size-chart-table"><table><thead><tr><th>{t.size}</th><th>Chest (cm)</th><th>Length (cm)</th><th>Shoulder (cm)</th></tr></thead><tbody><tr><td>XS</td><td>92</td><td>66</td><td>42</td></tr><tr><td>S</td><td>96</td><td>68</td><td>44</td></tr><tr><td>M</td><td>100</td><td>70</td><td>46</td></tr><tr><td>L</td><td>104</td><td>72</td><td>48</td></tr><tr><td>XL</td><td>108</td><td>74</td><td>50</td></tr><tr><td>XXL</td><td>112</td><td>76</td><td>52</td></tr></tbody></table><p className="size-chart-note">All measurements are approximate and based on the garment laid flat. Allow a 1–2cm variance. For a relaxed fit, size up.</p></div></details></div>
      {pairWithProducts.length > 0 && <section className="shop-section" style={{ paddingTop: '40px', paddingBottom: '20px' }}><div className="section-heading"><div><p className="eyebrow">COMPLETE THE LOOK</p><h2>Pair this <em>with.</em></h2></div><div className="bundle-deal"><span className="bundle-price">€{discountedPrice}</span><span className="bundle-save">Save €{bundleSavings} (10% off)</span></div></div><div className="product-grid">{pairWithProducts.map(({ originalIndex, product: p }) => <ProductCard key={originalIndex} product={p} index={originalIndex} liked={liked.includes(originalIndex)} onLike={() => toggleLiked(originalIndex)} onAdd={onAddToCart} />)}</div></section>}
      {othersLoveProducts.length > 0 && <section className="shop-section" style={{ paddingTop: '20px', paddingBottom: '80px' }}><div className="section-heading"><div><p className="eyebrow">COMMUNITY PICKS</p><h2>Others also <em>love.</em></h2></div></div><div className="product-grid">{othersLoveProducts.map(({ originalIndex, product: p }) => <ProductCard key={originalIndex} product={p} index={originalIndex} liked={liked.includes(originalIndex)} onLike={() => toggleLiked(originalIndex)} onAdd={onAddToCart} />)}</div></section>}
    </section>

    {lightboxOpen && <div className="product-lightbox" role="dialog" aria-modal="true" aria-label={localized.name} onClick={() => setLightboxOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(3,3,3,.96)', pointerEvents: 'auto' }}>
      <button className="product-lightbox-close" type="button" onClick={() => setLightboxOpen(false)} aria-label={t.close} style={{ position: 'absolute', top: 20, right: 20, zIndex: 100002, pointerEvents: 'auto', cursor: 'pointer' }}><X size={24} /></button>
      {gallery.length > 1 && <button className="product-lightbox-nav product-lightbox-prev" type="button" onClick={(event) => { event.stopPropagation(); previousImage(); }} aria-label="Previous image" style={{ position: 'absolute', left: 20, top: '50%', zIndex: 100002, pointerEvents: 'auto', cursor: 'pointer' }}><ChevronLeft size={30} /></button>}
      <img className="product-lightbox-image" src={gallery[activeImage]} alt={`${localized.name} ${activeImage + 1}`} onClick={(event) => event.stopPropagation()} style={{ position: 'relative', zIndex: 100000, maxWidth: '90vw', maxHeight: '88vh', width: 'auto', height: 'auto', objectFit: 'contain', pointerEvents: 'auto' }} />
      {gallery.length > 1 && <button className="product-lightbox-nav product-lightbox-next" type="button" onClick={(event) => { event.stopPropagation(); nextImage(); }} aria-label="Next image" style={{ position: 'absolute', right: 20, top: '50%', zIndex: 100002, pointerEvents: 'auto', cursor: 'pointer' }}><ChevronRight size={30} /></button>}
      <div className="product-lightbox-counter" style={{ position: 'absolute', bottom: 20, left: 0, right: 0, zIndex: 100002, textAlign: 'center', pointerEvents: 'none' }}>{activeImage + 1} / {gallery.length}</div>
    </div>}
  </>;
}
