import Link from "next/link";
import Reveal from "./Reveal";
import Icon from "./Icon";

// Interior page hero styled as a highway guide sign: green panel, white keyline,
// yellow center-line accent.
export default function PageHero({ eyebrow, title, subtitle, breadcrumb }) {
  return (
    <section className="relative overflow-hidden bg-sign-800">
      {/* inset white keyline like a real guide sign */}
      <div className="pointer-events-none absolute inset-4 rounded-2xl ring-2 ring-white/25 sm:inset-6" />
      <div className="container-x relative py-16 sm:py-20 lg:py-24">
        <Reveal>
          {breadcrumb && (
            <nav
              className="mb-4 flex items-center gap-2 font-mono text-xs text-white/70"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-white">Home</Link>
              <Icon name="arrow" className="h-3 w-3" />
              <span className="text-road-400">{breadcrumb}</span>
            </nav>
          )}
          {eyebrow && (
            <span className="inline-flex items-center gap-2 rounded-md bg-white/15 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white ring-1 ring-white/25">
              <Icon name="route" className="h-3.5 w-3.5 text-road-400" />
              {eyebrow}
            </span>
          )}
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/85">
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>
      <div className="lane container-x h-1" />
    </section>
  );
}
