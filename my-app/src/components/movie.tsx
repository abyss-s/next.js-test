'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from '@/app/styles/movie.module.css';
import { useRouter } from 'next/navigation';

interface IMovieProps {
  title: string;
  id: string;
  poster_path: string;
}

export default function Movie({ title, id, poster_path }: IMovieProps) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/movies/${id}`);
  };

  return (
    <div className={styles.movie}>
      <Image src={poster_path} alt={title} onClick={onClick} width={200} height={300} />
      <Link href={`/movies/${id}`}>{title}</Link>
    </div>
  );
}
