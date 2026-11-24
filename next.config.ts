import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray lockfile in the home folder makes Next guess the wrong workspace root
  turbopack: { root: process.cwd() },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
