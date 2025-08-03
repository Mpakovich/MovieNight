import React from 'react';
import { Movie } from '../types/Movie';
import { StarRating } from './StarRating';
import { Calendar } from 'lucide-react';

interface ViewingHistoryProps {
  watchedMovies: Movie[];
}

export const ViewingHistory: React.FC<ViewingHistoryProps> = ({ watchedMovies }) => {
  const sortedMovies = watchedMovies
    .filter(movie => movie.watched)
    .sort((a, b) => {
      if (!a.watchedDate || !b.watchedDate) return 0;
      return new Date(b.watchedDate).getTime() - new Date(a.watchedDate).getTime();
    });

  if (sortedMovies.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl p-8 text-center">
        <div className="text-gray-400 mb-2">📽️</div>
        <h3 className="text-white text-lg font-semibold mb-2">No movies watched yet</h3>
        <p className="text-gray-400">Start watching movies to build your history!</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-white text-xl font-bold mb-6 flex items-center space-x-2">
        <Calendar size={24} />
        <span>Viewing History</span>
      </h3>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {sortedMovies.map(movie => (
          <div key={movie.id} className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-12 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h4 className="text-white font-medium">{movie.title}</h4>
              <p className="text-gray-400 text-sm">{movie.year} • {movie.genre.join(', ')}</p>
              {movie.watchedDate && (
                <p className="text-gray-500 text-xs">
                  Watched on {new Date(movie.watchedDate).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="text-right">
              {movie.userRating && (
                <div className="flex items-center space-x-1">
                  <StarRating rating={movie.userRating} size={16} />
                </div>
              )}
              <div className="text-yellow-400 text-sm font-medium">
                {movie.imdbRating} IMDB
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};