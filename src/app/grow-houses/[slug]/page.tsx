import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getGrowHouseBySlug,
  getInventoryByGrowHouse,
  strains,
} from "@/lib/strains";
import { dispensaries } from "@/lib/data";

export default async function GrowHouseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const growHouse = getGrowHouseBySlug(slug);

  if (!growHouse) {
    notFound();
  }

  const ghInventory = getInventoryByGrowHouse(growHouse.id);

  // Group by strain
  const byStrain = new Map<string, typeof ghInventory>();
  for (const item of ghInventory) {
    const existing = byStrain.get(item.strainId) || [];
    existing.push(item);
    byStrain.set(item.strainId, existing);
  }

  const dispensaryIds = [...new Set(ghInventory.map((i) => i.dispensaryId))];
  const totalUnits = ghInventory.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/grow-houses" className="hover:text-green-700">
          Grow Houses
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-900 dark:text-zinc-100">
          {growHouse.name}
        </span>
      </nav>

      {/* Header */}
      <div className="rounded-2xl border border-zinc-200 p-8 dark:border-zinc-800">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                {growHouse.name}
              </h1>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                Wholesale
              </span>
            </div>
            <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
              {growHouse.description}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 dark:bg-green-900/20">
            <span className="text-xl font-bold text-green-800 dark:text-green-400">
              {growHouse.rating}
            </span>
            <span className="text-sm text-green-600 dark:text-green-500">
              ({growHouse.reviewCount} reviews)
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InfoBlock label="Location">
            {growHouse.address}, {growHouse.city}, {growHouse.state}
          </InfoBlock>
          <InfoBlock label="License">{growHouse.license}</InfoBlock>
          <InfoBlock label="Grow Type">
            <span className="capitalize">{growHouse.type}</span> |{" "}
            {growHouse.capacity}
          </InfoBlock>
          <InfoBlock label="Contact">
            {growHouse.phone}
            <br />
            {growHouse.email}
          </InfoBlock>
        </div>

        {/* Certifications */}
        <div className="mt-4 flex flex-wrap gap-2">
          {growHouse.certifications.map((cert) => (
            <span
              key={cert}
              className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400"
            >
              {cert}
            </span>
          ))}
        </div>

        {/* Wholesale Info */}
        <div className="mt-4 rounded-xl bg-amber-50 p-4 dark:bg-amber-900/10">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-800 dark:text-amber-400">
            Wholesale Terms
          </div>
          <div className="mt-1 text-sm text-amber-700 dark:text-amber-300">
            Minimum order: {growHouse.minOrder} | Contact{" "}
            <span className="font-medium">{growHouse.email}</span> for bulk
            pricing and terms
          </div>
        </div>
      </div>

      {/* Supply Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Strains Grown" value={byStrain.size.toString()} />
        <StatCard
          label="Dispensaries Supplied"
          value={dispensaryIds.length.toString()}
        />
        <StatCard label="Total Units" value={totalUnits.toString()} />
        <StatCard
          label="Active Batches"
          value={
            new Set(ghInventory.map((i) => i.batchId)).size.toString()
          }
        />
      </div>

      {/* Dispensaries Supplied */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Dispensaries Supplied
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {dispensaryIds.map((id) => {
            const d = dispensaries.find((d) => d.id === id);
            if (!d) return null;
            return (
              <Link
                key={id}
                href={`/dispensaries/${d.slug}`}
                className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-green-300 hover:text-green-700 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-green-700 dark:hover:text-green-500"
              >
                {d.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Inventory by Strain */}
      <div className="mt-10">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Wholesale Inventory
          </h2>
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
          </span>
        </div>

        <div className="mt-6 space-y-6">
          {Array.from(byStrain.entries()).map(([strainId, items]) => {
            const strain = strains.find((s) => s.id === strainId);
            if (!strain) return null;

            return (
              <div
                key={strainId}
                className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
              >
                {/* Strain Header */}
                <div className="flex items-center justify-between border-b border-zinc-100 p-4 dark:border-zinc-800">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/strains/${strain.slug}`}
                      className="font-semibold text-zinc-900 hover:text-green-700 dark:text-zinc-100 dark:hover:text-green-500"
                    >
                      {strain.name}
                    </Link>
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

                {/* Wholesale Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-100 text-left text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                        <th className="px-4 py-3 font-medium">Size</th>
                        <th className="px-4 py-3 font-medium">Retail</th>
                        <th className="px-4 py-3 font-medium">Wholesale</th>
                        <th className="px-4 py-3 font-medium">Margin</th>
                        <th className="px-4 py-3 font-medium">Stock</th>
                        <th className="px-4 py-3 font-medium">Dispensary</th>
                        <th className="px-4 py-3 font-medium">Batch</th>
                        <th className="px-4 py-3 font-medium">Harvested</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => {
                        const d = dispensaries.find(
                          (d) => d.id === item.dispensaryId
                        );
                        const margin = Math.round(
                          ((item.price - item.wholesalePrice) / item.price) *
                            100
                        );
                        return (
                          <tr
                            key={item.id}
                            className="border-b border-zinc-50 last:border-0 dark:border-zinc-800/50"
                          >
                            <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                              {item.size}
                            </td>
                            <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                              ${item.price}
                            </td>
                            <td className="px-4 py-3 font-semibold text-green-700 dark:text-green-400">
                              ${item.wholesalePrice}
                            </td>
                            <td className="px-4 py-3 text-zinc-500">
                              {margin}%
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
                            <td className="px-4 py-3">
                              {d && (
                                <Link
                                  href={`/dispensaries/${d.slug}`}
                                  className="text-zinc-600 hover:text-green-700 dark:text-zinc-400"
                                >
                                  {d.name}
                                </Link>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <span className="rounded bg-zinc-100 px-2 py-0.5 font-mono text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                                {item.batchId}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-xs text-zinc-500">
                              {new Date(item.harvestDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <InventoryStatus status={item.status} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function InfoBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
        {label}
      </div>
      <div className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">
        {children}
      </div>
    </div>
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
      return "bg-zinc-100 text-zinc-800";
  }
}
