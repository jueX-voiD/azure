import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Images and SVG icons uploaded in the CMS are served from Sanity's CDN.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
