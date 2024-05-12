import axios from "axios";
import { BLOG_API_ROUTES } from "../Router/BlogRoute";
import { Blog } from "../Types";
import { AppDispatch } from "../store/store";
import {
  addBlog,
  editBlog,
  removeBlog,
  requestBlogFailure,
  requestBlogStart,
  requestBlogSuccess,
} from "../ReduxSlice/blogSlice";
import { requestFailure } from "../ReduxSlice/authSlice";

export const createBlog =
  (blogData: Partial<Blog>) => async (dispatch: AppDispatch) => {
    dispatch(requestBlogStart());
    try {
      const response = await axios.post(BLOG_API_ROUTES.CREATE_BLOG, blogData, {
        withCredentials: true,
      });
      if (response.status === 201) {
        dispatch(requestBlogSuccess());
        dispatch(addBlog(response.data.blog));
      } else {
        dispatch(requestBlogFailure("Failed to authenticate"));
      }
    } catch (error: any) {
      console.error("Error creating blog:", error);
      dispatch(
        requestFailure(error.response?.data?.message || "Network error")
      );
      throw error;
    }
  };

// Update an existing blog
export const updateBlog =
  (id: string, blogData: Partial<Blog>) => async (dispatch: AppDispatch) => {
    dispatch(requestBlogStart());
    try {
      const response = await axios.patch(
        BLOG_API_ROUTES.UPDATE_BLOG(id),
        blogData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        dispatch(requestBlogSuccess());
        dispatch(editBlog(response.data.blog));
      } else {
        dispatch(requestBlogFailure("Failed to authenticate"));
      }
    } catch (error: any) {
      console.error(`Error updating blog with ID ${id}:`, error);
      dispatch(
        requestFailure(error.response?.data?.message || "Network error")
      );
      throw error;
    }
  };

// Delete a blog by ID
export const deleteBlog = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(requestBlogStart());
  try {
    const response = await axios.delete(BLOG_API_ROUTES.DELETE_BLOG(id), {
      withCredentials: true,
    });
    if (response.status === 200) {
      dispatch(requestBlogSuccess());
      dispatch(removeBlog(id));
    } else {
      dispatch(requestBlogFailure("Failed to authenticate"));
    }
  } catch (error) {
    console.error(`Error deleting blog with ID ${id}:`, error);
    throw error;
  }
};

// Fetch a single blog by ID
export const fetchSingleBlog = async (id: string) => {
  try {
    const response = await axios.get(BLOG_API_ROUTES.FETCH_SINGLE_BLOG(id), {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog with ID ${id}:`, error);
    throw error;
  }
};

// Fetch all blogs
export const fetchAllBlogs = async () => {
  try {
    const response = await axios.get(BLOG_API_ROUTES.FETCH_ALL_BLOGS, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    throw error;
  }
};
