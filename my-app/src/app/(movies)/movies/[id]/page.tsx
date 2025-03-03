import { Suspense } from 'react';
import MovieVideos from '@/components/movie-video';
import MovieInfo from '@/components/movie-info';

export default async function MovieDetail({ params: { id } }: { params: { id: string } }) {
  // const movie = await getMovie(id);
  // const videos = await getVideos(id);

  return (
    <div>
      <h3>Movie detail page</h3>
      <Suspense fallback={<h1>Loading movie info</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading movie videos</h1>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}

/*
 * 동적 라우팅: react-router의 :id와 같은 역할!
 */
