"use client";

import { useMemo, useState } from "react";
import { ArtikelCard } from "@/components/ArtikelCard";
import type { Artikel } from "@/lib/model";

type Ringkas = Pick<Artikel, "slug" | "judul" | "kategori" | "ringkasan" | "tanggal" | "bukti" | "waktuBaca">;

function normalisasi(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function Pencarian({ data }: { data: Ringkas[] }) {
  const [kata, setKata] = useState("");
  const hasil = useMemo(() => {
    const k = normalisasi(kata.trim());
    if (k.length < 2) return null;
    return (data as Artikel[]).filter((a) =>
      normalisasi(`${a.judul} ${a.ringkasan} ${a.kategori}`).includes(k),
    );
  }, [kata, data]);

  return (
    <div>
      <input
        type="search"
        value={kata}
        onChange={(e) => setKata(e.target.value)}
        placeholder="Contoh: bulan, majapahit, segitiga…"
        autoFocus
        className="w-full rounded-2xl border border-stone-300 bg-white px-5 py-3 text-base shadow-sm outline-none placeholder:text-stone-400 focus:border-orange-700 focus:ring-2 focus:ring-orange-700/20"
      />
      {hasil === null ? (
        <p className="mt-4 text-sm text-stone-500">Ketik minimal 2 huruf untuk mulai mencari.</p>
      ) : hasil.length === 0 ? (
        <p className="mt-4 text-sm text-stone-500">
          Tidak ditemukan untuk “{kata}”. Coba kata kunci lain.
        </p>
      ) : (
        <>
          <p className="mt-4 text-sm text-stone-500">
            {hasil.length} hasil untuk “{kata}”
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {hasil.map((a) => (
              <ArtikelCard key={a.slug} artikel={a} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
