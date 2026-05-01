import Link from "next/link";

import { brandSerif } from "@/app/fonts";

const footerLinks = [
  { href: "/gallery", label: "Gallery" },
  { href: "/members/login", label: "Members Area" },
] as const;

const socialLinks = [
  { href: "#", label: "Instagram" },
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "X" },
] as const;

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-[#fffff0]/10 bg-[#080607]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#fffff0]/32 to-transparent" />
      <div className="pointer-events-none absolute -right-32 top-16 h-72 w-72 rounded-full border border-[#fffff0]/[0.04]" />
      <div className="pointer-events-none absolute bottom-10 left-8 h-36 w-36 rounded-full border border-[#fffff0]/[0.035]" />

      <div className="site-shell-wide py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(28rem,0.8fr)] lg:gap-16 xl:gap-24">
          <div>
            <Link
              aria-label="Lite Society home"
              href="/"
              className="group inline-flex items-center gap-4 text-[#fffff0] transition-colors duration-300"
            >
              <span className="h-px w-10 bg-[#fffff0]/46 transition-all duration-300 group-hover:w-14 group-hover:bg-[#fffff0]" />
              <span
                className={`${brandSerif.className} text-2xl uppercase tracking-[0.28em] sm:text-4xl`}
              >
                Lite Society
              </span>
            </Link>

            <p
              className={`${brandSerif.className} mt-8 max-w-[54rem] text-3xl leading-[1.04] text-[#fffff0] sm:text-5xl lg:text-[3.6rem] xl:text-[4.4rem]`}
            >
              The room is private. The invitation is intentional.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/apply"
                className="inline-flex w-fit items-center rounded-full border border-[#fffff0] bg-[#fffff0] px-6 py-3 text-[0.62rem] font-medium uppercase tracking-[0.32em] text-[#0c090a] transition-all duration-300 hover:bg-transparent hover:text-[#fffff0]"
              >
                Apply for Membership
              </Link>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="border-t border-[#fffff0]/10 pt-6">
              <p className="text-[0.58rem] uppercase tracking-[0.36em] text-[#fffff0]/34">
                Navigate
              </p>
              <div className="mt-5 flex flex-col items-start gap-3">
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-[#fffff0]/58 transition-colors duration-300 hover:text-[#fffff0]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-[#fffff0]/10 pt-6">
              <p className="text-[0.58rem] uppercase tracking-[0.36em] text-[#fffff0]/34">
                Social
              </p>
              <div className="mt-5 flex flex-col items-start gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-[#fffff0]/58 transition-colors duration-300 hover:text-[#fffff0]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-[#fffff0]/10 pt-6 sm:col-span-2">
              <p className="text-[0.58rem] uppercase tracking-[0.36em] text-[#fffff0]/34">
                Private correspondence
              </p>
              <div className="mt-5 grid gap-3 text-sm text-[#fffff0]/58 sm:grid-cols-2">
                <a
                  href="mailto:inquiries@litesociety.com"
                  className="transition-colors duration-300 hover:text-[#fffff0]"
                >
                  inquiries@litesociety.com
                </a>
                <a
                  href="mailto:members@litesociety.com"
                  className="transition-colors duration-300 hover:text-[#fffff0]"
                >
                  members@litesociety.com
                </a>
              </div>
              <p className="mt-5 max-w-md text-xs leading-6 text-[#fffff0]/34">
                Membership inquiries are reviewed discreetly. Response windows
                vary by fit and availability.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#fffff0]/10">
        <div className="site-shell-wide flex flex-col gap-5 py-6 text-[0.62rem] uppercase tracking-[0.24em] text-[#fffff0]/28 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Lite Society. Private & confidential.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="transition-colors duration-300 hover:text-[#fffff0]/62"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
