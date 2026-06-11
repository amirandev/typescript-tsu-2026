import type { Order } from "../types";

export function getOrderTotal(order: Order): number {
  return order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
}

export function getStatusLabel(status: Order["status"]): string {
  const labels: Record<Order["status"], string> = {
    shipped: "🚚 Shipped",
    pending: "⏳ Pending",
    delivered: "✅ Delivered",
    cancelled: "❌ Cancelled",
  };
  return labels[status];
}
