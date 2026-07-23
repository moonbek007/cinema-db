import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.tvmaze.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
