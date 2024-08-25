import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URI:
      "mongodb+srv://shadyskamal0:CY6ENfs2d1qbSOuQ@cluster0.ldulrqn.mongodb.net/?retryWrites=true&w=majority",
    DATABASE_NAME: "test",
    BASE_URL: "https://faid-al-naam-next.vercel.app/",

    DASHBOARD_BASE_URL: "https://faid-al-naam-server.onrender.com/",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/ar", // Matched parameters can be used in the destination
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
