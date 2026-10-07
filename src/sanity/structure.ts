import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { CATEGORIES } from "./schemaTypes/building";

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
              ...CATEGORIES.map((c) =>
                orderableDocumentListDeskItem({
                  type: "building",
                  id: c.value,
                  title: c.listTitle,
                  filter: `_type == "building" && category == "${c.value}"`,
                  // Drag rows to reorder; the "+" starts a new building with the category already set.
                  createIntent: false,
                  menuItems: [
                    S.menuItem()
                      .title(`Add ${c.listTitle.toLowerCase()}`)
                      .intent({
                        type: "create",
                        params: {
                          type: "building",
                          template: `building-${c.value}`,
                        },
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
