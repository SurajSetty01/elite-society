import { brandSerif } from "@/app/fonts";

export default function MembersPage() {
  return (
    <main className="flex min-h-[calc(100vh-7.5rem)] items-center justify-center px-6 pb-20 pt-12 sm:px-10">
      <section className="w-full max-w-2xl rounded-[2rem] border border-[#fffff0]/10 bg-[#fffff0]/[0.03] p-10 text-center shadow-[0_24px_90px_rgba(12,9,10,0.42)] backdrop-blur">
        <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[#fffff0]/48 sm:text-[0.7rem]">
          Members Area
        </p>

        <h1
          className={`${brandSerif.className} mt-5 text-4xl text-[#fffff0] sm:text-5xl`}
        >
          Reserved access.
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#fffff0]/62 sm:text-base">
          The protected member directory will live here once we wire in the
          access gate and curated profiles.
        </p>
      </section>
    </main>
  );
}
