import Image from "next/image";
import Link from "next/link";
import { services, individualLessons, accents } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import CTABand from "@/components/CTABand";

export const metadata = {
  title: "Services",
  description:
    "Online e-learning, Home Link training, in-car lessons, defensive driving and road-test preparation with MTO-certified instructors.",
};

const steps = [
  { n: "01", title: "Learn the theory online", text: "Complete 20 hours of MTO-approved e-learning at your own pace, on any device." },
  { n: "02", title: "Practise with Home Link", text: "10 hours of guided at-home activities connect classroom theory to real driving." },
  { n: "03", title: "Master the road in-car", text: "10 one-on-one lessons in dual-brake cars with a patient, certified instructor." },
  { n: "04", title: "Ace your road test", text: "Mock tests, route practice and a car on test day so you walk in confident." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        breadcrumb="Services"
        title="From your first lesson to your licence"
        subtitle="A complete, MTO-approved program that blends flexible online theory with real, confidence-building road time."
      />

      {/* Service grid */}
      <section className="container-x py-16 sm:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <div className="card card-hover group h-full p-7">
                <span className={`grid h-14 w-14 place-items-center rounded-2xl text-white transition-transform group-hover:scale-105 ${accents[i % accents.length].solid}`}>
                  <Icon name={s.icon} className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink-900">
                  {s.title}
                </h3>
                <p className="mt-2 leading-relaxed text-ink-500">{s.blurb}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Individual lessons callout */}
        <Reveal className="mt-8">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-sign-700 p-8 text-white shadow-lift sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-road-400">
                <Icon name="clock" className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-white">
                  {individualLessons.name}
                </h3>
                <p className="mt-1 text-white/85">{individualLessons.note}</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="hud-num font-display text-3xl font-bold text-road-400">
                {individualLessons.price}
              </p>
              <p className="font-mono text-xs uppercase tracking-wider text-white/85">
                {individualLessons.unit}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* How it works — a real 4-step sequence, numbered */}
      <section className="border-y border-ink-200 bg-paper-50 py-16 sm:py-24">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">
              <Icon name="route" className="h-3.5 w-3.5" />
              How it works
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
              Your path to the road, step by step
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.07}>
                <div className="card h-full p-6">
                  <span className={`hud-num font-display text-4xl font-extrabold ${accents[i % accents.length].text}`}>
                    {s.n}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-semibold text-ink-900">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-ink-500">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Image + copy */}
      <section className="container-x py-16 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">
              <Icon name="shield" className="h-3.5 w-3.5" />
              Safety built in
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
              Defensive driving that lasts a lifetime
            </h2>
            <p className="mt-4 text-ink-600">
              Beyond passing the test, we teach you to anticipate hazards, keep calm
              under pressure and make smart decisions in real traffic. These are the
              habits that keep you — and everyone around you — safe for years to come.
            </p>
            <Link href="/register" className="btn-primary mt-6">
              Start learning
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-3xl border border-ink-200 shadow-soft">
              <Image
                src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=1100&q=80"
                alt="Driver checking mirror while practising defensive driving"
                width={1100}
                height={800}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
