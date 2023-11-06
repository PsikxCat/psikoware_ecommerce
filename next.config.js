/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com'
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co'
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com'
      }
    ],
    dangerouslyAllowSVG: true
  }
}

module.exports = nextConfig
