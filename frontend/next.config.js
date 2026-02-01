const API_BASE = (process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000").replace(/\/$/, "");
const apiBaseWithPrefix = API_BASE.endsWith("/api/v1")
  ? API_BASE
  : API_BASE.endsWith("/api")
    ? `${API_BASE}/v1`
    : `${API_BASE}/api/v1`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${apiBaseWithPrefix}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
