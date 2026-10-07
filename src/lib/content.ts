import "server-only";
import { draftMode } from "next/headers";
import { client } from "@/sanity/lib/client";
import { PROJECTS_QUERY, SANITY_TAGS } from "./queries";
import type { Project, ProjectsContent } from "./types";

type Category = "residential" | "villa" | "commercial";
type Building = {
  _id: string;
  category: Category;
  title?: string;
  tagline?: string;
  badge?: string;
  description?: string;
  images: { src: string; w: number; h: number; alt?: string }[];
  amenities: { name: string; icon: string }[];
};
type Result = {
  page: {
    heroHeading?: string;
    heroImage?: { src: string; w: number; h: number };
    residentialHeading?: string;
    residentialSubheading?: string;
    villaHeading?: string;
    villaSubheading?: string;
  } | null;
  buildings: Building[];
};

// A blank line in the CMS description starts a new paragraph.
const paragraphs = (text = "") =>
  text
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);

const toProject = (b: Building): Project => ({
  id: b._id,
  title: b.title ?? "",
  subtitle: b.tagline || undefined,
  status: b.badge || null,
  images: b.images,
  amenities: b.amenities,
  body: paragraphs(b.description),
});

export async function getProjectsContent(): Promise<ProjectsContent> {
  const { isEnabled } = await draftMode();
  const { page, buildings } = await client.fetch<Result>(
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
  const pick = (c: Category) =>
    buildings.filter((b) => b.category === c).map(toProject);

  return {
    hero: {
      heading:
        page?.heroHeading ||
        "Our handpicked collection of serene residences, modern villas and vibrant commercial projects.",
      image: page?.heroImage ?? {
        src: "/images/projects/Al-jaddaf.webp",
        w: 2480,
        h: 1184,
      },
    },
    residential: {
      heading:
        page?.residentialHeading ||
        "Experience peace and tranquility everyday with residential buildings.",
      subheading:
        page?.residentialSubheading ||
        "Comfortable space with modern sophistication",
      items: pick("residential"),
    },
    villa: {
      heading:
        page?.villaHeading ||
        "Discover the height of Dubai living in our exclusive villa collection",
      subheading: page?.villaSubheading || "Luxury living at it’s finest",
      items: pick("villa"),
    },
    commercial: pick("commercial"),
  };
}
