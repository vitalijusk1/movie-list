import { createSlice } from "@reduxjs/toolkit";
import { getMoviesAsync, getGenresAsync } from "./moviesThunk";
import type { Movie, Genre } from "./types";

interface MoviesState {
  genres: Genre[];
  movies: Movie[];
  isLoading: boolean;
}

const initialState: MoviesState = {
  genres: [],
  movies: [],
  isLoading: false,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMoviesAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMoviesAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.movies = action.payload;
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
  },
});

export default moviesSlice.reducer;
