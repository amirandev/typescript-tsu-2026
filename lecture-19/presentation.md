# ლექცია 19 — Classes & OOP in TypeScript (რეალური მაგალითები)

## 1. კლასების საფუძვლები (Classes Basics)

```typescript
class Product {
  id: number;
  title: string;
  price: number;

  constructor(id: number, title: string, price: number) {
    this.id = id;
    this.title = title;
    this.price = price;
  }

  formattedPrice(): string {
    return `₾${this.price.toFixed(2)}`;
  }
}

const phone = new Product(1, 'iPhone 15', 1499);
console.log(phone.formattedPrice()); // ₾1499.00
```

**რეალური გამოყენება**: ეკომერსის პროდუქტის მოდელი — თითოეული პროდუქტი არის `Product` კლასის ინსტანცია, რომელსაც აქვს საკუთარი id, title, price.

---

## 2. Access Modifiers (წვდომის მოდიფიკატორები)

| Modifier | კლასში | შთამომავალში | გარედან |
|----------|--------|---------------|---------|
| `public` (default) | ✓ | ✓ | ✓ |
| `private` | ✓ | ✗ | ✗ |
| `protected` | ✓ | ✓ | ✗ |

```typescript
class Payment {
  public id: string;
  public amount: number;
  private status: string = 'pending';     // მხოლოდ კლასის შიგნით
  protected transactionId: string = '';    // მხოლოდ კლასი + შთამომავლები

  constructor(id: string, amount: number) {
    this.id = id;
    this.amount = amount;
  }

  public complete(): void {
    this.status = 'completed';
    this.transactionId = `txn_${Date.now()}`;
    this.sendReceipt();
  }

  private sendReceipt(): void {
    console.log(`Receipt sent for ${this.id}`);
  }
}

class Refund extends Payment {
  constructor(id: string, amount: number) {
    super(id, amount);
  }

  processRefund(): void {
    // this.status — ❌ private (მიუწვდომელია)
    this.transactionId = `ref_${Date.now()}`; // ✓ protected
    console.log(`Refunding ${this.amount}`);
  }
}

const payment = new Payment('pay_123', 250);
payment.complete();            // ✓ public
// payment.status — ❌ private
// payment.transactionId — ❌ protected
// payment.sendReceipt() — ❌ private
```

**რეალური გამოყენება**: გადახდების სისტემა — `status` private-ია, რომ გარედან პირდაპირ ვერ შეცვალონ; `transactionId` protected-ია, რომ Refund კლასმა შეძლოს წვდომა.

---

## 3. მემკვიდრეობა (Inheritance) — `extends`

```typescript
class Order {
  constructor(
    public id: number,
    public items: string[],
    public total: number,
    public createdAt: Date = new Date()
  ) {}

  summary(): string {
    return `Order #${this.id}: ${this.items.length} items, ₾${this.total}`;
  }
}

class DiscountedOrder extends Order {
  constructor(
    id: number,
    items: string[],
    total: number,
    public discountPercent: number
  ) {
    super(id, items, total); // მშობელი კლასის constructor
  }

  get discountedTotal(): number {
    return this.total * (1 - this.discountPercent / 100);
  }

  // override — მშობელი მეთოდის გადაწერა
  summary(): string {
    return `${super.summary()} (${this.discountPercent}% off → ₾${this.discountedTotal})`;
  }
}

const order = new DiscountedOrder(1, ['Laptop', 'Mouse'], 2000, 10);
console.log(order.summary());
// Order #1: 2 items, ₾2000 (10% off → ₾1800)
```

**რეალური გამოყენება**: ეკომერსის შეკვეთები — `Order` ბაზური კლასი, `DiscountedOrder` ფართოებს ფასდაკლების ლოგიკით.

---

## 4. Parameter Properties (შემოკლებული სინტაქსი)

```typescript
// გრძელი ვერსია
class UserLong {
  private name: string;
  private email: string;
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

// მოკლე ვერსია (Parameter Properties)
class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    private passwordHash: string
  ) {}
}
// id, name, email, passwordHash თვისებები ავტომატურად შეიქმნა
```

---

## 5. Readonly Properties

```typescript
class Invoice {
  readonly invoiceNumber: string;
  readonly issuedAt: Date = new Date();

  constructor(
    public readonly customerId: number,
    public readonly amount: number
  ) {
    this.invoiceNumber = `INV-${Date.now()}`;
  }
}

const invoice = new Invoice(42, 1500);
// invoice.invoiceNumber = '...' — ❌ Cannot assign to readonly
// invoice.customerId = 43 — ❌ Cannot assign to readonly
```

**რეალური გამოყენება**: ინვოისის ნომერი, თარიღი — მონაცემები, რომლებიც შექმნის შემდეგ არ უნდა შეიცვალოს.

---

## 6. Getters & Setters

```typescript
class Cart {
  private _items: { productId: number; quantity: number; price: number }[] = [];

  get items(): readonly { productId: number; quantity: number; price: number }[] {
    return this._items; // გარედან მხოლოდ წაკითხვა
  }

  get total(): number {
    return this._items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  get itemCount(): number {
    return this._items.reduce((sum, item) => sum + item.quantity, 0);
  }

  addItem(productId: number, price: number, quantity: number = 1): void {
    const existing = this._items.find(i => i.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this._items.push({ productId, quantity, price });
    }
  }

  removeItem(productId: number): void {
    this._items = this._items.filter(i => i.productId !== productId);
  }
}

const cart = new Cart();
cart.addItem(1, 1499);
cart.addItem(2, 99, 2);
console.log(cart.total);     // 1697 — getter ითვლის ავტომატურად
console.log(cart.itemCount); // 3
// cart.items.push(...) — ❌ readonly მასივი
```

**რეალური გამოყენება**: კალათის მოდელი — `total` გამოითვლება დინამიურად, `items` გარედან მხოლოდ იკითხება.

---

## 7. Static Members

```typescript
class StripeAPI {
  private static apiKey: string = '';
  private static baseUrl = 'https://api.stripe.com/v1';

  static configure(key: string): void {
    StripeAPI.apiKey = key;
  }

  private static headers(): Record<string, string> {
    return {
      Authorization: `Bearer ${StripeAPI.apiKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
  }

  static async createPaymentIntent(amount: number, currency: string = 'usd') {
    const res = await fetch(`${StripeAPI.baseUrl}/payment_intents`, {
      method: 'POST',
      headers: StripeAPI.headers(),
      body: new URLSearchParams({ amount: String(amount), currency }),
    });
    return res.json();
  }

  static async getPayment(intentId: string) {
    const res = await fetch(`${StripeAPI.baseUrl}/payment_intents/${intentId}`, {
      headers: StripeAPI.headers(),
    });
    return res.json();
  }
}

// გამოყენება — ინსტანციის შექმნის გარეშე
StripeAPI.configure('sk_test_...');
const intent = await StripeAPI.createPaymentIntent(2000, 'gel');
```

**რეალური გამოყენება**: SDK wrapper — Stripe, PayPal, ან ნებისმიერი API-ს კლიენტი, სადაც ერთი კონფიგურაცია გლობალურად მოქმედებს.

---

## 8. `implements` — ინტერფეისის კონტრაქტი

```typescript
interface PaymentGateway {
  charge(amount: number, currency: string): Promise<{ id: string; status: string }>;
  refund(transactionId: string): Promise<boolean>;
}

interface WebhookHandler {
  handleWebhook(payload: unknown): Promise<void>;
}

// implements — ამოწმებს, რომ კლასი აკმაყოფილებს ინტერფეისს
class StripeGateway implements PaymentGateway, WebhookHandler {
  async charge(amount: number, currency: string) {
    const res = await fetch('https://api.stripe.com/v1/charges', {
      method: 'POST',
      headers: { Authorization: 'Bearer sk_test_...' },
      body: new URLSearchParams({ amount: String(amount), currency }),
    });
    return res.json();
  }

  async refund(transactionId: string) {
    const res = await fetch(`https://api.stripe.com/v1/charges/${transactionId}/refund`, {
      method: 'POST',
    });
    return res.ok;
  }

  async handleWebhook(payload: unknown) {
    console.log('Processing Stripe webhook...');
  }
}

class PayPalGateway implements PaymentGateway {
  async charge(amount: number, currency: string) {
    // PayPal-ის სპეციფიკური იმპლემენტაცია
    return { id: 'PAY-123', status: 'completed' };
  }

  async refund(transactionId: string) {
    return true;
  }
}

// ერთი ინტერფეისი — ორი სხვადასხვა იმპლემენტაცია
function processPayment(gateway: PaymentGateway, amount: number) {
  return gateway.charge(amount, 'usd');
}
```

**რეალური გამოყენება**: Payment Gateway Strategy — ერთი ინტერფეისი, მრავალი პროვაიდერი (Stripe, PayPal, TBC Pay). ადვილი გადართვა პროვაიდერებს შორის.

---

## 9. Abstract Classes (აბსტრაქტული კლასები)

```typescript
abstract class APIClient {
  constructor(protected baseUrl: string, protected apiKey: string) {}

  // აბსტრაქტული — თითოეულმა შთამომავალმა უნდა განსაზღვროს
  abstract parseError(response: Response): Error;

  // საერთო ლოგიკა ყველასთვის
  protected async request<T>(
    method: string,
    path: string,
    body?: unknown
  ): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      throw this.parseError(res); // აბსტრაქტული მეთოდის გამოძახება
    }

    return res.json();
  }
}

class StripeClient extends APIClient {
  constructor(apiKey: string) {
    super('https://api.stripe.com/v1', apiKey);
  }

  parseError(res: Response): Error {
    return new Error(`Stripe error: ${res.status}`);
  }

  async createPayment(amount: number) {
    return this.request<{ id: string }>('POST', '/payment_intents', { amount });
  }
}

class TBCCPayClient extends APIClient {
  constructor(apiKey: string) {
    super('https://api.tbcbank.ge/v1', apiKey);
  }

  parseError(res: Response): Error {
    return new Error(`TBC error: ${res.status} - ${res.statusText}`);
  }

  async transfer(account: string, amount: number) {
    return this.request<{ transactionId: string }>('POST', '/transfer', { account, amount });
  }
}
```

**რეალური გამოყენება**: API Client SDK — `APIClient` აბსტრაქტული კლასი შეიცავს საერთო `request` ლოგიკას, ხოლო `StripeClient`/`TBCCPayClient` ახდენს მის კონკრეტიზაციას.

---

## 10. Generics კლასებთან

```typescript
class PaginatedResponse<T> {
  constructor(
    public data: T[],
    public currentPage: number,
    public lastPage: number,
    public perPage: number,
    public total: number
  ) {}

  get hasNext(): boolean {
    return this.currentPage < this.lastPage;
  }

  get hasPrev(): boolean {
    return this.currentPage > 1;
  }

  get totalPages(): number {
    return this.lastPage;
  }

  map<U>(fn: (item: T) => U): PaginatedResponse<U> {
    return new PaginatedResponse(
      this.data.map(fn),
      this.currentPage,
      this.lastPage,
      this.perPage,
      this.total
    );
  }
}

interface Product {
  id: number;
  title: string;
  price: number;
}

// TypeScript ავტომატურად გამოიცნობს PaginatedResponse<Product>
const response = await fetch('/api/products?page=1');
const json = await response.json();
const page = new PaginatedResponse<Product>(
  json.data,
  json.current_page,
  json.last_page,
  json.per_page,
  json.total
);

page.data.forEach(product => console.log(product.title));
```

**რეალური გამოყენება**: API-დან მომავალი პაგინირებული მონაცემის ტიპიზირება — `PaginatedResponse<Product>`, `PaginatedResponse<Order>`.

---

## 11. Class vs Interface

```typescript
// Interface — მხოლოდ ტიპი (არ არსებობს runtime-ში)
interface IProduct {
  id: number;
  title: string;
  price: number;
  formattedPrice(): string;
}

// Class — ტიპიც + მნიშვნელობაც (არსებობს runtime-ში)
class Product implements IProduct {
  constructor(
    public id: number,
    public title: string,
    public price: number
  ) {}

  formattedPrice(): string {
    return `₾${this.price.toFixed(2)}`;
  }
}
```

| | Interface | Class |
|---|-----------|-------|
| Runtime | წაიშლება | არსებობს |
| `new` | არ შეიძლება | შეიძლება |
| Default values | არ შეიძლება | შეიძლება |
| Methods | მხოლოდ signature | იმპლემენტაციით |
| Access modifiers | არ აქვს | `private`, `protected` |
| Inheritance | `extends` (მრავლობითი) | `extends` (ერთი) + `implements` |

---

## 12. TypeScript Class vs JavaScript Class

```typescript
// TypeScript
class Payment {
  constructor(
    private amount: number,    // TypeScript — JS-ში წაიშლება
    readonly currency: string  // TypeScript — JS-ში წაიშლება
  ) {}

  process(): string {
    return `Processing ${this.amount} ${this.currency}`;
  }
}

// JavaScript-ად ტრანსპილაციის შემდეგ
// class Payment {
//   constructor(amount, currency) {
//     this.amount = amount;    // private? — აღარ!
//     this.currency = currency;
//   }
//   process() { return `Processing ${this.amount} ${this.currency}`; }
// }
```

**რას კარგავს TypeScript კლასი JavaScript-ში?**
- `private`, `protected`, `readonly` — წაიშლება (JS-ში # private fields არის, მაგრამ TypeScript-ის `private`-ის ნაცვლად)
- ტიპები — წაიშლება
- `implements` — მხოლოდ compile-time შემოწმება

---

## 13. This Type & Method Chaining

```typescript
class ProductQuery {
  constructor(
    private products: Product[],
    private filters: ((p: Product) => boolean)[] = []
  ) {}

  whereCategory(category: string): this {
    this.filters.push(p => p.category === category);
    return this;
  }

  wherePrice(min: number, max: number): this {
    this.filters.push(p => p.price >= min && p.price <= max);
    return this;
  }

  whereInStock(): this {
    this.filters.push(p => p.stock > 0);
    return this;
  }

  execute(): Product[] {
    return this.products.filter(p => this.filters.every(f => f(p)));
  }
}

const products: Product[] = [
  { id: 1, title: 'Laptop', price: 3000, category: 'electronics', stock: 5 },
  { id: 2, title: 'Phone', price: 1500, category: 'electronics', stock: 0 },
  { id: 3, title: 'Shirt', price: 50, category: 'clothing', stock: 20 },
];

// Method Chaining
const result = new ProductQuery(products)
  .whereCategory('electronics')
  .wherePrice(1000, 5000)
  .whereInStock()
  .execute();

console.log(result); // [{ id: 1, title: 'Laptop', ... }]
```

**რეალური გამოყენება**: Query Builder — პროდუქტების ფილტრაცია კატეგორიის, ფასის და სხვა პარამეტრების მიხედვით.

---

## 14. Singleton Pattern

```typescript
class PaymentConfig {
  private static instance: PaymentConfig | null = null;

  public stripeKey: string = '';
  public tbcMerchantId: string = '';

  private constructor() {} // გარედან new-ის აკრძალვა

  static getInstance(): PaymentConfig {
    if (!PaymentConfig.instance) {
      PaymentConfig.instance = new PaymentConfig();
    }
    return PaymentConfig.instance;
  }

  loadFromEnv(): void {
    this.stripeKey = process.env.STRIPE_KEY ?? '';
    this.tbcMerchantId = process.env.TBC_MERCHANT_ID ?? '';
  }
}

// ყველგან ერთი და იგივე ინსტანცია
const config1 = PaymentConfig.getInstance();
const config2 = PaymentConfig.getInstance();
console.log(config1 === config2); // true
```

---

## 15. შემაჯამებელი მაგალითი — E-commerce Order System

```typescript
interface Discountable {
  applyDiscount(percent: number): void;
}

interface Shippable {
  weight: number;
  shippingCost(): number;
}

abstract class CartItem {
  constructor(
    public productId: number,
    public title: string,
    protected price: number,
    public quantity: number
  ) {}

  abstract get totalPrice(): number;

  formattedPrice(): string {
    return `₾${this.totalPrice.toFixed(2)}`;
  }
}

class PhysicalItem extends CartItem implements Shippable {
  constructor(
    productId: number,
    title: string,
    price: number,
    quantity: number,
    public weight: number
  ) {
    super(productId, title, price, quantity);
  }

  get totalPrice(): number {
    return this.price * this.quantity + this.shippingCost();
  }

  shippingCost(): number {
    return this.weight * 5; // ₾5 per kg
  }
}

class DigitalItem extends CartItem {
  constructor(
    productId: number,
    title: string,
    price: number,
    quantity: number,
    public downloadUrl: string
  ) {
    super(productId, title, price, quantity);
  }

  get totalPrice(): number {
    return this.price * this.quantity; // ციფრულ პროდუქტს მიტანა არ სჭირდება
  }
}

class Order {
  private items: CartItem[] = [];

  constructor(
    public readonly orderId: string,
    public readonly customerEmail: string
  ) {}

  addItem(item: CartItem): void {
    this.items.push(item);
  }

  get subtotal(): number {
    return this.items.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  get totalItems(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  checkout(): string {
    const summary = this.items
      .map(i => `  ${i.title} x${i.quantity} — ${i.formattedPrice()}`)
      .join('\n');
    return `Order #${this.orderId}\n${summary}\nTotal: ₾${this.subtotal.toFixed(2)}`;
  }
}

// გამოყენება
const order = new Order('ORD-001', 'customer@example.com');
order.addItem(new PhysicalItem(1, 'Laptop', 3000, 1, 2.5));   // ₾3000 + ₾12.5 shipping
order.addItem(new DigitalItem(2, 'E-book', 25, 2, 'https://...')); // ₾50

console.log(order.checkout());
// Order #ORD-001
//   Laptop x1 — ₾3012.50
//   E-book x2 — ₾50.00
// Total: ₾3062.50
```

---

## Practice (ეკომერსის ამოცანები)

1. **Product კლასი** — `id`, `title`, `price`, `stock` თვისებებით. მეთოდები: `isAvailable()`, `reduceStock(quantity)`
2. **ShoppingCart** — `addItem`, `removeItem`, `clear`, `total` (getter), `items` (readonly)
3. **PaymentGateway** — ინტერფეისი `charge()` მეთოდით. `StripePayment` და `TBCPayment` კლასები
4. **OrderStatus** — `pending | confirmed | shipped | delivered | cancelled`. `Order` კლასი, რომელიც სტატუსს მართავს private ველით
