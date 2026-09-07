"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Clock3,
  Menu,
  Settings,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

const links = [
  { label: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { label: "Analyze Job", href: "/analyze", icon: ShieldCheck },
  { label: "History", href: "/history", icon: Clock3 },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="flex h-16 items-center border-b border-white/10 bg-[#0D1527] px-5 md:hidden">
        <button
          onClick={() => setOpen(true)}
          className="text-gray-400 hover:text-white"
          aria-label="Open sidebar"
        >
          <Menu size={22} />
        </button>

        <div className="ml-4 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-500 ">
            <ShieldCheck size={15} />
          </div>

          <span className="text-sm font-semibold">
            JobShield <span className="text-blue-500">AI</span>
          </span>
        </div>
      </header>

      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#0D1527] px-4 py-5 text-white transition-transform duration-300 md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.55)]">
              <ShieldCheck size={17} />
            </div>

            <span className="font-bold text-xl">
              JobShield <span className="text-blue-500">AI</span>
            </span>
          </Link>

          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-white md:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 space-y-3">
          {links.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold transition ${
                  active
                    ? "border border-blue-500 bg-blue-500/10 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="mt-auto border-t border-white/5 pt-4">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A2942]">
              <User size={22} className="text-gray-400" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                Alex Mercer
              </p>

              <p className="truncate text-[12px] text-gray-500">
                alex@jobshield.ai
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}