import Icon from "./Icon";

const ITEMS = [
  "MTO-Approved BDE",
  "Dual-Brake Cars",
  "Insurance Discount",
  "Male / Female Instructors",
  "Road-Test Ready",
  "Brampton · Mississauga · GTA",
  "Pass With Confidence",
];

// Infinite scrolling badge marquee — a flashy full-width brand strip.
// Content is duplicated so the -50% translate loops seamlessly.
export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden bg-sign-900 py-4">
      <div className="mask-fade-x flex w-max animate-marquee items-center gap-8 whitespace-nowrap pr-8">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="flex items-center gap-2 font-display text-lg font-bold uppercase tracking-wide text-white sm:text-xl">
              {item}
            </span>
            <Icon name="sparkles" className="h-5 w-5 shrink-0 text-road-400" />
          </span>
        ))}
      </div>
    </div>
  );
}
