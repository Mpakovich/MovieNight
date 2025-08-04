import React, { useState, useMemo } from 'react';
import { Movie, Filters } from './types/Movie';
import { movies as initialMovies } from './data/movies';
import { MovieCard } from './components/MovieCard';
import { FilterPanel } from './components/FilterPanel';
import { ViewingHistory } from './components/ViewingHistory';
import { Film, Shuffle, BarChart3 } from 'lucide-react';
import { STRINGS } from './constants/strings';
import { getRandomMovie } from './utils/movieUtils';

function App() {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [activeTab, setActiveTab] = useState<'discover' | 'history'>('discover');
  const [recommendedMovieId, setRecommendedMovieId] = useState<number | null>(null);
  const [filters, setFilters] = useState<Filters>({
    genres: [],
    minRating: 7.0,
    maxYear: 2024,
    minYear: 1950,
    unwatchedOnly: true
  });

  const availableGenres = useMemo(() => {
    const genreSet = new Set<string>();
    movies.forEach(movie => {
      movie.genre.forEach(genre => genreSet.add(genre));
    });
    return Array.from(genreSet).sort();
  }, [movies]);

  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      if (filters.genres.length > 0 && !filters.genres.some(genre => movie.genre.includes(genre))) {
        return false;
      }
      if (movie.imdbRating < filters.minRating) {
        return false;
      }
      if (movie.year < filters.minYear || movie.year > filters.maxYear) {
        return false;
      }
      if (filters.unwatchedOnly && movie.watched) {
        return false;
      }
      return true;
    });
  }, [movies, filters]);

  const recommendedMovie = useMemo(() => {
    return movies.find(m => m.id === recommendedMovieId) || null;
  }, [movies, recommendedMovieId]);

  const handleMarkWatched = (movieId: number) => {
    setMovies(prevMovies =>
      prevMovies.map(movie =>
        movie.id === movieId
          ? { 
              ...movie, 
              watched: !movie.watched,
              watchedDate: !movie.watched ? new Date().toISOString() : undefined
            }
          : movie
      )
    );

    if (recommendedMovieId === movieId) {
      setRecommendedMovieId(null);
    }
  };

  const handleRateMovie = (movieId: number, rating: number) => {
    setMovies(prevMovies =>
      prevMovies.map(movie =>
        movie.id === movieId ? { ...movie, userRating: rating } : movie
      )
    );
  };

  const getRandomRecommendation = () => {
    const availableMovies = filteredMovies.filter(movie => !movie.watched);
    const randomMovie = getRandomMovie(availableMovies);
    setRecommendedMovieId(randomMovie?.id || null);
  };

  const watchedMovies = movies.filter(movie => movie.watched);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <header className="bg-black bg-opacity-50 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Film className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{STRINGS.APP_NAME}</h1>
                <p className="text-gray-400">{STRINGS.APP_TAGLINE}</p>
              </div>
            </div>

            <nav className="flex space-x-4">
              <button
                onClick={() => setActiveTab('discover')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'discover'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                {STRINGS.NAV_DISCOVER}
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                  activeTab === 'history'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <BarChart3 size={16} />
                <span>{STRINGS.NAV_HISTORY} ({watchedMovies.length})</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'discover' ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                availableGenres={availableGenres}
              />

              <div className="mt-6">
                <button
                  onClick={getRandomRecommendation}
                  disabled={filteredMovies.filter(m => !m.watched).length === 0}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
                >
                  <Shuffle size={20} />
                  <span>Get Tonight's Pick</span>
                </button>
                
                {filteredMovies.filter(m => !m.watched).length === 0 && (
                  <p className="text-gray-400 text-sm mt-2 text-center">
                    No unwatched movies match your filters
                  </p>
                )}
              </div>

              <div className="mt-6 bg-gray-800 rounded-xl p-4">
                <h3 className="text-white font-semibold mb-3">Your Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Movies watched:</span>
                    <span className="text-green-400 font-medium">{watchedMovies.length}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Available to watch:</span>
                    <span className="text-blue-400 font-medium">
                      {filteredMovies.filter(m => !m.watched).length}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Total in library:</span>
                    <span className="text-purple-400 font-medium">{movies.length}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              {recommendedMovie && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                    <span>🎬</span>
                    <span>Tonight's Recommendation</span>
                  </h2>
                  <div className="max-w-md">
                    <MovieCard
                      movie={recommendedMovie}
                      onMarkWatched={handleMarkWatched}
                      onRateMovie={handleRateMovie}
                      isRecommended={true}
                    />
                  </div>
                </div>
              )}

              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  All Movies ({filteredMovies.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredMovies.map(movie => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onMarkWatched={handleMarkWatched}
                      onRateMovie={handleRateMovie}
                    />
                  ))}
                </div>
                
                {filteredMovies.length === 0 && (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-white mb-2">No movies found</h3>
                    <p className="text-gray-400">Try adjusting your filters to see more movies</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <ViewingHistory watchedMovies={watchedMovies} />
        )}
      </div>
    </div>
  );
}

export default App;
