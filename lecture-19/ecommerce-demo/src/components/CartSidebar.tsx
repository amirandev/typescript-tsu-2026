import { Link } from 'react-router-dom';
import type { CartItem } from '../models/CartItem';
import { useCart } from '../context/CartContext';

export function CartSidebar() {
  const { items, formattedTotal, itemCount, removeItem, updateQuantity } = useCart();

  return (
    <aside className="cart-sidebar">
      <h2>Shopping Cart ({itemCount})</h2>
      {items.length === 0 ? (
        <p className="cart-empty">Cart is empty</p>
      ) : (
        <>
          <ul className="cart-items">
            {items.map((item: CartItem) => (
              <li key={item.product.id} className="cart-item">
                <img src={item.product.image} alt={item.product.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <p className="cart-item-title">{item.product.title}</p>
                  <p className="cart-item-price">
                    {item.product.formattedPrice} × {item.quantity}
                  </p>
                  <p className="cart-item-total">{item.formattedTotal}</p>
                  <div className="cart-item-actions">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="qty-btn"
                    >
                      -
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="qty-btn"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="remove-btn"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <p className="cart-total">Total: {formattedTotal}</p>
            <Link to="/cart" className="view-cart-btn">View Cart</Link>
          </div>
        </>
      )}
    </aside>
  );
}
