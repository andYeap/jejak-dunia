"use client";

import { useState } from "react";

interface Props {
  tanya: string;
  a: string;
  b: string;
  c: string;
  benar: "a" | "b" | "c";
  jelas: string;
}

export function KuisMini({ tanya, a, b, c, benar, jelas }: Props) {
  const [pilih, setPilih] = useState<string | null>(null);
  const opsi: { kunci: string; teks: string }[] = [
    { kunci: "a", teks: a },
    { kunci: "b", teks: b },
    { kunci: "c", teks: c },
  ];

  return (
    <div className="my-6 rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50 p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-amber-700">Uji pemahamanmu</p>
      <p className="mt-1 font-serif text-lg font-bold">{tanya}</p>
      <div className="mt-3 space-y-2">
        {opsi.map((o) => {
          const aktif = pilih === o.kunci;
          const sudah = pilih !== null;
          const warna = !sudah
            ? "border-stone-300 bg-white hover:border-amber-500"
            : o.kunci === benar
              ? "border-emerald-500 bg-emerald-50"
              : aktif
                ? "border-rose-500 bg-rose-50"
                : "border-stone-200 bg-stone-50 opacity-60";
          return (
            <button
              key={o.kunci}
              onClick={() => !sudah && setPilih(o.kunci)}
              disabled={sudah}
              className={`block w-full rounded-xl border-2 px-4 py-2.5 text-left text-sm font-medium transition ${warna}`}
            >
              <span className="mr-2 font-black uppercase text-stone-400">{o.kunci}.</span> {o.teks}
              {sudah && o.kunci === benar && <span className="ml-2">✓</span>}
              {sudah && aktif && o.kunci !== benar && <span className="ml-2">✗</span>}
            </button>
          );
        })}
      </div>
      {pilih !== null && (
        <p className="mt-3 rounded-xl bg-white/70 p-3 text-sm leading-relaxed">
          {pilih === benar ? "Tepat! " : "Belum tepat. "}
          {jelas}
        </p>
      )}
    </div>
  );
}
