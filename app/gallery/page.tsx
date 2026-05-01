import { readdir } from "node:fs/promises";
import { join } from "node:path";

import Image from "next/image";

import { brandSerif } from "@/app/fonts";
import {
  CinematicGallery,
  type GalleryCategory,
  type GalleryImage,
} from "@/components/cinematic-gallery";

const galleryCategories = [
  { folder: "gatherings", label: "Gatherings", slug: "gatherings" },
  { folder: "conversations", label: "Conversations", slug: "conversations" },
  { folder: "retreats", label: "Retreats", slug: "retreats" },
  {
    folder: "cultural-evenings",
    label: "Cultural Evenings",
    slug: "cultural-evenings",
  },
] as const;

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function getExtension(fileName: string) {
  const extensionStart = fileName.lastIndexOf(".");

  return extensionStart >= 0 ? fileName.slice(extensionStart).toLowerCase() : "";
}

function formatTitle(fileName: string) {
  const extensionStart = fileName.lastIndexOf(".");
  const name = extensionStart >= 0 ? fileName.slice(0, extensionStart) : fileName;

  return name
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join(" ");
}

async function loadGalleryImages() {
  const galleryRoot = join(process.cwd(), "public", "gallery");
  const categoryImages = await Promise.all(
    galleryCategories.map(async (category) => {
      try {
        const files = await readdir(join(galleryRoot, category.folder));

        return files
          .filter((fileName) => imageExtensions.has(getExtension(fileName)))
          .sort((firstFile, secondFile) => firstFile.localeCompare(secondFile))
          .map<GalleryImage>((fileName) => {
            const title = formatTitle(fileName);

            return {
              alt: `${title} in the Lite Society ${category.label.toLowerCase()} archive.`,
              categoryLabel: category.label,
              categorySlug: category.slug,
              src: `/gallery/${category.folder}/${fileName}`,
              title,
            };
          });
      } catch {
        return [];
      }
    }),
  );

  return categoryImages.flat();
}

export default async function GalleryPage() {
  const images = await loadGalleryImages();
  const categories: GalleryCategory[] = galleryCategories.map((category) => ({
    label: category.label,
    slug: category.slug,
  }));
  const heroImage = images[0];

  return (
    <main className="relative min-h-[calc(100svh-7.5rem)] overflow-hidden pb-24 pt-12 sm:pb-28 lg:pb-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_0%,rgba(217,192,140,0.12),transparent_32%),linear-gradient(135deg,rgba(255,255,240,0.035),transparent_28%)]"
      />

      <section className="site-shell-wide relative">
        <div className="grid min-h-[31rem] overflow-hidden rounded-[2rem] border border-[#fffff0]/10 bg-[#fffff0]/[0.03] shadow-[0_30px_110px_rgba(0,0,0,0.34)] backdrop-blur-sm lg:grid-cols-[minmax(0,0.84fr)_minmax(28rem,1.16fr)]">
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <p className="text-[0.58rem] uppercase tracking-[0.42em] text-[#d9c08c]/70 sm:text-[0.66rem]">
              Society archive
            </p>

            <h1
              className={`${brandSerif.className} mt-5 max-w-3xl text-4xl leading-[0.94] text-[#fffff0] sm:text-6xl lg:text-[4.8rem]`}
            >
              A cinematic record of rooms, retreats, and quiet evenings.
            </h1>

            <p className="mt-7 max-w-xl text-sm leading-7 text-[#fffff0]/58 sm:text-base sm:leading-8">
              Selected moments from the society’s private rhythm: gatherings,
              conversation, travel, and cultural evenings held with restraint.
            </p>
          </div>

          <div className="relative min-h-[22rem] lg:min-h-full">
            {heroImage ? (
              <Image
                alt={heroImage.alt}
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 52vw"
                src={heroImage.src}
                className="object-cover grayscale brightness-[0.74] contrast-110"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c090a] via-[#0c090a]/28 to-transparent lg:bg-gradient-to-r" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-6">
              <p className="max-w-xs text-[0.54rem] uppercase tracking-[0.34em] text-[#fffff0]/48">
                {images.length} local frames
              </p>
              <div className="hidden h-px w-24 bg-[#fffff0]/24 sm:block" />
            </div>
          </div>
        </div>

        <CinematicGallery categories={categories} images={images} />
      </section>
    </main>
  );
}
