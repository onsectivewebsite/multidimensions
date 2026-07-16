import Image from "next/image";
import { features, stats } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import CTABand from "@/components/CTABand";

export const metadata = {
  title: "About Us",
  description:
    "Multi-Dimensions Driving School is an MTO-approved BDE provider offering affordable, patient, expert driver education across Brampton and the GTA.",
};

const values = [
  {
    icon: "shield",
    title: "Safety first, always",
    text: "Highly trained instructors, maintained dual-brake vehicles and defensive-driving fundamentals in every lesson.",
  },
  {
    icon: "users",
    title: "Patient & personal",
    text: "Learning to drive is personal. We match you with an instructor you're comfortable with and move at your pace.",
  },
  {
    icon: "tag",
    title: "Genuinely affordable",
    text: "Premium instruction at fair, transparent prices — with installment plans so cost is never a barrier.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        breadcrumb="About"
        title="Driver education built around you"
        subtitle="For students of all ages — first-time teens, new adult drivers and returning motorists — across the Greater Toronto Area."
      />

      {/* Story */}
      <section className="container-x py-16 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-ink-200 shadow-soft">
              <Image
                src="https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1100&q=80"
                alt="Driving instructor guiding a student behind the wheel"
                width={1100}
                height={800}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">
              <Icon name="badge" className="h-3.5 w-3.5" />
              MTO-Approved BDE Provider
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
              Premium instruction, personalized care
            </h2>
            <div className="mt-4 space-y-4 text-ink-600">
              <p>
                Multi-Dimensions Driving School was founded on a simple belief: quality
                driver education should be premium in care yet affordable for everyone.
                As an MTO-Approved Beginner Driver Education provider, we deliver
                reasonably priced programs to people of all ages.
              </p>
              <p>
                Our instructors are certified by the Ministry of Transportation —
                highly experienced, very patient and genuinely courteous. Whether
                you're a nervous first-timer or brushing up after years away, we build
                the confidence and skill you need to drive safely for life.
              </p>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "MTO-certified instructors",
                "Dual-brake training vehicles",
                "Online + in-car learning",
                "Insurance discount eligible",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-ink-900">
                  <Icon name="check" className="h-4 w-4 text-sign-700" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-y border-ink-200 bg-paper-50 py-14">
        <div className="container-x grid grid-cols-2 divide-x divide-ink-100 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05} className="px-4 text-center">
              <p className="hud-num font-display text-4xl font-bold text-sign-700">{s.value}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-500">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="container-x py-16 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">
            <Icon name="sparkles" className="h-3.5 w-3.5" />
            What drives us
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
            The values behind every lesson
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <div className="card card-hover h-full p-7">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sign-700/10 text-sign-700">
                  <Icon name={v.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Feature list */}
      <section className="border-t border-ink-200 bg-paper-50 py-16 sm:py-24">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="card h-full p-6">
                <Icon name={f.icon} className="h-7 w-7 text-sign-700" />
                <h3 className="mt-3 font-display text-base font-semibold text-ink-900">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-sm text-ink-500">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}
