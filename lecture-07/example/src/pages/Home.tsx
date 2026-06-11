import orders from "../data/orders";

function Home() {
  const totalOrders = orders.length;
  const shippedCount = orders.filter((o) => o.status === "shipped").length;
  const pendingCount = orders.filter((o) => o.status === "pending").length;

  return (
    <div>
      <h1>Order Dashboard</h1>
      <p>Welcome to the order management system.</p>
      <ul>
        <li>Total orders: {totalOrders}</li>
        <li>Shipped: {shippedCount}</li>
        <li>Pending: {pendingCount}</li>
      </ul>
    </div>
  );
}

export default Home;
