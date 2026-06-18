import { createSlice } from "@reduxjs/toolkit";
import { getMoviesAsync } from "./moviesThunk";
import type { Movie } from "./types";

interface MoviesState {
  movies: Movie[];
  isLoading: boolean;
}

const initialState: MoviesState = {
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
  },
});

export default moviesSlice.reducer;
