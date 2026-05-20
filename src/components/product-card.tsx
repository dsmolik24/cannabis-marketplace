import Link from "next/link";
import { Product } from "@/lib/types";

const categoryGradients: Record<string, string> = {
  flower: "from-emerald-50 to-green-100 dark:from-emerald-950/40 dark:to-green-900/30",
  edibles: "from-amber-50 to-orange-100 dark:from-amber-950/40 dark:to-orange-900/30",
  concentrates: "from-violet-50 to-purple-100 dark:from-violet-950/40 dark:to-purple-900/30",
  vaporizers: "from-sky-50 to-blue-100 dark:from-sky-950/40 dark:to-blue-900/30",
  topicals: "from-rose-50 to-pink-100 dark:from-rose-950/40 dark:to-pink-900/30",
  "pre-rolls": "from-stone-50 to-stone-100 dark:from-stone-950/40 dark:to-stone-900/30",
  tinctures: "from-cyan-50 to-teal-100 dark:from-cyan-950/40 dark:to-teal-900/30",
  accessories: "from-zinc-50 to-zinc-100 dark:from-zinc-950/40 dark:to-zinc-900/30",
};

const categoryIcons: Record<string, string> = {
  flower: "🌿",
  edibles: "🍬",
  concentrates: "💎",
  vaporizers: "💨",
  topicals: "🧴",
  "pre-rolls": "🚬",
  tinctures: "💧",
  accessories: "🛠️",
};

const strainColors: Record<string, string> = {
  sativa: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  indica: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  hybrid: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  cbd: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

export function ProductCard({ product }: { product: Product }) {
  const gradient = categoryGradients[product.category] || categoryGradients.accessories;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800/80 dark:bg-zinc-900"
    >
      {/* Image area */}
      <div className={`relative aspect-[4/3] w-full bg-gradient-to-br ${gradient}`}>
        <div className="flex h-full items-center justify-center text-5xl opacity-80 transition-transform duration-300 group-hover:scale-110">
          {categoryIcons[product.category] || "🌱"}
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-zinc-900">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${strainColors[product.strain] || ""}`}>
            {product.strain}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
            {product.category}
          </span>
        </div>

        <h3 className="mt-2 text-[15px] font-semibold leading-snug text-zinc-900 group-hover:text-green-700 dark:text-zinc-100 dark:group-hover:text-green-400">
          {product.name}
        </h3>

        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          {product.description}
        </p>

        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              ${product.price}
            </span>
            <span className="ml-1 text-xs text-zinc-400">{product.weight}</span>
          </div>
          <div className="flex flex-col items-end gap-0.5 text-[11px] text-zinc-400 dark:text-zinc-500">
            <span>THC {product.thc}%</span>
            {product.cbd > 0.5 && <span>CBD {product.cbd}%</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}
