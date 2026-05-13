import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // In Next.js 15, we might need to allow the proxy host if it's strictly checked
  // but typically 'next dev' doesn't check 'Host' header strictly by default.
};

export default nextConfig;
