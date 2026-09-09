import { Heart, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../data';
import { useI18n } from '../i18n';
import { getProductCopy } from '../productTranslations';
import './product-card.css';

type Props = { product: Product; index: number; liked: boolean; onLike: () => void; onAdd: (productIndex: number, size: string, quantity: number) => void };

export function ProductCard({ product, index, liked, onLike, onAdd }: Props) {
  const { language, t } = useI18n();
  const localized = getProductCopy(index, language);
  const [sizeOpen, setSizeOpen] = useState(false);
  const handleAdd = () => { if (product.sizes.length === 1) onAdd(index, product.sizes[0], 1); else setSizeOpen(true); };
  return <article className="product-card">
    <Link to={`/product/${index}`} className="product-card-link"><div className={`product-image ${product.color}`}><img src={product.image} alt={localized.name} loading="lazy" /><div className="product-image-overlay" /><span className="product-note">{localized.note}</span><span className="product-index">0{index + 1}</span></div><div className="product-details"><div><p>{localized.category}</p><h3>{localized.name}</h3></div><span>€{product.price}</span></div></Link>
    <button className={liked ? 'like liked' : 'like'} onClick={onLike} aria-label={`${liked ? t.remove : t.favourites}: ${localized.name}`}><Heart size={17} fill={liked ? 'currentColor' : 'none'} /></button>
    <button className="add-button" onClick={handleAdd}>{t.addToBag} <Plus size={15} /></button>
    {sizeOpen && <div className="size-picker-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSizeOpen(false); }}><div className="size-picker" role="dialog" aria-modal="true" aria-label={`${t.selectSize}: ${localized.name}`}><button className="size-picker-close" onClick={() => setSizeOpen(false)} aria-label={t.close}><X size={17} /></button><p className="eyebrow">{t.selectSize}</p><h3>{localized.name}</h3><div className="size-picker-options">{product.sizes.map((size) => <button key={size} onClick={() => { onAdd(index, size, 1); setSizeOpen(false); }}>{size}</button>)}</div></div></div>}
  </article>;
}
