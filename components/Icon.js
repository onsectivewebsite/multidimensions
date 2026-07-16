// Inline stroke icons (Lucide-style). No external dependency, no emoji.
// Consistent 1.75 stroke, 24x24 viewBox, currentColor.

const paths = {
  monitor: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  home: <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" />,
  car: (
    <>
      <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11" />
      <path d="M3 11h18v6H3zM6 17v2M18 17v2" />
      <circle cx="7.5" cy="14" r="1" />
      <circle cx="16.5" cy="14" r="1" />
    </>
  ),
  shield: <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />,
  badge: (
    <>
      <path d="M12 2l2.4 1.8 3-.2 1 2.8 2.4 1.6-1 2.9 1 2.9-2.4 1.6-1 2.8-3-.2L12 22l-2.4-1.8-3 .2-1-2.8L3.2 16l1-2.9-1-2.9 2.4-1.6 1-2.8 3 .2z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0M16 5.5a3 3 0 0 1 0 5.8M18 20a5.5 5.5 0 0 0-3-4.9" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  tag: (
    <>
      <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9z" />
      <circle cx="7.5" cy="7.5" r="1.25" />
    </>
  ),
  phone: (
    <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 2 6a2 2 0 0 1 2-2z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  check: <path d="M4 12.5 9 17.5 20 6.5" />,
  star: (
    <path d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 17.9 6.7 19.6l1-5.8L3.5 9.7l5.9-.9z" />
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  sparkles: (
    <>
      <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" />
      <path d="M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z" />
    </>
  ),
  chat: (
    <path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
  ),
  send: <path d="M4 12 20 4l-6 16-3-7-7-1z" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  facebook: (
    <path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2l1-3h-3V8a1 1 0 0 1 1-1z" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17" cy="7" r="1" />
    </>
  ),
  twitter: (
    <path d="M21 6.5a7 7 0 0 1-2 .6 3.4 3.4 0 0 0 1.5-1.9 7 7 0 0 1-2.2.9A3.4 3.4 0 0 0 12 8.7a9.6 9.6 0 0 1-7-3.5s-4 9 5 13a10 10 0 0 1-6 2c9 5 20 0 20-11.5 0-.3 0-.6-.1-.8A5 5 0 0 0 21 6.5z" />
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7" />
    </>
  ),
  pinterest: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7c-2 0-3.5 1.4-3.5 3.3 0 1 .5 1.8 1.2 2 .1 0 .2 0 .2-.2l.2-.7c0-.2 0-.3-.1-.4a1.7 1.7 0 0 1-.4-1.2c0-1.3 1-2.3 2.5-2.3 1.4 0 2.2.8 2.2 2 0 1.6-.7 2.9-1.7 2.9-.6 0-1-.5-.9-1.1l.4-1.6c.1-.4-.1-.8-.5-.8-.5 0-.9.5-.9 1.2 0 .4.1.7.1.7l-.7 2.9c-.1.6-.1 1.4 0 2 0 .1.1.1.2.1.7-1 1-2 1.2-2.6 0 0 .5.6 1.6.6 2 0 3.5-1.9 3.5-4.4C15.7 8.6 14.1 7 12 7z" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <path d="M8.5 18H14a3.5 3.5 0 0 0 0-7H10a3.5 3.5 0 0 1 0-7h5.5" />
    </>
  ),
};

export default function Icon({ name, className = "w-6 h-6", filled = false }) {
  const p = paths[name];
  if (!p) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {p}
    </svg>
  );
}
