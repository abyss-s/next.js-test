'use client'; // 리액트 쿼리 사용을 위해 클라이언트 단으로 변경

import './styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient(); // 쿼리 클라이언트 생성

// 쿼리 프로바이더로 레이아웃 감싸주기
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
