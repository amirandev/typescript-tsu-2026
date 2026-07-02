import type { PaymentGateway, PaymentResult } from './PaymentGateway';
import { Cart } from './Cart';

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export class Order {
  private _status: OrderStatus = 'pending';

  readonly orderId: string;
  readonly createdAt: Date = new Date();
  paymentResult: PaymentResult | null = null;
  readonly customerEmail: string;
  readonly cart: Cart;
  readonly paymentGateway: PaymentGateway;

  constructor(customerEmail: string, cart: Cart, paymentGateway: PaymentGateway) {
    this.customerEmail = customerEmail;
    this.cart = cart;
    this.paymentGateway = paymentGateway;
    this.orderId = `ORD-${Date.now()}`;
  }

  get status(): OrderStatus {
    return this._status;
  }

  get total(): number {
    return this.cart.total;
  }

  get itemCount(): number {
    return this.cart.itemCount;
  }

  async checkout(): Promise<PaymentResult> {
    if (this._status !== 'pending') {
      throw new Error(`Order already ${this._status}`);
    }

    this._status = 'confirmed';
    this.paymentResult = await this.paymentGateway.charge(this.total, 'GEL');

    if (!this.paymentResult.success) {
      this._status = 'cancelled';
    }

    return this.paymentResult;
  }

  ship(): void {
    if (this._status !== 'confirmed') {
      throw new Error(`Cannot ship order with status: ${this._status}`);
    }
    this._status = 'shipped';
  }

  deliver(): void {
    if (this._status !== 'shipped') {
      throw new Error(`Cannot deliver order with status: ${this._status}`);
    }
    this._status = 'delivered';
  }

  cancel(): void {
    if (this._status === 'delivered') {
      throw new Error('Cannot cancel a delivered order');
    }
    this._status = 'cancelled';
  }
}
