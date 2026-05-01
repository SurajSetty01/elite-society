import Link from "next/link";

import { brandSerif } from "@/app/fonts";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#0c090a]/72 backdrop-blur-xl">
      <nav
        aria-label="Primary"
        className="site-shell-wide flex flex-col gap-4 pb-4 pt-6 sm:flex-row sm:items-center sm:justify-between lg:pt-8"
      >
        <Link
          aria-label="Lite Society home"
          href="/"
          className="group inline-flex w-fit items-center gap-3 text-[#fffff0]/80 transition-colors duration-300 hover:text-[#fffff0]"
        >
          <span className="h-px w-8 bg-[#fffff0]/45 transition-all duration-300 group-hover:w-12 group-hover:bg-[#fffff0]" />
          <span
            className={`${brandSerif.className} text-[1rem] uppercase tracking-[0.24em] sm:text-[1.35rem] sm:tracking-[0.38em]`}
          >
            Lite Society
          </span>
        </Link>

        <Link
          href="/members/login"
          className="inline-flex w-fit items-center rounded-full border border-[#fffff0] bg-[#fffff0] px-5 py-3 text-[0.62rem] font-medium uppercase tracking-[0.34em] text-[#0c090a] transition-all duration-300 hover:bg-transparent hover:text-[#fffff0]"
        >
          Members Area
        </Link>
      </nav>

      <div className="site-shell-wide">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#fffff0]/16 to-transparent" />
      </div>
    </header>
  );
}
