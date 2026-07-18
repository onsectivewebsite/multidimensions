"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { nav, business } from "@/lib/data";
import Icon from "./Icon";

const topSocials = [
  { name: "facebook", href: business.social.facebook, label: "Facebook" },
  { name: "instagram", href: business.social.instagram, label: "Instagram" },
  { name: "linkedin", href: business.social.linkedin, label: "LinkedIn" },
];

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
    <header className="sticky top-0 z-[100]">
      {/* ── Top utility strip (desktop) ── */}
      <div className="hidden bg-sign-900 text-white md:block">
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            <a
              href={`tel:${business.phones[0].replace(/\s/g, "")}`}
              className="flex items-center gap-1.5 text-white/80 transition-colors hover:text-white"
            >
              <Icon name="phone" className="h-3.5 w-3.5 text-road-300" />
              {business.phones[0]}
            </a>
            <a
              href={`mailto:${business.email}`}
              className="hidden items-center gap-1.5 text-white/80 transition-colors hover:text-white lg:flex"
            >
              <Icon name="mail" className="h-3.5 w-3.5 text-road-300" />
              {business.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-1.5 font-semibold uppercase tracking-wide text-road-300 sm:flex">
              <Icon name="badge" className="h-3.5 w-3.5" />
              MTO-Approved
            </span>
            <span className="flex items-center gap-2">
              {topSocials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-white/70 transition-colors hover:text-road-300"
                >
                  <Icon name={s.name} className="h-4 w-4" />
                </a>
              ))}
            </span>
          </div>
        </div>
      </div>

      {/* ── Main navigation bar ── */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-ink-200 bg-white/95 shadow-soft backdrop-blur-md"
            : "bg-white"
        }`}
      >
        <nav className="container-x flex h-16 items-center justify-between lg:h-[72px]">
          {/* Brand — logo */}
          <Link href="/" className="flex items-center" aria-label="Multi-Dimensions Driving School home">
            <Image
              src="/logo.png"
              alt="Multi-Dimensions Driving School"
              width={375}
              height={102}
              priority
              className="h-11 w-auto lg:h-12"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-lg px-3.5 py-2 text-[15px] font-semibold transition-colors ${
                  isActive(item.href)
                    ? "text-sign-700"
                    : "text-ink-700 hover:text-sign-700"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-[3px] rounded-full bg-road-500" />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/register"
              className="hidden items-center gap-2 rounded-xl bg-gradient-to-r from-road-500 to-road-400 px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_24px_-8px_rgb(var(--c-road-500)/0.7)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
            >
              Register Now
              <Icon name="arrow" className="h-4 w-4" />
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
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden ${open ? "block" : "hidden"} border-t border-ink-200 bg-white`}
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
                  : "text-ink-700 hover:bg-paper-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/register"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-road-500 to-road-400 px-5 py-3 text-base font-bold text-white"
          >
            Register Now
            <Icon name="arrow" className="h-4 w-4" />
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
