import { Link } from "react-router-dom";
import orders from "../data/orders";
import { getOrderTotal, getStatusLabel } from "../utils/orderUtils";

function Orders() {
  return (
    <div>
      <h1>Orders</h1>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>
                <Link to={`/orders/${order.orderId}`}>{order.orderId}</Link>
              </td>
              <td>{order.customer}</td>
              <td>{order.items.length}</td>
              <td>${getOrderTotal(order).toFixed(2)}</td>
              <td>{getStatusLabel(order.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
