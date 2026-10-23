import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArtikelCard } from "@/components/ArtikelCard";
import { BuktiBadge } from "@/components/BuktiBadge";
import { ProgressBaca } from "@/components/ProgressBaca";
import { ambilArtikel, semuaArtikel } from "@/lib/content";
import { formatTanggal } from "@/lib/model";
import { Fakta, FaktaMitos } from "@/components/mdx/FaktaMitos";
import { KuisMini } from "@/components/mdx/KuisMini";
import { Sorotan } from "@/components/mdx/Sorotan";

const komponen = { Fakta, FaktaMitos, KuisMini, Sorotan };

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

export default async function HalamanArtikel({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artikel = ambilArtikel(slug);
  if (!artikel) notFound();

  const terkait = semuaArtikel()
    .filter((a) => a.slug !== artikel.slug && a.kategori === artikel.kategori)
    .slice(0, 2);

  return (
    <article>
      <ProgressBaca />
      <p className="text-sm font-semibold">
        <Link href="/jelajah" className="text-orange-800 hover:underline">
          {artikel.kategori}
        </Link>
        <span className="mx-2 text-stone-400">·</span>
        <span className="text-stone-500">
          {formatTanggal(artikel.tanggal)} · {artikel.waktuBaca} menit baca
        </span>
      </p>
      <h1 className="mt-2 font-serif text-3xl font-black leading-tight sm:text-4xl">
        {artikel.judul}
      </h1>
      <p className="mt-3 text-lg leading-relaxed text-stone-600">{artikel.ringkasan}</p>
      <div className="mt-3">
        <BuktiBadge bukti={artikel.bukti} />
      </div>
      <hr className="my-6 border-stone-200" />
      <div className="prosa-artikel">
        <MDXRemote source={artikel.isi} components={komponen} />
      </div>

      {terkait.length > 0 && (
        <section className="mt-12">
          <h2 className="font-serif text-2xl font-black">Baca juga</h2>
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
