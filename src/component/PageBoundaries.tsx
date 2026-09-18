export default function PageBoundaries() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 hidden lg:block"
    >
      {/* Left Boundary */}
      <div
        className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-[652px]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, var(--border) 12%, var(--primary) 50%, var(--border) 88%, transparent 100%)",
          boxShadow: "0 0 10px var(--primary-shadow)",
        }}
      >
        <span
          className="absolute left-1/2 top-24 h-2 w-2 -translate-x-1/2 rounded-full"
          style={{
            backgroundColor: "var(--primary)",
            boxShadow: "0 0 12px var(--primary-shadow)",
          }}
        />
      </div>

      {/* Right Boundary */}
      <div
        className="absolute bottom-0 left-1/2 top-0 w-px translate-x-[651px]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, var(--border) 12%, var(--primary) 50%, var(--border) 88%, transparent 100%)",
          boxShadow: "0 0 10px var(--primary-shadow)",
        }}
      >
        <span
          className="absolute left-1/2 top-24 h-2 w-2 -translate-x-1/2 rounded-full"
          style={{
            backgroundColor: "var(--primary)",
            boxShadow: "0 0 12px var(--primary-shadow)",
          }}
        />
      </div>
    </div>
  );
}