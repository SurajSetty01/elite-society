"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export type GalleryCategory = {
  label: string;
  slug: string;
};

export type GalleryImage = {
  alt: string;
  categoryLabel: string;
  categorySlug: string;
  src: string;
  title: string;
};

type CinematicGalleryProps = {
  categories: readonly GalleryCategory[];
  images: readonly GalleryImage[];
};

const aspectClasses = [
  "aspect-[4/5]",
  "aspect-[5/4]",
  "aspect-[3/4]",
  "aspect-[4/3]",
] as const;

export function CinematicGallery({ categories, images }: CinematicGalleryProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredImages = useMemo(() => {
    if (activeCategory === "all") {
      return images;
    }

    return images.filter((image) => image.categorySlug === activeCategory);
  }, [activeCategory, images]);

  return (
    <section className="mt-12">
      <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
        <button
          type="button"
          onClick={() => setActiveCategory("all")}
          className={[
            "rounded-full border px-4 py-2 text-[0.58rem] font-medium uppercase tracking-[0.28em] transition-all duration-300",
            activeCategory === "all"
              ? "border-[#fffff0] bg-[#fffff0] text-[#0c090a]"
              : "border-[#fffff0]/14 bg-[#fffff0]/[0.03] text-[#fffff0]/56 hover:border-[#fffff0] hover:text-[#fffff0]",
          ].join(" ")}
        >
          All
        </button>

        {categories.map((category) => {
          const isActive = activeCategory === category.slug;

          return (
            <button
              key={category.slug}
              type="button"
              onClick={() => setActiveCategory(category.slug)}
              className={[
                "rounded-full border px-4 py-2 text-[0.58rem] font-medium uppercase tracking-[0.28em] transition-all duration-300",
                isActive
                  ? "border-[#fffff0] bg-[#fffff0] text-[#0c090a]"
                  : "border-[#fffff0]/14 bg-[#fffff0]/[0.03] text-[#fffff0]/56 hover:border-[#fffff0] hover:text-[#fffff0]",
              ].join(" ")}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      {filteredImages.length > 0 ? (
        <div className="mt-10 columns-1 gap-5 sm:columns-2 xl:columns-3">
          {filteredImages.map((image, index) => (
            <article
              key={image.src}
              className="group mb-5 break-inside-avoid overflow-hidden rounded-[1.4rem] border border-[#fffff0]/10 bg-[#fffff0]/[0.03] shadow-[0_22px_80px_rgba(0,0,0,0.26)]"
            >
              <div
                className={`relative ${aspectClasses[index % aspectClasses.length]} overflow-hidden`}
              >
                <Image
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1280px) 46vw, 31vw"
                  src={image.src}
                  className="object-cover grayscale brightness-[0.74] contrast-110 transition duration-[1200ms] ease-out group-hover:scale-[1.045] group-hover:grayscale-0 group-hover:brightness-[0.86]"
                />
                <div className="absolute inset-0 bg-[#0c090a]/22 transition-colors duration-700 group-hover:bg-[#0c090a]/8" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0c090a] via-[#0c090a]/78 to-transparent px-5 pb-5 pt-20">
                  <p className="text-[0.52rem] uppercase tracking-[0.32em] text-[#d9c08c]/72">
                    {image.categoryLabel}
                  </p>
                  <h2 className="mt-2 text-xl leading-tight text-[#fffff0] sm:text-2xl">
                    {image.title}
                  </h2>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-[1.4rem] border border-[#fffff0]/10 bg-[#fffff0]/[0.03] px-6 py-10 text-center">
          <p className="text-sm leading-7 text-[#fffff0]/54">
            The archive is being prepared.
          </p>
        </div>
      )}
    </section>
  );
}
