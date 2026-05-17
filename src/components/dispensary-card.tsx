import Link from "next/link";
import { Dispensary } from "@/lib/types";

export function DispensaryCard({ dispensary }: { dispensary: Dispensary }) {
  return (
    <Link
      href={`/dispensaries/${dispensary.slug}`}
      className="group rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-green-700 dark:text-zinc-100 dark:group-hover:text-green-500">
            {dispensary.name}
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {dispensary.address}, {dispensary.city}, {dispensary.state}{" "}
            {dispensary.zip}
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-green-50 px-2 py-1 dark:bg-green-900/20">
          <span className="text-sm font-semibold text-green-800 dark:text-green-400">
            {dispensary.rating}
          </span>
          <span className="text-xs text-green-600 dark:text-green-500">
            ({dispensary.reviewCount})
          </span>
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
        {dispensary.description}
      </p>

      <div className="mt-4 flex items-center gap-3">
        {dispensary.delivery && (
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
            Delivery
          </span>
        )}
        {dispensary.pickup && (
          <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">
            Pickup
          </span>
        )}
      </div>

      <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-500">
        {dispensary.hours}
      </div>
    </Link>
  );
}
