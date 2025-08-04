import { describe, it, expect } from 'vitest';
import { getTrailerUrl, formatWatchedDate, formatRuntime, getRandomMovie } from '../movieUtils';
import { Movie } from '../../types/Movie';

describe('movieUtils', () => {
  const mockMovie: Movie = {
    id: 1,
    title: 'The Matrix',
    genre: ['Action', 'Sci-Fi'],
    year: 1999,
    director: 'The Wachowskis',
    plot: 'Test plot',
    runtime: 136,
    imdbRating: 8.7,
    poster: 'test.jpg',
    watched: false,
  };

  describe('getTrailerUrl', () => {
    it('generates correct YouTube search URL', () => {
      const url = getTrailerUrl(mockMovie);
      expect(url).toContain('youtube.com/results');
      expect(url).toContain('The%20Matrix');
      expect(url).toContain('1999');
      expect(url).toContain('trailer');
    });
  });

  describe('formatWatchedDate', () => {
    it('formats date string correctly', () => {
      const dateString = '2023-12-01T00:00:00.000Z';
      const formatted = formatWatchedDate(dateString);
      expect(formatted).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/); // MM/DD/YYYY or similar
    });
  });

  describe('formatRuntime', () => {
    it('formats minutes only when less than 60', () => {
      expect(formatRuntime(45)).toBe('45min');
    });

    it('formats hours and minutes when 60 or more', () => {
      expect(formatRuntime(136)).toBe('2h 16min');
      expect(formatRuntime(120)).toBe('2h 0min');
    });
  });

  describe('getRandomMovie', () => {
    it('returns null for empty array', () => {
      expect(getRandomMovie([])).toBeNull();
    });

    it('returns a movie from the array', () => {
      const movies = [mockMovie];
      const result = getRandomMovie(movies);
      expect(result).toBe(mockMovie);
    });

    it('returns different movies on multiple calls', () => {
      const movies = [
        { ...mockMovie, id: 1 },
        { ...mockMovie, id: 2 },
        { ...mockMovie, id: 3 },
      ];
      
      const results = new Set();
      for (let i = 0; i < 20; i++) {
        const result = getRandomMovie(movies);
        if (result) results.add(result.id);
      }
      
      // Should get at least 2 different movies in 20 tries
      expect(results.size).toBeGreaterThan(1);
    });
  });
});