import Image from "next/image";
import Link from "next/link";
import {
  services,
  features,
  packages,
  testimonials,
  stats,
  instructors,
  photos,
  galleryImages,
  accents,
} from "@/lib/data";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";
import PackageCard from "@/components/PackageCard";
import PackageRecommender from "@/components/PackageRecommender";
import CTABand from "@/components/CTABand";
import Marquee from "@/components/Marquee";
import HeroCarousel from "@/components/HeroCarousel";

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        {/* animated gradient blobs */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 animate-blob rounded-full bg-sign-500/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-40 h-72 w-72 animate-blob rounded-full bg-road-400/25 blur-3xl [animation-delay:3s]" />
        <div className="container-x relative py-8 sm:py-12">
          <h1 className="sr-only">
            Multi-Dimensions Driving School — MTO-approved driver education in
            Brampton and the Greater Toronto Area
          </h1>

          {/* Flyer carousel */}
          <Reveal>
            <HeroCarousel />
          </Reveal>

          {/* CTA + trust row */}
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/register" className="btn-primary text-base">
                  Register Now
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
                <Link href="/packages" className="btn-ghost text-base">
                  <Icon name="tag" className="h-4 w-4 text-sign-700" />
                  View Packages
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {instructors.slice(0, 4).map((ins) => (
                    <span key={ins.name} className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white">
                      <Image src={ins.photo} alt={ins.name} fill sizes="40px" className="object-cover" />
                    </span>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon key={i} name="star" filled className="h-4 w-4" />
                    ))}
                  </div>
                  <p className="text-sm text-ink-600">
                    <strong className="text-ink-900">5.0</strong> from happy GTA students
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Stats strip */}
        <div className="border-y border-ink-200 bg-paper-100">
          <div className="container-x grid grid-cols-2 divide-x divide-ink-200 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05} className="px-4 py-8 text-center">
                <CountUp
                  value={s.value}
                  className={`hud-num block font-display text-3xl font-extrabold sm:text-4xl ${accents[i % accents.length].text}`}
                />
                <p className="mt-1 text-[13px] font-medium text-ink-500">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLASHY MARQUEE ───────────────────────────────── */}
      <Marquee />

      {/* ── WHY US (image + checklist) ───────────────────── */}
      <section className="container-x py-16 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative order-2 lg:order-1">
            <div className="overflow-hidden rounded-3xl shadow-lift ring-1 ring-ink-200">
              <Image
                src={photos.keysHandover}
                alt="New driver receiving their car keys"
                width={1200}
                height={900}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-4 hidden rounded-2xl bg-sign-700 px-5 py-4 text-white shadow-lift sm:block">
              <p className="hud-num font-display text-2xl font-extrabold">10k+</p>
              <p className="text-xs text-white/80">Lessons delivered</p>
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="eyebrow">Why Multi-Dimensions</span>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
                A driving school that puts your confidence first
              </h2>
              <p className="mt-3 text-ink-600">
                From your first login to your road test, every step is built to make
                you a safe, self-assured driver.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.06}>
                  <div className="flex gap-3">
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${accents[i % accents.length].tile}`}>
                      <Icon name={f.icon} className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-ink-900">
                        {f.title}
                      </h3>
                      <p className="mt-1 text-sm text-ink-600">{f.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FULL-BLEED PHOTO BAND ────────────────────────── */}
      <section className="relative overflow-hidden">
        <Image
          src={photos.openRoad}
          alt="Open road at sunset in the Greater Toronto Area"
          width={1600}
          height={900}
          className="kenburns h-[340px] w-full object-cover sm:h-[420px]"
        />
        <div className="absolute inset-0 bg-sign-900/70" />
        <div className="container-x absolute inset-0 flex flex-col items-start justify-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white ring-1 ring-white/25">
              On real GTA roads
            </span>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-extrabold text-white sm:text-4xl">
              Practice where you'll actually drive
            </h2>
            <p className="mt-3 max-w-xl text-white/85">
              Brampton and Mississauga routes, real traffic, real test centres — so
              nothing on test day is a surprise.
            </p>
            <Link href="/register" className="btn-yellow mt-6">
              Book your first lesson
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section className="container-x py-16 sm:py-24">
        <SectionHeading
          eyebrow="What we offer"
          title="Everything you need to pass — in one place"
          subtitle="Online theory, guided home practice and real in-car time with expert instructors."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <div className="card card-hover group flex h-full items-start gap-4 p-6">
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white transition-transform group-hover:scale-105 ${accents[i % accents.length].solid}`}>
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink-900">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{s.blurb}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── INSTRUCTORS ──────────────────────────────────── */}
      <section className="border-y border-ink-200 bg-paper-100 py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Meet your instructors"
            title="Patient, certified, genuinely on your side"
            subtitle="Every instructor is MTO-certified and hand-picked for how well they teach. Request a male or female instructor when you book."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {instructors.map((ins, i) => (
              <Reveal key={ins.name} delay={i * 0.06}>
                <div className="card card-hover group h-full overflow-hidden">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={ins.photo}
                      alt={ins.name}
                      width={600}
                      height={600}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-ink-900">{ins.name}</h3>
                    <p className={`text-sm font-semibold ${accents[i % accents.length].text}`}>{ins.role}</p>
                    <p className="mt-2 flex items-start gap-1.5 text-sm text-ink-600">
                      <Icon name="check" className={`mt-0.5 h-4 w-4 shrink-0 ${accents[i % accents.length].text}`} />
                      {ins.tag}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES PREVIEW ─────────────────────────────── */}
      <section className="container-x py-16 sm:py-24">
        <SectionHeading
          eyebrow="Packages & pricing"
          title="Transparent packages for every driver"
          subtitle="Every plan includes 20 hrs online e-learning, 10 hrs Home Link, 10 in-car lessons and your MTO certificate."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.slice(0, 3).map((p) => (
            <Reveal key={p.id}>
              <PackageCard pkg={p} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link href="/packages" className="btn-primary">
            Compare all 5 packages
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* ── AI RECOMMENDER ───────────────────────────────── */}
      <section className="border-y border-ink-200 bg-paper-100 py-16 sm:py-24">
        <div className="container-x">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="eyebrow">Smart finder</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
              Find your perfect package in 30 seconds
            </h2>
            <p className="mt-3 text-ink-600">
              Answer a few quick questions and our finder recommends the best plan for
              your goals and budget.
            </p>
          </div>
          <PackageRecommender />
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="container-x py-16 sm:py-24">
        <SectionHeading
          eyebrow="Loved by students"
          title="Don't just take our word for it"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <figure className="card flex h-full flex-col p-6">
                <div className="flex gap-0.5 text-amber-500">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Icon key={j} name="star" filled className="h-5 w-5" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-ink-700">“{t.quote}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-ink-100 pt-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-sign-700 font-display text-sm font-bold text-white">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <div>
                    <p className="font-semibold text-ink-900">{t.name}</p>
                    <p className="text-xs text-ink-500">{t.location}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── GALLERY STRIP ────────────────────────────────── */}
      <section className="container-x pb-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {galleryImages.slice(0, 4).map((img) => (
            <Reveal key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-ink-200">
              <Image src={img.src} alt={img.alt} fill sizes="(max-width:640px) 50vw, 25vw" className="object-cover transition-transform duration-500 hover:scale-105" />
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}
