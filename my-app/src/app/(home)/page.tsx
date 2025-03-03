import Link from 'next/link';
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
    <div>
      {movies.map((movie: { title: string; id: Key }) => (
        <li key={movie.id}>
          <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
    </div>
  );
}
