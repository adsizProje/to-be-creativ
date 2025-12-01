/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        // Strapi Cloud - update hostname after deploy
        protocol: "https",
        hostname: "*.strapiapp.com",
        pathname: "/uploads/**",
      },
      {
        // Strapi Cloud Media Library CDN
        protocol: "https",
        hostname: "*.media.strapiapp.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

