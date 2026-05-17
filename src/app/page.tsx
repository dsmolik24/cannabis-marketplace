import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { DispensaryCard } from "@/components/dispensary-card";
import { products, dispensaries } from "@/lib/data";

export default function Home() {
  const featuredProducts = products.filter((p) => p.inStock).slice(0, 4);
  const topDispensaries = dispensaries.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 to-green-700 px-4 py-24 text-center text-white sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Premium Cannabis, Delivered
          </h1>
          <p className="mt-4 text-lg text-green-100">
            Browse top-rated dispensaries and shop lab-tested products from the
            comfort of your home. Licensed, legal, and always quality.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/products"
              className="w-full rounded-lg bg-white px-6 py-3 text-sm font-semibold text-green-900 transition-colors hover:bg-green-50 sm:w-auto"
            >
              Shop Products
            </Link>
            <Link
              href="/dispensaries"
              className="w-full rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              Find Dispensaries
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Shop by Category
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="flex flex-col items-center rounded-xl border border-zinc-200 p-6 transition-all hover:border-green-300 hover:shadow-md dark:border-zinc-800 dark:hover:border-green-700"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="mt-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Featured Products
          </h2>
          <Link
            href="/products"
            className="text-sm font-medium text-green-700 hover:text-green-800 dark:text-green-500 dark:hover:text-green-400"
          >
            View all
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Dispensaries */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Top Dispensaries
          </h2>
          <Link
            href="/dispensaries"
            className="text-sm font-medium text-green-700 hover:text-green-800 dark:text-green-500 dark:hover:text-green-400"
          >
            View all
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {topDispensaries.map((dispensary) => (
            <DispensaryCard key={dispensary.id} dispensary={dispensary} />
          ))}
        </div>
      </section>
    </div>
  );
}

const categories = [
  { name: "Flower", slug: "flower", icon: "🌿" },
  { name: "Edibles", slug: "edibles", icon: "🍬" },
  { name: "Concentrates", slug: "concentrates", icon: "💎" },
  { name: "Vaporizers", slug: "vaporizers", icon: "💨" },
  { name: "Topicals", slug: "topicals", icon: "🧴" },
  { name: "Pre-Rolls", slug: "pre-rolls", icon: "🚬" },
  { name: "Tinctures", slug: "tinctures", icon: "💧" },
  { name: "Accessories", slug: "accessories", icon: "🛠️" },
];
