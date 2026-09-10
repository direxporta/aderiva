import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingBag, Truck, RefreshCw, ShieldCheck, X } from 'lucide-react';
import { products } from '../data';
import { ProductCard } from '../components/ProductCard';
import { useI18n } from '../i18n';
import { getProductCopy } from '../productTranslations';
import { getProductId } from '../productIds';
import './Product.css';

type Props = { liked: number[]; toggleLiked: (index: number) => void; onAddToCart: (productIndex: number, size: string, quantity: number) => void };

export function Product({ onAddToCart }: Props) {
  const { id } = useParams(); const index = products.findIndex(item => getProductId(item.name) === id); const product = products[index]; const { language, t } = useI18n();
  const [activeImage, setActiveImage] = useState(0); const [lightboxOpen, setLightboxOpen] = useState(false); const [selectedSize, setSelectedSize] = useState<string | null>(null); const [qty, setQty] = useState(1); const [added, setAdded] = useState(false);
  if (!product) return <section className="shop-section"><div className="empty-state"><h3>Product not found</h3><p>This piece may have sold out or been removed.</p><Link to="/" className="empty-cta">{t.viewAll}</Link></div></section>;
  const localized = getProductCopy(index, language); const gallery = product.gallery.length ? product.gallery.slice(0,6) : [product.image]; const lowStock = product.stock <= 10;
  const pairWithProducts = product.pairWith.map(i=>({originalIndex:i,product:products[i]})).filter(e=>e.product); const othersLoveProducts = product.othersLove.map(i=>({originalIndex:i,product:products[i]})).filter(e=>e.product);
  const handleAddToBag=()=>{const size=selectedSize??product.sizes[0];onAddToCart(index,size,qty);setAdded(true);setTimeout(()=>setAdded(false),2000)};
  const previousImage=()=>setActiveImage(c=>(c-1+gallery.length)%gallery.length); const nextImage=()=>setActiveImage(c=>(c+1)%gallery.length);
  return <>
    <section className="shop-section product-page-clean">
      <div className="product-detail-grid">
        <div className="product-gallery">
          <div className="product-gallery-main-wrap">
            <button className="product-gallery-main" type="button" onClick={()=>setLightboxOpen(true)} aria-label={`${localized.name} — open image gallery`}><img src={gallery[activeImage]} alt={localized.name} draggable={false}/></button>
            {gallery.length>1&&<><button className="product-gallery-arrow product-gallery-arrow-prev" type="button" onClick={e=>{e.stopPropagation();previousImage()}} aria-label="Previous product image"><ChevronLeft size={24}/></button><button className="product-gallery-arrow product-gallery-arrow-next" type="button" onClick={e=>{e.stopPropagation();nextImage()}} aria-label="Next product image"><ChevronRight size={24}/></button></>}
          </div>
          <div className="product-gallery-thumbs">{gallery.map((img,i)=><button type="button" key={`${img}-${i}`} className={activeImage===i?'active':''} onClick={()=>setActiveImage(i)} aria-label={`${localized.name} — image ${i+1}`}><img src={img} alt="" loading="lazy" draggable={false}/></button>)}</div>
        </div>
        <div className="product-info"><p className="eyebrow">{localized.category}</p><h1 className="product-detail-title">{localized.name}</h1><span className="product-detail-price">€{product.price}</span>
          <div className={`stock-badge ${lowStock?'low':'in'}`}>{product.stock>0?(lowStock?`${product.stock} ${language==='ES'?'unidades disponibles':language==='FR'?'pièces restantes':language==='DE'?'Stück übrig':'left in stock'}`:language==='ES'?'En stock':language==='FR'?'En stock':language==='DE'?'Auf Lager':'In stock'):language==='ES'?'Agotado':language==='FR'?'Épuisé':language==='DE'?'Ausverkauft':'Sold out'}</div>
          <p className="product-detail-description">{localized.description}</p>
          <details className="size-chart size-chart-inline"><summary>Size chart & fit guide</summary><div className="size-chart-table"><table><thead><tr><th>{t.size}</th><th>Chest (cm)</th><th>Length (cm)</th><th>Shoulder (cm)</th></tr></thead><tbody>{[['XS','92','66','42'],['S','96','68','44'],['M','100','70','46'],['L','104','72','48'],['XL','108','74','50'],['XXL','112','76','52']].map(r=><tr key={r[0]}>{r.map(c=><td key={c}>{c}</td>)}</tr>)}</tbody></table><p className="size-chart-note">All measurements are approximate and based on the garment laid flat.</p></div></details>
          <div className="product-detail-section"><p className="detail-label">{t.size}</p><div className="size-selector">{product.sizes.map(size=><button type="button" key={size} className={selectedSize===size?'active':''} onClick={()=>setSelectedSize(size)}>{size}</button>)}</div></div>
          <div className="product-detail-section"><p className="detail-label">{t.quantity}</p><div className="qty-selector"><button type="button" onClick={()=>setQty(q=>Math.max(1,q-1))} aria-label="Decrease quantity"><Minus size={15}/></button><span>{qty}</span><button type="button" onClick={()=>setQty(q=>q+1)} aria-label="Increase quantity"><Plus size={15}/></button></div></div>
          <div className="product-actions"><button type="button" className={`add-to-bag-btn ${added?'added':''}`} onClick={handleAddToBag} disabled={!selectedSize&&product.sizes.length>1}><span>{added?t.success:'ADD TO CART'}</span><ShoppingBag size={16}/></button></div>
          {!selectedSize&&product.sizes.length>1&&<p className="size-hint">{t.selectSize}</p>}
          <div className="product-perks"><div><Truck size={17}/><span>{t.shipping}</span></div><div><RefreshCw size={17}/><span>30-day easy returns</span></div><div><ShieldCheck size={17}/><span>{t.orderEmail}</span></div></div>
        </div>
      </div>
      {pairWithProducts.length>0&&<section className="shop-section related-products-section"><div className="section-heading"><div><p className="eyebrow">COMPLETE THE LOOK</p><h2>Pair this <em>with.</em></h2></div></div><div className="product-grid">{pairWithProducts.map(({originalIndex,product:p})=><ProductCard key={originalIndex} product={p} index={originalIndex} liked={false} onLike={()=>{}} onAdd={onAddToCart}/>)}</div></section>}
      {othersLoveProducts.length>0&&<section className="shop-section related-products-section"><div className="section-heading"><div><p className="eyebrow">YOU MAY ALSO LIKE</p><h2>Others also <em>love.</em></h2></div></div><div className="product-grid">{othersLoveProducts.map(({originalIndex,product:p})=><ProductCard key={originalIndex} product={p} index={originalIndex} liked={false} onLike={()=>{}} onAdd={onAddToCart}/>)}</div></section>}
    </section>
    {lightboxOpen&&<div className="product-lightbox" role="dialog" aria-modal="true" aria-label={localized.name} onClick={()=>setLightboxOpen(false)}><button className="product-lightbox-close" type="button" onClick={()=>setLightboxOpen(false)} aria-label={t.close}><X size={24}/></button>{gallery.length>1&&<button className="product-lightbox-arrow product-lightbox-prev" type="button" onClick={e=>{e.stopPropagation();previousImage()}} aria-label="Previous image"><ChevronLeft size={30}/></button>}<img className="product-lightbox-image" src={gallery[activeImage]} alt={`${localized.name} ${activeImage+1}`} onClick={e=>e.stopPropagation()}/>{gallery.length>1&&<button className="product-lightbox-arrow product-lightbox-next" type="button" onClick={e=>{e.stopPropagation();nextImage()}} aria-label="Next image"><ChevronRight size={30}/></button>}<div className="product-lightbox-counter">{activeImage+1} / {gallery.length}</div></div>}
  </>;
}
