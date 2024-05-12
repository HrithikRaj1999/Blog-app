import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store/store";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "super-admin";
}

interface UsersState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  status: "idle",
  error: null,
};

// Asynchronous thunk for fetching users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    if (
      state.auth.user?.role === "admin" ||
      state.auth.user?.role === "super-admin"
    ) {
      try {
        const response = await axios.get<User[]>(
          `${process.env.REACT_APP_SERVER_URL}/user`,
          { withCredentials: true }
        );
        return response.data;
      } catch (error: any) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch users"
        );
      }
    }
    return rejectWithValue("Not authorized to fetch users");
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = "failed";
      });
  },
});

export default usersSlice.reducer;
