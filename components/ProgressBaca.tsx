"use client";

import { useEffect } from "react";

export function ProgressBaca() {
  useEffect(() => {
    const bilah = document.getElementById("progress-baca");
    if (!bilah) return;
    const saatGulir = () => {
      const tinggi = document.documentElement.scrollHeight - window.innerHeight;
      const persen = tinggi > 0 ? (window.scrollY / tinggi) * 100 : 0;
      bilah.style.width = `${Math.min(100, persen)}%`;
    };
    saatGulir();
    window.addEventListener("scroll", saatGulir, { passive: true });
    return () => window.removeEventListener("scroll", saatGulir);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent">
      <div id="progress-baca" className="h-full w-0 bg-orange-600 transition-[width]" />
    </div>
  );
}
