import Link from "next/link";

const footerLinks = {
  Shop: [
    { label: "Flower", href: "/products?category=flower" },
    { label: "Edibles", href: "/products?category=edibles" },
    { label: "Concentrates", href: "/products?category=concentrates" },
    { label: "Vaporizers", href: "/products?category=vaporizers" },
    { label: "All Products", href: "/products" },
  ],
  Platform: [
    { label: "Live Strains", href: "/strains" },
    { label: "Dispensaries", href: "/dispensaries" },
    { label: "Grow Houses", href: "/grow-houses" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800/80 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-green-700 dark:bg-green-600">
                <svg
                  className="h-3.5 w-3.5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 007.92 12.446A9 9 0 1112 2.992z"
                  />
                </svg>
              </div>
              <span className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Canna<span className="text-green-700 dark:text-green-500">Mart</span>
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Your trusted cannabis marketplace. Lab-tested products from
              licensed dispensaries with full supply chain transparency.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-8 dark:border-zinc-800 sm:flex-row">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} CannaMart. All rights reserved.
          </p>
          <p className="rounded-full bg-zinc-100 px-4 py-1.5 text-xs font-medium text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
            Must be 21+ or hold a valid medical card. Please consume responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
}
