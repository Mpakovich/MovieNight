// App-wide string constants for easy translation and maintenance
export const STRINGS = {
  // App Title and Branding
  APP_NAME: 'MovieNight',
  APP_TAGLINE: 'Your personal movie recommendation engine',
  
  // Navigation
  NAV_DISCOVER: 'Discover',
  NAV_HISTORY: 'History',
  
  // Buttons and Actions
  BTN_GET_RECOMMENDATION: "Get Tonight's Pick",
  BTN_WATCH_TRAILER: 'Watch Trailer',
  BTN_MARK_WATCHED: 'Mark as watched',
  BTN_WATCHED: 'Watched',
  
  // Headings
  HEADING_RECOMMENDATION: "🎬 Tonight's Recommendation",
  HEADING_ALL_MOVIES: 'All Movies',
  HEADING_VIEWING_HISTORY: 'Viewing History',
  HEADING_FILTERS: 'Filters',
  HEADING_YOUR_STATS: 'Your Stats',
  
  // Filter Labels
  FILTER_GENRES: 'Genres',
  FILTER_MIN_RATING: 'Minimum Rating',
  FILTER_YEAR_RANGE: 'Year Range',
  FILTER_YEAR_FROM: 'From',
  FILTER_YEAR_TO: 'To',
  FILTER_UNWATCHED_ONLY: 'Show only unwatched movies',
  
  // Stats Labels
  STATS_MOVIES_WATCHED: 'Movies watched:',
  STATS_AVAILABLE_TO_WATCH: 'Available to watch:',
  STATS_TOTAL_IN_LIBRARY: 'Total in library:',
  
  // Rating Labels
  RATING_IMDB: 'IMDB Rating',
  RATING_YOUR: 'Your Rating',
  RATING_IMDB_SUFFIX: 'IMDB',
  RATING_MIN_SUFFIX: '+ IMDB',
  
  // Movie Card Labels
  MOVIE_RUNTIME_SUFFIX: 'min',
  MOVIE_WATCHED_ON: 'Watched on',
  MOVIE_RECOMMENDED_BADGE: "🎬 Tonight's Pick",
  
  // Empty States
  EMPTY_NO_MOVIES: 'No movies found',
  EMPTY_NO_MOVIES_DESC: 'Try adjusting your filters to see more movies',
  EMPTY_NO_UNWATCHED: 'No unwatched movies match your filters',
  EMPTY_NO_HISTORY: 'No movies watched yet',
  EMPTY_NO_HISTORY_DESC: 'Start watching movies to build your history!',
  
  // Accessibility
  A11Y_SEARCH_ICON: '🔍',
  A11Y_HISTORY_ICON: '📽️',
} as const;