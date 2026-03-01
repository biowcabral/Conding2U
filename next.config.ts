import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Conding2U",
  assetPrefix: "/Conding2U/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
