import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { CartItem } from '../models/CartItem';
import { Product } from '../models/Product';
import { Cart } from '../models/Cart';
import { Order } from '../models/Order';
import { StripeGateway } from '../models/PaymentGateway';

interface CartContextType {
  cart: Cart;
  items: readonly CartItem[];
  total: number;
  itemCount: number;
  formattedTotal: string;
  addItem: (product: Product, quantity?: number, isDigital?: boolean) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  checkout: (email: string) => Promise<Order>;
  lastOrder: Order | null;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart] = useState(() => new Cart());
  const [, forceUpdate] = useState(0);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  const trigger = useCallback(() => forceUpdate(n => n + 1), []);

  const addItem = useCallback((product: Product, quantity?: number, isDigital?: boolean) => {
    cart.addItem(product, quantity, isDigital);
    trigger();
  }, [cart, trigger]);

  const removeItem = useCallback((productId: number) => {
    cart.removeItem(productId);
    trigger();
  }, [cart, trigger]);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    cart.updateQuantity(productId, quantity);
    trigger();
  }, [cart, trigger]);

  const clearCart = useCallback(() => {
    cart.clear();
    trigger();
  }, [cart, trigger]);

  const checkout = useCallback(async (email: string) => {
    const gateway = new StripeGateway();
    const order = new Order(email, cart, gateway);
    await order.checkout();
    setLastOrder(order);
    cart.clear();
    trigger();
    return order;
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        items: cart.items,
        total: cart.total,
        itemCount: cart.itemCount,
        formattedTotal: cart.formattedTotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        checkout,
        lastOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
