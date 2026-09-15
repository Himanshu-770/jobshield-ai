"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  Menu,
  Moon,
  ShieldCheck,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "@/component/ThemeProvider";

const links = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#about" },
  { label: "Testimonial", href: "#testmonial" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const { theme, toggleTheme } = useTheme();

  // Keep the server and first client render identical.
  const currentTheme = mounted ? theme : "light";
  const isLight = currentTheme === "light";
  const isDark = currentTheme === "dark";

  return (
    <nav className="border-b border-[var(--border)] bg-[var(--background)]">
      <div className="relative mx-auto flex h-20 max-w-7xl items-center px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)] text-white"
            style={{
              boxShadow: "0 0 25px var(--primary-shadow)",
            }}
          >
            <ShieldCheck size={20} />
          </div>

          <span className="text-xl font-semibold text-[var(--text-primary)]">
            JobShield{" "}
            <span className="text-[var(--primary)]">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm transition-colors ${
                isLight
                  ? "text-[var(--text-secondary)] hover:text-green-800"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="ml-auto hidden items-center gap-4 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${
              isDark ? "light" : "dark"
            } mode`}
            title={`Switch to ${
              isDark ? "light" : "dark"
            } mode`}
            className={`flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-primary)] transition-colors ${
              isLight
                ? "hover:bg-green-50 hover:text-green-800"
                : "hover:bg-[var(--surface)]"
            }`}
          >
            {isDark ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <Link
            href="/auth/login"
            className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)]"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`ml-auto flex h-11 w-11 items-center justify-center transition-colors md:hidden ${
            isLight
              ? "text-[var(--text-primary)] hover:text-green-900"
              : "text-[var(--text-primary)] hover:text-[var(--primary)]"
          }`}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-t border-[var(--border)] px-4 py-5 sm:px-6 md:hidden">
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-sm transition-colors ${
                  isLight
                    ? "text-[var(--text-primary)] hover:text-green-800"
                    : "text-[var(--text-primary)] hover:text-[var(--primary)]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={toggleTheme}
              className={`flex items-center gap-2 text-left text-sm transition-colors ${
                isLight
                  ? "text-[var(--text-primary)] hover:text-green-800"
                  : "text-[var(--text-primary)] hover:text-[var(--primary)]"
              }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}

              {isDark
                ? "Switch to Light Mode"
                : "Switch to Dark Mode"}
            </button>

            <Link
              href="/auth/login"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-center text-sm font-medium text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)]"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}