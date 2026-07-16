import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import CTABand from "@/components/CTABand";

export const metadata = {
  title: "Blog",
  description:
    "Driving tips, road-test advice and safety guides from the instructors at Multi-Dimensions Driving School.",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <PageHero
        eyebrow="Resources"
        breadcrumb="Blog"
        title="Tips, guides & road-test wisdom"
        subtitle="Practical advice from our MTO-certified instructors to help you learn faster, drive safer and pass with confidence."
      />

      <section className="container-x py-16 sm:py-24">
        {/* Featured */}
        <Reveal>
          <Link
            href="#"
            className="group grid gap-6 overflow-hidden rounded-3xl border border-ink-200 bg-white transition-all hover:border-sign-700/40 hover:shadow-soft lg:grid-cols-2"
          >
            <div className="relative h-64 overflow-hidden lg:h-auto">
              <Image
                src={featured.image}
                alt={featured.title}
                width={1200}
                height={800}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full bg-sign-700 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-white">
                Featured
              </span>
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-9">
              <div className="flex items-center gap-3 font-mono text-xs text-ink-500">
                <span className="rounded-full border border-sign-700/20 bg-sign-700/10 px-2.5 py-1 text-sign-700">
                  {featured.category}
                </span>
                <span>{featured.date}</span>
                <span>· {featured.readTime}</span>
              </div>
              <h2 className="mt-3 font-display text-2xl font-semibold text-ink-900 sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-ink-600">{featured.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-sign-700">
                Read article
                <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <Link
                href="#"
                className="card card-hover group flex h-full flex-col overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={500}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 font-mono text-xs text-ink-500">
                    <span className="rounded-full border border-sign-700/20 bg-sign-700/10 px-2.5 py-1 text-sign-700">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold text-ink-900">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-ink-500">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sign-700">
                    Read more
                    <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center text-sm text-ink-500">
          <p>More articles coming soon — check back for fresh driving tips.</p>
        </Reveal>
      </section>

      <CTABand />
    </>
  );
}
