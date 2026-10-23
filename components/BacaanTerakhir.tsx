"use client";

import { useEffect } from "react";

const KUNCI = "jejak-terakhir-dibaca";

export function CatatTerakhirDibaca({ slug, judul }: { slug: string; judul: string }) {
  useEffect(() => {
    try {
      localStorage.setItem(KUNCI, JSON.stringify({ slug, judul, waktu: Date.now() }));
    } catch {
      /* abaikan */
    }
  }, [slug, judul]);
  return null;
}

export interface BacaanTerakhir {
  slug: string;
  judul: string;
  waktu: number;
}

export function bacaTerakhir(): BacaanTerakhir | null {
  try {
    const mentah = localStorage.getItem(KUNCI);
    if (!mentah) return null;
    return JSON.parse(mentah) as BacaanTerakhir;
  } catch {
    return null;
  }
}
