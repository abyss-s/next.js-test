'use client';

import { useQuery } from '@tanstack/react-query';
import Movie from '@/components/movie';
import { fetchMovies } from '@/app/apis/movies';

// 영화 객체 인터페이스 정의
interface MovieType {
  id: string;
  poster_path: string;
  title: string;
}

export default function Home() {
  // useQuery 훅을 사용하여 영화 데이터를 가져옴
  const {
    data: movies, // API의 응답 데이터
    isError, // 에러 여부
    isLoading, // 로딩 여부
    error, // 에러 객체
  } = useQuery<MovieType[]>({
    queryKey: ['movies'], // 쿼리의 고유 키,
    queryFn: fetchMovies, // 데이터를 가져오는 함수
    initialData: [],
  });

  // 로딩 중일 때 표시할 UI
  if (isLoading) return <div>Loading...</div>;
  // 에러 발생 시 표시할 UI
  if (isError) return <div>Error loading movies: {error.message}</div>;

  return (
    <div className="container home">
      {/* 각 영화를 키로 하여 대해 Movie 컴포넌트를 렌더링 */}
      {movies?.map((movie) => (
        <Movie key={movie.id} id={movie.id} poster_path={movie.poster_path} title={movie.title} />
      ))}
    </div>
  );
}
