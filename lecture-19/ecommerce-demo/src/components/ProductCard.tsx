import { Product } from '../models/Product';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAdd = () => {
    try {
      addItem(product, 1, product.category === 'digital');
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Error');
    }
  };

  return (
    <div className={`product-card ${!product.isAvailable ? 'out-of-stock' : ''}`}>
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">{product.formattedPrice}</p>
        <p className="product-stock">
          {product.isAvailable ? `${product.stock} in stock` : 'Out of stock'}
        </p>
        <button
          onClick={handleAdd}
          disabled={!product.isAvailable}
          className="add-to-cart-btn"
        >
          {product.isAvailable ? 'Add to Cart' : 'Sold Out'}
        </button>
      </div>
    </div>
  );
}
