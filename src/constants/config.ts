// App configuration constants
export const CONFIG = {
  // Rating System
  MAX_RATING: 5,
  MIN_IMDB_RATING: 0,
  MAX_IMDB_RATING: 10,
  RATING_STEP: 0.1,
  
  // Year Range
  MIN_YEAR: 1950,
  MAX_YEAR: 2024,
  
  // UI Configuration
  MOVIE_CARD_IMAGE_HEIGHT: 'h-64',
  STAR_SIZE: 20,
  STAR_SIZE_SMALL: 16,
  
  // History
  MAX_HISTORY_HEIGHT: 'max-h-96',
  
  // Animation Durations
  TRANSITION_DURATION: 'duration-200',
  HOVER_SCALE: 'hover:scale-105',
} as const;