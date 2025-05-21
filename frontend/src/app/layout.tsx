import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/cart-content";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yoliday Dashboard",
  description: "Responsive dashboard with dummy options",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <QueryClientProvider client={queryClient}>
          <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
      </body>
    </html>
  );
}
