import "server-only";
import { draftMode } from "next/headers";
import { client } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import { PROJECTS_QUERY, SANITY_TAGS } from "./queries";
import { COMMERCIAL, RESIDENTIAL, VILLAS, type RawProject } from "./projects";
import type { Amenity, GalleryImage, Project, ProjectsContent } from "./types";

// Defaults = the text currently on the live site. Used for any heading the client leaves empty.
const DEFAULTS = {
  heroHeading:
    "Our handpicked collection of serene residences, modern villas and vibrant commercial projects.",
  heroImage: {
    src: "/images/projects/Al-jaddaf.webp",
    w: 2480,
    h: 1184,
  } as GalleryImage,
  residentialHeading:
    "Experience peace and tranquility everyday with residential buildings.",
  residentialSubheading: "Comfortable space with modern sophistication",
  villaHeading:
    "Discover the height of Dubai living in our exclusive villa collection",
  villaSubheading: "Luxury living at it’s finest",
};

const titleCase = (file: string) =>
  file
    .replace(/\.svg$/, "")
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

// Local content (src/lib/projects.ts): what the site shows until Sanity is connected and seeded.
function fromLocal(p: RawProject, i: number): Project {
  return {
    id: `local-${i}-${p.title}`,
    title: p.title,
    subtitle: p.subtitle,
    status: p.status,
    images: p.images,
    amenities: p.amenities.map((f) => ({
      name: titleCase(f),
      icon: `/amenities/${f}`,
    })),
    body: p.body,
  };
}

function localContent(): ProjectsContent {
  return {
    hero: { heading: DEFAULTS.heroHeading, image: DEFAULTS.heroImage },
    residential: {
      heading: DEFAULTS.residentialHeading,
      subheading: DEFAULTS.residentialSubheading,
      items: RESIDENTIAL.map(fromLocal),
    },
    villa: {
      heading: DEFAULTS.villaHeading,
      subheading: DEFAULTS.villaSubheading,
      items: VILLAS.map(fromLocal),
    },
    commercial: [fromLocal(COMMERCIAL, 0)],
  };
}

type SanityBuilding = {
  _id: string;
  category: "residential" | "villa" | "commercial";
  title?: string;
  tagline?: string;
  badge?: string;
  description?: string;
  images?: {
    src: string | null;
    w: number | null;
    h: number | null;
    alt?: string;
  }[];
  amenities?: ({ name?: string; orderRank?: string; icon?: string } | null)[];
};

const paragraphs = (text?: string) =>
  (text ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);

function toProject(b: SanityBuilding): Project {
  const amenities = (b.amenities ?? [])
    .filter((a): a is { name: string; orderRank?: string; icon: string } =>
      Boolean(a?.name && a.icon),
    )
    .map<Amenity>((a) => ({ name: a.name, icon: a.icon }));
  const images = (b.images ?? [])
    .filter((i): i is { src: string; w: number; h: number; alt?: string } =>
      Boolean(i.src && i.w && i.h),
    )
    .map<GalleryImage>((i) => ({ src: i.src, w: i.w, h: i.h, alt: i.alt }));
  return {
    id: b._id,
    title: b.title ?? "",
    subtitle: b.tagline || undefined,
    status: b.badge || null,
    images,
    amenities,
    body: paragraphs(b.description),
  };
}

export async function getProjectsContent(): Promise<ProjectsContent> {
  if (!isSanityConfigured) return localContent();

  const { isEnabled } = await draftMode();
  try {
    const data = await client.fetch(
      PROJECTS_QUERY,
      {},
      isEnabled
        ? {
            perspective: "drafts",
            token: process.env.SANITY_API_READ_TOKEN,
            useCdn: false,
          }
        : { next: { tags: SANITY_TAGS } },
    );
    const buildings = (data.buildings ?? []) as unknown as SanityBuilding[];
    // Nothing in the dataset yet (before the seed script runs): keep showing the local content.
    if (!data.page && buildings.length === 0) return localContent();

    const pick = (c: SanityBuilding["category"]) =>
      buildings.filter((b) => b.category === c).map(toProject);
    const page = data.page;
    const heroImg = page?.heroImage;
    return {
      hero: {
        heading: page?.heroHeading || DEFAULTS.heroHeading,
        image: heroImg?.src
          ? { src: heroImg.src, w: heroImg.w ?? 2480, h: heroImg.h ?? 1184 }
          : DEFAULTS.heroImage,
      },
      residential: {
        heading: page?.residentialHeading || DEFAULTS.residentialHeading,
        subheading:
          page?.residentialSubheading || DEFAULTS.residentialSubheading,
        items: pick("residential"),
      },
      villa: {
        heading: page?.villaHeading || DEFAULTS.villaHeading,
        subheading: page?.villaSubheading || DEFAULTS.villaSubheading,
        items: pick("villa"),
      },
      commercial: pick("commercial"),
    };
  } catch (err) {
    console.error("Sanity fetch failed, using local content:", err);
    return localContent();
  }
}
