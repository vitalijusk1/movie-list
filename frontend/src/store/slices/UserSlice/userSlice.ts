import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./types";
import {
  getCurrentUserAsync,
  loginAsync,
  logoutAsync,
  registerAsync,
} from "./userThunk";

interface UserState {
  user: User | null;
  isAuthFormLoading: boolean;
  isLogoutLoading: boolean;
  isSessionLoading: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthFormLoading: false,
  isLogoutLoading: false,
  isSessionLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.pending, (state) => {
      state.isAuthFormLoading = true;
    });
    builder.addCase(loginAsync.fulfilled, (state) => {
      state.isAuthFormLoading = false;
    });
    builder.addCase(loginAsync.rejected, (state) => {
      state.isAuthFormLoading = false;
    });
    builder.addCase(registerAsync.pending, (state) => {
      state.isAuthFormLoading = true;
    });
    builder.addCase(registerAsync.fulfilled, (state) => {
      state.isAuthFormLoading = false;
    });
    builder.addCase(registerAsync.rejected, (state) => {
      state.isAuthFormLoading = false;
    });
    builder.addCase(logoutAsync.pending, (state) => {
      state.isLogoutLoading = true;
    });
    builder.addCase(logoutAsync.fulfilled, (state) => {
      state.isLogoutLoading = false;
    });
    builder.addCase(logoutAsync.rejected, (state) => {
      state.isLogoutLoading = false;
    });
    builder.addCase(getCurrentUserAsync.pending, (state) => {
      state.isSessionLoading = true;
    });
    builder.addCase(getCurrentUserAsync.fulfilled, (state) => {
      state.isSessionLoading = false;
    });
    builder.addCase(getCurrentUserAsync.rejected, (state) => {
      state.isSessionLoading = false;
    });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
