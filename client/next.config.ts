import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5001/api/:path*", // сервер на порту 5001
      },
    ];
  },
  /* другие настройки, если есть */
};

export default nextConfig;