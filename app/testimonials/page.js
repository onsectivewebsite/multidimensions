import Image from "next/image";
import { testimonials, galleryImages } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import CTABand from "@/components/CTABand";

export const metadata = {
  title: "Testimonials & Gallery",
  description:
    "Real reviews from Multi-Dimensions Driving School students across the GTA, plus a gallery from lessons on the road.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Student stories"
        breadcrumb="Testimonials"
        title="Real students, real results"
        subtitle="From first-time nerves to first-try passes — here's what learners across the GTA say about their time with us."
      />

      {/* Rating summary */}
      <section className="container-x py-14">
        <Reveal>
          <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-sign-700 p-8 text-center text-white shadow-lift sm:flex-row sm:gap-10 sm:text-left">
            <div>
              <p className="hud-num font-display text-5xl font-bold text-white">5.0</p>
              <div className="mt-1 flex justify-center gap-0.5 text-amber-400 sm:justify-start">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" filled className="h-5 w-5" />
                ))}
              </div>
            </div>
            <div className="hidden h-16 w-px bg-white/10 sm:block" />
            <p className="max-w-md text-white/85">
              Students consistently praise our patient instructors and the calm,
              confidence-building way we teach.{" "}
              <strong className="text-road-400">98%</strong> would recommend us to a friend.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Testimonials grid */}
      <section className="container-x pb-16 sm:pb-24">
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <figure className="card flex h-full flex-col p-7">
                <Icon name="chat" className="h-8 w-8 text-sign-700/40" />
                <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-ink-700">
                  “{t.quote}”
                </blockquote>
                <div className="mt-5 flex gap-0.5 text-amber-500">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Icon key={j} name="star" filled className="h-4 w-4" />
                  ))}
                </div>
                <figcaption className="mt-4 flex items-center gap-3 border-t border-ink-200 pt-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-sign-700 font-display text-sm font-bold text-white">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <div>
                    <p className="font-semibold text-ink-900">{t.name}</p>
                    <p className="font-mono text-xs text-ink-500">{t.location}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Photo gallery */}
      <section className="border-t border-ink-200 bg-paper-50 py-16 sm:py-24">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">
              <Icon name="sparkles" className="h-3.5 w-3.5" />
              Photo gallery
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
              Moments from the road
            </h2>
            <p className="mt-3 text-ink-600">
              A glimpse of lessons, milestones and happy new drivers.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {galleryImages.map((img, i) => (
              <Reveal
                key={img.src}
                delay={(i % 4) * 0.05}
                className={`group relative overflow-hidden rounded-2xl border border-ink-200 ${
                  i % 5 === 0 ? "col-span-2 row-span-2" : ""
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-sign-700/0 transition-colors group-hover:bg-sign-700/10" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
