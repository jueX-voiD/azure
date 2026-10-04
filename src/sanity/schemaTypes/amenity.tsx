/* eslint-disable @next/next/no-img-element -- Studio preview thumbnail, not part of the public site */
import { defineField, defineType } from "sanity";
import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";

// The library of amenities (with icons) that can be ticked on any building.
export const amenity = defineType({
  name: "amenity",
  title: "Amenity",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "amenity" }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description:
        "Shown as the icon's alt text and in the picker, e.g. Ample Parking.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon (SVG file)",
      type: "file",
      description:
        "Upload the SVG icon. The label under the icon is part of the SVG itself.",
      options: { accept: ".svg,image/svg+xml" },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "name", iconUrl: "icon.asset.url" },
    prepare: ({ title, iconUrl }) => ({
      title,
      media: iconUrl ? (
        <img
          src={iconUrl}
          alt=""
          style={{ objectFit: "contain", width: "100%", height: "100%" }}
        />
      ) : undefined,
    }),
  },
});
