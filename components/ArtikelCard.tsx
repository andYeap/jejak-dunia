import Link from "next/link";
import { BuktiBadge } from "./BuktiBadge";
import { formatTanggal, type Artikel } from "@/lib/model";

export function ArtikelCard({ artikel }: { artikel: Artikel }) {
  return (
    <Link
      href={`/cerita/${artikel.slug}`}
      className="group flex flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-semibold">
        <span className="rounded-full bg-stone-800 px-2.5 py-0.5 text-amber-100">
          {artikel.kategori}
        </span>
        <BuktiBadge bukti={artikel.bukti} />
      </div>
      <h3 className="font-serif text-xl font-bold leading-snug group-hover:text-orange-800">
        {artikel.judul}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{artikel.ringkasan}</p>
      <p className="mt-3 text-xs text-stone-500">
        {formatTanggal(artikel.tanggal)} · {artikel.waktuBaca} menit baca
      </p>
    </Link>
  );
}
