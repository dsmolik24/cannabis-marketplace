import Link from "next/link";
import { strains, inventory } from "@/lib/strains";
import { dispensaries } from "@/lib/data";

export const metadata = {
  title: "Live Strains | CannaMart",
  description: "Browse all available cannabis strains with real-time inventory",
};

export default async function StrainsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const filtered = params.type
    ? strains.filter((s) => s.type === params.type)
    : strains;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Live Strains
          </h1>
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          </span>
        </div>
        <p className="text-zinc-600 dark:text-zinc-400">
          Real-time strain availability and inventory across all dispensaries
        </p>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap gap-2">
        <TypeFilter href="/strains" active={!params.type} label="All Strains" />
        <TypeFilter
          href="/strains?type=sativa"
          active={params.type === "sativa"}
          label="Sativa"
        />
        <TypeFilter
          href="/strains?type=indica"
          active={params.type === "indica"}
          label="Indica"
        />
        <TypeFilter
          href="/strains?type=hybrid"
          active={params.type === "hybrid"}
          label="Hybrid"
        />
        <TypeFilter
          href="/strains?type=cbd"
          active={params.type === "cbd"}
          label="CBD"
        />
      </div>

      {/* Stats Banner */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard
          label="Total Strains"
          value={strains.length.toString()}
        />
        <StatCard
          label="Available Units"
          value={inventory
            .filter((i) => i.status === "available" || i.status === "low-stock")
            .reduce((sum, i) => sum + i.quantity, 0)
            .toString()}
        />
        <StatCard
          label="Dispensaries"
          value={dispensaries.length.toString()}
        />
        <StatCard
          label="Avg THC"
          value={`${(strains.reduce((s, st) => s + st.thc, 0) / strains.length).toFixed(1)}%`}
        />
      </div>

      {/* Strain Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((strain) => {
          const strainInventory = inventory.filter(
            (i) => i.strainId === strain.id
          );
          const availableUnits = strainInventory.filter(
            (i) => i.status === "available" || i.status === "low-stock"
          );
          const totalQty = availableUnits.reduce((s, i) => s + i.quantity, 0);
          const lowestPrice = availableUnits.length
            ? Math.min(...availableUnits.map((i) => i.price))
            : null;
          const dispensaryCount = new Set(
            availableUnits.map((i) => i.dispensaryId)
          ).size;

          return (
            <Link
              key={strain.id}
              href={`/strains/${strain.slug}`}
              className="group rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-green-700 dark:text-zinc-100 dark:group-hover:text-green-500">
                    {strain.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${getTypeStyle(strain.type)}`}
                    >
                      {strain.type}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      THC {strain.thc}% | CBD {strain.cbd}%
                    </span>
                  </div>
                </div>
                <StatusBadge quantity={totalQty} inventory={strainInventory} />
              </div>

              {/* Description */}
              <p className="mt-3 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                {strain.description}
              </p>

              {/* Effects */}
              <div className="mt-3 flex flex-wrap gap-1">
                {strain.effects.slice(0, 3).map((effect) => (
                  <span
                    key={effect}
                    className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                  >
                    {effect}
                  </span>
                ))}
              </div>

              {/* Inventory Summary */}
              <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {totalQty}
                    </span>{" "}
                    units
                  </span>
                  <span className="text-zinc-600 dark:text-zinc-400">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {dispensaryCount}
                    </span>{" "}
                    {dispensaryCount === 1 ? "shop" : "shops"}
                  </span>
                </div>
                {lowestPrice && (
                  <span className="text-sm font-semibold text-green-700 dark:text-green-500">
                    from ${lowestPrice}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function TypeFilter({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
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
      {label}
    </a>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        {value}
      </div>
      <div className="text-xs text-zinc-500 dark:text-zinc-400">{label}</div>
    </div>
  );
}

function StatusBadge({
  quantity,
  inventory: inv,
}: {
  quantity: number;
  inventory: { status: string }[];
}) {
  const hasComingSoon = inv.some((i) => i.status === "coming-soon");
  const allSoldOut = inv.every((i) => i.status === "sold-out");

  if (allSoldOut)
    return (
      <span className="rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 dark:bg-red-900/20 dark:text-red-400">
        Sold Out
      </span>
    );
  if (quantity <= 5)
    return (
      <span className="rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
        Low Stock
      </span>
    );
  if (hasComingSoon && quantity === 0)
    return (
      <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
        Coming Soon
      </span>
    );
  return (
    <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
      In Stock
    </span>
  );
}

function getTypeStyle(type: string): string {
  switch (type) {
    case "sativa":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
    case "indica":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
    case "hybrid":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case "cbd":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    default:
      return "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400";
  }
}
