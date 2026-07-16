import Link from "next/link";
import { business } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Contact Us",
  description:
    "Call, email or visit Multi-Dimensions Driving School. Serving Brampton, Mississauga and the GTA. Ready to enrol? Register online in minutes.",
};

const contactCards = [
  { icon: "phone", label: "Call us", lines: business.phones, hrefPrefix: "tel:" },
  { icon: "mail", label: "Email us", lines: [business.email], hrefPrefix: "mailto:" },
  { icon: "pin", label: "Visit us", lines: [business.address] },
];

const mapSrc =
  "https://www.google.com/maps?q=50+Cochrane+Ave,+Brampton,+ON+L6Z+4G6&output=embed";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        breadcrumb="Contact"
        title="We're here to help"
        subtitle="Questions about packages, scheduling or eligibility? Reach us by phone, email or chat — or register online whenever you're ready."
      />

      <section className="container-x py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Left: info */}
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="font-display text-2xl font-bold text-ink-900">
                Talk to a real person
              </h2>
              <p className="mt-2 text-ink-600">
                Our friendly team is happy to help you pick the right package and
                schedule your first lesson.
              </p>
            </Reveal>

            <div className="mt-8 space-y-4">
              {contactCards.map((c, i) => (
                <Reveal key={c.label} delay={i * 0.06}>
                  <div className="flex items-start gap-4 rounded-2xl border border-ink-200 bg-white p-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sign-700/10 text-sign-700">
                      <Icon name={c.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-wider text-ink-500">
                        {c.label}
                      </p>
                      {c.lines.map((line) =>
                        c.hrefPrefix ? (
                          <a
                            key={line}
                            href={`${c.hrefPrefix}${line.replace(/\s/g, "")}`}
                            className="block font-medium text-ink-900 transition-colors hover:text-sign-700"
                          >
                            {line}
                          </a>
                        ) : (
                          <p key={line} className="font-medium text-ink-900">
                            {line}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.15}>
              <div className="mt-4 rounded-2xl border border-white/10 bg-sign-700 p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Icon name="clock" className="h-4 w-4 text-road-400" />
                  Office hours
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  {business.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-4">
                      <span className="text-white/85">{h.day}</span>
                      <span className="hud-num font-medium text-white">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Right: enrol CTA + map */}
          <div className="lg:col-span-3">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-sign-700 p-8 shadow-soft">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-road-400/20 blur-3xl" />
                <div className="relative">
                  <span className="eyebrow">
                    <Icon name="sparkles" className="h-3.5 w-3.5" />
                    Ready to enrol?
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold text-white">
                    Register for the BDE Course online
                  </h3>
                  <p className="mt-2 max-w-lg text-white/85">
                    Pick your package, apply a coupon and pay securely by PayPal or
                    e-transfer — it only takes a few minutes.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link href="/register" className="btn-primary">
                      Start registration
                      <Icon name="arrow" className="h-4 w-4" />
                    </Link>
                    <Link href="/packages" className="btn-ghost">
                      Compare packages
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-6 overflow-hidden rounded-3xl border border-ink-200">
                <iframe
                  title="Map to Multi-Dimensions Driving School"
                  src={mapSrc}
                  className="h-[360px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
