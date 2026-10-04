import type { SchemaTypeDefinition } from "sanity";
import { amenity } from "./amenity";
import { building } from "./building";
import { projectsPage } from "./projectsPage";

export const schemaTypes: SchemaTypeDefinition[] = [
  building,
  amenity,
  projectsPage,
];

// Documents that exist exactly once (no "create new" button in the Studio).
export const singletonTypes = ["projectsPage"];
