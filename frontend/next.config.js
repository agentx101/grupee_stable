/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.experiments = { topLevelAwait: true, layers: true };
    config.resolve = config.resolve || {}
    config.resolve.fallback = config.resolve.fallback || {}
    config.resolve.fallback.fs = false;
    return config;
  }
}

module.exports = nextConfig
