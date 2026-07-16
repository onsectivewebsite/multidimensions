import Link from "next/link";
import Icon from "./Icon";

export default function PackageCard({ pkg }) {
  const featured = pkg.popular;
  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl p-6 transition-all duration-300 sm:p-7 ${
        featured
          ? "sign-panel lg:-translate-y-3"
          : "card card-hover"
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-md bg-road-500 px-4 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink-900">
          Most popular
        </span>
      )}

      <div className="flex items-baseline justify-between">
        <h3 className={`font-display text-xl font-bold ${featured ? "text-white" : "text-ink-900"}`}>
          {pkg.name}
        </h3>
        <Icon name="badge" className={`h-6 w-6 ${featured ? "text-road-400" : "text-sign-700"}`} />
      </div>

      <p className={`mt-1 text-sm ${featured ? "text-white/80" : "text-ink-500"}`}>
        {pkg.tagline}
      </p>

      <div className="mt-5 flex items-end gap-1">
        <span className={`hud-num font-display text-4xl font-extrabold ${featured ? "text-white" : "text-ink-900"}`}>
          ${pkg.price}
        </span>
        <span className={`mb-1.5 font-mono text-xs uppercase tracking-wider ${featured ? "text-white/70" : "text-ink-500"}`}>
          +tax
        </span>
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {pkg.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <Icon name="check" className={`mt-0.5 h-4 w-4 shrink-0 ${featured ? "text-road-400" : "text-sign-600"}`} />
            <span className={featured ? "text-white/90" : "text-ink-600"}>{f}</span>
          </li>
        ))}
      </ul>

      <Link
        href={`/register?package=${pkg.id}`}
        className={`mt-7 w-full ${featured ? "btn-yellow" : "btn-primary"}`}
      >
        Choose {pkg.name}
        <Icon name="arrow" className="h-4 w-4" />
      </Link>
    </div>
  );
}
