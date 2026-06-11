export interface OrderItem {
  product: string;
  price: number;
  quantity: number;
}

export interface Order {
  orderId: number;
  customer: string;
  items: OrderItem[];
  status: "shipped" | "pending" | "delivered" | "cancelled";
}
