"use client";

import { useState } from "react";
import Link from "next/link";
import { bacaTerakhir, type BacaanTerakhir } from "./BacaanTerakhir";

export function LanjutkanMembaca() {
  const [terakhir] = useState<BacaanTerakhir | null>(() => bacaTerakhir());

  if (!terakhir) return null;

  return (
    <section className="rounded-2xl border border-orange-300 bg-gradient-to-r from-orange-50 to-amber-50 p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-700">
        Lanjutkan bacaanmu
      </p>
      <Link
        href={`/cerita/${terakhir.slug}`}
        className="mt-1 block font-serif text-lg font-bold hover:text-orange-800 hover:underline"
      >
        {terakhir.judul}
      </Link>
      <p className="mt-0.5 text-xs text-stone-500">
        Terakhir dibuka{" "}
        {new Date(terakhir.waktu).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </section>
  );
}
