import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Blog } from "../Types";
import axios from "axios";
import { API_ROUTES } from "../Router/BlogRoute";

interface BlogState {
  blogs: Blog[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Blog[]>(API_ROUTES.FETCH_ALL_BLOGS, {
        withCredentials: true,
      });
      console.log({ InRedux: response.data });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.toString());
    }
  }
);
const initialState: BlogState = {
  blogs: [],
  status: "idle",
  error: null,
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    requestBlogStart: (state) => {
      state.status = "loading";
    },
    requestBlogSuccess: (state) => {
      state.status = "succeeded";
    },
    requestBlogFailure: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.error = action.payload;
    },
    addBlog: (state, action: PayloadAction<Blog>) => {
      state.blogs.push(action.payload);
    },
    editBlog: (state, action: PayloadAction<Blog>) => {
      const index = state.blogs.findIndex(
        (blog) => blog._id === action.payload._id
      );
      if (index !== -1) state.blogs[index] = action.payload;
    },
    deleteBlog: (state, action: PayloadAction<string>) => {
      state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const {
  requestBlogStart,
  requestBlogSuccess,
  requestBlogFailure,
  addBlog,
  editBlog,
  deleteBlog,
} = blogSlice.actions;

export default blogSlice.reducer;
