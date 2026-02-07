import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  showNumber?: boolean;
  size?: number;
}

export const StarRating = ({ rating, maxRating = 5, showNumber = true, size = 16 }: StarRatingProps) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(maxRating)].map((_, index) => {
        const fillPercentage = Math.min(Math.max(rating - index, 0), 1);
        
        return (
          <div key={index} className="relative" style={{ width: size, height: size }}>
            <Star className="text-gray-300" size={size} />
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${fillPercentage * 100}%` }}
            >
              <Star className="text-yellow-400 fill-yellow-400" size={size} />
            </div>
          </div>
        );
      })}
      {showNumber && (
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      )}
    </div>
  );
};
