import { Product } from './Product';

export abstract class CartItem {
  readonly product: Product;
  quantity: number;

  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }

  abstract get totalPrice(): number;
  abstract get type(): string;

  increaseQuantity(n: number = 1): void {
    this.quantity += n;
  }

  get formattedTotal(): string {
    return `₾${this.totalPrice.toFixed(2)}`;
  }
}

export class PhysicalCartItem extends CartItem {
  weight: number;

  constructor(product: Product, quantity: number, weight: number = 1) {
    super(product, quantity);
    this.weight = weight;
  }

  get type(): string {
    return 'physical';
  }

  get totalPrice(): number {
    return this.product.price * this.quantity + this.weight * 5 * this.quantity;
  }

  get shippingCost(): number {
    return this.weight * 5 * this.quantity;
  }
}

export class DigitalCartItem extends CartItem {
  downloadUrl: string;

  constructor(product: Product, quantity: number, downloadUrl: string = '') {
    super(product, quantity);
    this.downloadUrl = downloadUrl;
  }

  get type(): string {
    return 'digital';
  }

  get totalPrice(): number {
    return this.product.price * this.quantity;
  }
}
