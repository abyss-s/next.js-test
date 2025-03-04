'use client'; // react-query 사용을 위해 클라이언트 단으로 선언

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient(); // 쿼리 클라이언트 생성

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 쿼리 프로바이더에 클라이언트를 넣어주기
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
