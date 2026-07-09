import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiRoutes } from "../../../api/api";
import { MOVIE_ACTIONS } from "./movieActionTypes";
import axiosInstance from "../../../api/axiosInstance";
import type { Genre } from "./types";

interface GetMoviesParams {
  genreIds?: number[];
  search?: string;
}

export const getMoviesAsync = createAsyncThunk(
  MOVIE_ACTIONS.GET_ALL,
  async ({ genreIds = [], search = "" }: GetMoviesParams = {}) => {
    try {
      const params = new URLSearchParams();
      if (genreIds.length > 0) params.set("genreIds", genreIds.join(","));
      if (search.trim()) params.set("search", search.trim());
      const query = params.toString() ? `?${params.toString()}` : "";
      const response = await axiosInstance.get(apiRoutes.movies(query));
      return response.data;
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  },
);

export const getGenresAsync = createAsyncThunk<Genre[]>(
  MOVIE_ACTIONS.GET_GENRES,
  async () => {
    try {
      const response = await axiosInstance.get(apiRoutes.genres());
      return response.data;
    } catch (error) {
      console.error("Failed to fetch genres:", error);
      return [];
    }
  },
);
