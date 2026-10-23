import Link from "next/link";

const TAUTAN = [
  { href: "/", label: "Beranda" },
  { href: "/jelajah", label: "Jelajah" },
  { href: "/timeline", label: "Timeline" },
  { href: "/tokoh", label: "Tokoh" },
  { href: "/cari", label: "Cari" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-[#faf6ee]/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-serif text-2xl font-black tracking-tight text-stone-900">
            Jejak<span className="text-orange-700">Dunia</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-semibold sm:gap-2">
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
      </div>
    </header>
  );
}
