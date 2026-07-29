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
  isLoading: boolean;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
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
      state.isLoading = true;
    });
    builder.addCase(loginAsync.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(loginAsync.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(registerAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerAsync.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(registerAsync.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(logoutAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutAsync.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(logoutAsync.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getCurrentUserAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCurrentUserAsync.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getCurrentUserAsync.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
