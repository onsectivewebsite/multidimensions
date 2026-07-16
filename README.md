# Multi-Dimensions Driving School — Website

A modern, AI-driven, multi-page website for **Multi-Dimensions Driving School**, an
MTO-approved BDE provider in Brampton, ON. Built with **Next.js (App Router)**,
**Tailwind CSS** and **Framer Motion**.

## Design — White & Blue, photo-rich

A clean, friendly driving-school look: white base with a confident **blue** (`#1D4ED8`)
and sky-blue accents, warm **amber** star ratings, and real photography throughout —
a photo hero, a full-bleed "on real GTA roads" band, a **Meet your instructors**
section with headshots, and a gallery strip. Type: **Poppins** (display) · **Inter**
(body). Imagery is centralised in `lib/data.js` (`photos`, `instructors`,
`galleryImages`) and served from Unsplash.

## ✨ Features

- **10 pages** — Home, About, Services, Packages, Register, Testimonials + Gallery,
  FAQ, Blog, Policies, Contact
- **BDE Course registration** (`/register`) — full enrolment flow with:
  - student details + **auto parent/guardian fields when under 18** (from date of birth)
  - **coupon codes** with live discount + Ontario HST in an order summary
  - driver's **licence upload** and a referral/notes field
  - **School Policy** acceptance gate
  - **PayPal** checkout (Smart Buttons) **and E-Transfer** with a reference number
- **AI chat assistant ("Maya")** — floating widget on every page. Works out of the
  box with a built-in knowledge base; upgrades to Claude when an API key is set.
- **Smart Package Finder** — a 4-question quiz that recommends the best package.
- **Accessible & responsive** — WCAG-minded contrast, keyboard focus, respects
  `prefers-reduced-motion`, mobile-first down to 375px.
- **Real content** — packages, pricing, services, testimonials and contact details
  mirror mddrivers.ca.

## 🚀 Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

### Optional integrations

```bash
cp .env.example .env.local
```

| Variable | Enables | Without it |
|---|---|---|
| `ANTHROPIC_API_KEY` | Claude-powered chat answers | Chat uses a built-in knowledge base |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | Live PayPal checkout on `/register` | Students register & pay by e-transfer |

### Coupon codes (demo)

`WELCOME50` ($50 off) · `SUMMER10` (10%) · `REFER25` ($25) · `NEWDRIVER` (15%).
Defined in `lib/data.js` and validated both client- and server-side.

## 🏗️ Build & deploy

```bash
npm run build && npm start
```

Deploys cleanly to **Vercel** or **Netlify**. Remote images are served from
Unsplash (whitelisted in `next.config.js`).

## 📁 Structure

```
app/
  layout.js              Root layout, fonts, Navbar/Footer/AIChat
  page.js                Home
  about|services|packages|register|testimonials|faq|contact|policies|blog/page.js
  api/chat/route.js      AI assistant (rule-based + optional Claude)
  api/register/route.js  Registration intake (server-side re-pricing + reference no.)
components/              Navbar, Footer, AIChat, PackageRecommender,
                         RegistrationForm, PayPalButton, FaqAccordion, …
lib/data.js              Single source of truth: content, packages, coupons, pricing
```

## 🔌 Going to production

- `app/api/register/route.js` validates and re-prices each enrolment and returns a
  reference number. Wire it to your email provider (e.g. Resend), a CRM, or a
  database to receive registrations, and connect licence-file storage.
- Add real coupon codes and a live PayPal client ID via environment variables.
