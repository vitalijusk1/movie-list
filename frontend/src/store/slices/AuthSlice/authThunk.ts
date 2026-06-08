import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginReq, RegisterReq } from "./types";
import axiosInstance from "../../../api/axiosInstance";
import { apiRoutes } from "../../../api/api";
import { clearUser, setUser } from "../UserSlice/userSlice";


export const registerAsync = createAsyncThunk(
  "auth/register",
  async (payload: RegisterReq) => {
    try {
      const response = await axiosInstance.post(apiRoutes.register(), payload);
      return response.data.user;
    } catch (error) {
      console.error("Registration failed:", error);
    }
  },
);

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (payload: LoginReq, { dispatch }) => {
    try {
      const response = await axiosInstance.post(apiRoutes.login(), payload);
      dispatch(setUser(response.data.user));
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
    }
  },
);


export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      await axiosInstance.post(apiRoutes.logout());
      dispatch(clearUser());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },
);
