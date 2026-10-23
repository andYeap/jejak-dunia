/** Model data konten — file ini TIDAK boleh mengimpor modul Node (fs/path).
 *  Aman diimpor komponen client. */

export type Bukti = "terbukti" | "diperdebatkan" | "tak-terbukti" | "campuran";

export const LABEL_BUKTI: Record<Bukti, { label: string; kelas: string }> = {
  terbukti: {
    label: "Terbukti",
    kelas: "bg-emerald-100 text-emerald-900 border-emerald-300",
  },
  diperdebatkan: {
    label: "Diperdebatkan",
    kelas: "bg-amber-100 text-amber-900 border-amber-300",
  },
  "tak-terbukti": {
    label: "Tak Terbukti",
    kelas: "bg-rose-100 text-rose-900 border-rose-300",
  },
  campuran: {
    label: "Sebagian Terjawab",
    kelas: "bg-sky-100 text-sky-900 border-sky-300",
  },
};

export type Kategori = "Sejarah" | "Konspirasi" | "Misteri";

export const DAFTAR_KATEGORI: { nama: Kategori; deskripsi: string; kelas: string }[] = [
  {
    nama: "Sejarah",
    deskripsi: "Peristiwa dan peradaban masa lalu yang terdokumentasi — termasuk kontroversinya.",
    kelas: "bg-amber-600",
  },
  {
    nama: "Konspirasi",
    deskripsi: "Teori-teori besar yang mengguncang dunia — dibedah klaim per klaim.",
    kelas: "bg-violet-700",
  },
  {
    nama: "Misteri",
    deskripsi: "Kasus belum terpecahkan dan fenomena aneh yang menantang penjelasan.",
    kelas: "bg-cyan-700",
  },
];

export interface Peristiwa {
  tanggal: string; // ISO YYYY-MM-DD (bulan/hari boleh 01 bila tak diketahui)
  judul: string;
  slug?: string; // slug artikel terkait
  tokoh?: string; // nama tokoh terkait
}

export interface Artikel {
  slug: string;
  judul: string;
  kategori: Kategori;
  ringkasan: string;
  tanggal: string;
  bukti: Bukti;
  unggulan: boolean;
  peristiwa: Peristiwa[];
  isi: string;
  waktuBaca: number; // menit
}

export interface Tokoh {
  slug: string;
  nama: string;
  julukan?: string;
  lahir: string;
  wafat: string;
  ringkasan: string;
  artikel: string[];
  isi: string;
}

export interface ItemGarisWaktu extends Peristiwa {
  asal: "artikel" | "tokoh";
}

export function formatTanggal(iso: string): string {
  const d = new Date(iso.length === 4 ? `${iso}-01-01T00:00:00` : `${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export function formatTahun(iso: string): string {
  const m = iso.match(/^(-?\d{1,4})/);
  if (!m) return iso;
  const tahun = parseInt(m[1], 10);
  if (tahun <= 0) return `${Math.abs(tahun - 1)} SM`;
  return String(tahun);
}
