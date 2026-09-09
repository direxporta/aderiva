import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { products } from '../data';
import { ProductCard } from '../components/ProductCard';
import { useI18n } from '../i18n';

type Props = { liked: number[]; toggleLiked: (index: number) => void; onAddToCart: (productIndex: number, size: string, quantity: number) => void };
const copy = { EN: { saved: 'SAVED PIECES', item: 'item', items: 'items', empty: 'Nothing saved yet.', text: 'Tap the heart on any piece you want to keep an eye on.', browse: 'BROWSE THE COLLECTION' }, ES: { saved: 'PIEZAS GUARDADAS', item: 'artículo', items: 'artículos', empty: 'Aún no hay favoritos.', text: 'Pulsa el corazón de cualquier pieza que quieras guardar.', browse: 'VER LA COLECCIÓN' }, FR: { saved: 'PIÈCES ENREGISTRÉES', item: 'article', items: 'articles', empty: 'Aucun favori pour le moment.', text: 'Appuyez sur le cœur d’une pièce que vous souhaitez garder.', browse: 'DÉCOUVRIR LA COLLECTION' }, DE: { saved: 'GESPEICHERTE TEILE', item: 'Teil', items: 'Teile', empty: 'Noch keine Favoriten.', text: 'Tippe auf das Herz eines Teils, das du speichern möchtest.', browse: 'KOLLEKTION ENTDECKEN' } } as const;

export function Favourites({ liked, toggleLiked, onAddToCart }: Props) {
  const { language, t } = useI18n(); const c = copy[language]; const likedProducts = liked.map((index) => ({ originalIndex: index, product: products[index] })).filter((entry) => entry.product);
  return <section className="shop-section"><div className="section-heading"><div><p className="eyebrow">{c.saved}</p><h2>{t.favourites}</h2></div><p className="section-sub">{likedProducts.length} {likedProducts.length === 1 ? c.item : c.items}</p></div>{likedProducts.length === 0 ? <div className="empty-state"><Heart size={48} strokeWidth={1.2} /><h3>{c.empty}</h3><p>{c.text}</p><Link to="/" className="empty-cta">{c.browse}</Link></div> : <div className="product-grid">{likedProducts.map(({ originalIndex, product }) => <ProductCard key={originalIndex} product={product} index={originalIndex} liked={true} onLike={() => toggleLiked(originalIndex)} onAdd={onAddToCart} />)}</div>}</section>;
}
