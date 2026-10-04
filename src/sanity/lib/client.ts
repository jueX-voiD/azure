import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  // A placeholder keeps the client constructible before a project exists; it is never queried (see isSanityConfigured).
  projectId: projectId || "unconfigured",
  dataset,
  apiVersion,
  useCdn: false,
});
