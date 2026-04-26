import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
   output: 'export', // paksa static
   basePath: '/sura-fe', // nama repo
   assetPrefix: '/sura-fe/', // biar asset nggak 404
   images: {
      unoptimized: true, // next/image harus dimatikan optimasinya
   },
}

export default nextConfig
