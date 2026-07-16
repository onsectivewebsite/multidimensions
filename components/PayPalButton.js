"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const CURRENCY = "CAD";

let sdkPromise = null;
function loadPayPalSdk() {
  if (typeof window === "undefined") return Promise.reject();
  if (window.paypal) return Promise.resolve(window.paypal);
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&currency=${CURRENCY}&intent=capture`;
    s.onload = () => resolve(window.paypal);
    s.onerror = reject;
    document.body.appendChild(s);
  });
  return sdkPromise;
}

// Renders live PayPal Smart Buttons when NEXT_PUBLIC_PAYPAL_CLIENT_ID is set.
// Falls back to a clear "configure PayPal" note otherwise, so the page never breaks.
export default function PayPalButton({ amount, disabled, onApprove, onError }) {
  const containerRef = useRef(null);
  const [status, setStatus] = useState(CLIENT_ID ? "loading" : "unconfigured");
  const amountRef = useRef(amount);
  amountRef.current = amount;

  useEffect(() => {
    if (!CLIENT_ID) return;
    let buttons;
    let cancelled = false;

    loadPayPalSdk()
      .then((paypal) => {
        if (cancelled || !containerRef.current) return;
        containerRef.current.replaceChildren();
        buttons = paypal.Buttons({
          style: { layout: "vertical", color: "black", shape: "pill", label: "pay" },
          createOrder: (data, actions) =>
            actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: Number(amountRef.current).toFixed(2),
                    currency_code: CURRENCY,
                  },
                  description: "Multi-Dimensions Driving School — BDE registration",
                },
              ],
            }),
          onApprove: async (data, actions) => {
            const details = await actions.order.capture();
            onApprove?.(details);
          },
          onError: (err) => {
            setStatus("error");
            onError?.(err);
          },
        });
        return buttons.render(containerRef.current).then(() => setStatus("ready"));
      })
      .catch(() => setStatus("error"));

    return () => {
      cancelled = true;
      try {
        buttons?.close?.();
      } catch {}
    };
  }, [onApprove, onError]);

  if (status === "unconfigured") {
    return (
      <div className="rounded-xl border border-ink-200 bg-white p-4 text-center text-sm text-ink-500">
        <Icon name="tag" className="mx-auto h-5 w-5 text-sign-700" />
        <p className="mt-2 font-medium text-ink-600">PayPal checkout ready to connect</p>
        <p className="mt-1 text-xs">
          Add <code className="rounded bg-ink-100 px-1 py-0.5 font-mono text-sign-700">NEXT_PUBLIC_PAYPAL_CLIENT_ID</code>{" "}
          to enable live PayPal payments. You can still register now and pay by e-transfer.
        </p>
      </div>
    );
  }

  return (
    <div className={disabled ? "pointer-events-none opacity-50" : ""}>
      {status === "loading" && (
        <div className="flex items-center justify-center gap-2 rounded-xl border border-ink-200 bg-white py-4 text-sm text-ink-500">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-sign-700/40 border-t-sign-700" />
          Loading PayPal…
        </div>
      )}
      {status === "error" && (
        <p className="rounded-xl border border-stop-600/30 bg-stop-600/10 px-4 py-3 text-sm text-stop-600">
          PayPal couldn't load. Please pay by e-transfer or try again.
        </p>
      )}
      <div ref={containerRef} />
    </div>
  );
}
