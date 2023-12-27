/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        hostname: '*.googleusercontent.com'
      },
    ],
  }
}

module.exports = nextConfig
