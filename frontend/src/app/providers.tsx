"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "../context/cart-content";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>{children}</CartProvider>
    </QueryClientProvider>
  );
}
