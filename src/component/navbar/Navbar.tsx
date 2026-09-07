"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ShieldCheck, X } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-white/10 bg-[#070B14]">
      <div className="relative mx-auto flex h-20 max-w-7xl items-center px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#3B82F6] shadow-[0_0_25px_rgba(59,130,246,0.55)]">
            <ShieldCheck size={20} />
          </div>
          <span className="text-xl font-semibold">
            JobShield <span className="text-[#3B82F6]">AI</span>
          </span>
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-gray-400 hover:text-white"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/auth/login"
            className="text-sm text-gray-400 hover:text-white"
          >
            Login
          </Link>
        </div>

        <Link
          href="/auth/signup"
          className="ml-auto hidden rounded-lg bg-[#3B82F6] px-5 py-2.5 text-sm font-medium hover:bg-blue-500 md:block"
        >
          Check a Job
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="ml-auto md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 px-6 py-5 md:hidden">
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-gray-300"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/auth/login"
              onClick={() => setOpen(false)}
              className="text-sm text-gray-300"
            >
              Login
            </Link>

            <Link
              href="/auth/signup"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-[#3B82F6] px-5 py-2.5 text-center text-sm font-medium"
            >
              Check a Job
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}