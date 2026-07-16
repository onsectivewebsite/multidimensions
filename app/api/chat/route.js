import { packages, business, individualLessons, faqs } from "@/lib/data";

// ── Knowledge base used both for the rule-based fallback and as the
// ── system prompt context when an Anthropic API key is configured.
function knowledgeBase() {
  const pkgLines = packages
    .map(
      (p) =>
        `- ${p.name}: $${p.price}+tax — ${p.tagline} Includes: ${p.features.join("; ")}.`
    )
    .join("\n");
  const faqLines = faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n");
  return `Business: ${business.name}, an MTO-approved BDE driving school in ${business.address}.
Phones: ${business.phones.join(", ")}. Email: ${business.email}.
Individual lessons: ${individualLessons.price} ${individualLessons.unit}.

PACKAGES:
${pkgLines}

FAQ:
${faqLines}`;
}

// ── Lightweight rule-based responder (no external calls, always works).
function ruleBasedReply(userText) {
  const t = userText.toLowerCase();

  const named = packages.find((p) => t.includes(p.name.toLowerCase()));
  if (named) {
    return `The ${named.name} package is $${named.price}+tax. ${named.tagline}\n\nIt includes: ${named.features.join("; ")}.\n\nWant me to help you book it? Head to the Contact page or call ${business.phones[1]}.`;
  }

  if (/(price|cost|how much|fee|pricing|packages?)/.test(t)) {
    const list = packages
      .map((p) => `• ${p.name} — $${p.price}+tax`)
      .join("\n");
    return `Here are our packages:\n${list}\n\nEvery package includes 20 hrs online e-learning, 10 hrs Home Link, 10 in-car lessons and your MTO certificate. Individual lessons are ${individualLessons.price} ${individualLessons.unit}. Which one interests you?`;
  }

  if (/(recommend|which package|right for me|suggest|best for)/.test(t)) {
    return `Great question! It depends on a few things:\n• Just need the certified essentials? → Bronze ($600)\n• Want a car for your local road test? → Silver ($800)\n• Want a free 2nd attempt as a safety net? → MDI Special ($900)\n• Test centre far away? → Gold ($950, up to 1 hr) or Platinum ($1050, 1–2 hrs)\n\nTry our Smart Package Finder on the Packages page — it recommends the best fit in 30 seconds!`;
  }

  if (/(car|vehicle|road test|test day|dual brake)/.test(t)) {
    return `Yes — from the Silver package upward we provide a dual-brake car for your road test. Gold covers test centres up to 1 hour away and Platinum covers 1–2 hours away. You also get a practice lesson before the test.`;
  }

  if (/(book|booking|enrol|enroll|sign up|register|start)/.test(t)) {
    return `Booking is easy! You can:\n1. Fill out the form on our Contact page (you can pre-select a package), or\n2. Call us at ${business.phones[0]} or ${business.phones[1]}, or\n3. Email ${business.email}.\n\nWe'll confirm your schedule and match you with an instructor.`;
  }

  if (/(instructor|male|female|teacher)/.test(t)) {
    return `All our instructors are MTO-certified, experienced and patient. You can request a male or female instructor when you book — whatever makes you most comfortable behind the wheel.`;
  }

  if (/(insurance|discount)/.test(t)) {
    return `Completing our MTO-approved BDE course makes you eligible for an insurance discount and can shorten the wait for your G2 road test. Every package includes the official certificate. Check with your insurer for their exact discount.`;
  }

  if (/(install?ment|payment plan|pay later|financ)/.test(t)) {
    return `Yes, installment plans are available on all packages so you can spread the cost. Just ask us when you enrol and we'll set it up.`;
  }

  if (/(hour|open|time|contact|phone|call|email|address|location|where)/.test(t)) {
    return `You can reach us at:\n📞 ${business.phones.join(" / ")}\n✉️ ${business.email}\n📍 ${business.address}\n\nOffice hours: Mon–Fri 9am–8pm, Sat–Sun 9am–6pm.`;
  }

  if (/(hi|hello|hey|good (morning|afternoon|evening))/.test(t)) {
    return `Hello! 👋 I can help with packages, pricing, road tests, instructors and booking. What would you like to know?`;
  }

  if (/(thank|thanks|great|awesome|perfect)/.test(t)) {
    return `You're very welcome! If you're ready, you can book on the Contact page or call ${business.phones[1]}. Drive safe! 🚗`;
  }

  return `Happy to help! I can tell you about our packages (Bronze $600 to Platinum $1050), road-test cars, instructors, insurance discounts and booking. You can also call ${business.phones[1]} or use our Smart Package Finder on the Packages page. What would you like to know?`;
}

export async function POST(req) {
  try {
    const { messages = [] } = await req.json();
    const lastUser =
      [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

    // If an Anthropic API key is configured, use Claude for richer answers.
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (apiKey) {
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 400,
            system: `You are Maya, the friendly virtual assistant for ${business.name}. Answer only using the information below. Be concise, warm and helpful. Always guide the user toward booking (Contact page or phone) when relevant. If asked something outside this scope, politely redirect to calling the school.\n\n${knowledgeBase()}`,
            messages: messages
              .filter((m) => m.role === "user" || m.role === "assistant")
              .map((m) => ({ role: m.role, content: m.content })),
          }),
        });
        if (res.ok) {
          const data = await res.json();
          const reply = data?.content?.[0]?.text;
          if (reply) return Response.json({ reply, source: "claude" });
        }
      } catch {
        // fall through to rule-based
      }
    }

    return Response.json({ reply: ruleBasedReply(lastUser), source: "rules" });
  } catch {
    return Response.json(
      { reply: "Something went wrong. Please call us at +1 647-819-0164." },
      { status: 200 }
    );
  }
}
