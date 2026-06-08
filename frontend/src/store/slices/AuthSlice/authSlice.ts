import { createSlice } from "@reduxjs/toolkit";
import { loginAsync, logoutAsync } from "./authThunk";

interface AuthState {
  isLoading: boolean;
}

const initialState: AuthState = {
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
    builder.addCase(logoutAsync.pending, (state) => {
    state.isLoading = true;
    });
    builder.addCase(logoutAsync.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(logoutAsync.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default authSlice.reducer;
