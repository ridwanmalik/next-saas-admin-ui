import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "avatar.vercel.sh" },
      { hostname: "github.com" },
    ],
  },
};

export default nextConfig;
