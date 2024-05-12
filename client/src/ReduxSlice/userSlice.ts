import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store/store";
import { User } from "../Types";

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
          {
            withCredentials: true,
          }
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
  reducers: {
    requestUserStart: (state) => {
      state.status = "loading";
    },
    requestUserSuccess: (state) => {
      state.status = "succeeded";
    },
    requestUserFailure: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.error = action.payload;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(
        (user) => user._id === action.payload._id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const {
  requestUserStart,
  requestUserSuccess,
  requestUserFailure,
  updateUser,
} = usersSlice.actions;

export default usersSlice.reducer;
