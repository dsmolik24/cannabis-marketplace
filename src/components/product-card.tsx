import Link from "next/link";
import { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
        <div className="flex h-full items-center justify-center text-4xl">
          {getCategoryEmoji(product.category)}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
            {product.strain}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {product.weight}
          </span>
        </div>

        <h3 className="font-semibold text-zinc-900 group-hover:text-green-700 dark:text-zinc-100 dark:group-hover:text-green-500">
          {product.name}
        </h3>

        <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-1">
          <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            ${product.price}
          </span>
          <div className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
            <span>THC {product.thc}%</span>
            {product.cbd > 0 && <span>| CBD {product.cbd}%</span>}
          </div>
        </div>

        {!product.inStock && (
          <span className="text-xs font-medium text-red-600 dark:text-red-400">
            Out of stock
          </span>
        )}
      </div>
    </Link>
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
