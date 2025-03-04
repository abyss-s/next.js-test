import { Suspense } from 'react';
import MovieInfo, { getMovie } from '@/components/movie-info';
import MovieVideos from '@/components/movie-video';

// Params 인터페이스 정의
interface Params {
  id: string;
}

// MovieDetailProps 인터페이스 정의: Promise로 감싸 파라미터를 비동기적으로 처리
interface MovieDetailProps {
  params: Promise<Params>;
}

// 메타데이터 동적 생성 함수
export async function generateMetadata({ params }: MovieDetailProps) {
  const { id } = await params; // Promise에서 id 추출
  const movie = await getMovie(id);
  return {
    title: movie.title, // 영화 제목으로 동적 메타데이터 title 설정
  };
}

// 비동기적으로 영화 정보를 가져와 화면에 렌더링
export default async function MovieDetail({ params }: MovieDetailProps) {
  const { id } = await params;
  return (
    <div>
      {/* Suspense를 사용하여 각 컴포넌트를 비동기적으로 가져와 렌더링 */}
      <Suspense fallback={<h1>Loading movie info</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading movie videos</h1>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}
