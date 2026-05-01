"use client";

import { db } from "@/app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type SocialLink = {
  href: string;
  label: string;
};

type MemberProfile = {
  bio: string;
  category: string;
  id: string;
  imageUrl: string;
  name: string;
  socials: SocialLink[];
};

type RawMember = {
  bio?: unknown;
  category?: unknown;
  imageUrl?: unknown;
  instagram?: unknown;
  linkedin?: unknown;
  name?: unknown;
  socialLinks?: unknown;
  socials?: unknown;
  tag?: unknown;
  website?: unknown;
};

function readText(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function addSocialLink(links: SocialLink[], label: string, value: unknown) {
  const href = readText(value);

  if (!href) {
    return;
  }

  links.push({ href, label });
}

function readSocials(data: RawMember) {
  const links: SocialLink[] = [];

  addSocialLink(links, "Instagram", data.instagram);
  addSocialLink(links, "LinkedIn", data.linkedin);
  addSocialLink(links, "Website", data.website);

  if (Array.isArray(data.socialLinks)) {
    data.socialLinks.forEach((link, index) => {
      if (typeof link === "string") {
        addSocialLink(links, `Link ${index + 1}`, link);
        return;
      }

      if (link && typeof link === "object") {
        const item = link as { href?: unknown; label?: unknown; url?: unknown };
        const label = readText(item.label, `Link ${index + 1}`);

        addSocialLink(links, label, item.href ?? item.url);
      }
    });
  }

  if (data.socials && typeof data.socials === "object" && !Array.isArray(data.socials)) {
    Object.entries(data.socials as Record<string, unknown>).forEach(
      ([label, href]) => {
        addSocialLink(links, label, href);
      },
    );
  }

  return links;
}

function normalizeMember(id: string, data: RawMember): MemberProfile {
  return {
    bio: readText(data.bio, "Profile details will be shared privately."),
    category: readText(data.category, readText(data.tag, "Member")),
    id,
    imageUrl: readText(data.imageUrl),
    name: readText(data.name, "Private Member"),
    socials: readSocials(data),
  };
}

export function MembersDirectory() {
  const [members, setMembers] = useState<MemberProfile[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function loadMembers() {
      setIsLoading(true);
      setError("");

      try {
        const snapshot = await getDocs(collection(db, "members"));
        const nextMembers = snapshot.docs
          .map((memberDoc) =>
            normalizeMember(memberDoc.id, memberDoc.data() as RawMember),
          )
          .sort((firstMember, secondMember) =>
            firstMember.name.localeCompare(secondMember.name),
          );

        if (isActive) {
          setMembers(nextMembers);
        }
      } catch (loadError) {
        console.error("Error loading members:", loadError);

        if (isActive) {
          setError("The private directory could not be loaded.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadMembers();

    return () => {
      isActive = false;
    };
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(members.map((member) => member.category)))],
    [members],
  );

  const filteredMembers = useMemo(() => {
    if (activeCategory === "All") {
      return members;
    }

    return members.filter((member) => member.category === activeCategory);
  }, [activeCategory, members]);

  return (
    <div className="mt-10">
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={[
                "rounded-full border px-4 py-2 text-[0.58rem] font-medium uppercase tracking-[0.28em] transition-all duration-300",
                isActive
                  ? "border-[#fffff0] bg-[#fffff0] text-[#0c090a]"
                  : "border-[#fffff0]/14 bg-[#fffff0]/[0.03] text-[#fffff0]/56 hover:border-[#fffff0] hover:text-[#fffff0]",
              ].join(" ")}
            >
              {category}
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="min-h-[30rem] animate-pulse rounded-[1.6rem] border border-[#fffff0]/10 bg-[#fffff0]/[0.035]"
            />
          ))}
        </div>
      ) : null}

      {error ? (
        <p className="mt-8 rounded-[1.2rem] border border-[#d9c08c]/20 bg-[#d9c08c]/10 px-5 py-4 text-sm leading-6 text-[#d9c08c]">
          {error}
        </p>
      ) : null}

      {!isLoading && !error && filteredMembers.length === 0 ? (
        <p className="mt-8 rounded-[1.2rem] border border-[#fffff0]/10 bg-[#fffff0]/[0.03] px-5 py-4 text-sm leading-6 text-[#fffff0]/56">
          No member profiles are available for this category yet.
        </p>
      ) : null}

      {!isLoading && !error && filteredMembers.length > 0 ? (
        <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredMembers.map((member) => (
            <article
              key={member.id}
              className="overflow-hidden rounded-[1.6rem] border border-[#fffff0]/10 bg-[#fffff0]/[0.03] shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-sm"
            >
              <div className="relative aspect-[4/5] bg-[#fffff0]/[0.04]">
                {member.imageUrl ? (
                  <Image
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 92vw, (max-width: 1280px) 45vw, 30vw"
                    src={member.imageUrl}
                    className="object-cover grayscale brightness-[0.78] contrast-110"
                  />
                ) : (
                  <div className="grid h-full place-items-center text-5xl text-[#fffff0]/28">
                    {member.name.slice(0, 1)}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c090a] via-[#0c090a]/10 to-transparent" />
                <p className="absolute bottom-5 left-5 rounded-full border border-[#fffff0]/16 bg-[#0c090a]/66 px-3 py-1 text-[0.52rem] uppercase tracking-[0.26em] text-[#fffff0]/72 backdrop-blur">
                  {member.category}
                </p>
              </div>

              <div className="p-5 sm:p-6">
                <h2 className="text-2xl leading-tight text-[#fffff0]">
                  {member.name}
                </h2>

                <p className="mt-3 min-h-20 text-sm leading-7 text-[#fffff0]/58">
                  {member.bio}
                </p>

                {member.socials.length > 0 ? (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {member.socials.map((social) => (
                      <a
                        key={`${member.id}-${social.label}-${social.href}`}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[0.58rem] uppercase tracking-[0.26em] text-[#d9c08c]/78 transition-colors duration-300 hover:text-[#fffff0]"
                      >
                        {social.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
}
