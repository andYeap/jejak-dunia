import type { Metadata } from "next";
import { Pencarian } from "@/components/Pencarian";
import { semuaArtikel } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cari",
  description: "Cari artikel sejarah, misteri, dan konspirasi.",
};

export default async function Cari() {
  const data = semuaArtikel().map((a) => ({
    slug: a.slug,
    judul: a.judul,
    kategori: a.kategori,
    ringkasan: a.ringkasan,
    tanggal: a.tanggal,
    bukti: a.bukti,
    waktuBaca: a.waktuBaca,
  }));
  return (
    <div>
      <h1 className="font-serif text-3xl font-black">Cari Artikel</h1>
      <p className="mt-2 text-stone-600">Pencarian instan, tanpa server.</p>
      <div className="mt-6">
        <Pencarian data={data} />
      </div>
    </div>
  );
}
