import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',},      {
          protocol: 'http',
          hostname: 'res.cloudinary.com',
          port: '',
          pathname: '/**',},
    ],
  },
    async redirects() {
        return [
          {
            source: '/',
            destination: '/ar', // Matched parameters can be used in the destination
            permanent: true,
          },
        ]
      },
};
 
export default withNextIntl(nextConfig);