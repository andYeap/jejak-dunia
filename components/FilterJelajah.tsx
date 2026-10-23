"use client";

import { useState } from "react";
import { ArtikelCard } from "@/components/ArtikelCard";
import { DAFTAR_KATEGORI, type Artikel, type Kategori } from "@/lib/model";

export function FilterJelajah({
  semua,
  awal,
}: {
  semua: Artikel[];
  awal: Kategori | "Semua";
}) {
  const [kategori, setKategori] = useState<Kategori | "Semua">(awal);
  const tampil = kategori === "Semua" ? semua : semua.filter((a) => a.kategori === kategori);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {(["Semua", ...DAFTAR_KATEGORI.map((k) => k.nama)] as const).map((k) => (
          <button
            key={k}
            onClick={() => setKategori(k)}
            className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
              kategori === k
                ? "bg-stone-900 text-amber-100"
                : "border border-stone-300 bg-white text-stone-700 hover:border-stone-500"
            }`}
          >
            {k}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {tampil.map((a) => (
          <ArtikelCard key={a.slug} artikel={a} />
        ))}
      </div>
      {tampil.length === 0 && (
        <p className="mt-6 text-stone-500">Belum ada artikel di kategori ini.</p>
      )}
    </div>
  );
}
