import { coupons } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import RegistrationForm from "@/components/RegistrationForm";

export const metadata = {
  title: "Register for the BDE Course",
  description:
    "Register for the MTO-approved Beginner Driver Education course at Multi-Dimensions Driving School. Apply a coupon and pay securely by PayPal or e-transfer.",
};

export default function RegisterPage() {
  const promo = Object.entries(coupons)[0]; // featured coupon

  return (
    <>
      <PageHero
        eyebrow="Enrolment"
        breadcrumb="Register"
        title="Let's start your BDE Course registration"
        subtitle="Explore our driving courses designed for teenagers and adults. Learn the skills, knowledge and attitude to become a safe, defensive driver. Fill in the form below to register."
      />

      {/* Promo strip */}
      <section className="container-x pt-10">
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-2xl border border-white/10 bg-sign-700 px-5 py-3 text-center text-sm">
            <Icon name="sparkles" className="h-4 w-4 text-road-400" />
            <span className="text-white/85">
              New students save with code
            </span>
            <span className="hud-num rounded-md bg-white/10 px-2 py-0.5 font-semibold text-road-400">
              {promo[0]}
            </span>
            <span className="text-white/85">— {promo[1].label}. Apply it in the order summary.</span>
          </div>
        </Reveal>
      </section>

      <section className="container-x py-12 sm:py-16">
        <RegistrationForm />
      </section>
    </>
  );
}
