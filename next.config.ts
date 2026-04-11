import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{

    remotePatterns: [
      {
        protocol:"https",
        hostname:"d1ayxb9ooonjts.cloudfront.net"
      }
    ],  
  }
};

export default nextConfig;
