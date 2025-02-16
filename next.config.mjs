/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      forceDynamic: true, // Force all pages to be dynamically rendered
    },
    eslint: {
      ignoreDuringBuilds: true, // Ignore ESLint errors during the build
    },
    typescript: {
      ignoreBuildErrors: true, // Ignore TypeScript errors during the build
    },
  };

export default nextConfig;
