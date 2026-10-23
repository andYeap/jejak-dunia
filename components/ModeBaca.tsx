"use client";

import { useEffect, useState } from "react";

type Mode = "terang" | "sepia" | "gelap";
type Ukuran = "s" | "m" | "l";

const KUNCI = "jejak-modebaca";

function bacaSimpan(): { mode: Mode; ukuran: Ukuran } {
  const baku = { mode: "terang" as Mode, ukuran: "m" as Ukuran };
  if (typeof window === "undefined") return baku;
  try {
    const simpan = JSON.parse(localStorage.getItem(KUNCI) ?? "{}");
    return {
      mode: simpan.mode ?? baku.mode,
      ukuran: simpan.ukuran ?? baku.ukuran,
    };
  } catch {
    return baku;
  }
}

export function ModeBaca({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>(() => bacaSimpan().mode);
  const [ukuran, setUkuran] = useState<Ukuran>(() => bacaSimpan().ukuran);

  useEffect(() => {
    localStorage.setItem(KUNCI, JSON.stringify({ mode, ukuran }));
  }, [mode, ukuran]);

  const tombol = (aktif: boolean) =>
    `rounded-full px-3 py-1 text-xs font-bold transition ${
      aktif ? "bg-stone-900 text-amber-100" : "text-stone-600 hover:bg-stone-200/70"
    }`;

  return (
    <div data-modebaca={mode} data-font={ukuran} className="modebaca rounded-3xl">
      <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-stone-200 bg-white/70 px-4 py-2.5">
        <div className="flex items-center gap-1">
          <span className="mr-1 text-xs font-bold uppercase tracking-widest text-stone-400">
            Mode
          </span>
          {(["terang", "sepia", "gelap"] as Mode[]).map((m) => (
            <button key={m} onClick={() => setMode(m)} className={tombol(mode === m)}>
              {m === "terang" ? "Terang" : m === "sepia" ? "Sepia" : "Gelap"}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <span className="mr-1 text-xs font-bold uppercase tracking-widest text-stone-400">
            Huruf
          </span>
          <button onClick={() => setUkuran("s")} className={tombol(ukuran === "s")}>
            A−
          </button>
          <button onClick={() => setUkuran("m")} className={tombol(ukuran === "m")}>
            A
          </button>
          <button onClick={() => setUkuran("l")} className={tombol(ukuran === "l")}>
            A+
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}
