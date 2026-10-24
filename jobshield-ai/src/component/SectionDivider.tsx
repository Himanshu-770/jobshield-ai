export default function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto flex w-full items-center gap-4"
      style={{
        width: "min(1303px, 100%)",
      }}
    >
      <div
        className="h-px flex-1"
        style={{
          backgroundColor: "var(--border)",
        }}
      />

      <div
        className="h-1.5 w-1.5 rotate-45 rounded-[1px]"
        style={{
          backgroundColor: "var(--primary)",
        }}
      />

      <div
        className="h-px flex-1"
        style={{
          backgroundColor: "var(--border)",
        }}
      />
    </div>
  );
}