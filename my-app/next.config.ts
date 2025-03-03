import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    staleTimes: {
      dynamic: 30, // 캐싱 추가
    },
  },
};

export default nextConfig;
