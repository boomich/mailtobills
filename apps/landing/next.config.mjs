/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@mailtobills/ui"],
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
