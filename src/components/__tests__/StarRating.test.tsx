import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StarRating } from '../StarRating';

describe('StarRating', () => {
  it('renders the correct number of stars', () => {
    render(<StarRating rating={3} maxRating={5} />);
    const stars = screen.getAllByRole('button');
    expect(stars).toHaveLength(5);
  });

  it('displays the correct rating visually', () => {
    render(<StarRating rating={3} maxRating={5} />);
    const stars = screen.getAllByRole('button');
    
    // First 3 stars should be filled (yellow)
    for (let i = 0; i < 3; i++) {
      const star = stars[i].querySelector('svg');
      expect(star).toHaveClass('fill-yellow-400');
    }
    
    // Last 2 stars should be empty (gray)
    for (let i = 3; i < 5; i++) {
      const star = stars[i].querySelector('svg');
      expect(star).toHaveClass('text-gray-300');
    }
  });

  it('calls onRatingChange when interactive and star is clicked', () => {
    const mockOnRatingChange = vi.fn();
    render(
      <StarRating 
        rating={2} 
        interactive={true} 
        onRatingChange={mockOnRatingChange} 
      />
    );
    
    const stars = screen.getAllByRole('button');
    fireEvent.click(stars[3]); // Click 4th star (rating 4)
    
    expect(mockOnRatingChange).toHaveBeenCalledWith(4);
  });

  it('does not call onRatingChange when not interactive', () => {
    const mockOnRatingChange = vi.fn();
    render(
      <StarRating 
        rating={2} 
        interactive={false} 
        onRatingChange={mockOnRatingChange} 
      />
    );
    
    const stars = screen.getAllByRole('button');
    fireEvent.click(stars[3]);
    
    expect(mockOnRatingChange).not.toHaveBeenCalled();
  });

  it('handles half ratings correctly', () => {
    render(<StarRating rating={2.5} maxRating={5} />);
    const stars = screen.getAllByRole('button');
    
    // First 2 stars should be filled
    for (let i = 0; i < 2; i++) {
      const star = stars[i].querySelector('svg');
      expect(star).toHaveClass('fill-yellow-400');
    }
    
    // Third star should be half-filled
    const halfStar = stars[2].querySelector('svg');
    expect(halfStar).toHaveClass('fill-yellow-200');
  });
});