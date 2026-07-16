import Link from "next/link";
import Reveal from "./Reveal";
import Icon from "./Icon";
import { business } from "@/lib/data";

export default function CTABand() {
  return (
    <section className="container-x py-16 sm:py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-sign-700 px-6 py-12 text-center shadow-lift sm:px-12 sm:py-16">
          {/* inset guide-sign keyline */}
          <div className="pointer-events-none absolute inset-4 rounded-2xl ring-2 ring-white/25" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-md bg-white/15 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white ring-1 ring-white/25">
              <Icon name="badge" className="h-3.5 w-3.5 text-road-400" />
              MTO-Approved · Insurance eligible
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-extrabold text-white sm:text-4xl">
              Ready to get on the road with confidence?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/85">
              Book your first lesson today or talk to a real person about the best
              package for you. Installment plans available.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/register" className="btn-yellow">
                Register Now
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${business.phones[0].replace(/\s/g, "")}`}
                className="btn bg-white/10 text-white ring-2 ring-white/30 hover:bg-white/20"
              >
                <Icon name="phone" className="h-4 w-4 text-road-400" />
                <span className="font-mono">{business.phones[0]}</span>
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
