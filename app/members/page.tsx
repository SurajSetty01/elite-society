import { brandSerif } from "@/app/fonts";

export default function MembersPage() {
  return (
    <main className="min-h-[calc(100vh-7.5rem)] pb-20 pt-12">
      <section className="site-shell grid min-h-[calc(100vh-13rem)] items-center gap-10 rounded-[2rem] border border-[#fffff0]/10 bg-[#fffff0]/[0.03] p-8 shadow-[0_24px_90px_rgba(12,9,10,0.42)] backdrop-blur sm:p-12 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.52fr)] lg:p-16">
        <div>
          <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[#fffff0]/48 sm:text-[0.7rem]">
            Members Area
          </p>

          <h1
            className={`${brandSerif.className} mt-5 max-w-[58rem] text-4xl text-[#fffff0] sm:text-5xl lg:text-6xl`}
          >
            Reserved access.
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-[#fffff0]/62 sm:text-base">
            The protected member directory will live here once we wire in the
            access gate and curated profiles.
          </p>
        </div>

        <div className="hidden border-l border-[#fffff0]/10 pl-8 text-[0.58rem] uppercase tracking-[0.34em] text-[#fffff0]/34 lg:block">
          <p>Private directory</p>
          <p className="mt-4">Curated profiles</p>
          <p className="mt-4">Member access</p>
        </div>
      </section>
    </main>
  );
}
