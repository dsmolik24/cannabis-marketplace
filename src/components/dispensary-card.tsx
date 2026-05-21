import Link from "next/link";
import { Dispensary } from "@/lib/types";
import { LeafRatingBadge } from "@/components/leaf-rating";

export function DispensaryCard({ dispensary }: { dispensary: Dispensary }) {
  return (
    <Link
      href={`/dispensaries/${dispensary.slug}`}
      className="group flex flex-col rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800/80 dark:bg-zinc-900"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-zinc-900 group-hover:text-green-700 dark:text-zinc-100 dark:group-hover:text-green-400">
            {dispensary.name}
          </h3>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
            <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span className="truncate">
              {dispensary.city}, {dispensary.state}
            </span>
          </div>
        </div>
        <LeafRatingBadge rating={dispensary.rating} reviewCount={dispensary.reviewCount} />
      </div>

      {/* Description */}
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
        {dispensary.description}
      </p>

      {/* Tags */}
      <div className="mt-4 flex items-center gap-2">
        {dispensary.delivery && (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-7.5M8.25 18.75H5.625m12-12L15 3.375h-4.5L8.25 6.75" />
            </svg>
            Delivery
          </span>
        )}
        {dispensary.pickup && (
          <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-medium text-violet-700 dark:bg-violet-900/20 dark:text-violet-400">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72" />
            </svg>
            Pickup
          </span>
        )}
      </div>

      {/* Hours */}
      <div className="mt-auto flex items-center gap-1.5 pt-4 text-xs text-zinc-400 dark:text-zinc-500">
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {dispensary.hours}
      </div>
    </Link>
  );
}
