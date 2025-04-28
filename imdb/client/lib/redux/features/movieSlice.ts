import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Movie, MovieCategories } from '@/lib/types/movies';
import { API_URL } from '@/lib/constants';
import { Audit } from '@/lib/types/audit';

interface MovieState {
  movies: Movie[];
  selectedMovie: Movie | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  selectedMovie: null,
  status: 'idle',
  error: null
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (category: MovieCategories) => {
  const response = await fetch(`${API_URL}/api/movies?category=${category}`);
  if (!response.ok) throw new Error('Failed to fetch movies');
  return response.json();
});

export const fetchMovieByImdbId = createAsyncThunk('movies/fetchMovieByImdbId', async (imdbId: string) => {
  const response = await fetch(`${API_URL}/api/movies/imdb/${imdbId}`);
  if (!response.ok) throw new Error('Failed to fetch movie');
  return response.json();
});

export const createMovie = createAsyncThunk('movies/createMovie', async (movie: Omit<Movie, keyof Audit | 'id'>) => {
  const response = await fetch(`${API_URL}/api/movies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie)
  });
  if (!response.ok) throw new Error('Failed to create movie');
  return response.json();
});

export const updateMovie = createAsyncThunk('movies/updateMovie', 
  async ({ id, movie }: { id: number; movie: Partial<Movie> }) => {
    const response = await fetch(`${API_URL}/api/movies/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie)
    });
    if (!response.ok) throw new Error('Failed to update movie');
    return response.json();
  }
);

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setSelectedMovie: (state, action: PayloadAction<Movie | null>) => {
      state.selectedMovie = action.payload;
    },
    clearMovieErrors: (state) => {
      state.error = null;
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Movies
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch movies';
      })
      // Fetch Movie by ID
      .addCase(fetchMovieByImdbId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovieByImdbId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieByImdbId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch movie';
      })
      // Create Movie
      .addCase(createMovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies.push(action.payload);
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create movie';
      })
      // Update Movie
      .addCase(updateMovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.movies.findIndex(movie => movie.id === action.payload.id);
        if (index !== -1) {
          state.movies[index] = action.payload;
        }
        if (state.selectedMovie?.id === action.payload.id) {
          state.selectedMovie = action.payload;
        }
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update movie';
      });
  }
});

// Export actions
export const { setSelectedMovie, clearMovieErrors } = movieSlice.actions;

// Selectors
export const selectAllMovies = (state: RootState) => state.movies.movies;
export const selectMovieById = (id: number) => (state: RootState) => {
  return state.movies.movies.find(movie => movie.id === id);
};
export const selectSelectedMovie = (state: RootState) => state.movies.selectedMovie;
export const selectMovieStatus = (state: RootState) => state.movies.status;
export const selectMovieError = (state: RootState) => state.movies.error;

// Export reducer
export default movieSlice.reducer; 