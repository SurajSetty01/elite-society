import Image from "next/image";
import Link from "next/link";

import { FaqAccordion } from "@/components/faq-accordion";
import { ManifestoSection } from "@/components/manifesto-section";
import { Reveal } from "@/components/reveal";

import { brandSerif } from "./fonts";

const heroVideoUrl =
  "https://videos.pexels.com/video-files/18149682/18149682-uhd_3840_2160_24fps.mp4";

const aboutImages = [
  {
    alt: "A glamorous woman seated in a vintage lounge.",
    className: "float-slow",
    sizes: "(max-width: 1024px) 86vw, 38vw",
    src: "https://images.pexels.com/photos/7299449/pexels-photo-7299449.jpeg?cs=srgb&dl=pexels-cottonbro-7299449.jpg&fm=jpg",
  },
  {
    alt: "A chandelier-lit black and white vintage room.",
    className: "float-reverse",
    sizes: "(max-width: 1024px) 72vw, 24vw",
    src: "https://images.pexels.com/photos/29808756/pexels-photo-29808756.jpeg?cs=srgb&dl=pexels-thecactusena-29808756.jpg&fm=jpg",
  },
  {
    alt: "A couple in a moody old-world lounge interior.",
    className: "",
    sizes: "(max-width: 1024px) 76vw, 26vw",
    src: "https://images.pexels.com/photos/7299452/pexels-photo-7299452.jpeg?cs=srgb&dl=pexels-cottonbro-7299452.jpg&fm=jpg",
  },
] as const;

const membershipPillars = [
  {
    body: "Members are discovered through taste, signal, and social gravity.",
    title: "Selective entry",
  },
  {
    body: "Introductions are quieter, more intentional, and built to travel well offline.",
    title: "Quiet access",
  },
  {
    body: "Founders, creators, and cultural figures meet in a room designed to stay curated.",
    title: "Curated proximity",
  },
] as const;

const membershipExperiences = [
  {
    description:
      "Private dinners, cultural evenings, and invitation-only gatherings designed for real conversation.",
    title: "Salon events",
  },
  {
    description:
      "City weekends, coastal escapes, and curated travel moments shared with people who move similarly.",
    title: "Travel circles",
  },
  {
    description:
      "Smaller inner rooms around industry, influence, and lifestyle so proximity feels relevant, not random.",
    title: "Exclusive communities",
  },
  {
    description:
      "Discreet introductions, concierge-style support, and bespoke access when the match is right.",
    title: "Bespoke services",
  },
] as const;

const membershipTiers = [
  {
    benefits: [
      "Access to Lite Society signature gatherings",
      "Personalized welcome kit",
      "Physical and digital membership card",
    ],
    description:
      "For those ready to step inside the society and experience its core moments.",
    name: "Signature",
    price: "€1,800 / year",
  },
  {
    benefits: [
      "Access to private community events",
      "Invitation to the private member circle",
      "Dedicated community manager support",
      "Concierge service",
    ],
    description:
      "For members looking to connect, collaborate, and move closer to the room.",
    name: "Inner Circle",
    price: "€6,000 / year",
  },
  {
    benefits: [
      "Everything within Inner Circle",
      "Concierge support for personalized planning",
      "Complimentary +1 for your first event",
      "€10,000 credit toward your first hosted experience",
    ],
    description:
      "For members seeking privileged access, seamless curation, and deeper impact.",
    name: "Legacy",
    price: "€15,000 / first year",
    secondaryPrice: "€6,000 / following years",
  },
] as const;

const galleryMoments = [
  {
    caption: "Private dinner",
    location: "Paris",
    sizes: "(max-width: 640px) 74vw, (max-width: 1024px) 42vw, 30vw",
    src: "https://images.pexels.com/photos/20013465/pexels-photo-20013465.jpeg?auto=compress&cs=tinysrgb&w=1600",
    widthClass: "w-[18rem] sm:w-[22rem] lg:w-[28rem]",
  },
  {
    caption: "Summer crossing",
    location: "Riviera",
    sizes: "(max-width: 640px) 56vw, (max-width: 1024px) 34vw, 22vw",
    src: "https://images.pexels.com/photos/15564493/pexels-photo-15564493.jpeg?auto=compress&cs=tinysrgb&w=1600",
    widthClass: "w-[14rem] sm:w-[17rem] lg:w-[21rem]",
  },
  {
    caption: "Hosted reception",
    location: "Mayfair",
    sizes: "(max-width: 640px) 68vw, (max-width: 1024px) 38vw, 26vw",
    src: "https://images.pexels.com/photos/30196892/pexels-photo-30196892.jpeg?auto=compress&cs=tinysrgb&w=1600",
    widthClass: "w-[16rem] sm:w-[20rem] lg:w-[24rem]",
  },
  {
    caption: "Estate retreat",
    location: "Côte d’Azur",
    sizes: "(max-width: 640px) 76vw, (max-width: 1024px) 44vw, 31vw",
    src: "https://images.pexels.com/photos/20798291/pexels-photo-20798291.jpeg?auto=compress&cs=tinysrgb&w=1600",
    widthClass: "w-[19rem] sm:w-[23rem] lg:w-[29rem]",
  },
  {
    caption: "Gallery evening",
    location: "Florence",
    sizes: "(max-width: 640px) 58vw, (max-width: 1024px) 34vw, 23vw",
    src: "https://images.pexels.com/photos/14827615/pexels-photo-14827615.jpeg?auto=compress&cs=tinysrgb&w=1600",
    widthClass: "w-[14.5rem] sm:w-[18rem] lg:w-[22rem]",
  },
] as const;

const faqs = [
  {
    answer:
      "Applications are best suited to founders, creators, executives, and socially visible individuals who value curated rooms, private experiences, and intentional connection.",
    question: "Who is the society designed for?",
  },
  {
    answer:
      "Prospective members apply through a private form, after which each submission is reviewed for fit, relevance, and the level of access most aligned with their profile.",
    question: "How does the membership application work?",
  },
  {
    answer:
      "Lite Society is structured in tiers, allowing access, event invitations, travel moments, and private handling to expand more intentionally rather than all at once.",
    question: "Are there different membership tiers?",
  },
  {
    answer:
      "The membership tiers page outlines the structure and benefits of each level. Final pricing, placement, and availability are still shared privately when relevant.",
    question: "Where can I review the tier details?",
  },
  {
    answer:
      "Some experiences may open to invited guests, though the majority of gatherings, circles, and benefits are reserved for members.",
    question: "Can guests attend without joining?",
  },
  {
    answer:
      "Programming is intentionally selective rather than constant. Events, dinners, and travel experiences are organized throughout the year as the calendar is curated.",
    question: "How often are events and trips arranged?",
  },
] as const;

const faqFeatureImage = {
  alt: "Illuminated palace hotel at night.",
  src: "https://images.pexels.com/photos/34995796/pexels-photo-34995796.jpeg?auto=compress&cs=tinysrgb&w=1600",
} as const;

export default function Home() {
  const applicationUrl = process.env.NEXT_PUBLIC_TYPEFORM_URL ?? "#";
  const hasApplicationUrl = applicationUrl !== "#";

  return (
    <main className="relative">
      <section className="relative min-h-[calc(100svh-7.5rem)] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <video
            aria-hidden="true"
            autoPlay
            className="h-full w-full object-cover opacity-40"
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source src={heroVideoUrl} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-[#0c090a]/52" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,240,0.08),transparent_34%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(12,9,10,0.22),rgba(12,9,10,0.88))]" />
        </div>

        <section className="relative mx-auto flex min-h-[calc(100svh-7.5rem)] max-w-5xl items-center justify-center px-6 pb-24 pt-14 text-center sm:px-10">
          <div className="max-w-3xl">
            <p className="text-[0.62rem] uppercase tracking-[0.48em] text-[#fffff0]/48 sm:text-[0.72rem]">
              Private membership. Curated access.
            </p>

            <h1
              className={`${brandSerif.className} mt-6 text-5xl leading-[0.9] text-[#fffff0] sm:text-7xl lg:text-[5.5rem]`}
            >
              A quieter room for people already seen.
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-[#fffff0]/62 sm:text-base sm:leading-8">
              A private society shaped around influence, discernment, and
              curated introductions.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-5">
              <a
                href={applicationUrl}
                rel={hasApplicationUrl ? "noreferrer" : undefined}
                target={hasApplicationUrl ? "_blank" : undefined}
                className="inline-flex items-center rounded-full border border-[#fffff0] bg-[#fffff0] px-7 py-3 text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[#0c090a] transition-all duration-300 hover:bg-transparent hover:text-[#fffff0]"
              >
                Apply for Membership
              </a>

              <a
                href="#manifesto"
                className="inline-flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.35em] text-[#fffff0]/56 transition-colors duration-300 hover:text-[#fffff0]"
              >
                <span className="h-px w-8 bg-[#fffff0]/30" />
                Discover the Society
              </a>
            </div>
          </div>
        </section>
      </section>

      <ManifestoSection />

      <section id="about" className="relative py-20 sm:py-24 lg:min-h-[100svh] lg:py-0">
        <div className="mx-auto flex max-w-7xl items-center px-6 sm:px-10 lg:min-h-[100svh] lg:px-14">
          <div className="grid w-full gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-20">
            <div className="order-2 lg:order-1">
              <Reveal className="relative">
                <div className="relative mx-auto h-[30rem] max-w-xl sm:h-[38rem] lg:h-[70vh] lg:max-h-[48rem] lg:max-w-none">
                  <div
                    className={`absolute inset-y-[10%] left-0 w-[63%] overflow-hidden rounded-[2rem] border border-[#fffff0]/10 bg-[#fffff0]/[0.03] ${aboutImages[0].className}`}
                  >
                    <div className="relative h-full overflow-hidden">
                      <Image
                        alt={aboutImages[0].alt}
                        fill
                        sizes={aboutImages[0].sizes}
                        src={aboutImages[0].src}
                        className="object-cover grayscale brightness-[0.72] contrast-110 transition-transform duration-[1800ms] hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#0c090a]/24" />
                    </div>
                  </div>

                  <div
                    className={`absolute right-0 top-0 w-[39%] overflow-hidden rounded-[1.75rem] border border-[#fffff0]/10 bg-[#fffff0]/[0.03] ${aboutImages[1].className}`}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        alt={aboutImages[1].alt}
                        fill
                        sizes={aboutImages[1].sizes}
                        src={aboutImages[1].src}
                        className="object-cover grayscale brightness-[0.8] contrast-110 transition-transform duration-[1800ms] hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#0c090a]/28" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 right-[4%] w-[46%] overflow-hidden rounded-[1.75rem] border border-[#fffff0]/10 bg-[#fffff0]/[0.03] backdrop-blur-sm">
                    <div className="relative aspect-[5/4] overflow-hidden">
                      <Image
                        alt={aboutImages[2].alt}
                        fill
                        sizes={aboutImages[2].sizes}
                        src={aboutImages[2].src}
                        className="object-cover grayscale brightness-[0.74] contrast-110 transition-transform duration-[1800ms] hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#0c090a]/42" />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0c090a] via-[#0c090a]/78 to-transparent px-4 pb-4 pt-14 sm:px-5 sm:pb-5">
                        <p className="text-[0.54rem] uppercase tracking-[0.34em] text-[#fffff0]/46">
                          Old-world rooms
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="order-1 lg:order-2 lg:pl-4">
              <Reveal>
                <div className="inline-flex rounded-full border border-[#fffff0]/10 bg-[#fffff0]/[0.03] px-4 py-2 text-[0.58rem] uppercase tracking-[0.38em] text-[#fffff0]/40 sm:text-[0.64rem]">
                  About Lite Society
                </div>

                <h2
                  className={`${brandSerif.className} mt-6 max-w-xl text-4xl leading-[0.95] text-[#fffff0] sm:text-5xl lg:text-6xl`}
                >
                  Designed for those who prefer doors that open quietly.
                </h2>

                <p className="mt-8 max-w-xl text-sm leading-7 text-[#fffff0]/62 sm:text-base sm:leading-8">
                  Lite Society is a private digital salon for people with
                  presence, taste, and momentum. It values discretion over
                  performance and curation over reach.
                </p>
              </Reveal>

              <div className="mt-10 space-y-5">
                {membershipPillars.map((pillar, index) => (
                  <Reveal key={pillar.title} delayMs={120 + index * 90}>
                    <article className="border-t border-[#fffff0]/10 pt-5">
                      <div className="flex items-start gap-4">
                        <p className="pt-1 text-[0.56rem] uppercase tracking-[0.35em] text-[#fffff0]/38">
                          0{index + 1}
                        </p>
                        <div>
                          <h3
                            className={`${brandSerif.className} text-[1.6rem] leading-none text-[#fffff0]`}
                          >
                            {pillar.title}
                          </h3>
                          <p className="mt-2 max-w-lg text-sm leading-7 text-[#fffff0]/56 sm:text-[0.96rem]">
                            {pillar.body}
                          </p>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="relative py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16">
            <div>
              <Reveal>
                <div className="inline-flex rounded-full border border-[#fffff0]/10 bg-[#fffff0]/[0.03] px-4 py-2 text-[0.58rem] uppercase tracking-[0.38em] text-[#fffff0]/40 sm:text-[0.64rem]">
                  Member experience
                </div>

                <h2
                  className={`${brandSerif.className} mt-6 max-w-lg text-4xl leading-[0.95] text-[#fffff0] sm:text-5xl lg:text-6xl`}
                >
                  What you’ll experience inside Lite Society.
                </h2>

                <p className="mt-8 max-w-lg text-sm leading-7 text-[#fffff0]/58 sm:text-base sm:leading-8">
                  Membership is designed to feel personal, elegant, and useful.
                  Every room, gathering, and introduction is meant to sharpen
                  access rather than dilute it.
                </p>
              </Reveal>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              {membershipExperiences.map((experience, index) => (
                <Reveal key={experience.title} delayMs={110 + index * 80}>
                  <article
                    className={`rounded-[1.75rem] border border-[#fffff0]/10 bg-[#fffff0]/[0.03] p-6 backdrop-blur-sm transition-colors duration-300 hover:bg-[#fffff0]/[0.05] sm:p-7 ${
                      index === 0 ? "sm:col-span-2" : ""
                    }`}
                  >
                    <div className="h-px w-10 bg-[#fffff0]/12" />

                    <h3
                      className={`${brandSerif.className} mt-5 text-[1.9rem] leading-none text-[#fffff0] sm:text-[2.1rem]`}
                    >
                      {experience.title}
                    </h3>

                    <p className="mt-4 max-w-md text-sm leading-7 text-[#fffff0]/56 sm:text-[0.96rem]">
                      {experience.description}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="membership-tiers" className="relative py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
            <Reveal>
              <div>
                <div className="inline-flex rounded-full border border-[#fffff0]/10 bg-[#fffff0]/[0.03] px-4 py-2 text-[0.58rem] uppercase tracking-[0.38em] text-[#fffff0]/40 sm:text-[0.64rem]">
                  Membership philosophy
                </div>

                <h2
                  className={`${brandSerif.className} mt-6 max-w-2xl text-4xl leading-[0.95] text-[#fffff0] sm:text-5xl lg:text-6xl`}
                >
                  More than access. A considered entrance into the scene.
                </h2>
              </div>
            </Reveal>

            <Reveal delayMs={120}>
              <div className="border-l border-[#fffff0]/12 pl-6 sm:pl-8">
                <p className="max-w-xl text-sm leading-7 text-[#fffff0]/58 sm:text-base sm:leading-8">
                  Each tier is designed for authentic, elevated proximity to
                  the people, rooms, and events that shape Lite Society. Entry
                  is never automatic. It is considered by fit, signal, and
                  connection.
                </p>

                <div className="mt-8 grid gap-3 text-[0.58rem] uppercase tracking-[0.34em] text-[#fffff0]/40 sm:grid-cols-3">
                  {membershipTiers.map((tier, index) => (
                    <p key={tier.name}>
                      0{index + 1} {tier.name}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {membershipTiers.map((tier, index) => (
              <Reveal key={tier.name} delayMs={120 + index * 90}>
                <article
                  className={`group flex h-full flex-col border border-[#fffff0]/10 bg-[#fffff0]/[0.03] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-[#fffff0]/[0.055] sm:p-7 ${
                    index === 1
                      ? "rounded-[1.9rem] lg:-mt-6 lg:min-h-[34rem]"
                      : "rounded-[1.6rem] lg:mt-8"
                  }`}
                >
                  <div className="flex items-start justify-between gap-5">
                    <p className="text-[0.56rem] uppercase tracking-[0.34em] text-[#fffff0]/34">
                      Tier 0{index + 1}
                    </p>
                    {index === 1 ? (
                      <p className="rounded-full border border-white bg-white px-3 py-1 text-[0.52rem] uppercase tracking-[0.24em] text-black">
                      Preferred
                      </p>
                    ) : null}
                  </div>

                  <h3
                    className={`${brandSerif.className} mt-5 text-[2.35rem] leading-none text-[#fffff0] sm:text-[2.75rem]`}
                  >
                    {tier.name}
                  </h3>

                  <div className="mt-5 border-y border-[#fffff0]/10 py-5">
                    <p className="text-sm font-medium uppercase tracking-[0.26em] text-[#fffff0]">
                      {tier.price}
                    </p>
                    {"secondaryPrice" in tier ? (
                      <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[#fffff0]/40">
                        {tier.secondaryPrice}
                      </p>
                    ) : null}
                  </div>

                  <ul className="mt-7 space-y-3 text-sm leading-7 text-[#fffff0]/62">
                    {tier.benefits.map((benefit) => (
                      <li key={benefit} className="flex gap-3">
                        <span className="mt-3 h-px w-4 shrink-0 bg-[#fffff0]/18 transition-colors duration-300 group-hover:bg-[#fffff0]/38" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-auto pt-8 text-sm leading-7 text-[#fffff0]/50">
                    {tier.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delayMs={280}>
            <div className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-[#fffff0]/10 pt-7 sm:flex-row sm:items-center">
              <p className="max-w-2xl text-sm leading-7 text-[#fffff0]/46">
                Placement is reviewed after application. Availability may vary
                by city, calendar, and the level of access requested.
              </p>

          <Link
            href="/membership-tiers"
            className="inline-flex w-fit items-center rounded-full border border-[#fffff0] bg-[#fffff0] px-5 py-3 text-[0.62rem] font-medium uppercase tracking-[0.34em] text-[#0c090a] transition-all duration-300 hover:bg-transparent hover:text-[#fffff0]"
            >
            Explore Tiers
          </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="gallery" className="relative pb-24 pt-4 sm:pb-28 lg:pb-32">
        <div className="mx-auto max-w-5xl px-6 text-center sm:px-10">
          <Reveal>
            <div className="inline-flex rounded-full border border-[#fffff0]/10 bg-[#fffff0]/[0.03] px-4 py-2 text-[0.58rem] uppercase tracking-[0.38em] text-[#fffff0]/40 sm:text-[0.64rem]">
              Travel and events
            </div>

            <h2
              className={`${brandSerif.className} mx-auto mt-6 max-w-4xl text-4xl leading-[0.95] text-[#fffff0] sm:text-5xl lg:text-6xl`}
            >
              A ledger of where the society gathers, travels, and hosts.
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-[#fffff0]/58 sm:text-base sm:leading-8">
              From private dinners and city receptions to coastal weekends and
              quiet retreats, the gallery traces the atmosphere around the
              membership.
            </p>

            <div className="mt-9">
              <Link
                href="/gallery"
                className="inline-flex items-center rounded-full border border-[#fffff0] bg-[#fffff0] px-6 py-3 text-[0.62rem] font-medium uppercase tracking-[0.32em] text-[#0c090a] transition-all duration-300 hover:bg-transparent hover:text-[#fffff0]"
              >
                View Gallery
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 sm:mt-12">
          <div className="gallery-marquee" id="society-gallery-carousel">
            <div className="gallery-marquee-track px-6 sm:px-10 lg:px-14">
              {[0, 1].map((copyIndex) => (
                <div
                  key={copyIndex}
                  aria-hidden={copyIndex === 1}
                  className="gallery-marquee-set"
                >
                  {galleryMoments.map((moment) => (
                    <article
                      key={`${copyIndex}-${moment.caption}-${moment.location}`}
                      className={`group relative ${moment.widthClass} shrink-0 overflow-hidden rounded-[1.8rem] border border-[#fffff0]/10 bg-[#fffff0]/[0.03]`}
                    >
                      <div className="relative h-[15rem] sm:h-[18rem] lg:h-[21rem]">
                        <Image
                          alt={`${moment.caption} in ${moment.location}`}
                          fill
                          sizes={moment.sizes}
                          src={moment.src}
                          className="object-cover grayscale brightness-[0.76] contrast-110 transition-transform duration-[2200ms] group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-[#0c090a]/36 transition-colors duration-500 group-hover:bg-[#0c090a]/28" />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0c090a] via-[#0c090a]/84 to-transparent px-5 pb-5 pt-14 sm:px-6 sm:pb-6">
                          <p className="text-[0.52rem] uppercase tracking-[0.34em] text-[#fffff0]/38">
                            {moment.location}
                          </p>
                          <p
                            className={`${brandSerif.className} mt-2 text-[1.4rem] leading-none text-[#fffff0] sm:text-[1.7rem]`}
                          >
                            {moment.caption}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-5 max-w-3xl px-6 text-center sm:px-10">
            <p className="text-[0.56rem] uppercase tracking-[0.34em] text-[#fffff0]/34">
              Selected moments from hosted dinners, coastal passages, and quiet
              weekends away.
            </p>
          </div>
        </div>
      </section>

      <section id="faq" className="relative pb-24 sm:pb-28 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:gap-16">
            <div className="lg:sticky lg:top-24">
              <Reveal>
                <div className="overflow-hidden rounded-[2rem] border border-[#fffff0]/10 bg-[#fffff0]/[0.03]">
                  <div className="relative aspect-[4/4.25] overflow-hidden">
                    <Image
                      alt={faqFeatureImage.alt}
                      fill
                      sizes="(max-width: 1024px) 90vw, 42vw"
                      src={faqFeatureImage.src}
                      className="object-cover grayscale brightness-[0.72] contrast-110"
                    />
                    <div className="absolute inset-0 bg-[#0c090a]/30" />
                    <div className="absolute inset-x-0 top-0 p-6 sm:p-7">
                      <div className="inline-flex rounded-full border border-[#fffff0]/10 bg-[#0c090a]/58 px-4 py-2 text-[0.58rem] uppercase tracking-[0.38em] text-[#fffff0]/78 backdrop-blur-sm sm:text-[0.64rem]">
                        FAQs
                      </div>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0c090a] via-[#0c090a]/88 to-transparent px-6 pb-6 pt-24 sm:px-7 sm:pb-7">
                      <h2
                        className={`${brandSerif.className} max-w-md text-4xl leading-[0.95] text-[#fffff0] sm:text-5xl`}
                      >
                        Frequently asked questions.
                      </h2>

                      <p className="mt-5 max-w-md text-sm leading-7 text-[#fffff0]/58 sm:text-[0.96rem]">
                        A quieter read on membership, access, and how the
                        society is intentionally assembled.
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-[#fffff0]/10 bg-[#0c090a]/92 p-5 text-[#fffff0] backdrop-blur-sm sm:p-6">
                    <p className="text-[0.54rem] uppercase tracking-[0.34em] text-[#fffff0]/42">
                      Private inquiries
                    </p>
                    <p
                      className={`${brandSerif.className} mt-3 max-w-sm text-[1.3rem] leading-tight sm:text-[1.4rem]`}
                    >
                      Questions before applying can remain discreet.
                    </p>
                    <div className="mt-5">
                      <a
                        href={applicationUrl}
                        rel={hasApplicationUrl ? "noreferrer" : undefined}
                        target={hasApplicationUrl ? "_blank" : undefined}
                        className="inline-flex items-center rounded-full border border-[#fffff0]/70 bg-[#fffff0] px-5 py-3 text-[0.56rem] font-medium uppercase tracking-[0.32em] text-[#0c090a] transition-all duration-300 hover:bg-transparent hover:text-[#fffff0]"
                      >
                        Open Application
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="pt-1 lg:pt-6">
              <Reveal delayMs={80}>
                <FaqAccordion items={faqs} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
