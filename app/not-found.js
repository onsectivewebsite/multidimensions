import Link from "next/link";
import Icon from "@/components/Icon";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-xl bg-sign-700 text-white shadow-sign">
        <Icon name="route" className="h-8 w-8" />
      </span>
      <p className="mt-6 hud-num font-display text-6xl font-extrabold text-ink-900">404</p>
      <h1 className="mt-2 font-display text-2xl font-bold text-ink-900">
        You've taken a wrong turn
      </h1>
      <p className="mt-2 max-w-md text-ink-600">
        The page you're looking for doesn't exist or has moved. Let's get you back
        on the road.
      </p>
      <Link href="/" className="btn-primary mt-8">
        <Icon name="arrow" className="h-4 w-4 rotate-180" />
        Back to home
      </Link>
    </section>
  );
}
