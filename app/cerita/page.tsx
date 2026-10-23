import { Suspense } from "react";
import type { Metadata } from "next";
import { FilterJelajah } from "@/components/FilterJelajah";
import { semuaArtikel } from "@/lib/content";
import type { Kategori } from "@/lib/model";

export const metadata: Metadata = {
  title: "Koleksi Cerita",
  description: "Koleksi kisah sejarah, misteri, dan konspirasi untuk dibaca.",
};

const SAH: (Kategori | "Semua")[] = ["Semua", "Sejarah", "Konspirasi", "Misteri"];

async function IsiJelajah({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>;
}) {
  const { kategori } = await searchParams;
  const awal: Kategori | "Semua" = SAH.includes(kategori as Kategori)
    ? (kategori as Kategori)
    : "Semua";
  const artikel = semuaArtikel();
  return <FilterJelajah semua={artikel} awal={awal} />;
}

export default function Jelajah({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>;
}) {
  return (
    <div>
      <h1 className="font-serif text-3xl font-black">Koleksi Cerita</h1>
      <p className="mt-2 text-stone-600">Pilih kategorinya, lalu tenggelam dalam kisahnya.</p>
      <div className="mt-6">
        <Suspense fallback={<p className="text-stone-500">Memuat cerita…</p>}>
          <IsiJelajah searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
