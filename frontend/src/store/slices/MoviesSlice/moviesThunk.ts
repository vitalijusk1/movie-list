import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiRoutes } from "../../../api/api";
import { MOVIE_ACTIONS } from "./movieActionTypes";
import axiosInstance from "../../../api/axiosInstance";

export const getMoviesAsync = createAsyncThunk(
  MOVIE_ACTIONS.GET_ALL,
  async (genreIds: number[] = []) => {
    try {
      console.log(genreIds);
      const query =
        genreIds.length > 0 ? `?genreIds=${genreIds.join(",")}` : "";
      const response = await axiosInstance.get(`${apiRoutes.movies()}${query}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  },
);

export const getGenresAsync = createAsyncThunk(
  MOVIE_ACTIONS.GET_GENRES,
  async () => {
    try {
      const response = await axiosInstance.get(apiRoutes.genres());
      return response.data;
    } catch (error) {
      console.error("Failed to fetch genres:", error);
    }
  },
);
