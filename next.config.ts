/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // <- ESSA LINHA é a mágica
  },
}

export default nextConfig
