import Link from "next/link";
import { faqs, business } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about MTO-approved courses, packages, insurance discounts, road-test cars, instructors and booking.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Help centre"
        breadcrumb="FAQ"
        title="Frequently asked questions"
        subtitle="Everything you need to know about our courses, packages and how it all works. Can't find your answer? We're a call away."
      />

      <section className="container-x py-16 sm:py-24">
        <FaqAccordion items={faqs} />

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div className="flex flex-col items-center justify-between gap-5 rounded-3xl border border-white/10 bg-sign-700 p-8 text-center shadow-soft sm:flex-row sm:text-left">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-road-400">
                <Icon name="chat" className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-white">
                  Still have a question?
                </h3>
                <p className="text-sm text-white/85">
                  Chat with our AI assistant, or call{" "}
                  <span className="font-mono text-road-400">{business.phones[1]}</span>.
                </p>
              </div>
            </div>
            <Link href="/contact" className="btn-primary shrink-0">
              Contact us
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
