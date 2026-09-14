
"use client";

import { useState } from "react";
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
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="border-b border-[var(--border)] bg-[var(--background)]">
      <div className="relative mx-auto flex h-20 max-w-7xl items-center px-6">
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
              className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
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
              theme === "dark" ? "light" : "dark"
            } mode`}
            title={`Switch to ${
              theme === "dark" ? "light" : "dark"
            } mode`}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-primary)] transition-colors hover:bg-[var(--surface)]"
          >
            {theme === "dark" ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
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
          className="ml-auto text-[var(--text-primary)] md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-t border-[var(--border)] px-6 py-5 md:hidden">
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-[var(--text-primary)]"
              >
                {link.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-2 text-left text-sm text-[var(--text-primary)]"
            >
              {theme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
              {theme === "dark"
                ? "Switch to Light Mode"
                : "Switch to Dark Mode"}
            </button>

            <Link
              href="/auth/login"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-center text-sm font-medium text-[var(--primary-foreground)]"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}