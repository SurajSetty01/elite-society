import { brandSerif } from "@/app/fonts";
import { MembersDirectory } from "@/components/members-directory";

export const dynamic = "force-dynamic";

export default function MembersPage() {
  return (
    <main className="min-h-[calc(100vh-7.5rem)] pb-24 pt-12">
      <section className="site-shell-wide">
        <div className="grid gap-10 rounded-[2rem] border border-[#fffff0]/10 bg-[#fffff0]/[0.03] p-7 shadow-[0_24px_90px_rgba(12,9,10,0.42)] backdrop-blur sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.38fr)] lg:p-14">
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[#fffff0]/48 sm:text-[0.7rem]">
              Members Area
            </p>

            <h1
              className={`${brandSerif.className} mt-5 max-w-[58rem] text-4xl text-[#fffff0] sm:text-5xl lg:text-6xl`}
            >
              Reserved access.
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#fffff0]/62 sm:text-base">
              A private directory of accepted profiles, shaped by discipline,
              influence, and relevance to the room.
            </p>
          </div>

          <div className="hidden border-l border-[#fffff0]/10 pl-8 text-[0.58rem] uppercase tracking-[0.34em] text-[#fffff0]/34 lg:block">
            <p>Private directory</p>
            <p className="mt-4">Curated profiles</p>
            <p className="mt-4">Member access</p>
          </div>
        </div>

        <MembersDirectory />
      </section>
    </main>
  );
}
