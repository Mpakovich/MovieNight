import React from 'react';
import { Movie } from '../types/Movie';
import { StarRating } from './StarRating';
import { Clock, Calendar, Eye, EyeOff, Play } from 'lucide-react';
import { STRINGS } from '../constants/strings';
import { getTrailerUrl, formatWatchedDate } from '../utils/movieUtils';

interface MovieCardProps {
  movie: Movie;
  onMarkWatched: (movieId: number) => void;
  onRateMovie: (movieId: number, rating: number) => void;
  isRecommended?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onMarkWatched,
  onRateMovie,
  isRecommended = false
}) => {
  const handleTrailerClick = () => {
    window.open(getTrailerUrl(movie), '_blank');
  };

  return (
    <div
      className={`bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${
        isRecommended ? 'ring-2 ring-purple-500 ring-opacity-50' : ''
      }`}
    >
      {isRecommended && (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 text-sm font-semibold">
          {STRINGS.MOVIE_RECOMMENDED_BADGE}
        </div>
      )}

      <div className="relative">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-2 right-2">
          <button
            onClick={() => onMarkWatched(movie.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
              movie.watched
                ? 'bg-green-600 text-white'
                : 'bg-black bg-opacity-50 text-white hover:bg-opacity-70'
            }`}
            title={
              movie.watched ? STRINGS.BTN_WATCHED : STRINGS.BTN_MARK_WATCHED
            }
          >
            {movie.watched ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-white text-lg font-bold truncate">
            {movie.title}
          </h3>
          <p className="text-gray-400 text-sm">{movie.director}</p>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <Calendar size={14} />
            <span>{movie.year}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{movie.runtime}{STRINGS.MOVIE_RUNTIME_SUFFIX}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {movie.genre.map((g) => (
            <span
              key={g}
              className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
            >
              {g}
            </span>
          ))}
        </div>

        <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed">
          {movie.plot}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-gray-400 text-xs mb-1">
              {STRINGS.RATING_IMDB}
            </div>
            <div className="flex items-center space-x-2">
              <StarRating rating={movie.imdbRating / 2} />
              <span className="text-yellow-400 font-semibold">
                {movie.imdbRating}
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="text-gray-400 text-xs mb-2">
            {STRINGS.RATING_YOUR}
          </div>
          <StarRating
            rating={movie.userRating || 0}
            interactive={true}
            onRatingChange={(newRating) => onRateMovie(movie.id, newRating)}
          />
        </div>

        <div className="pt-2">
          <button
            onClick={handleTrailerClick}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Play size={16} />
            <span>{STRINGS.BTN_WATCH_TRAILER}</span>
          </button>
        </div>

        {movie.watched && movie.watchedDate && (
          <div className="text-gray-500 text-xs">
            {STRINGS.MOVIE_WATCHED_ON} {formatWatchedDate(movie.watchedDate)}
          </div>
        )}
      </div>
    </div>
  );
};