"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/lib/data";
import { CartItem } from "@/lib/types";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { productId: "1", quantity: 2, product: products[0] },
    { productId: "4", quantity: 1, product: products[3] },
  ]);

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(cartItems.filter((item) => item.productId !== productId));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const tax = subtotal * 0.15;
  const total = subtotal + tax;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-zinc-500 dark:text-zinc-400">
            Your cart is empty.
          </p>
          <Link
            href="/products"
            className="mt-4 inline-block rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white hover:bg-green-800"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-zinc-100 text-2xl dark:bg-zinc-800">
                    {getCategoryEmoji(item.product.category)}
                  </div>
                  <div className="flex-1">
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="font-semibold text-zinc-900 hover:text-green-700 dark:text-zinc-100"
                    >
                      {item.product.name}
                    </Link>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      {item.product.weight} | {item.product.strain}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-300 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium text-zinc-900 dark:text-zinc-100">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-300 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
                    >
                      +
                    </button>
                  </div>
                  <div className="w-20 text-right font-semibold text-zinc-900 dark:text-zinc-100">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800 lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Order Summary
            </h2>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Subtotal
                </span>
                <span className="text-zinc-900 dark:text-zinc-100">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Tax (15%)
                </span>
                <span className="text-zinc-900 dark:text-zinc-100">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-zinc-200 pt-3 dark:border-zinc-800">
                <div className="flex justify-between font-semibold">
                  <span className="text-zinc-900 dark:text-zinc-100">
                    Total
                  </span>
                  <span className="text-zinc-900 dark:text-zinc-100">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <button className="mt-6 w-full rounded-lg bg-green-700 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function getCategoryEmoji(category: string): string {
  const map: Record<string, string> = {
    flower: "🌿",
    edibles: "🍬",
    concentrates: "💎",
    vaporizers: "💨",
    topicals: "🧴",
    "pre-rolls": "🚬",
    tinctures: "💧",
    accessories: "🛠️",
  };
  return map[category] || "🌱";
}
