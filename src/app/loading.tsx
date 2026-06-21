export default function Loading() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center"
      aria-label="Yükleniyor"
      role="status"
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-8 w-px bg-[var(--color-stone-200)]"
          style={{
            animation: "shimmer 1.2s ease-in-out infinite alternate",
            height: "40px",
          }}
        />
        <p className="text-label text-[var(--color-stone-300)] tracking-widest">
          Yükleniyor
        </p>
      </div>
    </div>
  );
}
