import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArtikelCard } from "@/components/ArtikelCard";
import { ambilArtikel, ambilTokoh, semuaTokoh } from "@/lib/content";
import { Fakta, FaktaMitos } from "@/components/mdx/FaktaMitos";
import { KuisMini } from "@/components/mdx/KuisMini";
import { Sorotan } from "@/components/mdx/Sorotan";

const komponen = { Fakta, FaktaMitos, KuisMini, Sorotan };

export async function generateStaticParams() {
  return semuaTokoh().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tokoh = ambilTokoh(slug);
  if (!tokoh) return {};
  return { title: tokoh.nama, description: tokoh.ringkasan };
}

export default async function HalamanTokoh({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tokoh = ambilTokoh(slug);
  if (!tokoh) notFound();

  const artikelTerkait = tokoh.artikel
    .map((s) => ambilArtikel(s))
    .filter((a) => a !== null);

  return (
    <article>
      <p className="text-sm font-semibold text-stone-500">
        <Link href="/tokoh" className="text-orange-800 hover:underline">
          Tokoh
        </Link>
      </p>
      <h1 className="mt-2 font-serif text-3xl font-black sm:text-4xl">{tokoh.nama}</h1>
      {tokoh.julukan && (
        <p className="mt-1 text-sm font-bold uppercase tracking-widest text-amber-700">
          {tokoh.julukan}
        </p>
      )}
      <p className="mt-3 text-lg leading-relaxed text-stone-600">{tokoh.ringkasan}</p>
      <hr className="my-6 border-stone-200" />
      <div className="prosa-artikel">
        <MDXRemote source={tokoh.isi} components={komponen} />
      </div>

      {artikelTerkait.length > 0 && (
        <section className="mt-12">
          <h2 className="font-serif text-2xl font-black">Artikel terkait</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {artikelTerkait.map((a) => (
              <ArtikelCard key={a.slug} artikel={a} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
