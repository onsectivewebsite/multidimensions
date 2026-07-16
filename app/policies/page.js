import { policies } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import CTABand from "@/components/CTABand";

export const metadata = {
  title: "School & Referral Policies",
  description:
    "Our school policy and referral program — the commitments and rewards behind every lesson at Multi-Dimensions Driving School.",
};

export default function PoliciesPage() {
  return (
    <>
      <PageHero
        eyebrow="Policies"
        breadcrumb="Policies"
        title="Our policies, plainly stated"
        subtitle="Clear commitments for a safe learning experience — and a referral program that rewards you for sharing the word."
      />

      <section className="container-x py-16 sm:py-24">
        <div className="mx-auto grid max-w-4xl gap-8">
          {policies.map((p, idx) => (
            <Reveal key={p.id} delay={idx * 0.08}>
              <div id={p.id} className="card scroll-mt-24 p-7 sm:p-9">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-sign-700/10 text-sign-700">
                    <Icon name={p.id === "referral-policy" ? "users" : "shield"} className="h-6 w-6" />
                  </span>
                  <h2 className="font-display text-2xl font-bold text-ink-900">
                    {p.title}
                  </h2>
                </div>
                <p className="mt-4 text-ink-600">{p.intro}</p>
                <ul className="mt-6 space-y-3">
                  {p.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-ink-600">
                      <Icon
                        name="check"
                        className="mt-0.5 h-5 w-5 shrink-0 text-sign-700"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}
