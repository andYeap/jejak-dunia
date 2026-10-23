"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { formatTahun, type ItemGarisWaktu } from "@/lib/model";

function eraDariTanggal(iso: string): string {
  const tahun = parseInt(iso.slice(0, 4), 10);
  if (Number.isNaN(tahun)) return "Lainnya";
  if (tahun < 1500) return "Kuno & Abad Pertengahan";
  if (tahun < 1900) return "Era Modern Awal";
  return "Abad ke-20+";
}

const SEMUA_ERA = ["Semua", "Kuno & Abad Pertengahan", "Era Modern Awal", "Abad ke-20+"];

export function GarisWaktu({ peristiwa }: { peristiwa: ItemGarisWaktu[] }) {
  const [era, setEra] = useState("Semua");
  const [hanyaArtikel, setHanyaArtikel] = useState(false);

  const tampil = useMemo(
    () =>
      peristiwa.filter(
        (p) =>
          (era === "Semua" || eraDariTanggal(p.tanggal) === era) &&
          (!hanyaArtikel || p.asal === "artikel"),
      ),
    [peristiwa, era, hanyaArtikel],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {SEMUA_ERA.map((e) => (
          <button
            key={e}
            onClick={() => setEra(e)}
            className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
              era === e
                ? "bg-stone-900 text-amber-100"
                : "border border-stone-300 bg-white text-stone-700 hover:border-stone-500"
            }`}
          >
            {e}
          </button>
        ))}
        <label className="ml-1 flex cursor-pointer items-center gap-2 text-sm font-semibold text-stone-600">
          <input
            type="checkbox"
            checked={hanyaArtikel}
            onChange={(e) => setHanyaArtikel(e.target.checked)}
            className="h-4 w-4 accent-orange-700"
          />
          Hanya peristiwa artikel
        </label>
      </div>

      <div className="relative mt-8 border-l-2 border-amber-400 pl-0">
        {tampil.map((p, i) => (
          <div key={`${p.tanggal}-${i}`} className="relative pb-8 pl-8">
            <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-amber-500 bg-amber-100" />
            <p className="font-serif text-lg font-black text-orange-800">
              {formatTahun(p.tanggal)}
            </p>
            <p className="mt-0.5 font-semibold">{p.judul}</p>
            <div className="mt-1 flex flex-wrap gap-2 text-xs">
              {p.slug && (
                <Link
                  href={`/cerita/${p.slug}`}
                  className="font-semibold text-orange-800 hover:underline"
                >
                  Baca artikel →
                </Link>
              )}
              {p.tokoh && <span className="text-stone-500">Tokoh: {p.tokoh}</span>}
            </div>
          </div>
        ))}
      </div>
      {tampil.length === 0 && <p className="text-stone-500">Tidak ada peristiwa pada filter ini.</p>}
    </div>
  );
}
