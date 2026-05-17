import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { getDispensaryBySlug, getProductsByDispensary } from "@/lib/data";

export default async function DispensaryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dispensary = getDispensaryBySlug(slug);

  if (!dispensary) {
    notFound();
  }

  const dispensaryProducts = getProductsByDispensary(dispensary.id);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <nav className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/dispensaries" className="hover:text-green-700">
          Dispensaries
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-900 dark:text-zinc-100">
          {dispensary.name}
        </span>
      </nav>

      {/* Dispensary Info */}
      <div className="rounded-2xl border border-zinc-200 p-8 dark:border-zinc-800">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              {dispensary.name}
            </h1>
            <p className="mt-2 max-w-xl text-zinc-600 dark:text-zinc-400">
              {dispensary.description}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 dark:bg-green-900/20">
            <span className="text-xl font-bold text-green-800 dark:text-green-400">
              {dispensary.rating}
            </span>
            <span className="text-sm text-green-600 dark:text-green-500">
              ({dispensary.reviewCount} reviews)
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InfoBlock label="Address">
            {dispensary.address}, {dispensary.city}, {dispensary.state}{" "}
            {dispensary.zip}
          </InfoBlock>
          <InfoBlock label="Phone">{dispensary.phone}</InfoBlock>
          <InfoBlock label="Hours">{dispensary.hours}</InfoBlock>
          <InfoBlock label="License">{dispensary.license}</InfoBlock>
        </div>

        <div className="mt-4 flex gap-3">
          {dispensary.delivery && (
            <span className="rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
              Delivery Available
            </span>
          )}
          {dispensary.pickup && (
            <span className="rounded-full bg-purple-50 px-4 py-1.5 text-sm font-medium text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">
              Pickup Available
            </span>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Products ({dispensaryProducts.length})
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {dispensaryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
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
