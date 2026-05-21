import Link from "next/link";
import { growHouses, inventory, strains, growHouseVolumes } from "@/lib/strains";
import { LeafRatingBadge } from "@/components/leaf-rating";

export const metadata = {
  title: "Grow Houses | CannaMart Wholesale",
  description:
    "Licensed cultivation facilities supplying premium wholesale cannabis",
};

export default function GrowHousesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Grow Houses
          </h1>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
            Wholesale
          </span>
        </div>
        <p className="text-zinc-600 dark:text-zinc-400">
          Licensed cultivation facilities supplying dispensaries across Colorado.
          Full supply chain transparency from seed to sale.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Grow Houses" value={growHouses.length.toString()} />
        <StatCard
          label="Total Strains Grown"
          value={new Set(inventory.map((i) => i.strainId)).size.toString()}
        />
        <StatCard
          label="Active Batches"
          value={new Set(inventory.map((i) => i.batchId)).size.toString()}
        />
        <StatCard
          label="Avg Wholesale Savings"
          value={`${Math.round(
            (1 -
              inventory.reduce((s, i) => s + i.wholesalePrice, 0) /
                inventory.reduce((s, i) => s + i.price, 0)) *
              100
          )}%`}
        />
      </div>

      {/* Grow House Cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {growHouses.map((gh) => {
          const ghInventory = inventory.filter(
            (i) => i.growHouseId === gh.id
          );
          const strainCount = new Set(ghInventory.map((i) => i.strainId)).size;
          const dispensaryCount = new Set(
            ghInventory.map((i) => i.dispensaryId)
          ).size;
          const totalUnits = ghInventory.reduce((s, i) => s + i.quantity, 0);
          const strainNames = [
            ...new Set(
              ghInventory.map(
                (i) => strains.find((s) => s.id === i.strainId)?.name || ""
              )
            ),
          ];
          const volumes = growHouseVolumes.filter((v) => v.growHouseId === gh.id);
          const totalAvailableLbs = volumes.reduce((s, v) => s + v.availableLbs, 0);

          return (
            <Link
              key={gh.id}
              href={`/grow-houses/${gh.slug}`}
              className="group rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-green-700 dark:text-zinc-100 dark:group-hover:text-green-500">
                    {gh.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                    {gh.city}, {gh.state} | License: {gh.license}
                  </p>
                </div>
                <LeafRatingBadge rating={gh.rating} />
              </div>

              <p className="mt-3 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                {gh.description}
              </p>

              {/* Grow Type & Capacity */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${getGrowTypeStyle(gh.type)}`}
                >
                  {gh.type}
                </span>
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  {gh.capacity}
                </span>
                {gh.wholesale && (
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                    Min: {gh.minOrder}
                  </span>
                )}
              </div>

              {/* Certifications */}
              <div className="mt-3 flex flex-wrap gap-1">
                {gh.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="rounded-md bg-green-50 px-2 py-0.5 text-xs text-green-700 dark:bg-green-900/20 dark:text-green-400"
                  >
                    {cert}
                  </span>
                ))}
              </div>

              {/* Supply Stats */}
              <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
                <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                  <span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {strainCount}
                    </span>{" "}
                    strains
                  </span>
                  <span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {dispensaryCount}
                    </span>{" "}
                    dispensaries
                  </span>
                  <span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {totalUnits}
                    </span>{" "}
                    units
                  </span>
                </div>
                {totalAvailableLbs > 0 && (
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </span>
                    <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                      {totalAvailableLbs} lbs
                    </span>
                  </div>
                )}
              </div>

              {/* Strains supplied */}
              <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                Growing: {strainNames.join(", ")}
              </div>
            </Link>
          );
        })}
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

function getGrowTypeStyle(type: string): string {
  switch (type) {
    case "indoor":
      return "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400";
    case "outdoor":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400";
    case "greenhouse":
      return "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400";
    case "hybrid":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
    default:
      return "bg-zinc-100 text-zinc-800";
  }
}
