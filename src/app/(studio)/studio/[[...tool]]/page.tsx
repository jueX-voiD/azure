"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../../sanity.config";

// The CMS admin, served at /studio (no site header/footer, no smooth scroll).
export default function StudioPage() {
  return <NextStudio config={config} />;
}
