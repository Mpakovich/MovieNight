import React from 'react';
import { Filters } from '../types/Movie';
import { Filter, Calendar, Star } from 'lucide-react';

interface FilterPanelProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  availableGenres: string[];
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFiltersChange,
  availableGenres
}) => {
  const handleGenreToggle = (genre: string) => {
    const newGenres = filters.genres.includes(genre)
      ? filters.genres.filter(g => g !== genre)
      : [...filters.genres, genre];
    
    onFiltersChange({ ...filters, genres: newGenres });
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 space-y-6">
      <div className="flex items-center space-x-2 text-white">
        <Filter size={20} />
        <h3 className="text-lg font-semibold">Filters</h3>
      </div>

      {/* Genres */}
      <div>
        <h4 className="text-white font-medium mb-3">Genres</h4>
        <div className="flex flex-wrap gap-2">
          {availableGenres.map(genre => (
            <button
              key={genre}
              onClick={() => handleGenreToggle(genre)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                filters.genres.includes(genre)
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <div className="flex items-center space-x-2 text-white mb-3">
          <Star size={16} />
          <h4 className="font-medium">Minimum Rating</h4>
        </div>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={filters.minRating}
          onChange={(e) => onFiltersChange({ ...filters, minRating: parseFloat(e.target.value) })}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="text-gray-400 text-sm mt-1">{filters.minRating.toFixed(1)}+ IMDB</div>
      </div>

      {/* Year Range */}
      <div>
        <div className="flex items-center space-x-2 text-white mb-3">
          <Calendar size={16} />
          <h4 className="font-medium">Year Range</h4>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-gray-400 text-sm">From</label>
            <input
              type="range"
              min="1950"
              max="2024"
              value={filters.minYear}
              onChange={(e) => onFiltersChange({ ...filters, minYear: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-gray-400 text-sm">{filters.minYear}</div>
          </div>
          <div>
            <label className="text-gray-400 text-sm">To</label>
            <input
              type="range"
              min="1950"
              max="2024"
              value={filters.maxYear}
              onChange={(e) => onFiltersChange({ ...filters, maxYear: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-gray-400 text-sm">{filters.maxYear}</div>
          </div>
        </div>
      </div>

      {/* Unwatched Only */}
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="unwatchedOnly"
          checked={filters.unwatchedOnly}
          onChange={(e) => onFiltersChange({ ...filters, unwatchedOnly: e.target.checked })}
          className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
        />
        <label htmlFor="unwatchedOnly" className="text-white font-medium">
          Show only unwatched movies
        </label>
      </div>
    </div>
  );
};