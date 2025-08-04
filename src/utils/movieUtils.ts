import { Movie } from '../types/Movie';

/**
 * Generates a YouTube search URL for a movie trailer
 */
export const getTrailerUrl = (movie: Movie): string => {
  const query = encodeURIComponent(`${movie.title} ${movie.year} trailer`);
  return `https://www.youtube.com/results?search_query=${query}`;
};

/**
 * Formats a date string to a localized date
 */
export const formatWatchedDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

/**
 * Calculates the total runtime in hours and minutes
 */
export const formatRuntime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) {
    return `${minutes}min`;
  }
  
  return `${hours}h ${remainingMinutes}min`;
};

/**
 * Gets a random movie from an array of movies
 */
export const getRandomMovie = (movies: Movie[]): Movie | null => {
  if (movies.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex];
};