import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
  // Do not inherit the home page's canonical URL.
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <main className="wrap notfound">
      <p className="meta">404</p>
      <h1 className="display">Page not found</h1>
      <p className="lead">There is nothing at this address. The portfolio is one page, and it is a link away.</p>
      <Link href="/" className="link">
        Back to the portfolio
      </Link>
    </main>
  );
}
