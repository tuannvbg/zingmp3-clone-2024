/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      domains: [
         'photo-zmp3.zmdcdn.me',
         'photo-resize-zmp3.zmdcdn.me',
         'zmp3-static.zmdcdn.me',
         'i.gifer.com',
         'photo-playlist-zmp3.zmdcdn.me',
         'zjs.zmdcdn.me',
         'api-ecom.duthanhduoc.com'
      ],
      formats: ['image/webp'],
      minimumCacheTTL: 60
   }
}

module.exports = nextConfig
