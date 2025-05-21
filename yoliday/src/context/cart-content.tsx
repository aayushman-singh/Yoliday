"use client";
import { createContext, useContext, useEffect, useState } from "react";

type CartContextType = {
  cart: number[];
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
};

type SavedContextType = {
  saved: number[];
  addToSaved: (id: number) => void; // Changed from saveItem
  removeFromSaved: (id: number) => void; // Changed from unsaveItem
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const CartContext = createContext<CartContextType | undefined>(undefined);
const SavedContext = createContext<SavedContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);

  // Initialize from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));

    const savedItems = localStorage.getItem("saved");
    if (savedItems) setSaved(JSON.parse(savedItems));
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("saved", JSON.stringify(saved));
  }, [saved]);

  // Cart functions
  const addToCart = async (id: number) => {
    if (!cart.includes(id)) {
      setCart([...cart, id]);
      await fetch(`${baseUrl}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: id }),
      });
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item !== id));
  };

  // Saved items functions
  const addToSaved = async (id: number) => {
    // Renamed from saveItem
    if (!saved.includes(id)) {
      setSaved([...saved, id]);
      await fetch(`${baseUrl}/saved`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: id }),
      });
    }
  };

  const removeFromSaved = async (id: number) => {
    // Renamed from unsaveItem
    setSaved(saved.filter((item) => item !== id));
    await fetch(`${baseUrl}/saved/${id}`, {
      method: "DELETE",
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      <SavedContext.Provider
        value={{
          saved,
          addToSaved,
          removeFromSaved,
        }}
      >
        {children}
      </SavedContext.Provider>
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};

export const useSaved = () => {
  const context = useContext(SavedContext);
  if (!context) throw new Error("useSaved must be used inside CartProvider");
  return context;
};
