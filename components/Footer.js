import Link from "next/link";
import { business, nav } from "@/lib/data";
import Icon from "./Icon";

const socialItems = [
  { name: "facebook", href: business.social.facebook, label: "Facebook" },
  { name: "instagram", href: business.social.instagram, label: "Instagram" },
  { name: "twitter", href: business.social.twitter, label: "Twitter" },
  { name: "pinterest", href: business.social.pinterest, label: "Pinterest" },
  { name: "linkedin", href: business.social.linkedin, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-sign-800 text-white">
      {/* yellow center-line accent */}
      <div className="lane container-x h-1" />

      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-sign-800">
              <Icon name="route" className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold text-white">
              Multi-Dimensions
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/80">
            {business.subtag} Building confident, proficient motorists across the
            Greater Toronto Area.
          </p>
          <div className="mt-5 flex gap-2">
            {socialItems.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-road-500 hover:text-ink-900"
              >
                <Icon name={s.name} className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-road-400">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/80 transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-road-400">
            Get in touch
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            {business.phones.map((p) => (
              <li key={p}>
                <a href={`tel:${p.replace(/\s/g, "")}`} className="flex items-center gap-3 text-white/80 transition-colors hover:text-white">
                  <Icon name="phone" className="h-4 w-4 text-road-400" />
                  <span className="font-mono">{p}</span>
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${business.email}`} className="flex items-center gap-3 text-white/80 transition-colors hover:text-white">
                <Icon name="mail" className="h-4 w-4 text-road-400" />
                {business.email}
              </a>
            </li>
            <li className="flex items-start gap-3 text-white/80">
              <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-road-400" />
              {business.address}
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-road-400">
            Office hours
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            {business.hours.map((h) => (
              <li key={h.day} className="flex items-center justify-between gap-4">
                <span className="text-white/80">{h.day}</span>
                <span className="hud-num font-medium text-white">{h.time}</span>
              </li>
            ))}
          </ul>
          <Link href="/register" className="btn-yellow mt-6 w-full">
            <Icon name="sparkles" className="h-4 w-4" />
            Register Now
          </Link>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/70 sm:flex-row">
          <p>© 2026 {business.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <Icon name="badge" className="h-4 w-4 text-road-400" />
            MTO-Approved BDE Course Provider
          </p>
        </div>
      </div>
    </footer>
  );
}
