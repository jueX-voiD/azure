// One-time migration: copies the current site content (src/lib/projects.ts, public/amenities, public/images/projects)
// into Sanity. Safe to re-run: documents use fixed ids and are replaced.
//
//   npm run seed:dry   -> prints what would be created (no credentials needed)
//   npm run seed       -> writes to Sanity (needs .env.local with the project id and SANITY_API_WRITE_TOKEN)
import { createReadStream, readdirSync } from "node:fs";
import { basename, join } from "node:path";
import { createClient } from "@sanity/client";
import { LexoRank } from "lexorank";
import { COMMERCIAL, RESIDENTIAL, VILLAS } from "../src/lib/projects.ts";

const DRY = process.argv.includes("--dry");
const root = join(import.meta.dirname, "..");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!DRY && (!projectId || !token)) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local",
  );
  process.exit(1);
}

const client = DRY
  ? null
  : createClient({
      projectId,
      dataset,
      token,
      apiVersion: "2025-10-01",
      useCdn: false,
    });

const titleCase = (file: string) =>
  file
    .replace(/\.svg$/, "")
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
const slug = (s: string) =>
  s
    .replace(/\.[a-z]+$/, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .toLowerCase();
const key = () => Math.random().toString(36).slice(2, 10);

// Same asset uploaded twice is de-duplicated by Sanity, but cache anyway.
const uploaded = new Map<string, string>();
async function upload(
  kind: "image" | "file",
  path: string,
  contentType: string,
): Promise<string> {
  const hit = uploaded.get(path);
  if (hit) return hit;
  let id = `dry:${basename(path)}`;
  if (client) {
    const asset = await client.assets.upload(kind, createReadStream(path), {
      filename: basename(path),
      contentType,
    });
    id = asset._id;
  }
  uploaded.set(path, id);
  return id;
}

const docs: Record<string, unknown>[] = [];

// ---- amenities: library order = order of first appearance across the buildings
const order: string[] = [];
for (const b of [...RESIDENTIAL, ...VILLAS, COMMERCIAL])
  for (const a of b.amenities) if (!order.includes(a)) order.push(a);
for (const f of readdirSync(join(root, "public/amenities")))
  if (f.endsWith(".svg") && !order.includes(f)) order.push(f);

let rank = LexoRank.min();
for (const file of order) {
  rank = rank.genNext().genNext();
  const asset = await upload(
    "file",
    join(root, "public/amenities", file),
    "image/svg+xml",
  );
  docs.push({
    _id: `amenity-${slug(file)}`,
    _type: "amenity",
    name: titleCase(file),
    orderRank: rank.toString(),
    icon: { _type: "file", asset: { _type: "reference", _ref: asset } },
  });
}

// ---- buildings
async function building(
  category: string,
  index: number,
  b: (typeof RESIDENTIAL)[number],
  rank: LexoRank,
) {
  const gallery = [];
  for (const img of b.images) {
    const asset = await upload(
      "image",
      join(root, "public", img.src),
      "image/webp",
    );
    gallery.push({
      _key: key(),
      _type: "image",
      asset: { _type: "reference", _ref: asset },
      alt: "",
    });
  }
  docs.push({
    _id: `building-${category}-${index + 1}`,
    _type: "building",
    category,
    title: b.title,
    tagline: b.subtitle,
    ...(b.status ? { badge: b.status } : {}),
    description: b.body.join("\n\n"),
    gallery,
    amenities: b.amenities.map((a) => ({
      _key: key(),
      _type: "reference",
      _ref: `amenity-${slug(a)}`,
    })),
    orderRank: rank.toString(),
  });
}

for (const [category, list] of [
  ["residential", RESIDENTIAL],
  ["villa", VILLAS],
  ["commercial", [COMMERCIAL]],
] as const) {
  let r = LexoRank.min();
  for (const [i, b] of list.entries()) {
    r = r.genNext().genNext();
    await building(category, i, b, r);
  }
}

// ---- Projects page text (singleton)
const heroAsset = await upload(
  "image",
  join(root, "public/images/projects/Al-jaddaf.webp"),
  "image/webp",
);
docs.push({
  _id: "projectsPage",
  _type: "projectsPage",
  heroHeading:
    "Our handpicked collection of serene residences, modern villas and vibrant commercial projects.",
  heroImage: { _type: "image", asset: { _type: "reference", _ref: heroAsset } },
  residentialHeading:
    "Experience peace and tranquility everyday with residential buildings.",
  residentialSubheading: "Comfortable space with modern sophistication",
  villaHeading:
    "Discover the height of Dubai living in our exclusive villa collection",
  villaSubheading: "Luxury living at it’s finest",
});

if (DRY) {
  const count = (t: string) => docs.filter((d) => d._type === t).length;
  console.log(
    `DRY RUN: ${count("amenity")} amenities, ${count("building")} buildings, ${count("projectsPage")} page doc, ${uploaded.size} assets`,
  );
  for (const d of docs.filter((d) => d._type === "building")) {
    const g = (d.gallery as unknown[]).length;
    const a = (d.amenities as unknown[]).length;
    console.log(
      `  ${d._id}: "${d.title}" | ${d.category} | ${g} images | ${a} amenities | badge=${d.badge ?? "-"}`,
    );
  }
} else {
  const tx = client!.transaction();
  for (const d of docs) tx.createOrReplace(d as never);
  await tx.commit();
  console.log(`Seeded ${docs.length} documents into ${projectId}/${dataset}.`);
}
