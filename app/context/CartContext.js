"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const initializeCart = () => {
    if (typeof window !== "undefined") {
      try {
        const cartString = localStorage.getItem("cart");
        return cartString ? JSON.parse(cartString) : [];
      } catch (error) {
        console.error("Failed to read cart from localStorage:", error);
        return [];
      }
    }
    return [];
  };

  const [cart, setCart] = useState(initializeCart);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cart]);

  const addItem = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeItem = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const updateItem = (index, updatedItem) => {
    setCart((prevCart) =>
      prevCart.map((item, i) => (i === index ? updatedItem : item))
    );
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
