export type GalleryImage = { src: string; w: number; h: number; alt?: string };
export type Amenity = { name: string; icon: string };

// One building as the Projects page renders it (same shape whether it comes from Sanity or the local fallback).
export type Project = {
  id: string;
  title: string;
  subtitle?: string; // tag line
  status?: string | null; // optional badge, e.g. "Under Construction"
  images: GalleryImage[];
  amenities: Amenity[];
  body: string[]; // paragraphs
};

export type ProjectsContent = {
  hero: { heading: string; image: GalleryImage };
  residential: { heading: string; subheading: string; items: Project[] };
  villa: { heading: string; subheading: string; items: Project[] };
  commercial: Project[];
};
