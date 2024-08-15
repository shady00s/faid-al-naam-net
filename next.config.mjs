import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        dangerouslyAllowSVG :true
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