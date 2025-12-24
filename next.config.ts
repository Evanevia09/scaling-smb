import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export doesn't support dynamic server-side pages easily without a lot of configuration
  // Let's remove the output: 'export' and try to deploy as a server-side app
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
