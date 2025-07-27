export default {
  experimental: {
    ppr: false, // Disable PPR to fix opengraph image build error
    inlineCss: true,
    useCache: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};
