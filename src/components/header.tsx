import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-green-700 dark:text-green-500">
            CannaMart
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/products"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-green-700 dark:text-zinc-400 dark:hover:text-green-500"
          >
            Products
          </Link>
          <Link
            href="/strains"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-green-700 dark:text-zinc-400 dark:hover:text-green-500"
          >
            Live Strains
          </Link>
          <Link
            href="/dispensaries"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-green-700 dark:text-zinc-400 dark:hover:text-green-500"
          >
            Dispensaries
          </Link>
          <Link
            href="/grow-houses"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-green-700 dark:text-zinc-400 dark:hover:text-green-500"
          >
            Grow Houses
          </Link>
          <Link
            href="/cart"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-green-700 dark:text-zinc-400 dark:hover:text-green-500"
          >
            Cart
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Sign In
          </Link>
          <Link
            href="/auth/register"
            className="rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
