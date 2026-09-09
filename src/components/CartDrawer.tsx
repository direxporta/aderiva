import { useState, type FormEvent } from 'react';
import { Minus, Plus, ShoppingBag, X, ArrowRight } from 'lucide-react';
import type { Product } from '../data';
import { useI18n } from '../i18n';
import './cart.css';

export type CartItem = { productIndex: number; size: string; quantity: number };
type Props = { items: CartItem[]; products: Product[]; onClose: () => void; onChangeQuantity: (productIndex: number, size: string, delta: number) => void; onRemove: (productIndex: number, size: string) => void };

export function CartDrawer({ items, products, onClose, onChangeQuantity, onRemove }: Props) {
  const { t } = useI18n();
  const [orderOpen, setOrderOpen] = useState(false);
  const [email, setEmail] = useState('');
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + Number.parseFloat(products[item.productIndex]?.price ?? '0') * item.quantity, 0);
  const orderLines = items.map((item) => { const product = products[item.productIndex]; return `${product?.name ?? 'Item'} — size ${item.size} — ${item.quantity} × €${product?.price ?? '0.00'}`; }).join('\n');
  const orderMessage = `Hello ADeriva,\n\nI would like to place the following order:\n\n${orderLines}\n\nSubtotal: €${total.toFixed(2)}\n\nMy email: ${email}\n\nPlease let me know how we can proceed with payment and shipping.`;
  const sendOrder = (event: FormEvent) => { event.preventDefault(); const subject = encodeURIComponent(`ADeriva order — ${totalItems} item${totalItems === 1 ? '' : 's'}`); window.location.href = `mailto:aderiva.indierock@gmail.com?subject=${subject}&body=${encodeURIComponent(orderMessage)}`; setOrderOpen(false); };

  return <div className="cart-drawer-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <div className="cart-drawer-header"><div><p className="eyebrow">{t.yourBag}</p><h2 id="cart-title">{t.cart} <em>({totalItems})</em></h2></div><button className="cart-drawer-close" onClick={onClose} aria-label={t.close}><X size={20} /></button></div>
      {items.length === 0 ? <div className="cart-empty"><ShoppingBag size={28} /><p>{t.emptyCart}</p><span>{t.emptyCartHint}</span></div> : <><div className="cart-items">{items.map((item) => { const product = products[item.productIndex]; if (!product) return null; return <article className="cart-item" key={`${item.productIndex}-${item.size}`}><img src={product.image} alt={product.name} /><div className="cart-item-info"><p>{product.category}</p><h3>{product.name}</h3><span>{t.size}: {item.size}</span><strong>€{(Number.parseFloat(product.price) * item.quantity).toFixed(2)}</strong><div className="cart-item-controls"><div className="qty-selector"><button onClick={() => onChangeQuantity(item.productIndex, item.size, -1)} aria-label={`Decrease ${product.name}`}><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => onChangeQuantity(item.productIndex, item.size, 1)} aria-label={`Increase ${product.name}`}><Plus size={13} /></button></div><button className="cart-remove" onClick={() => onRemove(item.productIndex, item.size)}>{t.remove}</button></div></div></article>; })}</div><div className="cart-drawer-footer"><div><span>{t.subtotal}</span><strong>€{total.toFixed(2)}</strong></div><p>{t.shipping}</p><button className="button button-dark cart-checkout" onClick={() => setOrderOpen(true)}>{t.orderEmail} <ArrowRight size={16} /></button></div></>}
    </aside>
    {orderOpen && <div className="contact-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOrderOpen(false); }}><section className="contact-modal order-modal" role="dialog" aria-modal="true" aria-labelledby="order-title"><button className="contact-modal-close" type="button" onClick={() => setOrderOpen(false)} aria-label={t.close}><X size={20} /></button><p className="eyebrow">{t.orderEmail}</p><h2 id="order-title">{t.emailCheckoutTitle}</h2><p className="order-intro">We have prepared your order below. Add your email and click send — your mail app will open with everything already filled in.</p><div className="order-preview">{items.map((item) => { const product = products[item.productIndex]; return <div key={`${item.productIndex}-${item.size}`}><span>{product?.name} · {item.size} × {item.quantity}</span><strong>€{(Number.parseFloat(product?.price ?? '0') * item.quantity).toFixed(2)}</strong></div>; })}<div className="order-preview-total"><span>{t.subtotal.toUpperCase()}</span><strong>€{total.toFixed(2)}</strong></div></div><form onSubmit={sendOrder}><label htmlFor="order-email">{t.yourEmail}</label><input id="order-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="your@email.com" required /><button className="button button-dark contact-submit" type="submit">{t.openEmail} <ArrowRight size={16} /></button></form></section></div>}
  </div>;
}
