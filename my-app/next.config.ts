import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    staleTimes: {
      dynamic: 30, // 캐싱 추가
    },
  },
  images: {
    domains: ['image.tmdb.org'], // 외부 이미지를 불러오기 위한 도메인 추가
  },
};

export default nextConfig;
