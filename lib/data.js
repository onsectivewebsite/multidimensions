// ─────────────────────────────────────────────────────────────
// Multi-Dimensions Driving School — content source of truth
// Data mirrors mddrivers.ca (packages, services, contact, etc.)
// ─────────────────────────────────────────────────────────────

export const business = {
  name: "Multi-Dimensions Driving School",
  shortName: "Multi-Dimensions",
  tagline: "Building Confident, Proficient Motorists",
  subtag: "MTO-Approved BDE Course Provider serving the Greater Toronto Area.",
  phones: ["+1 800-240-2199", "+1 647-819-0164"],
  email: "info@mddrivers.ca",
  address: "50 Cochrane Ave, Brampton, ON L6Z 4G6, Canada",
  hours: [
    { day: "Monday – Friday", time: "9:00 AM – 8:00 PM" },
    { day: "Saturday – Sunday", time: "9:00 AM – 6:00 PM" },
  ],
  areas: ["Brampton", "Mississauga", "Greater Toronto Area"],
  social: {
    facebook: "https://facebook.com/mddrivers",
    instagram: "https://instagram.com/mddrivers",
    twitter: "https://twitter.com/mddrivers",
    pinterest: "https://pinterest.com/mddrivers",
    linkedin: "https://linkedin.com/company/mddrivers",
  },
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "Register", href: "/register" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
];

export const packages = [
  {
    id: "bronze",
    name: "Bronze",
    price: 600,
    tier: 1,
    tagline: "The MTO-certified essentials to get road-test ready.",
    popular: false,
    features: [
      "20 hrs of online e-learning (self-paced)",
      "10 hrs of Home Link training",
      "10 in-car driving lessons",
      "Official MTO certificate on completion",
      "Insurance discount eligibility",
    ],
  },
  {
    id: "silver",
    name: "Silver",
    price: 800,
    tier: 2,
    tagline: "Everything in Bronze plus a car for your local road test.",
    popular: false,
    features: [
      "All Bronze features",
      "Car provided for your local road test",
      "Dedicated practice lesson before the test",
    ],
  },
  {
    id: "mdi-special",
    name: "MDI Special",
    price: 900,
    tier: 3,
    tagline: "Bronze plus a free second attempt if you need it.",
    popular: true,
    features: [
      "All Bronze features",
      "Free local road test on 2nd attempt",
      "Free lesson before the 2nd attempt",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    price: 950,
    tier: 4,
    tagline: "Reach test centres up to 1 hour away, with early booking.",
    popular: false,
    features: [
      "All Bronze features",
      "Car for distant tests (up to 1 hr away)",
      "Dedicated practice lesson",
      "Early road-test booking assistance",
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    price: 1050,
    tier: 5,
    tagline: "Maximum flexibility — test centres 1–2 hours away.",
    popular: false,
    features: [
      "All Bronze features",
      "Car for distant tests (1–2 hrs away)",
      "Dedicated practice lesson",
      "Priority early road-test booking",
    ],
  },
];

export const individualLessons = {
  name: "Individual In-Car Lessons",
  price: "$40 – $50",
  unit: "per 45-minute session",
  note: "Perfect for a quick refresher or targeted practice before your test.",
};

export const services = [
  {
    id: "elearning",
    title: "Online E-Learning",
    icon: "monitor",
    blurb:
      "20 hours of MTO-approved theory you can complete on your own schedule, from any device.",
  },
  {
    id: "homelink",
    title: "Home Link Training",
    icon: "home",
    blurb:
      "10 hours of guided at-home practice that bridges classroom theory and real driving.",
  },
  {
    id: "in-car",
    title: "In-Car Lessons",
    icon: "car",
    blurb:
      "One-on-one road time with patient, MTO-certified instructors in dual-brake vehicles.",
  },
  {
    id: "defensive",
    title: "Defensive Driving",
    icon: "shield",
    blurb:
      "Learn to anticipate hazards and stay calm under pressure — skills that last a lifetime.",
  },
  {
    id: "road-test",
    title: "Road Test Preparation",
    icon: "badge",
    blurb:
      "Mock tests, route familiarity and a car for the big day so you walk in confident.",
  },
  {
    id: "instructor-choice",
    title: "Male / Female Instructors",
    icon: "users",
    blurb:
      "Choose the instructor you're most comfortable with — your comfort speeds up learning.",
  },
];

export const features = [
  {
    title: "MTO-Approved & Certified",
    icon: "badge",
    text: "A licensed Beginner Driver Education provider. Every lesson counts toward your certificate and insurance discount.",
  },
  {
    title: "Patient, Expert Instructors",
    icon: "users",
    text: "Professionals certified by the Ministry of Transportation — experienced, courteous and genuinely patient.",
  },
  {
    title: "Flexible Timing",
    icon: "clock",
    text: "Self-paced online theory plus in-car sessions that fit around school, work and life.",
  },
  {
    title: "Affordable, Transparent Fees",
    icon: "tag",
    text: "Competitive package pricing with installment plans available. No surprises at checkout.",
  },
];

export const testimonials = [
  {
    name: "Kanav Behal",
    location: "Brampton, ON",
    rating: 5,
    quote:
      "The instructors are amazing! They were calm and built my confidence in driving. I will definitely recommend them to everyone in the GTA and around.",
  },
  {
    name: "Jannat Sharma",
    location: "Mississauga, ON",
    rating: 5,
    quote:
      "My instructor Iram was so patient and really built my confidence. Having a good instructor is really important, and Multi-Dimensions delivered.",
  },
  {
    name: "Atam Parkash Singh",
    location: "Brampton, ON",
    rating: 5,
    quote:
      "Amazing, professional instructor. I passed my G on the first go, within 20 days of landing in Canada. Highly recommended!",
  },
];

export const faqs = [
  {
    q: "Is Multi-Dimensions an MTO-approved driving school?",
    a: "Yes. We are a licensed MTO-Approved Beginner Driver Education (BDE) course provider. On completing your course you receive an official certificate recognized by the Ministry of Transportation.",
  },
  {
    q: "Will completing the course lower my insurance?",
    a: "Completing an MTO-approved BDE course makes you eligible for an insurance discount and can reduce the wait to take your G2 road test. Check with your insurer for their specific discount.",
  },
  {
    q: "What does a package include?",
    a: "Every package includes 20 hours of online e-learning, 10 hours of Home Link training, 10 in-car lessons and your MTO certificate. Higher tiers add a car for your road test, practice lessons and early booking help.",
  },
  {
    q: "Can I choose a male or female instructor?",
    a: "Absolutely. We want you comfortable and focused, so you can request a male or female instructor when you book.",
  },
  {
    q: "Do you provide a car for the road test?",
    a: "Yes — from the Silver package upward we provide a dual-brake vehicle for your test, including test centres up to 1–2 hours away on Gold and Platinum.",
  },
  {
    q: "Do you offer payment plans?",
    a: "We do. Installment plans are available on all packages so you can spread the cost. Ask us for details when you enrol.",
  },
  {
    q: "How long does it take to get certified?",
    a: "It depends on your pace, but the online theory is self-paced and many students complete the full program within a few weeks. Some new residents have passed their G within their first month.",
  },
];

export const policies = [
  {
    id: "school-policy",
    title: "School Policy",
    intro:
      "Our commitment to a safe, respectful and effective learning environment for every student.",
    points: [
      "All instructors are MTO-certified and carry current credentials.",
      "Lessons are conducted in insured, dual-brake vehicles maintained to safety standards.",
      "Please provide at least 24 hours' notice to reschedule or cancel an in-car lesson.",
      "Late cancellations or no-shows may forfeit the scheduled session.",
      "Students must hold a valid G1 licence before beginning in-car lessons.",
      "We follow current public-health guidance including sanitization of vehicles between lessons.",
    ],
  },
  {
    id: "referral-policy",
    title: "Referral Policy",
    intro:
      "Love your experience? Share it. Our referral program rewards you for spreading the word.",
    points: [
      "Refer a friend who enrols in any package and you both receive a reward.",
      "Referral credits can be applied to individual lessons or future bookings.",
      "The referred student must complete enrolment for the reward to apply.",
      "There is no limit — refer as many friends as you like.",
      "Contact our office to redeem your referral reward.",
    ],
  },
];

export const blogPosts = [
  {
    slug: "pass-g2-first-try",
    title: "7 Habits That Help You Pass Your G2 on the First Try",
    excerpt:
      "From mirror discipline to smooth stops, these are the habits examiners quietly reward — and how to build them before test day.",
    category: "Road Test",
    date: "June 2, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "bde-course-worth-it",
    title: "Is a BDE Course Worth It? The Insurance Math Explained",
    excerpt:
      "An MTO-approved course does more than teach you to drive. Here's how the certificate can pay for itself through insurance savings.",
    category: "Insurance",
    date: "May 18, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "winter-driving-gta",
    title: "Winter Driving in the GTA: A New Driver's Survival Guide",
    excerpt:
      "Snow, black ice and short days change everything. Master braking distance, visibility and confidence in Ontario winters.",
    category: "Safety",
    date: "April 29, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "nervous-driver-tips",
    title: "Nervous Behind the Wheel? Calm-Driving Techniques That Work",
    excerpt:
      "Driving anxiety is common and completely beatable. Our instructors share the exact techniques they use with first-time learners.",
    category: "Confidence",
    date: "April 10, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  },
];

export const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80",
    alt: "Student driving on an open road at sunset",
  },
  {
    src: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
    alt: "Hands on a steering wheel during a lesson",
  },
  {
    src: "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=800&q=80",
    alt: "Instructor and student in a car",
  },
  {
    src: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80",
    alt: "Close-up of a car dashboard and gear shift",
  },
  {
    src: "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=800&q=80",
    alt: "Driver checking the rear-view mirror",
  },
  {
    src: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    alt: "Car on a scenic road",
  },
  {
    src: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
    alt: "Modern sedan used for lessons",
  },
  {
    src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    alt: "Steering wheel and city view through the windshield",
  },
  {
    src: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80",
    alt: "Car driving along a tree-lined road",
  },
  {
    src: "https://images.unsplash.com/photo-1600661653561-629509216228?auto=format&fit=crop&w=800&q=80",
    alt: "Young driver smiling behind the wheel",
  },
  {
    src: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80",
    alt: "Learner holding car keys",
  },
  {
    src: "https://images.unsplash.com/photo-1471479917193-f00955256257?auto=format&fit=crop&w=800&q=80",
    alt: "Highway stretching into the distance",
  },
];

// Photos used in full-width bands and section imagery
export const photos = {
  heroDrive:
    "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1400&q=80",
  instructorLesson:
    "https://images.unsplash.com/photo-1600661653561-629509216228?auto=format&fit=crop&w=1200&q=80",
  keysHandover:
    "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80",
  openRoad:
    "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1600&q=80",
  cityDrive:
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1400&q=80",
  mirror:
    "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=1200&q=80",
};

// Instructor team — friendly, human, with photos
export const instructors = [
  {
    name: "Iram Khan",
    role: "Senior Instructor · 12 yrs",
    tag: "Patient with nervous first-timers",
    photo:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "David Chen",
    role: "MTO-Certified Instructor",
    tag: "Highway & defensive-driving specialist",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Priya Sharma",
    role: "Instructor · Road-test prep",
    tag: "Calm, encouraging, test-day ready",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Marcus Reid",
    role: "MTO-Certified Instructor",
    tag: "Great with brand-new drivers",
    photo:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=600&q=80",
  },
];

export const stats = [
  { value: "10k+", label: "Lessons delivered" },
  { value: "98%", label: "Would recommend" },
  { value: "5", label: "Flexible packages" },
  { value: "MTO", label: "Approved provider" },
];

// Rotating multi-colour accents for icon tiles, stats, badges, etc.
// (Full literal class names so Tailwind keeps them in the build.)
export const accents = [
  { tile: "bg-blue-100 text-blue-600", solid: "bg-blue-600", text: "text-blue-600", ring: "ring-blue-500" },
  { tile: "bg-violet-100 text-violet-600", solid: "bg-violet-600", text: "text-violet-600", ring: "ring-violet-500" },
  { tile: "bg-rose-100 text-rose-600", solid: "bg-rose-600", text: "text-rose-600", ring: "ring-rose-500" },
  { tile: "bg-emerald-100 text-emerald-600", solid: "bg-emerald-600", text: "text-emerald-600", ring: "ring-emerald-500" },
  { tile: "bg-orange-100 text-orange-600", solid: "bg-orange-600", text: "text-orange-600", ring: "ring-orange-500" },
  { tile: "bg-cyan-100 text-cyan-600", solid: "bg-cyan-600", text: "text-cyan-600", ring: "ring-cyan-500" },
];

// Registration / checkout — demo coupon codes (validated client + server side).
export const coupons = {
  WELCOME50: { type: "flat", amount: 50, label: "$50 off — new students" },
  SUMMER10: { type: "percent", amount: 10, label: "10% off — summer offer" },
  REFER25: { type: "flat", amount: 25, label: "$25 off — friend referral" },
  NEWDRIVER: { type: "percent", amount: 15, label: "15% off — first-time driver" },
};

export const TAX_RATE = 0.13; // Ontario HST

export const payment = {
  etransferEmail: "info@mddrivers.ca",
  // PayPal renders live buttons when NEXT_PUBLIC_PAYPAL_CLIENT_ID is set (see .env.example).
  currency: "CAD",
};

// Apply a coupon code to a base price. Returns { valid, discount, label }.
export function applyCoupon(code, base) {
  const key = (code || "").trim().toUpperCase();
  const c = coupons[key];
  if (!c) return { valid: false, discount: 0, label: "" };
  const discount =
    c.type === "flat" ? Math.min(c.amount, base) : Math.round(base * (c.amount / 100));
  return { valid: true, discount, label: c.label, code: key };
}
