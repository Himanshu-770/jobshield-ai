
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Clock3,
  Menu,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

const links = [
  { label: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { label: "Analyze Job", href: "/analyze", icon: ShieldCheck },
  { label: "History", href: "/history", icon: Clock3 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="flex h-16 items-center border-b border-[var(--border)] bg-[var(--surface)] px-4 text-[var(--text-primary)] md:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-11 w-11 items-center justify-center text-[var(--text-primary)] transition-colors hover:text-[var(--primary)]"
          aria-label="Open sidebar"
        >
          <Menu size={22} />
        </button>

        <div className="ml-4 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--primary)] text-white">
            <ShieldCheck size={15} />
          </div>

          <span className="text-sm font-semibold">
            JobShield{" "}
            <span className="text-[var(--primary)]">AI</span>
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
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[var(--surface)] px-4 py-5 text-[var(--text-primary)] transition-transform duration-300 md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 px-2"
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)] text-white"
              style={{
                boxShadow: "0 0 25px var(--primary-shadow)",
              }}
            >
              <ShieldCheck size={17} />
            </div>

            <span className="text-xl font-bold">
              JobShield{" "}
              <span className="text-[var(--primary)]">AI</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-11 w-11 items-center justify-center text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] md:hidden"
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
                className={`flex items-center gap-3 rounded-md border px-3 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--text-primary)]"
                    : "border-transparent text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="mt-auto border-t border-[var(--border)] pt-4">
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-2 py-2 transition-colors ${
              pathname === "/profile"
                ? "bg-[var(--border)]"
                : "hover:bg-[var(--border)]"
            }`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--surface-secondary)]">
              <User
                size={22}
                className="text-[var(--text-primary)]"
              />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                Alex Mercer
              </p>

              <p className="truncate text-xs text-[var(--text-secondary)]">
                alex@jobshield.ai
              </p>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}
