/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    "http://localhost:3000",   // your frontend
    "http://10.200.2.205:3000" // your local network IP (adjust your IP)
  ]
}

export default nextConfig
