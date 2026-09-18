"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Moon,
  ShieldCheck,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "@/component/ThemeProvider";

const links = [
  { label: "Home", href: "/", sectionId: "home" },
  {
    label: "How It Works",
    href: "#how-it-works",
    sectionId: "how-it-works",
  },
  {
    label: "About",
    href: "#about",
    sectionId: "about",
  },
  {
    label: "Testimonial",
    href: "#testimonial",
    sectionId: "testimonial",
  },
  {
    label: "FAQ",
    href: "#faq",
    sectionId: "faq",
  },
];

const sectionIds = [
  "home",
  "how-it-works",
  "about",
  "testimonial",
  "faq",
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const { theme, toggleTheme } = useTheme();

  const currentTheme = mounted ? theme : "light";
  const isLight = currentTheme === "light";
  const isDark = currentTheme === "dark";

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const updateActiveSection = () => {
      const navbarOffset = 100;

      if (window.scrollY < 80) {
        setActiveSection("home");
        return;
      }

      let currentSection = "home";

      sectionIds.forEach((sectionId) => {
        const section = document.getElementById(sectionId);

        if (!section) {
          return;
        }

        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop <= navbarOffset) {
          currentSection = sectionId;
        }
      });

      setActiveSection(currentSection);
    };

    const updateFromHash = () => {
      const hash = window.location.hash.replace("#", "");

      if (hash && sectionIds.includes(hash)) {
        setActiveSection(hash);
      }

      window.setTimeout(updateActiveSection, 100);
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });

    window.addEventListener("resize", updateActiveSection);
    window.addEventListener("hashchange", updateFromHash);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      window.removeEventListener("hashchange", updateFromHash);
    };
  }, [pathname]);

  const isLinkActive = (sectionId: string) => {
    return pathname === "/" && activeSection === sectionId;
  };

  const handleLinkClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setOpen(false);
  };

  return (
    <nav className="border-b-2 border-[var(--border)] bg-[var(--background)]">
      <div className="relative mx-auto flex h-20 max-w-7xl items-center px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => handleLinkClick("home")}
          className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        >
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)] text-white"
            style={{
              boxShadow: "0 0 16px var(--primary-shadow)",
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
          {links.map((link) => {
            const isActive = isLinkActive(link.sectionId);

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => handleLinkClick(link.sectionId)}
                aria-current={isActive ? "page" : undefined}
                className={`relative py-2 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--background)] ${
                  isActive
                    ? "font-medium text-[var(--primary)] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-[var(--primary)]"
                    : isLight
                      ? "text-[var(--text-secondary)] hover:text-green-800"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="ml-auto hidden items-center gap-4 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            title={`Switch to ${isDark ? "light" : "dark"} mode`}
            className={`flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-primary)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${
              isLight
                ? "hover:bg-green-50 hover:text-green-800"
                : "hover:bg-[var(--surface)]"
            }`}
          >
            {isDark ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <Link
            href="/auth/login"
            className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-[var(--primary-foreground)] transition-colors duration-200 hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setOpen((previous) => !previous)}
          className={`ml-auto flex h-11 w-11 items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] md:hidden ${
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
            {links.map((link) => {
              const isActive = isLinkActive(link.sectionId);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => handleLinkClick(link.sectionId)}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${
                    isActive
                      ? "font-medium text-[var(--primary)] underline decoration-[var(--primary)] decoration-2 underline-offset-8"
                      : isLight
                        ? "text-[var(--text-primary)] hover:text-green-800"
                        : "text-[var(--text-primary)] hover:text-[var(--primary)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <button
              type="button"
              onClick={toggleTheme}
              className={`flex items-center gap-2 text-left text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${
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
              className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-center text-sm font-medium text-[var(--primary-foreground)] transition-colors duration-200 hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}