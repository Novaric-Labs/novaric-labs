"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#platform", label: "Platform" },
  { href: "#industries", label: "Industries" },
  { href: "#why", label: "Why Novaric" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-surface/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-content items-center justify-between px-6 lg:px-8"
        aria-label="Primary"
      >
        <a href="#top" className="flex items-center" aria-label="Novaric Labs — home">
          <Logo height={26} priority />
        </a>

        <div className="flex items-center gap-2 md:gap-8">
          <div className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-body transition-colors hover:text-heading"
              >
                {l.label}
              </a>
            ))}
          </div>

          <ThemeToggle />

          <a
            href="#contact"
            className="hidden rounded-full bg-navy px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-800 dark:bg-accent dark:text-navy dark:hover:bg-gold-400 md:inline-flex"
          >
            Work with us
          </a>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-heading md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-surface md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-base font-medium text-body hover:bg-band hover:text-heading"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-navy px-5 py-3 text-center text-base font-medium text-white dark:bg-accent dark:text-navy"
            >
              Work with us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
