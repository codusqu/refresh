/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  basePath: isProd ? "/refresh" : "",
  assetPrefix: isProd ? "/refresh/" : "",
  images: {
    unoptimized: true
  }
};

export default nextConfig;
