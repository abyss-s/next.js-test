import { Suspense } from 'react';
import MovieInfo, { getMovie } from '@/components/movie-info';
import MovieVideos from '@/components/movie-video';
import { Params } from 'next/dist/server/request/params';

interface IParams {
  params: Params;
}

// 메타데이터 생성 함수
export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params; // params에서 id를 직접 추출
  const movie = await getMovie(id);
  return {
    title: movie.title, // 동적인 URL Params를 이용한 메타데이터 생성
  };
}

export default async function MovieDetail({ params }: IParams) {
  const { id } = params;

  return (
    <div>
      <Suspense fallback={<h1>Loading movie info</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading movie videos</h1>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}
