import { createSlice } from "@reduxjs/toolkit";

interface MoviesState {
  movies: string[];
}

const initialState: MoviesState = {
  movies: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
});

export default moviesSlice.reducer;
