/** @type {import('next').NextConfig} */
const nextConfig = {
  bundlePagesRouterDependencies: true,
  serverExternalPackages: ["package-name"],
  missingSuspenseWithCSRBailout:false
};

export default nextConfig;
