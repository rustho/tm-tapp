import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ["t.me", "telegram.org"],
  },
  basePath: '',
  reactStrictMode: true,
};

export default nextConfig;
