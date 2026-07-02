import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { CartSidebar } from '../components/CartSidebar';

export function HomePage() {
  return (
    <div className="home-layout">
      <main className="products-section">
        <header className="products-header">
          <h1>E-Commerce Store</h1>
          <p>გამოიყენე OOP კლასები TypeScript-ში — Product, CartItem, Cart, Order</p>
        </header>
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      <CartSidebar />
    </div>
  );
}
