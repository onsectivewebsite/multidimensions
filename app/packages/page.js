import { packages, individualLessons } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import PackageCard from "@/components/PackageCard";
import PackageRecommender from "@/components/PackageRecommender";
import CTABand from "@/components/CTABand";

export const metadata = {
  title: "Packages & Pricing",
  description:
    "Five MTO-approved driving packages from $600 to $1050. Compare Bronze, Silver, MDI Special, Gold and Platinum — installment plans available.",
};

const matrix = [
  { label: "20 hrs online e-learning", all: true },
  { label: "10 hrs Home Link training", all: true },
  { label: "10 in-car lessons", all: true },
  { label: "MTO certificate", all: true },
  { label: "Insurance discount eligibility", all: true },
  { label: "Car for local road test", has: ["silver", "mdi-special", "gold", "platinum"] },
  { label: "Practice lesson before test", has: ["silver", "mdi-special", "gold", "platinum"] },
  { label: "Free road test on 2nd attempt", has: ["mdi-special"] },
  { label: "Car for tests up to 1 hr away", has: ["gold", "platinum"] },
  { label: "Car for tests 1–2 hrs away", has: ["platinum"] },
  { label: "Early road-test booking", has: ["gold", "platinum"] },
];

function Cell({ on }) {
  return on ? (
    <span className="mx-auto grid h-6 w-6 place-items-center rounded-full bg-sign-700/10 text-sign-700">
      <Icon name="check" className="h-3.5 w-3.5" />
    </span>
  ) : (
    <span className="mx-auto block h-1 w-3 rounded-full bg-ink-200" />
  );
}

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Packages & pricing"
        breadcrumb="Packages"
        title="Simple, transparent packages"
        subtitle="Every package includes the MTO-approved essentials. Higher tiers add road-test cars, practice lessons and early booking. Installment plans available."
      />

      {/* Cards */}
      <section className="container-x py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {packages.map((p) => (
            <Reveal key={p.id}>
              <PackageCard pkg={p} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6 text-center text-sm text-ink-500">
          <p>
            Prefer to pay as you go? {individualLessons.name} are{" "}
            <span className="hud-num font-semibold text-sign-700">
              {individualLessons.price}
            </span>{" "}
            {individualLessons.unit}.
          </p>
        </Reveal>
      </section>

      {/* Comparison table */}
      <section className="border-y border-ink-200 bg-paper-50 py-16 sm:py-24">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">
              <Icon name="tag" className="h-3.5 w-3.5" />
              Compare
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
              What's included in each package
            </h2>
          </Reveal>

          <Reveal className="mt-10 overflow-x-auto">
            <div className="min-w-[720px] overflow-hidden rounded-2xl bg-white ring-1 ring-ink-200">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-ink-100 bg-sign-700 text-white">
                    <th className="px-5 py-4 text-left font-display font-semibold">
                      Feature
                    </th>
                    {packages.map((p) => (
                      <th key={p.id} className="px-3 py-4 text-center">
                        <span className="block font-display font-semibold">{p.name}</span>
                        <span className="hud-num text-xs font-normal text-road-400">
                          ${p.price}+tax
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((row, i) => (
                    <tr
                      key={row.label}
                      className={`border-b border-ink-100 ${i % 2 ? "bg-paper-50" : ""}`}
                    >
                      <td className="px-5 py-3.5 font-medium text-ink-700">
                        {row.label}
                      </td>
                      {packages.map((p) => (
                        <td key={p.id} className="px-3 py-3.5">
                          <Cell on={row.all || row.has?.includes(p.id)} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Recommender */}
      <section className="container-x py-16 sm:py-24">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <span className="eyebrow">
            <Icon name="sparkles" className="h-3.5 w-3.5" />
            AI-powered
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
            Still deciding? Let us match you
          </h2>
          <p className="mt-3 text-ink-600">
            Our Smart Package Finder recommends the right plan in about 30 seconds.
          </p>
        </Reveal>
        <PackageRecommender />
      </section>

      <CTABand />
    </>
  );
}
