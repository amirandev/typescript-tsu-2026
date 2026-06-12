import { useParams, useNavigate } from "react-router-dom";
import orders from "../data/orders";
import { getOrderTotal, getStatusLabel } from "../utils/orderUtils";

function OrderDetail() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const order = orders.find((o) => o.orderId === Number(orderId));

  if (!order) {
    return <p>Order not found</p>;
  }

  return (
    <div>
      <h1>Order #{order.orderId}</h1>
      <p><strong>Customer:</strong> {order.customer}</p>
      <p><strong>Status:</strong> {getStatusLabel(order.status)}</p>
      <h2>Items</h2>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, i) => (
            <tr key={i}>
              <td>{item.product}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}><strong>Total</strong></td>
            <td><strong>${getOrderTotal(order).toFixed(2)}</strong></td>
          </tr>
        </tfoot>
      </table>
      <br />
      <button onClick={() => navigate("/orders")}>Back to Orders</button>
    </div>
  );
}

export default OrderDetail;
