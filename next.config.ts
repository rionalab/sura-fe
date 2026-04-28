import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
   output: isProd ? 'export' : undefined,
   basePath: isProd ? '/sura-fe' : '',
   assetPrefix: isProd ? '/sura-fe/' : '',
   trailingSlash: true,
   images: {
      unoptimized: true,
   },
}

export default nextConfig
