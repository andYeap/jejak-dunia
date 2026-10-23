import { LABEL_BUKTI, type Bukti } from "@/lib/model";

export function BuktiBadge({ bukti }: { bukti: Bukti }) {
  const info = LABEL_BUKTI[bukti];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${info.kelas}`}
    >
      <span aria-hidden="true">●</span> {info.label}
    </span>
  );
}
