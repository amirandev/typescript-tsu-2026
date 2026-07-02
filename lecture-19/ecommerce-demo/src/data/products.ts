import { Product } from '../models/Product';

export const products: Product[] = [
  new Product(1, 'MacBook Pro 16"', 5999, 'electronics', 'https://picsum.photos/seed/laptop/300/300', 5),
  new Product(2, 'IPhone 15 Pro', 3499, 'electronics', 'https://picsum.photos/seed/iphone/300/300', 10),
  new Product(3, 'Wireless Headphones', 299, 'electronics', 'https://picsum.photos/seed/headphones/300/300', 15),
  new Product(4, 'E-book: TypeScript Guide', 45, 'digital', 'https://picsum.photos/seed/ebook/300/300', 999),
  new Product(5, 'Designer T-Shirt', 89, 'clothing', 'https://picsum.photos/seed/tshirt/300/300', 20),
  new Product(6, 'Premium Course: React Basics', 199, 'digital', 'https://picsum.photos/seed/course/300/300', 999),
  new Product(7, 'Leather Jacket', 450, 'clothing', 'https://picsum.photos/seed/jacket/300/300', 7),
  new Product(8, 'Mechanical Keyboard', 350, 'electronics', 'https://picsum.photos/seed/keyboard/300/300', 12),
];
