import Movie from '../../components/movie';
import styles from '../styles/home.module.css';
import { Key } from 'react';

export const metadata = {
  title: 'Home',
};

export const API_URL = 'https://nomad-movies.nomadcoders.workers.dev/movies';

async function getMovies() {
  // await new Promise((res) => setTimeout(res, 3000));
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

export default async function Home() {
  const movies = await getMovies();

  return (
    <div className={styles.container}>
      {movies.map((movie: { key: Key; id: string; title: string; poster_path: string }) => (
        // <div key={movie.id}>
        //   <Image src={movie.poster_path} alt={movie.title} width={200} height={300}></Image>
        //   <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
        <Movie key={movie.id} id={movie.id} poster_path={movie.poster_path} title={movie.title} />
      ))}
    </div>
  );
}
