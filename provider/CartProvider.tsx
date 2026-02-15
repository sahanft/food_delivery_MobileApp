import React, { createContext, useContext, useState } from "react";

interface CartItem {
  name: string;
  description: string;
  image: string;
  size: string;
  quantity: number;
  price: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (name: string, size: string, description: string) => void;
  updateQuantity: (
    name: string,
    size: string,
    description: string,
    quantity: number
  ) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) =>
          cartItem.name === item.name &&
          cartItem.size === item.size &&
          cartItem.description === item.description
      );

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.name === item.name &&
          cartItem.size === item.size &&
          cartItem.description === item.description
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        return [...prevCart, item];
      }
    });
  };

  const removeFromCart = (name: string, size: string, description: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.name === name &&
            item.size === size &&
            item.description === description
          )
      )
    );
  };

  const updateQuantity = (
    name: string,
    size: string,
    description: string,
    quantity: number
  ) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === name &&
        item.size === size &&
        item.description === description
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
