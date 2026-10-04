import { defineArrayMember, defineField, defineType } from "sanity";
import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { AmenityPicker } from "../components/AmenityPicker";

export const CATEGORIES = [
  { title: "Residential", value: "residential" },
  { title: "Villa", value: "villa" },
  { title: "Commercial", value: "commercial" },
];

// One building on the Projects page. Category decides which section it appears in.
export const building = defineType({
  name: "building",
  title: "Building",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "building", newItemPosition: "after" }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description:
        "Residential: tabs. Villa: cards. Commercial: large feature block.",
      options: { list: CATEGORIES, layout: "radio", direction: "horizontal" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tag line",
      type: "string",
      description: "The short line under the title.",
    }),
    defineField({
      name: "badge",
      title: "Badge (optional)",
      type: "string",
      description:
        'Small label next to the title, e.g. "Under Construction". Leave empty for none.',
      hidden: ({ document }) => document?.category !== "residential",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      description:
        "Upload one or more images. Drag to change the order; the first image is shown first.",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "string" }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      description: "Tick every amenity this building has.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "amenity" }] })],
      components: { input: AmenityPicker },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 12,
      description: "Leave a blank line between paragraphs.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "gallery.0" },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: CATEGORIES.find((c) => c.value === subtitle)?.title,
      media,
    }),
  },
});
