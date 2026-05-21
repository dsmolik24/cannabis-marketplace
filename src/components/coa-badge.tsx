import Link from "next/link";
import { COA } from "@/lib/strains";

export function CoaBadge({ coa }: { coa: COA }) {
  const statusStyles = {
    verified: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
    pending: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
    expired: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
    rejected: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
  };

  return (
    <Link
      href={`/coa/${coa.id}`}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-opacity hover:opacity-80 ${statusStyles[coa.status]}`}
    >
      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
      COA {coa.status === "verified" ? "Verified" : coa.status === "pending" ? "Pending" : coa.status === "expired" ? "Expired" : "Rejected"}
    </Link>
  );
}

export function CoaCard({ coa }: { coa: COA }) {
  const allPassed =
    coa.results.passedPesticides &&
    coa.results.passedHeavyMetals &&
    coa.results.passedMicrobials &&
    coa.results.passedMycotoxins &&
    coa.results.passedResidualSolvents;

  return (
    <Link
      href={`/coa/${coa.id}`}
      className="block rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
              {coa.batchId}
            </span>
            <CoaStatusDot status={coa.status} />
          </div>
          <div className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {coa.labName}
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            Tested {new Date(coa.testDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </div>
        </div>
        <div className="text-right">
          {allPassed ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
              All Tests Passed
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/20 dark:text-red-400">
              Issues Found
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-3 text-center">
        <div>
          <div className="text-[10px] uppercase tracking-wide text-zinc-400">THC</div>
          <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{coa.results.thc}%</div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wide text-zinc-400">CBD</div>
          <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{coa.results.cbd}%</div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wide text-zinc-400">Cannabinoids</div>
          <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{coa.results.totalCannabinoids}%</div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wide text-zinc-400">Terpenes</div>
          <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{coa.results.totalTerpenes}%</div>
        </div>
      </div>
    </Link>
  );
}

function CoaStatusDot({ status }: { status: COA["status"] }) {
  const colors = {
    verified: "bg-green-500",
    pending: "bg-amber-500",
    expired: "bg-red-500",
    rejected: "bg-red-500",
  };
  return <span className={`inline-block h-1.5 w-1.5 rounded-full ${colors[status]}`} />;
}
