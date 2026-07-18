import { business } from "@/lib/data";
import Icon from "./Icon";

const socials = [
  { name: "facebook", href: business.social.facebook, label: "Facebook" },
  { name: "instagram", href: business.social.instagram, label: "Instagram" },
  { name: "twitter", href: business.social.twitter, label: "Twitter" },
  { name: "linkedin", href: business.social.linkedin, label: "LinkedIn" },
];

// Colour-cycling announcement bar at the very top: social links + installments.
export default function AnnouncementBar() {
  return (
    <div className="cycle-bar text-white">
      <div className="container-x flex h-9 items-center justify-between gap-4 text-xs font-semibold">
        {/* Social */}
        <div className="flex items-center gap-3">
          <span className="hidden text-white/90 sm:inline">Follow us</span>
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-white/85 transition-transform hover:scale-110 hover:text-white"
            >
              <Icon name={s.name} className="h-4 w-4" />
            </a>
          ))}
        </div>

        {/* Installments message */}
        <a
          href="/register"
          className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 ring-1 ring-white/25 transition-colors hover:bg-white/25"
        >
          <Icon name="tag" className="h-4 w-4" />
          <span className="hidden sm:inline">Pay in easy installments —</span>
          <span>Enroll today &amp; get on the road!</span>
          <Icon name="arrow" className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
