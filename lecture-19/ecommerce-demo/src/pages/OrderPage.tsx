import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function OrderPage() {
  const { lastOrder } = useCart();

  if (!lastOrder) {
    return (
      <div className="order-page">
        <h1>No order found</h1>
        <Link to="/" className="continue-shopping">Go Shopping</Link>
      </div>
    );
  }

  return (
    <div className="order-page">
      <div className="order-success">
        <span className="order-checkmark">✓</span>
        <h1>Order Confirmed!</h1>
      </div>

      <div className="order-details">
        <p><strong>Order ID:</strong> {lastOrder.orderId}</p>
        <p><strong>Email:</strong> {lastOrder.customerEmail}</p>
        <p><strong>Status:</strong> {lastOrder.status}</p>
        <p><strong>Total:</strong> ₾{lastOrder.total.toFixed(2)}</p>
        <p><strong>Items:</strong> {lastOrder.itemCount}</p>
        <p><strong>Payment:</strong> {lastOrder.paymentGateway.name}</p>
        {lastOrder.paymentResult && (
          <p className="transaction-id">
            <strong>Transaction:</strong> {lastOrder.paymentResult.transactionId}
          </p>
        )}
      </div>

      <div className="order-items">
        <h2>Items</h2>
        <ul>
          {lastOrder.cart.items.map(item => (
            <li key={item.product.id} className="order-item">
              <img src={item.product.image} alt={item.product.title} className="order-item-image" />
              <span>{item.product.title} × {item.quantity}</span>
              <span>{item.formattedTotal}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link to="/" className="continue-shopping">Continue Shopping</Link>
    </div>
  );
}
