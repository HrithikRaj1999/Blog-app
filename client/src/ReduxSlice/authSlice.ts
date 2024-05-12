import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../Types";

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
  error: null,
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
      state.error = null;
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
    updateUserState: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const {
  requestStart,
  requestSuccess,
  requestFailure,
  signOut,
  updateUserState,
  
} = authSlice.actions;

export default authSlice.reducer;
