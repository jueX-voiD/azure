import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool, defineLocations } from "sanity/presentation";
import { dataset, projectId } from "./src/sanity/env";
import { schemaTypes, singletonTypes } from "./src/sanity/schemaTypes";
import { CATEGORIES } from "./src/sanity/schemaTypes/building";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "azure",
  title: "Azure Properties",
  basePath: "/studio",
  projectId: projectId || "unconfigured",
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) => [
      // Singletons are edited in place; don't offer them as "new document" templates.
      ...templates.filter(
        ({ schemaType }) => !singletonTypes.includes(schemaType),
      ),
      ...CATEGORIES.map((c) => ({
        id: `building-${c.value}`,
        title: `${c.title}${c.value === "villa" ? "" : " building"}`,
        schemaType: "building",
        value: { category: c.value },
      })),
    ],
  },
  document: {
    actions: (prev, { schemaType }) =>
      singletonTypes.includes(schemaType)
        ? prev.filter(
            ({ action }) =>
              action && !["unpublish", "delete", "duplicate"].includes(action),
          )
        : prev,
  },
  plugins: [
    structureTool({ structure }),
    // Live preview of drafts on the real site (Draft mode, see /api/draft-mode/enable).
    presentationTool({
      previewUrl: { previewMode: { enable: "/api/draft-mode/enable" } },
      resolve: {
        locations: {
          building: defineLocations({
            select: { title: "title" },
            resolve: (doc) => ({
              locations: [
                { title: doc?.title || "Projects", href: "/projects" },
              ],
            }),
          }),
          projectsPage: defineLocations({
            locations: [{ title: "Projects", href: "/projects" }],
          }),
        },
      },
    }),
  ],
});
