import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "avatar.vercel.sh" },
      { hostname: "github.com" },
      { hostname: "i.pravatar.cc" },
      { hostname: "images.unsplash.com" },
      { hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
