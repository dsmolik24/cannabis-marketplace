import { DispensaryCard } from "@/components/dispensary-card";
import { dispensaries } from "@/lib/data";

export const metadata = {
  title: "Dispensaries | CannaMart",
  description: "Find licensed dispensaries near you",
};

export default function DispensariesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        Dispensaries
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Browse licensed dispensaries and shop their products
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dispensaries.map((dispensary) => (
          <DispensaryCard key={dispensary.id} dispensary={dispensary} />
        ))}
      </div>
    </div>
  );
}
