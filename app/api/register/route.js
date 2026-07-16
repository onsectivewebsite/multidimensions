import { packages, applyCoupon, TAX_RATE } from "@/lib/data";

// BDE course registration intake.
// Validates the submission, re-computes pricing server-side (never trust the client),
// generates a reference number, and returns it. Wire to CRM/email/DB in production.

function reference() {
  // MDD-XXXXXX from time + random, uppercase base36
  const t = Date.now().toString(36).toUpperCase().slice(-4);
  const r = Math.random().toString(36).toUpperCase().slice(2, 4);
  return `MDD-${t}${r}`;
}

export async function POST(req) {
  try {
    const data = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      dob,
      guardianFirst,
      guardianLast,
      pkg,
      coupon,
      policy,
      payment,
    } = data || {};

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
    const phoneOk = (phone || "").replace(/\D/g, "").length >= 10;
    const chosen = packages.find((p) => p.id === pkg);

    // under-18 check
    let minor = false;
    if (dob) {
      const d = new Date(dob);
      if (!Number.isNaN(d.getTime())) {
        const now = new Date();
        let age = now.getFullYear() - d.getFullYear();
        const m = now.getMonth() - d.getMonth();
        if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
        minor = age < 18;
      }
    }

    if (
      !firstName ||
      !lastName ||
      !emailOk ||
      !phoneOk ||
      !chosen ||
      !policy ||
      (minor && (!guardianFirst || !guardianLast))
    ) {
      return Response.json(
        { ok: false, error: "Missing or invalid fields." },
        { status: 400 }
      );
    }

    // Re-price server-side
    const base = chosen.price;
    const { discount } = coupon ? applyCoupon(coupon, base) : { discount: 0 };
    const subtotal = Math.max(0, base - discount);
    const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
    const total = Math.round((subtotal + tax) * 100) / 100;

    const ref = reference();

    // TODO: persist + notify (email/CRM/DB).
    console.log("[register] new enrolment:", {
      ref,
      name: `${firstName} ${lastName}`,
      email,
      phone,
      package: chosen.name,
      minor,
      guardian: minor ? `${guardianFirst} ${guardianLast}` : null,
      coupon: coupon || null,
      pricing: { base, discount, subtotal, tax, total },
      method: payment?.method || "etransfer",
    });

    return Response.json({ ok: true, reference: ref, total });
  } catch {
    return Response.json({ ok: false, error: "Bad request." }, { status: 400 });
  }
}
