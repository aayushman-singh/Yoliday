import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"], // strips ports for domain approval
  },
};

export default nextConfig;
