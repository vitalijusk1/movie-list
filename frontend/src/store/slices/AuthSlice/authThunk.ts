import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginReq, RegisterReq } from "./types";
import axiosInstance from "../../../api/axiosInstance";
import { apiRoutes } from "../../../api/api";
import { clearUser, setUser } from "../UserSlice/userSlice";
import { AUTH_ACTIONS } from "./authActionTypes";

export const registerAsync = createAsyncThunk(
  AUTH_ACTIONS.REGISTER,
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
  AUTH_ACTIONS.LOGIN,
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
  AUTH_ACTIONS.LOGOUT,
  async (_, { dispatch }) => {
    try {
      await axiosInstance.post(apiRoutes.logout());
      dispatch(clearUser());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },
);

export const getCurrentUserAsync = createAsyncThunk(
  AUTH_ACTIONS.GET_CURRENT_USER,
  async (_, { dispatch }) => {
    try {
      const response = await axiosInstance.get(apiRoutes.me());
      dispatch(setUser(response.data));
      return response.data;
    } catch (error) {
      console.error("Get current user failed:", error);
    }
  },
);
