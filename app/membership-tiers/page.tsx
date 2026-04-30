import Link from "next/link";

import { Reveal } from "@/components/reveal";

import { brandSerif } from "../fonts";

const membershipTiers = [
  {
    benefits: [
      "Private member circle and digital access",
      "Selective event invitations",
      "Priority consideration for future gatherings",
    ],
    name: "Salon",
    note: "For members entering the society through its core social rooms.",
  },
  {
    benefits: [
      "Everything within Salon",
      "Expanded access to dinners, hosted evenings, and travel moments",
      "Closer introductions across founder and creator circles",
    ],
    name: "House",
    note: "For members with stronger attendance, travel, and private room access.",
  },
  {
    benefits: [
      "Everything within House",
      "Concierge-style support and private coordination",
      "Bespoke access built around hosted experiences and discretion",
    ],
    name: "Patron",
    note: "For a smaller group with deeper access and more tailored handling.",
  },
] as const;

export default function MembershipTiersPage() {
  const applicationUrl = process.env.NEXT_PUBLIC_TYPEFORM_URL ?? "#";
  const hasApplicationUrl = applicationUrl !== "#";

  return (
    <main className="relative pb-24 pt-12 sm:pb-28">
      <section className="site-shell-wide">
        <Reveal>
          <div className="max-w-[72rem]">
            <div className="inline-flex rounded-full border border-[#fffff0]/10 bg-[#fffff0]/[0.03] px-4 py-2 text-[0.58rem] uppercase tracking-[0.38em] text-[#fffff0]/40 sm:text-[0.64rem]">
              Membership tiers
            </div>

            <h1
              className={`${brandSerif.className} mt-6 text-4xl leading-[0.95] text-[#fffff0] sm:text-6xl lg:text-[4.5rem] xl:text-[5.4rem]`}
            >
              Different levels of access, held to the same standard of
              discretion.
            </h1>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-[#fffff0]/58 sm:text-base sm:leading-8">
              Lite Society is structured in a small number of memberships so
              access can remain intentional. Benefits expand by tier, while
              entry remains curated at every level.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3 xl:gap-7">
          {membershipTiers.map((tier, index) => (
            <Reveal key={tier.name} delayMs={120 + index * 90}>
              <article className="flex h-full flex-col rounded-[1.9rem] border border-[#fffff0]/10 bg-[#fffff0]/[0.03] p-7 backdrop-blur-sm transition-colors duration-300 hover:bg-[#fffff0]/[0.05] sm:p-8">
                <p className="text-[0.56rem] uppercase tracking-[0.34em] text-[#fffff0]/34">
                  Membership tier
                </p>

                <h2
                  className={`${brandSerif.className} mt-4 text-[2.4rem] leading-none text-[#fffff0]`}
                >
                  {tier.name}
                </h2>

                <p className="mt-4 max-w-xs text-sm leading-7 text-[#fffff0]/56">
                  {tier.note}
                </p>

                <ul className="mt-8 space-y-3 text-sm leading-7 text-[#fffff0]/62">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-3">
                      <span className="mt-3 h-px w-4 shrink-0 bg-[#fffff0]/18" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={240}>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={applicationUrl}
              rel={hasApplicationUrl ? "noreferrer" : undefined}
              target={hasApplicationUrl ? "_blank" : undefined}
              className="inline-flex w-fit items-center rounded-full border border-[#fffff0] bg-[#fffff0] px-6 py-3 text-[0.62rem] font-medium uppercase tracking-[0.32em] text-[#0c090a] transition-all duration-300 hover:bg-transparent hover:text-[#fffff0]"
            >
              Apply for Membership
            </a>

            <Link
              href="/"
              className="inline-flex w-fit items-center rounded-full border border-[#fffff0]/14 bg-[#fffff0]/[0.03] px-6 py-3 text-[0.62rem] font-medium uppercase tracking-[0.32em] text-[#fffff0]/72 transition-all duration-300 hover:border-[#fffff0] hover:text-[#fffff0]"
            >
              Return Home
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
