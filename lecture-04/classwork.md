# ლექცია 04: საკლასო სამუშაო

## მიზანი

Interfaces-ისა და Type Aliases-ის პრაქტიკა — User, Product, Order.

## ამოცანა 1: User Interface

```ts
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  age?: number;
  isActive: boolean;
}

// შექმენით ორი User ობიექტი:
// - ერთი სრული ინფორმაციით (phone-ის ჩათვლით)
// - მეორე მინიმალური ინფორმაციით (phone-ს და age-ს გარეშე)

function getUserFullName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}

function getContactInfo(user: User): string {
  if (user.phone) {
    return `Email: ${user.email}, ტელ: ${user.phone}`;
  }
  return `Email: ${user.email}`;
}
```

## ამოცანა 2: Type Aliases

```ts
// 2.1. Category — "electronics" | "clothing" | "food" | "books"
type Category = "electronics" | "clothing" | "food" | "books";

// 2.2. Currency — "GEL" | "USD" | "EUR"
type Currency = "GEL" | "USD" | "EUR";

// 2.3. StockStatus — "in_stock" | "out_of_stock" | "pre_order"
type StockStatus = "in_stock" | "out_of_stock" | "pre_order";

// 2.4. Price — ობიექტი value: number, currency: Currency
type Price = {
  value: number;
  currency: Currency;
};
```

## ამოცანა 3: Product Interface

```ts
interface Product {
  id: number;
  name: string;
  description: string;
  price: Price;
  category: Category;
  stockStatus: StockStatus;
  tags?: string[];
  readonly createdAt: Date;
}

// შექმენით ორი Product:
// 1. Laptop — electronics, in_stock, 2500 GEL
// 2. T-Shirt — clothing, out_of_stock, 45 USD

function formatProduct(product: Product): string {
  return `${product.name} — ${product.price.value} ${product.price.currency} (${product.stockStatus})`;
}

function isAvailable(product: Product): boolean {
  return product.stockStatus === "in_stock";
}
```

## ამოცანა 4: Order Interface

```ts
interface Order {
  id: number;
  user: User;
  products: Product[];
  totalAmount: number;
  currency: Currency;
  status: "pending" | "processing" | "shipped" | "delivered";
  orderedAt: Date;
  deliveredAt?: Date;
}

// 4.1. შექმენით Order ობიექტი
// 4.2. ფუნქცია — ითვლის თანხას ყველა პროდუქტის
function calculateTotal(products: Product[]): number {
  return products.reduce((sum, p) => sum + p.price.value, 0);
}

// 4.3. ფუნქცია — ბეჭდავს შეკვეთის ინფორმაციას
function printOrderSummary(order: Order): void {
  console.log(`შეკვეთა #${order.id}`);
  console.log(`მომხმარებელი: ${getUserFullName(order.user)}`);
  console.log(`პროდუქტები (${order.products.length}):`);
  order.products.forEach(p => console.log(`  - ${formatProduct(p)}`));
  console.log(`სულ: ${order.totalAmount} ${order.currency}`);
}
```

## კითვები

1. როდის გამოვიყენოთ `type` და როდის `interface`?
2. რა ხდება, როდესაც optional property (`?`) არ მიენიჭება?
3. რატომ გვჭირდება `readonly`?
