import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MovieCard } from '../MovieCard';
import { Movie } from '../../types/Movie';
import { STRINGS } from '../../constants/strings';

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  genre: ['Action', 'Drama'],
  year: 2023,
  director: 'Test Director',
  plot: 'This is a test movie plot that should be displayed.',
  runtime: 120,
  imdbRating: 8.5,
  poster: 'https://example.com/poster.jpg',
  watched: false,
};

describe('MovieCard', () => {
  let mockOnMarkWatched: ReturnType<typeof vi.fn>;
  let mockOnRateMovie: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockOnMarkWatched = vi.fn();
    mockOnRateMovie = vi.fn();
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders movie info correctly', () => {
      render(<MovieCard movie={mockMovie} onMarkWatched={mockOnMarkWatched} onRateMovie={mockOnRateMovie} />);
      expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
      expect(screen.getByText(mockMovie.director)).toBeInTheDocument();
      expect(screen.getByText(String(mockMovie.year))).toBeInTheDocument();
      expect(screen.getByText(`${mockMovie.runtime}min`)).toBeInTheDocument();
      expect(screen.getByText(String(mockMovie.imdbRating))).toBeInTheDocument();
    });

    it('renders poster with correct src and alt', () => {
      render(<MovieCard movie={mockMovie} onMarkWatched={mockOnMarkWatched} onRateMovie={mockOnRateMovie} />);
      const img = screen.getByAltText(mockMovie.title) as HTMLImageElement;
      expect(img).toBeInTheDocument();
      expect(img.src).toContain(mockMovie.poster);
    });

    it('renders plot text', () => {
      render(<MovieCard movie={mockMovie} onMarkWatched={mockOnMarkWatched} onRateMovie={mockOnRateMovie} />);
      expect(screen.getByText(mockMovie.plot)).toBeInTheDocument();
    });

    it('renders nothing if plot is empty', () => {
      const movieNoPlot = { ...mockMovie, plot: '' };
      render(<MovieCard movie={movieNoPlot} onMarkWatched={mockOnMarkWatched} onRateMovie={mockOnRateMovie} />);
      expect(screen.queryByText(mockMovie.plot)).not.toBeInTheDocument();
    });
  });

  describe('Watched Button', () => {
    it('shows correct classes for watched movie', () => {
      const watchedMovie = { ...mockMovie, watched: true, watchedDate: '2023-12-01T00:00:00.000Z' };
      render(<MovieCard movie={watchedMovie} onMarkWatched={mockOnMarkWatched} onRateMovie={mockOnRateMovie} />);
      const button = screen.getByTitle(STRINGS.BTN_WATCHED);
      expect(button).toHaveClass('bg-green-600', 'text-white');
    });

    it('shows correct classes for not watched movie', () => {
      render(<MovieCard movie={mockMovie} onMarkWatched={mockOnMarkWatched} onRateMovie={mockOnRateMovie} />);
      const button = screen.getByTitle(STRINGS.BTN_MARK_WATCHED);
      expect(button).toHaveClass('bg-black', 'bg-opacity-50', 'text-white');
    });

    it('calls onMarkWatched when clicked', () => {
      render(<MovieCard movie={mockMovie} onMarkWatched={mockOnMarkWatched} onRateMovie={mockOnRateMovie} />);
      const button = screen.getByTitle(STRINGS.BTN_MARK_WATCHED);
      fireEvent.click(button);
      expect(mockOnMarkWatched).toHaveBeenCalledWith(mockMovie.id);
    });

    it('renders EyeOff icon when not watched', () => {
      render(<MovieCard movie={mockMovie} onMarkWatched={mockOnMarkWatched} onRateMovie={mockOnRateMovie} />);
      const button = screen.getByTitle(STRINGS.BTN_MARK_WATCHED);
      expect(button.querySelector('svg')).toBeTruthy();
    });

    it('renders Eye icon when watched', () => {
      const watchedMovie = { ...mockMovie, watched: true, watchedDate: '2023-12-01T00:00:00.000Z' };
      render(<MovieCard movie={watchedMovie} onMarkWatched={mockOnMarkWatched} onRateMovie={mockOnRateMovie} />);
      const button = screen.getByTitle(STRINGS.BTN_WATCHED);
      expect(button.querySelector('svg')).toBeTruthy();
    });

    it('renders watched date if available', () => {
      const watchedMovie = { ...mockMovie, watched: true, watchedDate: '2023-12-01T00:00:00.000Z' };
      render(<MovieCard movie={watchedMovie} onMarkWatched={mockOnMarkWatched} onRateMovie={mockOnRateMovie} />);
      expect(screen.getByText(/Watched on/)).toBeInTheDocument();
    });

    it('does not render watched date if missing', () => {
      const watchedMovie = { ...mockMovie, watched: true, watchedDate: undefined as unknown as string | undefined };
      render(<MovieCard movie={watchedMovie} onMarkWatched={mockOnMarkWatched} onRateMovie={mockOnRateMovie} />);
      expect(screen.queryByText(/Watched on/)).not.toBeInTheDocument();
    });
  });

  describe('Trailer Button', () => {
    it('renders with correct class', () => {
      render(<MovieCard movie={mockMovie} onMarkWatched={mockOnMarkWatched} onRateMovie={mockOnRateMovie} />);
      const button = screen.getByText(STRINGS.BTN_WATCH_TRAILER).closest('button');
      expect(button).toHaveClass(
        'w-full',
        'bg-red-600',
        'hover:bg-red-700',
        'text-white',
        'py-2',
        'px-4',
        'rounded-lg',
        'font-medium',
        'transition-colors',
        'duration-200',
        'flex',
        'items-center',
        'justify-center',
        'space-x-2'
      );
    });

    it('opens trailer link on click', () => {
      const mockOpen = vi.fn();
      vi.stubGlobal('open', mockOpen);
      render(<MovieCard movie={mockMovie} onMarkWatched={mockOnMarkWatched} onRateMovie={mockOnRateMovie} />);
      fireEvent.click(screen.getByText(STRINGS.BTN_WATCH_TRAILER));
      expect(mockOpen).toHaveBeenCalledWith(expect.stringContaining('youtube.com'), '_blank');
      vi.unstubAllGlobals();
    });
  });

  describe('Genre Chips', () => {
    it('renders all genre chips', () => {
      render(<MovieCard movie={mockMovie} onMarkWatched={mockOnMarkWatched} onRateMovie={mockOnRateMovie} />);
      mockMovie.genre.forEach(g => {
        const chip = screen.getByText(g);
        expect(chip).toHaveClass('px-2', 'py-1', 'bg-gray-700', 'text-gray-300', 'text-xs', 'rounded-full');
      });
    });

    it('renders no genre chips if genre empty', () => {
      const noGenreMovie = { ...mockMovie, genre: [] };
      render(<MovieCard movie={noGenreMovie} onMarkWatched={mockOnMarkWatched} onRateMovie={mockOnRateMovie} />);
      expect(screen.queryByText('Action')).not.toBeInTheDocument();
      expect(screen.queryByText('Drama')).not.toBeInTheDocument();
    });
  });

  describe('Ratings', () => {
    it('renders IMDB rating with correct class', () => {
      render(<MovieCard movie={mockMovie} onMarkWatched={mockOnMarkWatched} onRateMovie={mockOnRateMovie} />);
      const rating = screen.getByText(String(mockMovie.imdbRating));
      expect(rating).toHaveClass('text-yellow-400', 'font-semibold');
    });

    it('renders both IMDB and user rating labels', () => {
      render(<MovieCard movie={{ ...mockMovie, userRating: 4 }} onMarkWatched={mockOnMarkWatched} onRateMovie={mockOnRateMovie} />);
      expect(screen.getByText(STRINGS.RATING_IMDB)).toBeInTheDocument();
      expect(screen.getByText(STRINGS.RATING_YOUR)).toBeInTheDocument();
    });

    it('calls onRateMovie when user rating changed', () => {
      render(<MovieCard movie={mockMovie} onMarkWatched={mockOnMarkWatched} onRateMovie={mockOnRateMovie} />);
      const stars = screen.getAllByLabelText(/rate \d star/i);
      fireEvent.click(stars[7]);
      expect(mockOnRateMovie).toHaveBeenCalledWith(mockMovie.id, 3);
    });
  });

  describe('Recommendation Badge', () => {
    it('shows badge and ring when recommended', () => {
      const { container } = render(
        <MovieCard
          movie={mockMovie}
          onMarkWatched={mockOnMarkWatched}
          onRateMovie={mockOnRateMovie}
          isRecommended={true}
        />
      );
      expect(screen.getByText(STRINGS.MOVIE_RECOMMENDED_BADGE)).toBeInTheDocument();
      expect(container.firstChild).toHaveClass('ring-2');
    });
  });
});
