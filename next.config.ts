import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/portfolio-site",
        destination: "/portfolio-site/index.html",
      },
      {
        source: "/portfolio-site/",
        destination: "/portfolio-site/index.html",
      },
    ];
  },
};

export default nextConfig;
