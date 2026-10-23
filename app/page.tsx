import Link from "next/link";
import { Suspense } from "react";
import { ArtikelCard } from "@/components/ArtikelCard";
import { BuktiBadge } from "@/components/BuktiBadge";
import { DAFTAR_KATEGORI } from "@/lib/model";
import { semuaArtikel, semuaPeristiwa, semuaTokoh } from "@/lib/content";
import { HariIniDalamSejarah } from "@/components/HariIniDalamSejarah";
import { LanjutkanMembaca } from "@/components/LanjutkanMembaca";

export default async function Beranda() {
  const artikel = semuaArtikel();
  const unggulan = artikel.filter((a) => a.unggulan);
  const terbaru = artikel.filter((a) => !a.unggulan).slice(0, 3);
  const tokoh = semuaTokoh();
  const peristiwa = semuaPeristiwa();

  return (
    <div className="space-y-14">
      {/* Hero */}
      <section className="overflow-hidden rounded-3xl bg-stone-900 px-6 py-12 text-center sm:px-12 sm:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
          Sejarah · Misteri · Konspirasi
        </p>
        <h1 className="mx-auto mt-3 max-w-2xl font-serif text-3xl font-black leading-tight text-amber-50 sm:text-5xl">
          Kisah nyata yang lebih seru dari fiksi.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-stone-300">
          Dari Atlantis hingga Apollo 11 — bacalah sebagai cerita,
          timbang sendiri mana fakta dan mana legenda.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/cerita"
            className="rounded-full bg-orange-700 px-6 py-2.5 text-sm font-bold text-white hover:bg-orange-600"
          >
            Mulai Membaca
          </Link>
          <Link
            href="/timeline"
            className="rounded-full border border-stone-600 px-6 py-2.5 text-sm font-bold text-stone-200 hover:border-stone-400"
          >
            Lihat Timeline
          </Link>
        </div>
      </section>

      {/* Hari ini dalam sejarah */}
      <Suspense fallback={null}>
        <HariIniDalamSejarah peristiwa={peristiwa} />
      </Suspense>

      <LanjutkanMembaca />

      {/* Unggulan */}
      <section>
        <h2 className="font-serif text-2xl font-black">Pilihan Editor</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {unggulan.map((a) => (
            <ArtikelCard key={a.slug} artikel={a} />
          ))}
        </div>
      </section>

      {/* Kategori */}
      <section>
        <h2 className="font-serif text-2xl font-black">Jelajahi per Kategori</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {DAFTAR_KATEGORI.map((k) => {
            const jumlah = artikel.filter((a) => a.kategori === k.nama).length;
            return (
              <Link
                key={k.nama}
                href={`/cerita?kategori=${k.nama}`}
                className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span
                  className={`inline-block rounded-full px-3 py-1 text-sm font-bold text-white ${k.kelas}`}
                >
                  {k.nama}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{k.deskripsi}</p>
                <p className="mt-2 text-xs font-semibold text-stone-500">{jumlah} kisah</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Terbaru + Tokoh */}
      <section className="grid gap-10 md:grid-cols-[1fr_320px]">
        <div>
          <h2 className="font-serif text-2xl font-black">Cerita Terbaru</h2>
          <div className="mt-4 grid gap-4">
            {terbaru.map((a) => (
              <ArtikelCard key={a.slug} artikel={a} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-serif text-2xl font-black">Tokoh</h2>
          <div className="mt-4 space-y-3">
            {tokoh.map((t) => (
              <Link
                key={t.slug}
                href={`/tokoh/${t.slug}`}
                className="block rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <p className="font-serif text-lg font-bold">{t.nama}</p>
                {t.julukan && <p className="text-xs font-semibold text-amber-700">{t.julukan}</p>}
                <p className="mt-1 line-clamp-2 text-sm text-stone-600">{t.ringkasan}</p>
              </Link>
            ))}
            <Link
              href="/tokoh"
              className="block text-center text-sm font-semibold text-orange-800 hover:underline"
            >
              Semua tokoh →
            </Link>
          </div>
        </div>
      </section>

      {/* Legenda bukti */}
      <section className="rounded-2xl bg-stone-900 p-6 text-sm text-stone-300">
        <p className="font-serif text-lg font-bold text-amber-100">Cara kami menilai</p>
        <p className="mt-1">
          Setiap artikel membawa label status bukti supaya kamu tahu posisi klaimnya:
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <BuktiBadge bukti="terbukti" />
          <BuktiBadge bukti="diperdebatkan" />
          <BuktiBadge bukti="tak-terbukti" />
          <BuktiBadge bukti="campuran" />
        </div>
      </section>
    </div>
  );
}
