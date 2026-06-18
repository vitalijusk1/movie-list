import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiRoutes } from "../../../api/api";
import { MOVIE_ACTIONS } from "./movieActionTypes";
import axiosInstance from "../../../api/axiosInstance";

export const getMoviesAsync = createAsyncThunk(
  MOVIE_ACTIONS.GET_ALL,
  async () => {
    try {
       const response = await axiosInstance.get(apiRoutes.movies());
      return response.data;
    } catch (error) {
      console.error("Registration failed:", error);
    }
  },
);
