import { API_URL } from '../constants';

export async function fetchMovies() {
  const response = await fetch(API_URL);
  if (!response.ok) console.log('Error: ', response);
  return response.json();
}
