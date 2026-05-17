import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, dispensaries } from "@/lib/data";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const dispensary = dispensaries.find((d) => d.id === product.dispensaryId);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <nav className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/products" className="hover:text-green-700">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-900 dark:text-zinc-100">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Image */}
        <div className="flex aspect-square items-center justify-center rounded-2xl bg-zinc-100 text-8xl dark:bg-zinc-800">
          {getCategoryEmoji(product.category)}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                {product.strain}
              </span>
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                {product.category}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              {product.name}
            </h1>
            <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
              {product.description}
            </p>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              ${product.price}
            </span>
            <span className="text-zinc-500 dark:text-zinc-400">
              {product.weight}
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
            <div className="text-center">
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                THC
              </div>
              <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {product.thc}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                CBD
              </div>
              <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {product.cbd}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                Rating
              </div>
              <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {product.rating}/5
              </div>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            disabled={!product.inStock}
            className="w-full rounded-lg bg-green-700 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 dark:bg-green-600 dark:hover:bg-green-700 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-400"
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>

          {/* Dispensary */}
          {dispensary && (
            <Link
              href={`/dispensaries/${dispensary.slug}`}
              className="rounded-xl border border-zinc-200 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                Sold by
              </div>
              <div className="mt-1 font-semibold text-zinc-900 dark:text-zinc-100">
                {dispensary.name}
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                {dispensary.city}, {dispensary.state}
              </div>
            </Link>
          )}
        </div>
      </div>
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
