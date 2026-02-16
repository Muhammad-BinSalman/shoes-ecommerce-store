const isDev = process.env.NODE_ENV !== "production";

export default {
  experimental: {
    ppr: false, // Disable PPR to fix opengraph image build error
    inlineCss: true,
    useCache: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
    formats: ["image/avif", "image/webp"],
    // Avoid local dev timeouts by bypassing the image optimizer in development
    unoptimized: isDev,
    // Cache successfully fetched remote images longer to reduce refetching
    minimumCacheTTL: 60 * 60 * 24, // 1 day
  },
};
