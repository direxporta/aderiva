import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, Mail, ArrowLeft } from 'lucide-react';
import { products } from '../data';
import { getProductCopy } from '../productTranslations';
import { useCart } from '../cart';
import { useI18n } from '../i18n';

export function Cart() {
  const { language } = useI18n();
  const { items, updateQuantity, removeItem } = useCart();
  const entries = items.map(item => ({ item, product: products[item.productIndex] })).filter(e => e.product);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const emailBody = `Hello, I would like to request the following products:\n\n${entries.map(({ item, product }) => { const p = getProductCopy(item.productIndex, language); return `• ${p.name} — Size: ${item.size} — Quantity: ${item.quantity}`; }).join('\n')}\n\nName:\nCountry:\nAdditional comments:\n`;

  return <section className="shop-section cart-page">
    <div className="section-heading"><div><p className="eyebrow">YOUR CART</p><h1>YOUR <em>SELECTION.</em></h1></div></div>
    {entries.length === 0 ? <div className="cart-empty"><p>Your cart is empty.</p><Link className="button button-red" to="/"><ArrowLeft size={16}/> CONTINUE SHOPPING</Link></div> : <>
      <div className="cart-items">{entries.map(({ item, product }) => { const localized = getProductCopy(item.productIndex, language); return <article className="cart-item" key={`${item.productIndex}-${item.size}`}>
        <Link to={`/product/${item.productIndex}`}><img src={product.image} alt={localized.name}/></Link>
        <div className="cart-item-info"><p className="eyebrow">{localized.category}</p><h3>{localized.name}</h3><p>SIZE <strong>{item.size}</strong></p><div className="cart-quantity"><button type="button" onClick={() => updateQuantity(item.productIndex, item.size, item.quantity - 1)}><Minus size={14}/></button><span>{item.quantity}</span><button type="button" onClick={() => updateQuantity(item.productIndex, item.size, item.quantity + 1)}><Plus size={14}/></button></div></div>
        <button className="cart-remove" type="button" onClick={() => removeItem(item.productIndex, item.size)} aria-label="Remove item"><Trash2 size={18}/></button>
      </article>; })}</div>
      <div className="cart-request"><div><p className="eyebrow">REQUEST SUMMARY</p><h3>{totalItems} {totalItems === 1 ? 'item' : 'items'} ready to request</h3><p>Your request will include every product, selected size and quantity.</p></div><a className="add-to-cart-button" href={`mailto:aderiva.indierock@gmail.com?subject=${encodeURIComponent('ADeriva Store — product request')}&body=${encodeURIComponent(emailBody)}`}><Mail size={17}/> REQUEST VIA E-MAIL</a></div>
    </>}
  </section>;
}
