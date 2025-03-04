import './styles/globals.css';
import { Metadata } from 'next';

/*
 * default Metadata
 * - metadata 객체를 정의했을 때는 <head>에서 <title>과 <meta>를 정의할 필요가 없음
 * - 13 버전 이상에서 선언 시 Next.js가 알아서 처리해줌.
 */
export const metadata: Metadata = {
  title: 'Movie',
  description: 'Intro',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
