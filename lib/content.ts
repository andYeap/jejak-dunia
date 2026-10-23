/** Akses file konten MDX — KHUSUS server. Jangan impor dari komponen client. */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Artikel, ItemGarisWaktu, Tokoh } from "./model";

const DIR_KONTEN = path.join(process.cwd(), "content");

function bacaMdx<T extends { slug: string; isi: string }>(
  folder: string,
  slug: string,
  hitungMenit: boolean,
): T | null {
  const berkas = path.join(DIR_KONTEN, folder, `${slug}.mdx`);
  if (!fs.existsSync(berkas)) return null;
  const mentah = fs.readFileSync(berkas, "utf8");
  const { data, content } = matter(mentah);
  const kata = content.split(/\s+/).length;
  return {
    ...(data as Omit<T, "slug" | "isi">),
    slug,
    isi: content,
    ...(hitungMenit ? { waktuBaca: Math.max(1, Math.round(kata / 200)) } : {}),
  } as T;
}

function daftarSlug(folder: string): string[] {
  const dir = path.join(DIR_KONTEN, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function semuaArtikel(): Artikel[] {
  return daftarSlug("artikel")
    .map((slug) => bacaMdx<Artikel>("artikel", slug, true))
    .filter((a): a is Artikel => a !== null)
    .sort((a, b) => (a.tanggal < b.tanggal ? 1 : -1));
}

export function ambilArtikel(slug: string): Artikel | null {
  return bacaMdx<Artikel>("artikel", slug, true);
}

export function semuaTokoh(): Tokoh[] {
  return daftarSlug("tokoh")
    .map((slug) => bacaMdx<Tokoh>("tokoh", slug, false))
    .filter((t): t is Tokoh => t !== null)
    .sort((a, b) => a.nama.localeCompare(b.nama, "id"));
}

export function ambilTokoh(slug: string): Tokoh | null {
  return bacaMdx<Tokoh>("tokoh", slug, false);
}

export function semuaPeristiwa(): ItemGarisWaktu[] {
  const dariArtikel: ItemGarisWaktu[] = semuaArtikel().flatMap((a) =>
    (a.peristiwa ?? []).map((p) => ({ ...p, slug: p.slug ?? a.slug, asal: "artikel" as const })),
  );
  const dariTokoh: ItemGarisWaktu[] = semuaTokoh().flatMap((t) => [
    { tanggal: t.lahir, judul: `${t.nama} lahir`, tokoh: t.nama, asal: "tokoh" as const },
    { tanggal: t.wafat, judul: `${t.nama} wafat`, tokoh: t.nama, asal: "tokoh" as const },
  ]);
  return [...dariArtikel, ...dariTokoh].sort((a, b) => (a.tanggal < b.tanggal ? -1 : 1));
}

/** Akhir fungsi konten. */
