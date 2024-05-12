import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  status: "idle",
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    requestStart: (state) => {
      state.status = "loading";
    },
    requestSuccess: (state, action: PayloadAction<User>) => {
      state.status = "succeeded";
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    requestFailure: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.error = action.payload;
    },
    signOut: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.status = "idle";
      state.error = null;
    },
  }
});

export const { requestStart, requestSuccess, requestFailure, signOut } = authSlice.actions;
export default authSlice.reducer;
