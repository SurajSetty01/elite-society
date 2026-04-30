import Link from "next/link";

import { brandSerif } from "@/app/fonts";

export default function GalleryPage() {
  return (
    <main className="min-h-[calc(100svh-7.5rem)] pb-20 pt-12">
      <section className="site-shell grid min-h-[calc(100svh-13rem)] items-center gap-10 rounded-[2rem] border border-[#fffff0]/10 bg-[#fffff0]/[0.03] p-8 backdrop-blur-sm sm:p-12 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.55fr)] lg:p-16">
        <div>
          <p className="text-[0.58rem] uppercase tracking-[0.38em] text-[#fffff0]/38">
            Gallery
          </p>

          <h1
            className={`${brandSerif.className} mt-5 max-w-[62rem] text-4xl leading-[0.96] text-[#fffff0] sm:text-5xl lg:text-6xl`}
          >
            The full society gallery opens here next.
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-[#fffff0]/56 sm:text-base sm:leading-8">
            This page is reserved for the complete archive of travels, hosted
            events, and membership moments.
          </p>

          <div className="mt-9">
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-[#fffff0] bg-[#fffff0] px-6 py-3 text-[0.62rem] font-medium uppercase tracking-[0.32em] text-[#0c090a] transition-all duration-300 hover:bg-transparent hover:text-[#fffff0]"
            >
              Return Home
            </Link>
          </div>
        </div>

        <div className="hidden border-l border-[#fffff0]/10 pl-8 text-[0.58rem] uppercase tracking-[0.34em] text-[#fffff0]/34 lg:block">
          <p>Private dinners</p>
          <p className="mt-4">Coastal weekends</p>
          <p className="mt-4">Hosted receptions</p>
        </div>
      </section>
    </main>
  );
}
