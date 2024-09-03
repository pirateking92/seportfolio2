/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'sepybaghaei.co.uk',
          port: '',
          pathname: '/wp-content/uploads/**',
        },
        {
          protocol: 'https',
          hostname: 'secure.gravatar.com',
          port: '',
          pathname: '/avatar/**',
        },
      ],
    },
    trailingSlash: true,
    async rewrites() {
      return [
        {
          source: '/productions',
          destination: '/productions/',
        },
      ];
    },
  };
  
  module.exports = nextConfig;