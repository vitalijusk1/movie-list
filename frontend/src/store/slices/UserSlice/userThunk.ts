import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginReq, RegisterReq } from "./types";
import axiosInstance from "../../../api/axiosInstance";
import { apiRoutes } from "../../../api/api";
import { clearUser, setUser } from "./userSlice";
import { USER_ACTIONS } from "./userActionTypes";
import { getErrorMessage } from "../../../utils/getErrorMessage";

export const registerAsync = createAsyncThunk(
  USER_ACTIONS.REGISTER,
  async (payload: RegisterReq, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(apiRoutes.register(), payload);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const loginAsync = createAsyncThunk(
  USER_ACTIONS.LOGIN,
  async (payload: LoginReq, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(apiRoutes.login(), payload);
      dispatch(setUser(response.data.user));
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const logoutAsync = createAsyncThunk(
  USER_ACTIONS.LOGOUT,
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
  USER_ACTIONS.GET_CURRENT_USER,
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
