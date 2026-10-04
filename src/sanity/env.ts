export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-10-01";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

// The site keeps working from the local fallback content until a Sanity project is connected.
export const isSanityConfigured = Boolean(projectId);
