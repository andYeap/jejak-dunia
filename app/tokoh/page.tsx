import type { Metadata } from "next";
import Link from "next/link";
import { semuaTokoh } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tokoh",
  description: "Profil tokoh-tokoh di balik peristiwa besar sejarah dan misteri dunia.",
};

export default async function DaftarTokoh() {
  const tokoh = semuaTokoh();
  return (
    <div>
      <h1 className="font-serif text-3xl font-black">Tokoh</h1>
      <p className="mt-2 text-stone-600">
        Orang-orang di balik peristiwa besar — dari mahapatih hingga tersangka.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {tokoh.map((t) => (
          <Link
            key={t.slug}
            href={`/tokoh/${t.slug}`}
            className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <p className="font-serif text-xl font-bold">{t.nama}</p>
            {t.julukan && (
              <p className="text-xs font-bold uppercase tracking-widest text-amber-700">
                {t.julukan}
              </p>
            )}
            <p className="mt-2 text-sm leading-relaxed text-stone-600">{t.ringkasan}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
