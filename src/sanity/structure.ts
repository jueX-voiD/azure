import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { icons } from "@sanity/icons";

const lists = [
  {
    id: "residential",
    title: "Residential buildings",
    category: "residential",
    template: "building-residential",
  },
  {
    id: "villa",
    title: "Villas",
    category: "villa",
    template: "building-villa",
  },
  {
    id: "commercial",
    title: "Commercial",
    category: "commercial",
    template: "building-commercial",
  },
] as const;

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Projects")
        .child(
          S.list()
            .title("Projects")
            .items([
              ...lists.map((l) =>
                orderableDocumentListDeskItem({
                  type: "building",
                  id: l.id,
                  title: l.title,
                  filter: `_type == "building" && category == "${l.category}"`,
                  // Drag rows to reorder; the "+" starts a new building with the category already set.
                  createIntent: false,
                  menuItems: [
                    S.menuItem()
                      .title(`Add ${l.title.toLowerCase()}`)
                      .icon(icons.add)
                      .intent({
                        type: "create",
                        params: { type: "building", template: l.template },
                      })
                      .showAsAction()
                      .serialize(),
                  ],
                  S,
                  context,
                }),
              ),
              S.divider(),
              orderableDocumentListDeskItem({
                type: "amenity",
                title: "Amenities (icons)",
                S,
                context,
              }),
              S.divider(),
              S.listItem()
                .title("Projects page text")
                .child(
                  S.document()
                    .schemaType("projectsPage")
                    .documentId("projectsPage"),
                ),
            ]),
        ),
    ]);
