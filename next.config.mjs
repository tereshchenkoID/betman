import createNextIntlPlugin from 'next-intl/plugin'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const withNextIntl = createNextIntlPlugin(
  './src/i18n/request.js'
)

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,

  // --- Experimental Settings ---
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['clsx', 'lodash-es', 'react-toastify'],
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

  // --- Compiler & Output Options ---
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },

  // --- Sass / Styling Configuration ---
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    additionalData: `
      @use "@/scss/config" as *;
    `,
  },

  // --- Image Optimization ---
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 576, 768, 992, 1280],
    minimumCacheTTL: 60 * 60 * 24,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
