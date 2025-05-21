import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost", "picsum.photos"], // strips ports for domain approval
  },
};

export default nextConfig;
