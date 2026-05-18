import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "yunanved-website.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "d209jjsil73ccf.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;