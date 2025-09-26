import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/github-dashboard' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/github-dashboard/' : '',
};

export default nextConfig;
