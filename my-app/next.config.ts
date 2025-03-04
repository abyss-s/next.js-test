import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  /*
   * scss config:
   * - ref: https://nextjs-ko.org/docs/pages/building-your-application/styling/sass
   */
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  /*
   * remotePatterns config: 외부 이미지를 불러오기 위한 도메인 추가
   * - ref: https://nextjs.org/docs/pages/api-reference/components/image#remotepatterns
   */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      },
    ],
  },
  // images: {
  //   domains: ['image.tmdb.org'],
  // },
};

export default nextConfig;
