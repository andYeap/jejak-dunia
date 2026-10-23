export function Sorotan({
  judul,
  children,
}: {
  judul: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-6 rounded-2xl border border-cyan-800/20 bg-cyan-50 p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-cyan-800">{judul}</p>
      <div className="mt-1 text-[1rem] leading-relaxed text-stone-800">{children}</div>
    </div>
  );
}
