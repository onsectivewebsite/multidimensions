"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, business } from "@/lib/data";
import Icon from "./Icon";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "border-b border-ink-200 bg-paper-50/90 shadow-soft backdrop-blur-md"
          : "bg-paper-100/70 backdrop-blur-sm"
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between lg:h-20">
        {/* Brand — green route shield */}
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-sign-700 text-white shadow-sign">
            <Icon name="route" className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[15px] font-bold text-ink-900">
              Multi-Dimensions
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-sign-700">
              Driving School
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                isActive(item.href)
                  ? "text-sign-700"
                  : "text-ink-600 hover:text-sign-700"
              }`}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute inset-x-3 -bottom-0.5 h-1 rounded-full bg-road-500" />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${business.phones[1].replace(/\s/g, "")}`}
            className="hidden items-center gap-2 font-mono text-sm font-semibold text-ink-800 md:inline-flex"
          >
            <Icon name="phone" className="h-4 w-4 text-sign-700" />
            {business.phones[1]}
          </a>
          <Link href="/register" className="btn-primary hidden sm:inline-flex">
            Register Now
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-lg ring-1 ring-ink-200 text-ink-800 lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden ${open ? "block" : "hidden"} border-t border-ink-200 bg-paper-50`}
      >
        <div className="container-x flex flex-col gap-1 py-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-4 py-3 text-base font-semibold ${
                isActive(item.href)
                  ? "bg-sign-700 text-white"
                  : "text-ink-700 hover:bg-paper-200"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/register"
            onClick={() => setOpen(false)}
            className="btn-primary mt-2 w-full"
          >
            Register Now
          </Link>
          <a
            href={`tel:${business.phones[0].replace(/\s/g, "")}`}
            className="btn-ghost mt-1 w-full"
          >
            <Icon name="phone" className="h-4 w-4 text-sign-700" />
            {business.phones[0]}
          </a>
        </div>
      </div>
    </header>
  );
}
