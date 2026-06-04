import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    loader: 'default',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  transpilePackages: ["trust-guard-js"],
  async redirects() {
    return [
      {
        source: '/our-capabilities/family-office-setup',
        destination: '/our-capabilities/family-office-advisory',
        permanent: true,
      },
      {
        source: '/our-expertise',
        destination: '/our-capabilities',
        permanent: true,
      },
      {
        source: '/our-expertise/:slug*',
        destination: '/our-capabilities/:slug*',
        permanent: true,
      },
      {
        source: '/partner-with-us',
        destination: '/join',
        permanent: true,
      },
      {
        source: '/partner-with-us/:path*',
        destination: '/join',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
