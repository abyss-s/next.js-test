import { API_URL } from '@/app/constants';

export async function getMovie(id: string) {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

export default async function MovieInfo({ id }: { id: string }) {
  const movie = await getMovie(id);
  return (
    <div className="container movie-info">
      <img src={movie.poster_path} className="poster" alt={movie.title} />
      <div className="info">
        <h1 className="title">{movie.title}</h1>
        <h3>⭐️ {movie.vote_average.toFixed()}</h3>
        <p>{movie.overview}</p>
        <a href={movie.homepage} target={'_blank'}>
          Homepage &rarr;
        </a>
      </div>
    </div>
  );
}
