import { notFound } from "next/navigation";
import Link from "next/link";
import { getStrainBySlug, getInventoryByStrain, inventory } from "@/lib/strains";
import { dispensaries } from "@/lib/data";

export default async function StrainDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const strain = getStrainBySlug(slug);

  if (!strain) {
    notFound();
  }

  const strainInventory = getInventoryByStrain(strain.id);
  const availableInventory = strainInventory.filter(
    (i) => i.status !== "sold-out"
  );

  // Group by dispensary
  const byDispensary = new Map<string, typeof strainInventory>();
  for (const item of strainInventory) {
    const existing = byDispensary.get(item.dispensaryId) || [];
    existing.push(item);
    byDispensary.set(item.dispensaryId, existing);
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/strains" className="hover:text-green-700">
          Strains
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-900 dark:text-zinc-100">{strain.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Strain Info */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                  {strain.name}
                </h1>
              </div>
              <span
                className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${getTypeStyle(strain.type)}`}
              >
                {strain.type}
              </span>
            </div>

            <p className="text-zinc-600 dark:text-zinc-400">
              {strain.description}
            </p>

            {/* THC / CBD */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-zinc-200 p-4 text-center dark:border-zinc-800">
                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  {strain.thc}%
                </div>
                <div className="text-xs text-zinc-500">THC</div>
              </div>
              <div className="rounded-xl border border-zinc-200 p-4 text-center dark:border-zinc-800">
                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  {strain.cbd}%
                </div>
                <div className="text-xs text-zinc-500">CBD</div>
              </div>
            </div>

            {/* Lineage */}
            <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Lineage
              </h3>
              <div className="mt-2 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <span className="rounded bg-zinc-100 px-2 py-1 dark:bg-zinc-800">
                  {strain.lineage.parent1}
                </span>
                <span>x</span>
                <span className="rounded bg-zinc-100 px-2 py-1 dark:bg-zinc-800">
                  {strain.lineage.parent2}
                </span>
              </div>
            </div>

            {/* Terpenes */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Terpenes
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {strain.terpenes.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Effects */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Effects
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {strain.effects.map((e) => (
                  <span
                    key={e}
                    className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>

            {/* Flavors */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Flavors
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {strain.flavors.map((f) => (
                  <span
                    key={f}
                    className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Grow Info */}
            <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Grow Info
              </h3>
              <div className="mt-2 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <div className="flex justify-between">
                  <span>Difficulty</span>
                  <span className="font-medium capitalize text-zinc-900 dark:text-zinc-100">
                    {strain.growDifficulty}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Flower Time</span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    {strain.flowerTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Inventory */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Live Availability
            </h2>
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
            </span>
          </div>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Showing real-time stock from {byDispensary.size}{" "}
            {byDispensary.size === 1 ? "dispensary" : "dispensaries"}
          </p>

          <div className="mt-6 space-y-6">
            {Array.from(byDispensary.entries()).map(
              ([dispensaryId, items]) => {
                const dispensary = dispensaries.find(
                  (d) => d.id === dispensaryId
                );
                if (!dispensary) return null;

                return (
                  <div
                    key={dispensaryId}
                    className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    {/* Dispensary Header */}
                    <div className="border-b border-zinc-100 p-4 dark:border-zinc-800">
                      <Link
                        href={`/dispensaries/${dispensary.slug}`}
                        className="font-semibold text-zinc-900 hover:text-green-700 dark:text-zinc-100 dark:hover:text-green-500"
                      >
                        {dispensary.name}
                      </Link>
                      <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                        {dispensary.city}, {dispensary.state} |{" "}
                        {dispensary.delivery ? "Delivery + " : ""}
                        {dispensary.pickup ? "Pickup" : ""}
                      </div>
                    </div>

                    {/* Units Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-zinc-100 text-left text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                            <th className="px-4 py-3 font-medium">Size</th>
                            <th className="px-4 py-3 font-medium">Price</th>
                            <th className="px-4 py-3 font-medium">Stock</th>
                            <th className="px-4 py-3 font-medium">
                              THC Tested
                            </th>
                            <th className="px-4 py-3 font-medium">Batch</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item) => (
                            <tr
                              key={item.id}
                              className="border-b border-zinc-50 last:border-0 dark:border-zinc-800/50"
                            >
                              <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                                {item.size}
                                <span className="ml-1 text-xs text-zinc-400">
                                  ({item.unit})
                                </span>
                              </td>
                              <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">
                                ${item.price}
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`font-medium ${
                                    item.quantity > 10
                                      ? "text-green-700 dark:text-green-400"
                                      : item.quantity > 0
                                        ? "text-amber-600 dark:text-amber-400"
                                        : "text-red-600 dark:text-red-400"
                                  }`}
                                >
                                  {item.quantity}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                                {item.thcTested}%
                              </td>
                              <td className="px-4 py-3">
                                <span className="rounded bg-zinc-100 px-2 py-0.5 font-mono text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                                  {item.batchId}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <InventoryStatus status={item.status} />
                              </td>
                              <td className="px-4 py-3">
                                <button
                                  disabled={
                                    item.status === "sold-out" ||
                                    item.status === "coming-soon"
                                  }
                                  className="rounded-lg bg-green-700 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400 dark:bg-green-600 dark:hover:bg-green-700 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-500"
                                >
                                  Add
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Batch Info */}
                    <div className="border-t border-zinc-100 px-4 py-3 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                      Last tested:{" "}
                      {items[0]?.testDate
                        ? new Date(items[0].testDate).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric", year: "numeric" }
                          )
                        : "N/A"}{" "}
                      | Harvested:{" "}
                      {items[0]?.harvestDate
                        ? new Date(items[0].harvestDate).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric", year: "numeric" }
                          )
                        : "N/A"}
                    </div>
                  </div>
                );
              }
            )}
          </div>

          {strainInventory.length === 0 && (
            <div className="mt-8 rounded-xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
              <p className="text-zinc-500 dark:text-zinc-400">
                This strain is not currently stocked at any dispensary.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InventoryStatus({ status }: { status: string }) {
  switch (status) {
    case "available":
      return (
        <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
          Available
        </span>
      );
    case "low-stock":
      return (
        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
          Low Stock
        </span>
      );
    case "sold-out":
      return (
        <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/20 dark:text-red-400">
          Sold Out
        </span>
      );
    case "coming-soon":
      return (
        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
          Coming Soon
        </span>
      );
    default:
      return null;
  }
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
