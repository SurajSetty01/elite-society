import type { Metadata } from "next";

import { MembershipApplicationForm } from "@/components/membership-application-form";

import { brandSerif } from "../fonts";

export const metadata: Metadata = {
  title: "Apply | Lite Society",
  description: "Private membership application for Lite Society.",
};

export default function ApplyPage() {
  return (
    <main className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(217,192,140,0.11),transparent_30%),linear-gradient(135deg,rgba(255,255,240,0.035),transparent_28%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9c08c]/42 to-transparent"
      />

      <section className="site-shell relative">
        <MembershipApplicationForm brandSerifClassName={brandSerif.className} />
      </section>
    </main>
  );
}
