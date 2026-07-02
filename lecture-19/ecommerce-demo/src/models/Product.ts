export class Product {
  readonly id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  stock: number;

  constructor(id: number, title: string, price: number, category: string, image: string, stock: number) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.category = category;
    this.image = image;
    this.stock = stock;
  }

  get isAvailable(): boolean {
    return this.stock > 0;
  }

  get formattedPrice(): string {
    return `₾${this.price.toFixed(2)}`;
  }

  reduceStock(quantity: number): void {
    if (quantity > this.stock) {
      throw new Error(`Not enough stock for "${this.title}". Available: ${this.stock}`);
    }
    this.stock -= quantity;
  }
}
