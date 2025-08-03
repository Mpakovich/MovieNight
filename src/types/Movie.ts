export interface Movie {
  id: number;
  title: string;
  genre: string[];
  year: number;
  director: string;
  plot: string;
  runtime: number;
  imdbRating: number;
  poster: string;
  watched: boolean;
  userRating?: number;
  watchedDate?: string;
}

export interface Filters {
  genres: string[];
  minRating: number;
  maxYear: number;
  minYear: number;
  unwatchedOnly: boolean;
}