import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 20,
  onRatingChange,
  interactive = false
}) => {
  const handleStarClick = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[...Array(maxRating)].map((_, index) => {
        const starRating = index + 1;
        const isFilled = starRating <= rating;
        const isHalfFilled = starRating - 0.5 <= rating && starRating > rating;

        return (
<button
  key={index}
  aria-label={`Rate ${starRating} star`}
  onClick={() => handleStarClick(starRating)}
  disabled={!interactive}
  className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform duration-200`}
>
  <Star
    size={size}
    className={`${
      isFilled
        ? 'fill-yellow-400 text-yellow-400'
        : isHalfFilled
        ? 'fill-yellow-200 text-yellow-400'
        : 'text-gray-300'
    } transition-colors duration-200`}
/>
</button>
        );
      })}
    </div>
  );
};