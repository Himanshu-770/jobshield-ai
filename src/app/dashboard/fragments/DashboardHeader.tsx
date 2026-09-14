
import Link from "next/link";
import { CirclePlus } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          Welcome back!
        </h1>

        <p
          className="mt-1 text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          Check suspicious jobs before you apply.
        </p>
      </div>

      <Link
        href="/analyze"
        className="flex shrink-0 items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold transition-colors"
        style={{
          backgroundColor: "var(--primary)",
          color: "var(--primary-foreground)",
        }}
      >
        <CirclePlus size={18} />
        <span>New Analysis</span>
      </Link>
    </div>
  );
}