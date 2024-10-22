/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Allow production builds even if there are type errors.
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['cdn.sanity.io'], // Allow images from Sanity's CDN
  },
};

export default nextConfig;
