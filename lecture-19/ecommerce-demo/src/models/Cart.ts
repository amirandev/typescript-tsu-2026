import { Product } from './Product';
import { CartItem, PhysicalCartItem, DigitalCartItem } from './CartItem';

export class Cart {
  private itemsMap: Map<number, CartItem> = new Map();

  get items(): readonly CartItem[] {
    return Array.from(this.itemsMap.values());
  }

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  get itemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get formattedTotal(): string {
    return `₾${this.total.toFixed(2)}`;
  }

  addItem(product: Product, quantity: number = 1, isDigital: boolean = false): void {
    if (!product.isAvailable) {
      throw new Error(`"${product.title}" is out of stock`);
    }

    const existing = this.itemsMap.get(product.id);
    if (existing) {
      existing.increaseQuantity(quantity);
    } else {
      const item = isDigital
        ? new DigitalCartItem(product, quantity)
        : new PhysicalCartItem(product, quantity);
      this.itemsMap.set(product.id, item);
    }
  }

  removeItem(productId: number): void {
    this.itemsMap.delete(productId);
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    const item = this.itemsMap.get(productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  clear(): void {
    this.itemsMap.clear();
  }
}
