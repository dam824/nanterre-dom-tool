/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.nanterredom.fr',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  experimental: {
    middleware: true,
  },
};

export default nextConfig;
