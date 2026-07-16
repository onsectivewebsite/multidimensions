"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { packages, applyCoupon, TAX_RATE, payment } from "@/lib/data";
import Icon from "./Icon";
import PayPalButton from "./PayPalButton";

function Field({ label, error, required, hint, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-ink-500">
        {label} {required && <span className="text-sign-700">*</span>}
      </span>
      {children}
      {hint && !error && <span className="mt-1 block text-xs text-ink-500">{hint}</span>}
      {error && (
        <span role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-stop-600">
          <Icon name="close" className="h-3.5 w-3.5" />
          {error}
        </span>
      )}
    </label>
  );
}

const inputBase =
  "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors focus:border-sign-600 focus:ring-4 focus:ring-sign-500/15 placeholder:text-ink-500";

function ageFromDob(dob) {
  if (!dob) return null;
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age;
}

const empty = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dob: "",
  guardianFirst: "",
  guardianLast: "",
  pkg: "",
  license: "",
  message: "",
  method: "etransfer",
  policy: false,
};

function RegistrationFormInner() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState(empty);
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState(null);
  const [couponMsg, setCouponMsg] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    const pkg = searchParams.get("package");
    if (pkg && packages.some((p) => p.id === pkg)) {
      setForm((f) => ({ ...f, pkg }));
    }
    const c = searchParams.get("coupon");
    if (c) setCouponInput(c);
  }, [searchParams]);

  const set = (key) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const selectedPkg = packages.find((p) => p.id === form.pkg);
  const age = ageFromDob(form.dob);
  const isMinor = age !== null && age < 18;

  const base = selectedPkg?.price ?? 0;
  const discount = coupon?.valid ? Math.min(coupon.discount, base) : 0;
  const subtotal = Math.max(0, base - discount);
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;

  function onApplyCoupon() {
    if (!selectedPkg) {
      setCoupon(null);
      setCouponMsg("Choose a package first, then apply your coupon.");
      return;
    }
    const res = applyCoupon(couponInput, base);
    if (res.valid) {
      setCoupon(res);
      setCouponMsg(`Applied ${res.code} — you save $${res.discount}.`);
    } else {
      setCoupon(null);
      setCouponMsg("That coupon code isn't valid. Try WELCOME50, SUMMER10 or NEWDRIVER.");
    }
  }

  function validate() {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required.";
    if (!form.lastName.trim()) e.lastName = "Required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (form.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a valid phone number.";
    if (!form.dob) e.dob = "Required.";
    if (isMinor && !form.guardianFirst.trim())
      e.guardianFirst = "Required for students under 18.";
    if (isMinor && !form.guardianLast.trim())
      e.guardianLast = "Required for students under 18.";
    if (!form.pkg) e.pkg = "Please choose a course package.";
    if (!form.policy) e.policy = "You must accept the School Policy to register.";
    return e;
  }

  const formValid = useMemo(
    () => Object.keys(validate()).length === 0,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form, isMinor]
  );

  async function submitRegistration(paymentResult) {
    setStatus("loading");
    try {
      const payload = {
        ...form,
        coupon: coupon?.valid ? coupon.code : null,
        pricing: { base, discount, subtotal, tax, total },
        payment:
          paymentResult?.method === "paypal"
            ? { method: "paypal", detail: paymentResult.detail }
            : { method: "etransfer" },
      };
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error();
      setReceipt({
        ref: data.reference,
        method: payload.payment.method,
        total,
        pkg: selectedPkg?.name,
        firstName: form.firstName,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function onEtransferSubmit(e) {
    e.preventDefault();
    const e2 = validate();
    setErrors(e2);
    if (Object.keys(e2).length) {
      document.querySelector(`[name="${Object.keys(e2)[0]}"]`)?.focus();
      return;
    }
    submitRegistration({ method: "etransfer" });
  }

  // ── Success screen ───────────────────────────────────
  if (status === "success" && receipt) {
    return (
      <div className="card p-8 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sign-700/10 text-sign-700 ring-4 ring-sign-700/15">
          <Icon name="check" className="h-8 w-8" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-extrabold text-ink-900">
          You're registered, {receipt.firstName}!
        </h3>
        <p className="mx-auto mt-2 max-w-md text-ink-600">
          Your {receipt.pkg} registration is confirmed. Reference{" "}
          <span className="hud-num font-semibold text-sign-700">{receipt.ref}</span>.
        </p>

        {receipt.method === "etransfer" ? (
          <div className="mx-auto mt-6 max-w-md rounded-2xl border border-ink-200 bg-paper-50 p-5 text-left">
            <p className="font-mono text-xs uppercase tracking-wider text-sign-700">
              Complete your e-transfer
            </p>
            <ul className="mt-3 space-y-2 text-sm text-ink-600">
              <li className="flex justify-between gap-4">
                <span>Send to</span>
                <span className="font-mono text-ink-900">{payment.etransferEmail}</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Amount</span>
                <span className="hud-num font-semibold text-ink-900">
                  ${receipt.total.toFixed(2)} CAD
                </span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Message / memo</span>
                <span className="font-mono text-ink-900">{receipt.ref}</span>
              </li>
            </ul>
          </div>
        ) : (
          <p className="mx-auto mt-4 max-w-md rounded-2xl border border-sign-700/20 bg-sign-700/[0.06] p-4 text-sm text-sign-800">
            Payment received via PayPal. A confirmation email is on its way.
          </p>
        )}

        <p className="mt-5 text-sm text-ink-500">
          Our team will contact you within one business day to schedule your first lesson.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* ── Form ── */}
      <form onSubmit={onEtransferSubmit} noValidate className="card p-6 sm:p-8 lg:col-span-3">
        {/* Student details */}
        <h3 className="font-display text-lg font-bold text-ink-900">Student details</h3>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="First name" required error={errors.firstName}>
            <input name="firstName" value={form.firstName} onChange={set("firstName")} autoComplete="given-name" placeholder="Jane" className={inputBase} />
          </Field>
          <Field label="Last name" required error={errors.lastName}>
            <input name="lastName" value={form.lastName} onChange={set("lastName")} autoComplete="family-name" placeholder="Doe" className={inputBase} />
          </Field>
          <Field label="Email" required error={errors.email}>
            <input name="email" type="email" value={form.email} onChange={set("email")} autoComplete="email" placeholder="jane@example.com" className={inputBase} />
          </Field>
          <Field label="Phone" required error={errors.phone}>
            <input name="phone" type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" placeholder="(647) 555-0123" className={inputBase} />
          </Field>
          <Field label="Date of birth" required error={errors.dob} hint={age !== null ? `Age: ${age}` : "Used to confirm eligibility"}>
            <input name="dob" type="date" value={form.dob} onChange={set("dob")} className={inputBase} />
          </Field>
        </div>

        {/* Guardian — road-yellow caution sign, only when under 18 */}
        {isMinor && (
          <div className="mt-5 rounded-2xl border-2 border-road-500/60 bg-road-500/10 p-4">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink-800">
              <Icon name="users" className="h-4 w-4" />
              Parent / guardian required (under 18)
            </p>
            <div className="mt-3 grid gap-5 sm:grid-cols-2">
              <Field label="Guardian first name" required error={errors.guardianFirst}>
                <input name="guardianFirst" value={form.guardianFirst} onChange={set("guardianFirst")} placeholder="John" className={inputBase} />
              </Field>
              <Field label="Guardian last name" required error={errors.guardianLast}>
                <input name="guardianLast" value={form.guardianLast} onChange={set("guardianLast")} placeholder="Doe" className={inputBase} />
              </Field>
            </div>
          </div>
        )}

        {/* Course */}
        <h3 className="mt-8 font-display text-lg font-bold text-ink-900">Your BDE course</h3>
        <div className="mt-4">
          <Field label="Course package" required error={errors.pkg}>
            <select name="pkg" value={form.pkg} onChange={set("pkg")} className={`${inputBase} cursor-pointer [&>option]:bg-white`}>
              <option value="">Select a package…</option>
              {packages.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — ${p.price}+tax
                </option>
              ))}
            </select>
          </Field>
        </div>

        {/* License upload */}
        <div className="mt-5">
          <Field label="Upload your licence (G1)" hint="JPG, PNG or PDF — helps us verify eligibility">
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-ink-200 bg-paper-50 px-4 py-3.5 text-sm text-ink-500 transition-colors hover:border-sign-500">
              <Icon name="badge" className="h-5 w-5 text-sign-700" />
              <span className="truncate">{form.license || "Choose a file to upload…"}</span>
              <input
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) =>
                  setForm((f) => ({ ...f, license: e.target.files?.[0]?.name || "" }))
                }
              />
            </label>
          </Field>
        </div>

        {/* Message / referral */}
        <div className="mt-5">
          <Field
            label="Message"
            hint="Referred by a friend? Add their full name here. Include any preferred days/times too."
          >
            <textarea name="message" rows={3} value={form.message} onChange={set("message")} placeholder="Referred by… / preferred schedule / questions" className={`${inputBase} resize-none`} />
          </Field>
        </div>

        {/* Policy */}
        <label className="mt-6 flex cursor-pointer items-start gap-3">
          <input
            name="policy"
            type="checkbox"
            checked={form.policy}
            onChange={set("policy")}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-ink-200 accent-sign-700"
          />
          <span className="text-sm text-ink-700">
            I have read and accepted the{" "}
            <Link href="/policies" className="font-medium text-sign-700 hover:underline" target="_blank">
              School Policy
            </Link>
            . <span className="text-sign-700">*</span>
          </span>
        </label>
        {errors.policy && (
          <p role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-stop-600">
            <Icon name="close" className="h-3.5 w-3.5" />
            {errors.policy}
          </p>
        )}

        {status === "error" && (
          <p role="alert" className="mt-4 rounded-xl border border-stop-600/30 bg-stop-600/10 px-4 py-3 text-sm font-medium text-stop-600">
            Something went wrong. Please try again or call +1 647-819-0164.
          </p>
        )}
      </form>

      {/* ── Order summary + payment ── */}
      <div className="lg:col-span-2">
        <div className="card sticky top-24 p-6">
          <h3 className="font-display text-lg font-bold text-ink-900">Order summary</h3>

          {/* Coupon */}
          <div className="mt-4">
            <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-ink-500">
              Coupon code
            </span>
            <div className="flex gap-2">
              <input
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="e.g. WELCOME50"
                className={`${inputBase} uppercase`}
              />
              <button type="button" onClick={onApplyCoupon} className="btn-ghost shrink-0 px-4">
                Apply
              </button>
            </div>
            {couponMsg && (
              <p className={`mt-1.5 text-xs ${coupon?.valid ? "text-sign-700" : "text-stop-600"}`}>
                {couponMsg}
              </p>
            )}
          </div>

          {/* Totals */}
          <dl className="mt-5 space-y-2.5 border-t border-ink-100 pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-500">{selectedPkg ? `${selectedPkg.name} package` : "Package"}</dt>
              <dd className="hud-num text-ink-900">${base.toFixed(2)}</dd>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sign-700">
                <dt>Discount ({coupon.code})</dt>
                <dd className="hud-num">−${discount.toFixed(2)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-ink-500">HST (13%)</dt>
              <dd className="hud-num text-ink-900">${tax.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between border-t border-ink-100 pt-3">
              <dt className="font-semibold text-ink-900">Total</dt>
              <dd className="hud-num text-lg font-extrabold text-sign-700">${total.toFixed(2)} CAD</dd>
            </div>
          </dl>

          {/* Payment method */}
          <div className="mt-6">
            <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-ink-500">
              Payment method
            </span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "etransfer", label: "E-Transfer", icon: "mail" },
                { id: "paypal", label: "PayPal", icon: "tag" },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, method: m.id }))}
                  className={`flex items-center justify-center gap-2 rounded-xl border-2 px-3 py-3 text-sm font-medium transition-colors ${
                    form.method === m.id
                      ? "border-sign-500 bg-sign-700/10 text-sign-800"
                      : "border-ink-200 bg-white text-ink-700 hover:border-ink-500/40"
                  }`}
                >
                  <Icon name={m.icon} className="h-4 w-4" />
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action */}
          <div className="mt-5">
            {!formValid && (
              <p className="mb-3 text-center text-xs text-ink-500">
                Complete the required fields and accept the School Policy to continue.
              </p>
            )}
            {form.method === "paypal" ? (
              <PayPalButton
                amount={total}
                disabled={!formValid || total <= 0}
                onApprove={(detail) => submitRegistration({ method: "paypal", detail })}
              />
            ) : (
              <button
                type="button"
                onClick={onEtransferSubmit}
                disabled={status === "loading"}
                className="btn-primary w-full text-base disabled:opacity-70"
              >
                {status === "loading" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Registering…
                  </>
                ) : (
                  <>
                    Register & pay by e-transfer
                    <Icon name="arrow" className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-ink-500">
            <Icon name="shield" className="h-3.5 w-3.5 text-sign-700" />
            Secure registration · installment plans available
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RegistrationForm() {
  return (
    <Suspense fallback={<div className="card p-8" />}>
      <RegistrationFormInner />
    </Suspense>
  );
}
