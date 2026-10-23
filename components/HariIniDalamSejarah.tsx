"use client";

import { useMemo } from "react";
import Link from "next/link";
import { formatTanggal, type ItemGarisWaktu } from "@/lib/model";

export function HariIniDalamSejarah({ peristiwa }: { peristiwa: ItemGarisWaktu[] }) {
  const terbaik = useMemo(() => {
    if (peristiwa.length === 0) return null;
    const kini = new Date();
    const kunci = (d: Date) => d.getMonth() * 100 + d.getDate();
    const target = kunci(kini);
    let hasil = peristiwa[0];
    let selisih = 366;
    for (const p of peristiwa) {
      const d = new Date(`${p.tanggal}T00:00:00`);
      if (Number.isNaN(d.getTime())) continue;
      const s = Math.abs(kunci(d) - target);
      const melingkar = Math.min(s, 366 - s);
      if (melingkar < selisih) {
        selisih = melingkar;
        hasil = p;
      }
    }
    return hasil;
  }, [peristiwa]);

  if (!terbaik) return null;

  return (
    <section className="rounded-2xl border border-amber-300 bg-amber-50 p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-amber-700">
        Sekitar hari ini dalam sejarah
      </p>
      <p className="mt-1 font-serif text-lg font-bold">
        {terbaik.judul}{" "}
        <span className="text-stone-500">({formatTanggal(terbaik.tanggal)})</span>
      </p>
      {terbaik.slug && (
        <Link
          href={`/artikel/${terbaik.slug}`}
          className="mt-1 inline-block text-sm font-semibold text-orange-800 hover:underline"
        >
          Baca kisahnya →
        </Link>
      )}
    </section>
  );
}
