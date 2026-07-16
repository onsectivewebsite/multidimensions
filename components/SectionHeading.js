import Reveal from "./Reveal";
import Icon from "./Icon";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
  icon = "route",
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span className="eyebrow">
          <Icon name={icon} className="h-3.5 w-3.5 text-road-400" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg leading-relaxed text-ink-600">{subtitle}</p>
      )}
    </Reveal>
  );
}
