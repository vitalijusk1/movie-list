import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiRoutes } from "../../../api/api";
import { MOVIE_ACTIONS } from "./movieActionTypes";
import axiosInstance from "../../../api/axiosInstance";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import type {
  Genre,
  Movie,
  PaginatedMoviesResponse,
  SortOption,
} from "./types";

interface GetMoviesParams {
  genreIds?: number[];
  search?: string;
  minRating?: string;
  maxRating?: string;
  page?: number;
  perPage?: number;
  sort?: string;
}

export const getMoviesAsync = createAsyncThunk<
  PaginatedMoviesResponse,
  GetMoviesParams
>(
  MOVIE_ACTIONS.GET_ALL,
  async ({
    genreIds = [],
    search = "",
    minRating,
    maxRating,
    page = 1,
    perPage = 12,
    sort,
  }: GetMoviesParams = {}) => {
    const params = new URLSearchParams();
    if (genreIds.length > 0) params.set("genreIds", genreIds.join(","));
    if (search.trim()) params.set("search", search.trim());
    if (minRating) params.set("minRating", minRating);
    if (maxRating) params.set("maxRating", maxRating);
    if (sort) params.set("sort", sort);
    params.set("page", String(page));
    params.set("perPage", String(perPage));
    const query = params.toString() ? `?${params.toString()}` : "";
    const response = await axiosInstance.get(apiRoutes.movies(query));
    return response.data;
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

export const getSortOptionsAsync = createAsyncThunk<SortOption[]>(
  MOVIE_ACTIONS.GET_SORT_OPTIONS,
  async () => {
    try {
      const response = await axiosInstance.get(apiRoutes.sortOptions());
      return response.data;
    } catch (error) {
      console.error("Failed to fetch sort options:", error);
      return [];
    }
  },
);

export const getMovieAsync = createAsyncThunk<Movie, string>(
  MOVIE_ACTIONS.GET_BY_ID,
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<Movie>(apiRoutes.movie(movieId));
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);
