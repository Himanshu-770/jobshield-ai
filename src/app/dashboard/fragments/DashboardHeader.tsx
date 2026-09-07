import Link from "next/link";
import { CirclePlus } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          Welcome back!
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Check suspicious jobs before you apply.
        </p>
      </div>

      <Link
        href="/analyze"
        className="flex shrink-0 items-center gap-1.5 rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold hover:bg-blue-400"
      >
        <CirclePlus size={18} />
        <span>New Analysis</span>
      </Link>
    </div>
  );
}