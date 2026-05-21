import { notFound } from "next/navigation";
import Link from "next/link";
import { coas, strains, growHouses } from "@/lib/strains";

export default async function CoaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const coa = coas.find((c) => c.id === id);

  if (!coa) {
    notFound();
  }

  const strain = strains.find((s) => s.id === coa.strainId);
  const growHouse = growHouses.find((g) => g.id === coa.growHouseId);

  const safetyTests = [
    { name: "Pesticides", passed: coa.results.passedPesticides },
    { name: "Heavy Metals", passed: coa.results.passedHeavyMetals },
    { name: "Microbials", passed: coa.results.passedMicrobials },
    { name: "Mycotoxins", passed: coa.results.passedMycotoxins },
    { name: "Residual Solvents", passed: coa.results.passedResidualSolvents },
  ];

  const allPassed = safetyTests.every((t) => t.passed);

  const statusColors = {
    verified: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
    pending: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
    expired: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
    rejected: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <nav className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/coa/upload" className="hover:text-green-700">
          COA Management
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-900 dark:text-zinc-100">{coa.batchId}</span>
      </nav>

      {/* Header */}
      <div className="rounded-2xl border border-zinc-200 p-8 dark:border-zinc-800">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Certificate of Analysis
              </h1>
              <span className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${statusColors[coa.status]}`}>
                {coa.status}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-500 dark:text-zinc-400">
              <span>Batch: <span className="font-mono font-medium text-zinc-700 dark:text-zinc-300">{coa.batchId}</span></span>
              {strain && (
                <Link href={`/strains/${strain.slug}`} className="font-medium text-green-700 hover:text-green-800 dark:text-green-500">
                  {strain.name}
                </Link>
              )}
              {growHouse && (
                <Link href={`/grow-houses/${growHouse.slug}`} className="text-zinc-600 hover:text-green-700 dark:text-zinc-400">
                  {growHouse.name}
                </Link>
              )}
            </div>
          </div>

          {allPassed && (
            <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 dark:bg-green-900/20">
              <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                All Safety Tests Passed
              </span>
            </div>
          )}
        </div>

        {/* Lab Info */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Lab</div>
            <div className="mt-0.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">{coa.labName}</div>
          </div>
          <div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Lab License</div>
            <div className="mt-0.5 font-mono text-sm text-zinc-900 dark:text-zinc-100">{coa.labLicense}</div>
          </div>
          <div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Test Date</div>
            <div className="mt-0.5 text-sm text-zinc-900 dark:text-zinc-100">
              {new Date(coa.testDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </div>
          </div>
          <div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Expires</div>
            <div className="mt-0.5 text-sm text-zinc-900 dark:text-zinc-100">
              {new Date(coa.expirationDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </div>
          </div>
        </div>
      </div>

      {/* Cannabinoid Profile */}
      <div className="mt-8 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Cannabinoid Profile</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <ResultCard label="THC" value={`${coa.results.thc}%`} />
          <ResultCard label="THCA" value={`${coa.results.thca}%`} />
          <ResultCard label="CBD" value={`${coa.results.cbd}%`} />
          <ResultCard label="CBDA" value={`${coa.results.cbda}%`} />
          <ResultCard label="CBG" value={`${coa.results.cbg}%`} />
          <ResultCard label="CBN" value={`${coa.results.cbn}%`} />
          <ResultCard label="Total Cannabinoids" value={`${coa.results.totalCannabinoids}%`} highlight />
          <ResultCard label="Moisture" value={`${coa.results.moisture}%`} />
        </div>
      </div>

      {/* Terpene Profile */}
      <div className="mt-6 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Terpene Profile</h2>
        <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Total Terpenes: <span className="font-semibold text-zinc-900 dark:text-zinc-100">{coa.results.totalTerpenes}%</span>
        </div>
        <div className="mt-4 space-y-3">
          {coa.results.topTerpenes.map((terp) => (
            <div key={terp.name} className="flex items-center gap-3">
              <span className="w-28 text-sm font-medium text-zinc-700 dark:text-zinc-300">{terp.name}</span>
              <div className="flex-1">
                <div className="h-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-green-500 dark:bg-green-400"
                    style={{ width: `${Math.min((terp.percentage / 2) * 100, 100)}%` }}
                  />
                </div>
              </div>
              <span className="w-12 text-right text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {terp.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Testing */}
      <div className="mt-6 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Safety Testing</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {safetyTests.map((test) => (
            <div
              key={test.name}
              className={`flex items-center gap-2 rounded-lg p-3 ${
                test.passed
                  ? "bg-green-50 dark:bg-green-900/10"
                  : "bg-red-50 dark:bg-red-900/10"
              }`}
            >
              {test.passed ? (
                <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <span className={`text-sm font-medium ${test.passed ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
                {test.name}
              </span>
              <span className={`ml-auto text-xs font-semibold ${test.passed ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"}`}>
                {test.passed ? "PASS" : "FAIL"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Info */}
      <div className="mt-6 rounded-xl bg-zinc-50 p-4 text-sm text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
        <div className="flex items-center justify-between">
          <span>Uploaded by <span className="font-medium text-zinc-700 dark:text-zinc-300">{coa.uploadedBy}</span></span>
          <span>{new Date(coa.uploadedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
        </div>
        <div className="mt-1 font-mono text-xs">{coa.fileName}</div>
      </div>
    </div>
  );
}

function ResultCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-lg p-3 ${highlight ? "bg-green-50 dark:bg-green-900/20" : "bg-zinc-50 dark:bg-zinc-800/50"}`}>
      <div className="text-[10px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{label}</div>
      <div className={`mt-1 text-lg font-bold ${highlight ? "text-green-700 dark:text-green-400" : "text-zinc-900 dark:text-zinc-100"}`}>
        {value}
      </div>
    </div>
  );
}
