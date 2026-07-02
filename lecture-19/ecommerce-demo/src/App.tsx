import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { HomePage } from './pages/HomePage';
import { CartPage } from './pages/CartPage';
import { OrderPage } from './pages/OrderPage';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
