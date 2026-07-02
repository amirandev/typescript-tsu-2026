import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { CartItem } from '../models/CartItem';
import { useCart } from '../context/CartContext';

export function CartPage() {
  const { items, formattedTotal, itemCount, removeItem, updateQuantity, clearCart, checkout } = useCart();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!email) {
      alert('Please enter your email');
      return;
    }
    setLoading(true);
    try {
      await checkout(email);
      navigate('/order');
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <h1>Cart is empty</h1>
        <Link to="/" className="continue-shopping">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart ({itemCount} items)</h1>
      <Link to="/" className="continue-shopping">← Continue Shopping</Link>

      <div className="cart-page-layout">
        <ul className="cart-page-items">
          {items.map((item: CartItem) => (
            <li key={item.product.id} className="cart-page-item">
              <img src={item.product.image} alt={item.product.title} className="cart-page-image" />
              <div className="cart-page-info">
                <h3>{item.product.title}</h3>
                <p className="cart-page-category">{item.product.category}</p>
                <p className="cart-page-price">{item.product.formattedPrice} each</p>
                <div className="cart-page-actions">
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="qty-btn">−</button>
                  <span className="qty-value">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="qty-btn">+</button>
                  <button onClick={() => removeItem(item.product.id)} className="remove-btn">Remove</button>
                </div>
                <p className="cart-page-total"><strong>Line total:</strong> {item.formattedTotal}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="checkout-section">
          <h2>Order Summary</h2>
          <p>Items: {itemCount}</p>
          <p className="checkout-total">Total: {formattedTotal}</p>

          <div className="checkout-form">
            <label htmlFor="email">Email for receipt:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
            <button onClick={handleCheckout} disabled={loading} className="checkout-btn">
              {loading ? 'Processing...' : `Pay ${formattedTotal}`}
            </button>
            <button onClick={clearCart} className="clear-btn">Clear Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
