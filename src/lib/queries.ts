import { defineQuery } from "next-sanity";

// Everything the Projects page needs in a single request.
export const PROJECTS_QUERY = defineQuery(`{
  "page": *[_type == "projectsPage"][0]{
    heroHeading,
    "heroImage": heroImage.asset->{ "src": url, "w": metadata.dimensions.width, "h": metadata.dimensions.height },
    residentialHeading,
    residentialSubheading,
    villaHeading,
    villaSubheading
  },
  "buildings": *[_type == "building" && defined(category)] | order(orderRank asc){
    _id,
    category,
    title,
    tagline,
    badge,
    description,
    "images": gallery[defined(asset)]{
      "src": asset->url,
      "w": asset->metadata.dimensions.width,
      "h": asset->metadata.dimensions.height,
      alt
    },
    "amenities": amenities[]->{ name, orderRank, "icon": icon.asset->url }
  }
}`);

export const SANITY_TAGS = ["building", "amenity", "projectsPage"];
