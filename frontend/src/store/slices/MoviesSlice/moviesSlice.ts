import { createSlice } from "@reduxjs/toolkit";
import {
  getMoviesAsync,
  getGenresAsync,
  getSortOptionsAsync,
  getMovieAsync,
} from "./moviesThunk";
import type { Movie, Genre, SortOption } from "./types";

interface MoviesState {
  genres: Genre[];
  movies: Movie[];
  sortOptions: SortOption[];
  total: number;
  isLoading: boolean;
  currentMovie: Movie | null;
  isMovieLoading: boolean;
  movieError: string | null;
}

const initialState: MoviesState = {
  genres: [],
  movies: [],
  sortOptions: [],
  total: 0,
  isLoading: false,
  currentMovie: null,
  isMovieLoading: false,
  movieError: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearCurrentMovie: (state) => {
      state.currentMovie = null;
      state.movieError = null;
      state.isMovieLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMoviesAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMoviesAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.movies = action.payload.movies;
      state.total = action.payload.total;
    });
    builder.addCase(getMoviesAsync.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getGenresAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getGenresAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.genres = action.payload;
    });
    builder.addCase(getGenresAsync.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getSortOptionsAsync.fulfilled, (state, action) => {
      state.sortOptions = action.payload;
    });
    builder.addCase(getMovieAsync.pending, (state) => {
      state.isMovieLoading = true;
      state.movieError = null;
    });
    builder.addCase(getMovieAsync.fulfilled, (state, action) => {
      state.isMovieLoading = false;
      state.currentMovie = action.payload;
    });
    builder.addCase(getMovieAsync.rejected, (state, action) => {
      state.isMovieLoading = false;
      state.movieError = (action.payload as string) ?? "Failed to load movie";
    });
  },
});

export const { clearCurrentMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
