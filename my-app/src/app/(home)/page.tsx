'use client';

import { useQuery } from '@tanstack/react-query';
import Movie from '../../components/movie';
import styles from '../styles/home.module.css';
import { fetchMovies } from '../apis/movies';

export default function Home() {
  const {
    data: movies,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading movies: {error.message}</div>;

  return (
    <div className={styles.container}>
      {movies.map((movie) => (
        <Movie key={movie.id} id={movie.id} poster_path={movie.poster_path} title={movie.title} />
      ))}
    </div>
  );
}
