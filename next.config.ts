import type { NextConfig } from "next";

// GitHub Pages serves a project repo under /<repo>/, so CI sets NEXT_PUBLIC_BASE_PATH. Leave it unset for local dev or a custom domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
