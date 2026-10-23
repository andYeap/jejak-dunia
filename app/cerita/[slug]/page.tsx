import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import { ArtikelCard } from "@/components/ArtikelCard";
import { BuktiBadge } from "@/components/BuktiBadge";
import { ProgressBaca } from "@/components/ProgressBaca";
import { ModeBaca } from "@/components/ModeBaca";
import { CatatTerakhirDibaca } from "@/components/BacaanTerakhir";
import { ambilArtikel, daftarBab, semuaArtikel } from "@/lib/content";
import { formatTanggal, LABEL_BUKTI } from "@/lib/model";
import { Fakta, FaktaMitos } from "@/components/mdx/FaktaMitos";
import { KuisMini } from "@/components/mdx/KuisMini";
import { Sorotan } from "@/components/mdx/Sorotan";

const komponen = { Fakta, FaktaMitos, KuisMini, Sorotan };

const GRADASI: Record<string, string> = {
  Sejarah: "from-stone-900 via-amber-950 to-orange-950",
  Konspirasi: "from-stone-900 via-violet-950 to-purple-950",
  Misteri: "from-stone-900 via-cyan-950 to-teal-950",
};

export async function generateStaticParams() {
  return semuaArtikel().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artikel = ambilArtikel(slug);
  if (!artikel) return {};
  return { title: artikel.judul, description: artikel.ringkasan };
}

export default async function HalamanCerita({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artikel = ambilArtikel(slug);
  if (!artikel) notFound();

  const semua = semuaArtikel();
  const posisi = semua.findIndex((a) => a.slug === artikel.slug);
  const sebelumnya = posisi < semua.length - 1 ? semua[posisi + 1] : null;
  const berikutnya = posisi > 0 ? semua[posisi - 1] : null;
  const bab = daftarBab(artikel.isi);
  const terkait = semua
    .filter((a) => a.slug !== artikel.slug && a.kategori === artikel.kategori)
    .slice(0, 2);

  return (
    <article>
      <ProgressBaca />
      <CatatTerakhirDibaca slug={artikel.slug} judul={artikel.judul} />

      {/* Sampul cerita */}
      <div
        className={`overflow-hidden rounded-3xl bg-gradient-to-br px-6 py-10 sm:px-10 sm:py-14 ${GRADASI[artikel.kategori] ?? GRADASI.Sejarah}`}
      >
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">
          {artikel.kategori} · {LABEL_BUKTI[artikel.bukti].label}
        </p>
        <h1 className="mt-3 max-w-3xl font-serif text-3xl font-black leading-tight text-amber-50 sm:text-5xl">
          {artikel.judul}
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-stone-300">{artikel.ringkasan}</p>
        <p className="mt-4 text-xs font-semibold text-stone-400">
          {formatTanggal(artikel.tanggal)} · {artikel.waktuBaca} menit membaca ·{" "}
          {bab.length} bab
        </p>
      </div>

      <div className="mt-3 flex justify-center">
        <BuktiBadge bukti={artikel.bukti} />
      </div>

      <ModeBaca>
        {/* Daftar bab */}
        {bab.length > 0 && (
          <nav className="my-8 rounded-2xl border border-stone-200 bg-white/60 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-stone-500">
              Bab-bab dalam kisah ini
            </p>
            <ol className="mt-2 space-y-1.5">
              {bab.map((b) => (
                <li key={b.id}>
                  <a
                    href={`#${b.id}`}
                    className="text-[0.95em] font-semibold text-orange-800 hover:underline"
                  >
                    {b.judul}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="prosa-artikel prosa-cerita">
          <MDXRemote
            source={artikel.isi}
            components={komponen}
            options={{ mdxOptions: { rehypePlugins: [rehypeSlug] } }}
          />
        </div>

        {/* Penutup */}
        <div className="my-10 rounded-2xl bg-stone-900 p-6 text-center">
          <p className="font-serif text-lg font-bold text-amber-100">Tamat.</p>
          <p className="mt-1 text-sm text-stone-400">
            Suka kisah ini? Lanjutkan ke cerita berikutnya di bawah.
          </p>
        </div>

        {/* Navigasi cerita */}
        <div className="grid gap-3 sm:grid-cols-2">
          {sebelumnya ? (
            <Link
              href={`/cerita/${sebelumnya.slug}`}
              className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400">
                ← Cerita sebelumnya
              </p>
              <p className="mt-1 font-serif font-bold leading-snug">{sebelumnya.judul}</p>
            </Link>
          ) : (
            <span />
          )}
          {berikutnya && (
            <Link
              href={`/cerita/${berikutnya.slug}`}
              className="rounded-2xl border border-stone-200 bg-white p-4 text-right shadow-sm transition hover:shadow-md"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400">
                Cerita berikutnya →
              </p>
              <p className="mt-1 font-serif font-bold leading-snug">{berikutnya.judul}</p>
            </Link>
          )}
        </div>
      </ModeBaca>

      {terkait.length > 0 && (
        <section className="mt-12">
          <h2 className="font-serif text-2xl font-black">Kisah lain yang sejenis</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {terkait.map((a) => (
              <ArtikelCard key={a.slug} artikel={a} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
