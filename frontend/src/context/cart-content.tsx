"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

type CartContextType = {
  cart: number[];
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

type SavedContextType = {
  saved: number[];
  addToSaved: (id: number) => void;
  removeFromSaved: (id: number) => void;
  clearSaved: () => void;
};

// Create the contexts
const CartContext = createContext<CartContextType | undefined>(undefined);
const SavedContext = createContext<SavedContextType | undefined>(undefined);

// Custom hooks to use the contexts
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const useSaved = () => {
  const context = useContext(SavedContext);
  if (context === undefined) {
    throw new Error("useSaved must be used within a SavedProvider");
  }
  return context;
};

// Combined provider component
export const ContentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Cart state
  const [cart, setCart] = useState<number[]>([]);

  // Saved state
  const [saved, setSaved] = useState<number[]>([]);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedSaved = localStorage.getItem("saved");

    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }

    if (storedSaved) {
      try {
        setSaved(JSON.parse(storedSaved));
      } catch (error) {
        console.error("Failed to parse saved from localStorage:", error);
      }
    }
  }, []);

  // Save to localStorage whenever cart or saved change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("saved", JSON.stringify(saved));
  }, [saved]);

  // Cart functions
  const addToCart = (id: number) => {
    if (!cart.includes(id)) {
      setCart([...cart, id]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((itemId) => itemId !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Saved functions
  const addToSaved = (id: number) => {
    if (!saved.includes(id)) {
      setSaved([...saved, id]);
    }
  };

  const removeFromSaved = (id: number) => {
    setSaved(saved.filter((itemId) => itemId !== id));
  };

  const clearSaved = () => {
    setSaved([]);
  };

  // Create value objects
  const cartValue = { cart, addToCart, removeFromCart, clearCart };
  const savedValue = { saved, addToSaved, removeFromSaved, clearSaved };

  return (
    <CartContext.Provider value={cartValue}>
      <SavedContext.Provider value={savedValue}>
        {children}
      </SavedContext.Provider>
    </CartContext.Provider>
  );
};
