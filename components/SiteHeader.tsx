import Link from "next/link";

const TAUTAN = [
  { href: "/", label: "Beranda" },
  { href: "/cerita", label: "Cerita" },
  { href: "/timeline", label: "Timeline" },
  { href: "/tokoh", label: "Tokoh" },
  { href: "/cari", label: "Cari" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-[#faf6ee]/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-baseline gap-2">
          <span className="font-serif text-xl font-black tracking-tight text-stone-900 sm:text-2xl">
            Jejak<span className="text-orange-700">Dunia</span>
          </span>
        </Link>
        {/* Navigasi desktop */}
        <nav className="hidden items-center gap-1 text-sm font-semibold sm:flex">
          {TAUTAN.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="rounded-lg px-2.5 py-1.5 text-stone-700 hover:bg-stone-200/60 hover:text-stone-950"
            >
              {t.label}
            </Link>
          ))}
        </nav>
        {/* Menu mobile tanpa JS */}
        <details className="relative sm:hidden">
          <summary className="cursor-pointer list-none rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm font-bold text-stone-700 [&::-webkit-details-marker]:hidden">
            ☰ Menu
          </summary>
          <nav className="absolute right-0 top-full z-50 mt-2 flex w-44 flex-col overflow-hidden rounded-xl border border-stone-200 bg-white py-1 shadow-lg">
            {TAUTAN.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="px-4 py-2.5 text-sm font-semibold text-stone-700 hover:bg-amber-50"
              >
                {t.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
