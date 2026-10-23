import type { Metadata } from "next";
import { GarisWaktu } from "@/components/GarisWaktu";
import { semuaPeristiwa } from "@/lib/content";

export const metadata: Metadata = {
  title: "Timeline Sejarah",
  description: "Garis waktu interaktif peristiwa sejarah, misteri, dan konspirasi.",
};

export default async function Timeline() {
  const peristiwa = semuaPeristiwa();
  return (
    <div>
      <h1 className="font-serif text-3xl font-black">Timeline</h1>
      <p className="mt-2 text-stone-600">
        {peristiwa.length} peristiwa — saring berdasarkan era, klik untuk membaca kisahnya.
      </p>
      <div className="mt-6">
        <GarisWaktu peristiwa={peristiwa} />
      </div>
    </div>
  );
}
