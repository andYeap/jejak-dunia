interface Baris {
  klaim: string;
  fakta: string;
}

/** Tabel "Klaim vs Fakta" — parse anak <Fakta klaim="..." fakta="..." /> */
export function FaktaMitos({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-stone-200">
      <div className="grid grid-cols-2 bg-stone-800 text-sm font-bold text-amber-100">
        <div className="px-4 py-2.5">Klaim yang beredar</div>
        <div className="px-4 py-2.5">Kata bukti</div>
      </div>
      <div className="divide-y divide-stone-200 bg-white">{children}</div>
    </div>
  );
}

export function Fakta({ klaim, fakta }: Baris) {
  return (
    <div className="grid grid-cols-1 gap-1 px-4 py-3 text-sm leading-relaxed sm:grid-cols-2 sm:gap-4">
      <p className="text-stone-700">{klaim}</p>
      <p className="font-medium text-stone-900">{fakta}</p>
    </div>
  );
}
