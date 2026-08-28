import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#070B14]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600">
            <ShieldCheck size={14} />
          </div>

          <span className="text-sm font-semibold">
            JobShield <span className="text-blue-500">AI</span>
          </span>
        </Link>

        <p className="text-xs text-gray-500">
          © 2026 JobShield AI. All rights reserved.
        </p>

        <div className="flex gap-5 text-xs text-gray-500">
          <Link href="#" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-white">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-white">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
