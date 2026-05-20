import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { DispensaryCard } from "@/components/dispensary-card";
import { products, dispensaries } from "@/lib/data";
import { strains, inventory } from "@/lib/strains";

export default function Home() {
  const featuredProducts = products.filter((p) => p.inStock).slice(0, 4);
  const topDispensaries = dispensaries.slice(0, 3);
  const totalUnits = inventory
    .filter((i) => i.status === "available" || i.status === "low-stock")
    .reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-zinc-950 px-4 py-28 sm:px-6 sm:py-36">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-green-500/20 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-emerald-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-1.5 text-xs font-medium text-green-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400"></span>
              </span>
              {totalUnits}+ units available now
            </span>
          </div>

          <h1 className="animate-slide-up mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl sm:leading-[1.1]">
            Premium Cannabis,{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Delivered
            </span>
          </h1>

          <p className="animate-slide-up mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg" style={{ animationDelay: "100ms" }}>
            Browse top-rated dispensaries and shop lab-tested products with full
            supply chain transparency. From grow house to your door.
          </p>

          <div className="animate-slide-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: "200ms" }}>
            <Link
              href="/products"
              className="w-full rounded-xl bg-green-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-600/25 transition-all hover:bg-green-500 hover:shadow-xl hover:shadow-green-500/30 sm:w-auto"
            >
              Shop Products
            </Link>
            <Link
              href="/strains"
              className="w-full rounded-xl border border-zinc-700 px-7 py-3.5 text-sm font-semibold text-zinc-300 transition-all hover:border-zinc-500 hover:bg-zinc-800/50 hover:text-white sm:w-auto"
            >
              View Live Strains
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-zinc-200 bg-white py-6 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-4 text-xs font-medium text-zinc-500 dark:text-zinc-400 sm:px-6">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            Lab Tested
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {dispensaries.length} Licensed Dispensaries
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            {strains.length} Live Strains
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-7.5M8.25 18.75H5.625m12-12L15 3.375h-4.5L8.25 6.75" />
            </svg>
            Same-Day Delivery
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            Shop by Category
          </h2>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Find exactly what you&apos;re looking for
          </p>
        </div>
        <div className="stagger-children mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg dark:border-zinc-800/80 dark:bg-zinc-900 dark:hover:border-green-800"
            >
              <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                {cat.icon}
              </span>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="border-y border-zinc-200/80 bg-zinc-50/50 px-4 py-20 dark:border-zinc-800/80 dark:bg-zinc-900/30 sm:px-6">
        <div className="mx-auto max-w-7xl lg:px-2">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
                Featured Products
              </h2>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Hand-picked top sellers from our dispensaries
              </p>
            </div>
            <Link
              href="/products"
              className="hidden items-center gap-1 text-sm font-medium text-green-700 transition-colors hover:text-green-800 dark:text-green-500 dark:hover:text-green-400 sm:flex"
            >
              View all
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
          <div className="stagger-children mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/products"
              className="inline-flex items-center gap-1 text-sm font-medium text-green-700 dark:text-green-500"
            >
              View all products
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Dispensaries */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
              Top Dispensaries
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Licensed and verified partners
            </p>
          </div>
          <Link
            href="/dispensaries"
            className="hidden items-center gap-1 text-sm font-medium text-green-700 transition-colors hover:text-green-800 dark:text-green-500 dark:hover:text-green-400 sm:flex"
          >
            View all
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
        <div className="stagger-children mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {topDispensaries.map((dispensary) => (
            <DispensaryCard key={dispensary.id} dispensary={dispensary} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-200/80 bg-zinc-950 px-4 py-20 dark:border-zinc-800/80 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Ready to get started?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Create an account to browse products, track orders, and get
            access to wholesale pricing from licensed grow houses.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/auth/register"
              className="w-full rounded-xl bg-green-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-600/25 transition-all hover:bg-green-500 sm:w-auto"
            >
              Create Free Account
            </Link>
            <Link
              href="/grow-houses"
              className="w-full rounded-xl border border-zinc-700 px-7 py-3.5 text-sm font-semibold text-zinc-300 transition-all hover:border-zinc-500 hover:text-white sm:w-auto"
            >
              Wholesale Inquiry
            </Link>
          </div>
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
