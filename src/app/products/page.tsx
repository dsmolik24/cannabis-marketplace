import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/data";
import { ProductCategory } from "@/lib/types";

export const metadata = {
  title: "Products | CannaMart",
  description: "Browse our full selection of cannabis products",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; strain?: string }>;
}) {
  const params = await searchParams;
  let filtered = products;

  if (params.category) {
    filtered = filtered.filter(
      (p) => p.category === (params.category as ProductCategory)
    );
  }
  if (params.strain) {
    filtered = filtered.filter((p) => p.strain === params.strain);
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {params.category
              ? `${capitalize(params.category)}`
              : "All Products"}
          </h1>
          <p className="mt-1 text-zinc-600 dark:text-zinc-400">
            {filtered.length} product{filtered.length !== 1 && "s"} available
          </p>
        </div>

        <div className="flex gap-2">
          <FilterLink href="/products" active={!params.category}>
            All
          </FilterLink>
          <FilterLink
            href="/products?category=flower"
            active={params.category === "flower"}
          >
            Flower
          </FilterLink>
          <FilterLink
            href="/products?category=edibles"
            active={params.category === "edibles"}
          >
            Edibles
          </FilterLink>
          <FilterLink
            href="/products?category=concentrates"
            active={params.category === "concentrates"}
          >
            Concentrates
          </FilterLink>
          <FilterLink
            href="/products?category=vaporizers"
            active={params.category === "vaporizers"}
          >
            Vapes
          </FilterLink>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-zinc-500 dark:text-zinc-400">
          No products found for this filter.
        </div>
      )}
    </div>
  );
}

function FilterLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-green-700 text-white"
          : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
      }`}
    >
      {children}
    </a>
  );
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
