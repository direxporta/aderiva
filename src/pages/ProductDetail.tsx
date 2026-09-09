import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Mail, X } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getLocalizedProduct, products } from '../data';
import { getProductId } from '../productIds';
import { useI18n } from '../i18n';
import './ProductDetail.css';

export function ProductDetail() {
  const { id } = useParams();
  const product = products.find(item => getProductId(item.name) === id);
  const { language, t } = useI18n();
  const localized = product ? getLocalizedProduct(product, language) : undefined;
  const [size, setSize] = useState(product?.sizes[0] ?? '');
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const openGallery = (index: number) => { setGalleryIndex(index); setGalleryOpen(true); };
  const closeGallery = () => setGalleryOpen(false);
  const showPrevious = () => setGalleryIndex(i => i === 0 ? (product?.gallery.length ?? 1) - 1 : i - 1);
  const showNext = () => setGalleryIndex(i => (i + 1) % (product?.gallery.length ?? 1));

  useEffect(() => {
    if (!galleryOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeGallery();
      if (event.key === 'ArrowLeft') showPrevious();
      if (event.key === 'ArrowRight') showNext();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = ''; };
  }, [galleryOpen]);

  const orderHref = useMemo(() => {
    if (!product || !localized) return '#';
    const subject = encodeURIComponent(`ADeriva.Store order enquiry — ${localized.name}`);
    const body = encodeURIComponent([`Hello ADeriva.Store,`,'',`I would like to order: ${localized.name}`,`Size: ${size}`,`Quantity: ${quantity}`,`Price: €${product.price}`,'',`Name: ${name}`,`Email: ${email}`,`Notes: ${notes}`,'',`Please let me know the next steps for payment and delivery.`].join('\n'));
    return `mailto:aderiva.indierock@gmail.com?subject=${subject}&body=${body}`;
  }, [product, localized, size, quantity, name, email, notes]);

  if (!product || !localized) return <section className="product-detail-empty"><p className="eyebrow">PRODUCT</p><h1>{t.product.notFound}</h1><Link className="button button-dark" to="/#collection">{t.product.back}</Link></section>;

  const activeImage = product.gallery[galleryIndex];
  const submitOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = orderHref;
  };

  return <main className="product-detail">
    <div className="product-detail-back"><Link to="/#collection"><ArrowLeft size={15}/> {t.product.back}</Link></div>
    <div className="product-detail-grid">
      <div className="product-gallery">
        {product.gallery.map((image,i)=><button className="product-gallery-image" key={`${image}-${i}`} type="button" onClick={() => openGallery(i)} aria-label={`Open ${localized.name} image ${i+1}`}><img src={image} alt={`${localized.name} view ${i+1}`}/></button>)}
      </div>
      <div className="product-detail-info"><p className="eyebrow">{localized.category} · {localized.productType}</p><h1>{localized.name}</h1><p className="product-detail-price">€{product.price}</p><p className="product-detail-description">{localized.description}</p><p className="product-detail-shipping">{localized.note}</p><form className="order-panel" onSubmit={submitOrder}><div className="order-field"><label htmlFor="size">{t.product.size}</label><select id="size" value={size} onChange={e=>setSize(e.target.value)}>{product.sizes.map(s=><option key={s}>{s}</option>)}</select></div><div className="order-field"><label htmlFor="quantity">{t.product.quantity}</label><select id="quantity" value={quantity} onChange={e=>setQuantity(Number(e.target.value))}>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n}</option>)}</select></div><div className="order-field"><label htmlFor="order-name">{t.product.name}</label><input id="order-name" name="name" value={name} onChange={e=>setName(e.target.value)} placeholder={t.product.namePlaceholder} required /></div><div className="order-field"><label htmlFor="order-email">{t.product.email}</label><input id="order-email" name="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder={t.product.emailPlaceholder} required /></div><div className="order-field order-field-full"><label htmlFor="order-notes">{t.product.notes}</label><textarea id="order-notes" value={notes} onChange={e=>setNotes(e.target.value)} placeholder={t.product.notesPlaceholder} rows={3}/></div><button className="button button-red order-button" type="submit"><Mail size={16}/> {t.product.request}</button><p className="order-note">{t.product.manual}</p></form></div>
    </div>
    {galleryOpen && <div className="product-lightbox" role="dialog" aria-modal="true" aria-label={`${localized.name} image gallery`} onMouseDown={event => { if (event.target === event.currentTarget) closeGallery(); }}>
      <button className="product-lightbox-close" type="button" onClick={closeGallery} aria-label="Close gallery"><X size={26}/></button>
      {product.gallery.length > 1 && <button className="product-lightbox-arrow product-lightbox-prev" type="button" onClick={showPrevious} aria-label="Previous image"><ChevronLeft size={38}/></button>}
      <img className="product-lightbox-image" src={activeImage} alt={`${localized.name} view ${galleryIndex+1}`}/>
      {product.gallery.length > 1 && <button className="product-lightbox-arrow product-lightbox-next" type="button" onClick={showNext} aria-label="Next image"><ChevronRight size={38}/></button>}
      <div className="product-lightbox-counter">{galleryIndex + 1} / {product.gallery.length}</div>
    </div>}
  </main>;
}
