import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Blog } from "../Types";

interface BlogState {
  blogs: Blog[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

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
    requestBlogSuccess: (state, action: PayloadAction<Blog[]>) => {
      state.status = "succeeded";
      state.blogs = [...state.blogs, ...action.payload];
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
