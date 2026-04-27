import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginReq, RegisterReq } from "./types";
import axiosInstance from "../../../api/axiosInstance";
import { apiRoutes } from "../../../api/api";

export const registerAsync = createAsyncThunk(
  "auth/register",
  async (payload: RegisterReq) => {
    try {
      const response = await axiosInstance.post(apiRoutes.register(), payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (payload: LoginReq) => {
    try {
      const response = await axiosInstance.post(apiRoutes.login(), payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);
