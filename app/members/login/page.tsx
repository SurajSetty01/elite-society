import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { brandSerif } from "@/app/fonts";
import {
  isValidMemberSessionToken,
  memberSessionCookieName,
} from "@/app/lib/member-auth";
import { MemberAccessForm } from "@/components/member-access-form";

type MembersLoginPageProps = {
  searchParams: Promise<{
    next?: string;
  }>;
};

function getSafeNextPath(nextPath: string | undefined) {
  if (
    nextPath?.startsWith("/members") &&
    !nextPath.startsWith("/members/login")
  ) {
    return nextPath;
  }

  return "/members";
}

export default async function MembersLoginPage({
  searchParams,
}: MembersLoginPageProps) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(memberSessionCookieName)?.value;

  if (isValidMemberSessionToken(sessionToken)) {
    redirect("/members");
  }

  const params = await searchParams;
  const nextPath = getSafeNextPath(params.next);

  return (
    <main className="relative min-h-[calc(100vh-7.5rem)] overflow-hidden py-12 sm:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(217,192,140,0.12),transparent_34%),linear-gradient(135deg,rgba(255,255,240,0.035),transparent_28%)]"
      />

      <section className="site-shell relative grid min-h-[calc(100vh-13rem)] items-center">
        <div className="mx-auto w-full max-w-xl rounded-[2rem] border border-[#fffff0]/10 bg-[#fffff0]/[0.03] p-7 shadow-[0_24px_90px_rgba(12,9,10,0.42)] backdrop-blur sm:p-10">
          <p className="text-[0.58rem] uppercase tracking-[0.42em] text-[#d9c08c]/70 sm:text-[0.66rem]">
            Private access
          </p>

          <h1
            className={`${brandSerif.className} mt-5 text-4xl leading-[0.95] text-[#fffff0] sm:text-5xl`}
          >
            Members Area.
          </h1>

          <p className="mt-5 max-w-md text-sm leading-7 text-[#fffff0]/56 sm:text-base">
            Enter the shared access details to continue into the private
            directory.
          </p>

          <MemberAccessForm nextPath={nextPath} />
        </div>
      </section>
    </main>
  );
}
