import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  // createClient throws on an empty id; the placeholder keeps imports (and the Studio shell) alive, queries just fail loudly.
  projectId: projectId || "unconfigured",
  dataset,
  apiVersion,
  useCdn: false,
});
