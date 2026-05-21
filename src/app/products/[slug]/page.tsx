import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, dispensaries } from "@/lib/data";
import { inventory, coas, strains } from "@/lib/strains";
import { LeafRating } from "@/components/leaf-rating";
import { CoaBadge } from "@/components/coa-badge";

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
                Quality
              </div>
              <div className="mt-1 flex justify-center">
                <LeafRating rating={product.rating} size="sm" />
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

          {/* COA */}
          <ProductCoaSection productSlug={product.slug} dispensaryId={product.dispensaryId} />
        </div>
      </div>
    </div>
  );
}

function ProductCoaSection({ productSlug, dispensaryId }: { productSlug: string; dispensaryId: string }) {
  // Find matching strain from the strains data
  const strain = strains.find((s) => s.slug === productSlug);
  if (!strain) return null;

  // Find inventory items for this strain and dispensary
  const matchingInventory = inventory.filter(
    (i) => i.strainId === strain.id && i.dispensaryId === dispensaryId && i.coaId
  );
  if (matchingInventory.length === 0) return null;

  // Get unique COAs
  const coaIds = [...new Set(matchingInventory.map((i) => i.coaId))];
  const matchingCoas = coaIds
    .map((id) => coas.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);

  if (matchingCoas.length === 0) return null;

  return (
    <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <div className="flex items-center justify-between">
        <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          Lab Testing
        </div>
        <div className="flex gap-2">
          {matchingCoas.map((coa) => (
            <CoaBadge key={coa.id} coa={coa} />
          ))}
        </div>
      </div>
      {matchingCoas[0] && (
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-lg bg-zinc-50 p-2 dark:bg-zinc-800/50">
            <div className="text-zinc-400">Total Cannabinoids</div>
            <div className="mt-0.5 font-semibold text-zinc-900 dark:text-zinc-100">
              {matchingCoas[0].results.totalCannabinoids}%
            </div>
          </div>
          <div className="rounded-lg bg-zinc-50 p-2 dark:bg-zinc-800/50">
            <div className="text-zinc-400">Terpenes</div>
            <div className="mt-0.5 font-semibold text-zinc-900 dark:text-zinc-100">
              {matchingCoas[0].results.totalTerpenes}%
            </div>
          </div>
          <div className="rounded-lg bg-zinc-50 p-2 dark:bg-zinc-800/50">
            <div className="text-zinc-400">Lab</div>
            <div className="mt-0.5 font-semibold text-zinc-900 dark:text-zinc-100">
              {matchingCoas[0].labName.split(" ")[0]}
            </div>
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
