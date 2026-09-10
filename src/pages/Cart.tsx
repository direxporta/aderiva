import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, Mail, ArrowLeft } from 'lucide-react';
import { products } from '../data';
import { getProductCopy } from '../productTranslations';
import { useCart } from '../cart';
import { useI18n } from '../i18n';
import './Cart.css';

export function Cart() {
  const { language } = useI18n();
  const { items, updateQuantity, removeItem } = useCart();
  const entries = items.map(item => ({ item, product: products[item.productIndex] })).filter(e => e.product);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const emailBody = `Hello, I would like to request the following products:\n\n${entries.map(({ item }) => { const p = getProductCopy(item.productIndex, language); return `• ${p.name} — Size: ${item.size} — Quantity: ${item.quantity}`; }).join('\n')}\n\nName:\nCountry:\nAdditional comments:\n`;

  return <section className="shop-section cart-page">
    <div className="section-heading"><div><p className="eyebrow">YOUR CART</p><h1>YOUR <em>SELECTION.</em></h1></div></div>
    {entries.length === 0 ? <div className="cart-empty"><p>Your cart is empty.</p><Link className="button button-red" to="/"><ArrowLeft size={16}/> CONTINUE SHOPPING</Link></div> : <>
      <div className="cart-items">{entries.map(({ item, product }) => { const localized = getProductCopy(item.productIndex, language); return <article className="cart-item" key={`${item.productIndex}-${item.size}`}>
        <Link className="cart-item-image" to={`/product/${item.productIndex}`}><img src={product.image} alt={localized.name}/></Link>
        <div className="cart-item-info"><p className="eyebrow">{localized.category}</p><h3>{localized.name}</h3><div className="cart-size">SIZE <strong>{item.size}</strong></div><div className="cart-controls"><div className="cart-quantity"><button type="button" onClick={() => updateQuantity(item.productIndex, item.size, item.quantity - 1)} aria-label="Decrease quantity"><Minus size={14}/></button><span>{item.quantity}</span><button type="button" onClick={() => updateQuantity(item.productIndex, item.size, item.quantity + 1)} aria-label="Increase quantity"><Plus size={14}/></button></div><button className="cart-remove" type="button" onClick={() => removeItem(item.productIndex, item.size)}><Trash2 size={16}/> REMOVE</button></div></div>
      </article>; })}</div>
      <div className="cart-request"><div className="cart-request-copy"><p className="eyebrow">READY TO REQUEST?</p><h3>{totalItems} {totalItems === 1 ? 'item' : 'items'} in your selection</h3><p>Check your selection above, then send your request. We will confirm availability and the next steps by e-mail.</p></div><a className="cart-email-button" href={`mailto:aderiva.indierock@gmail.com?subject=${encodeURIComponent('ADeriva Store — product request')}&body=${encodeURIComponent(emailBody)}`}><Mail size={20}/><span>REQUEST VIA E-MAIL</span></a></div>
      <div className="cart-how-it-works"><p className="eyebrow">HOW IT WORKS</p><h3>A LITTLE DIFFERENT. A LITTLE MORE PERSONAL.</h3><p>ADeriva is a small independent brand, and we are still building our store. We do not have a full online checkout or payment system in place yet.</p><p>Instead, we use a simple request system. When you click <strong>REQUEST VIA E-MAIL</strong>, your selection is prepared in an e-mail for us. We will then check availability, confirm the details with you and arrange payment and delivery directly.</p><p>This also means we can answer questions, help with sizes and make sure everything is right before you place your order.</p></div>
    </>}
  </section>;
}
