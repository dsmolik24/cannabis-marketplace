import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              CannaMart
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Your trusted cannabis marketplace. Quality products from licensed
              dispensaries.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Shop
            </h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  href="/products?category=flower"
                  className="text-sm text-zinc-600 hover:text-green-700 dark:text-zinc-400 dark:hover:text-green-500"
                >
                  Flower
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=edibles"
                  className="text-sm text-zinc-600 hover:text-green-700 dark:text-zinc-400 dark:hover:text-green-500"
                >
                  Edibles
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=concentrates"
                  className="text-sm text-zinc-600 hover:text-green-700 dark:text-zinc-400 dark:hover:text-green-500"
                >
                  Concentrates
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=vaporizers"
                  className="text-sm text-zinc-600 hover:text-green-700 dark:text-zinc-400 dark:hover:text-green-500"
                >
                  Vaporizers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Company
            </h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-zinc-600 hover:text-green-700 dark:text-zinc-400 dark:hover:text-green-500"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/dispensaries"
                  className="text-sm text-zinc-600 hover:text-green-700 dark:text-zinc-400 dark:hover:text-green-500"
                >
                  Dispensaries
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Legal
            </h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-zinc-600 hover:text-green-700 dark:text-zinc-400 dark:hover:text-green-500"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-zinc-600 hover:text-green-700 dark:text-zinc-400 dark:hover:text-green-500"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <p className="text-center text-xs text-zinc-500 dark:text-zinc-500">
            Must be 21+ or hold a valid medical card. Please consume responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
}
