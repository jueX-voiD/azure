import { defineField, defineType } from "sanity";

// Singleton: the headings and hero on the Projects page.
export const projectsPage = defineType({
  name: "projectsPage",
  title: "Projects page text",
  type: "document",
  fields: [
    defineField({
      name: "heroHeading",
      title: "Top heading",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroImage",
      title: "Top image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "residentialHeading",
      title: "Residential section: heading",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "residentialSubheading",
      title: "Residential section: line under heading",
      type: "string",
    }),
    defineField({
      name: "villaHeading",
      title: "Villas section: heading",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "villaSubheading",
      title: "Villas section: line under heading",
      type: "string",
    }),
  ],
  preview: { prepare: () => ({ title: "Projects page text" }) },
});
