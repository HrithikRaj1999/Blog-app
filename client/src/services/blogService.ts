import axios from "axios";
import { API_ROUTES } from "../Router/BlogRoute";
import { Blog } from "../Types";
import { AppDispatch } from "../store/store";
import {
  requestBlogFailure,
  requestBlogStart,
  requestBlogSuccess,
} from "../ReduxSlice/blogSlice";
import { requestFailure } from "../ReduxSlice/authSlice";

// Create a new blog
export const createBlog =
  (blogData: Partial<Blog>) => async (dispatch: AppDispatch) => {
    dispatch(requestBlogStart());
    try {
      const response = await axios.post(API_ROUTES.CREATE_BLOG, blogData, {
        withCredentials: true,
      });
      if (response.status === 201)
        dispatch(requestBlogSuccess(response.data.blog));
      else {
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
export const updateBlog = async (id: string, blogData: Partial<Blog>) => {
  try {
    const response = await axios.patch(API_ROUTES.UPDATE_BLOG(id), blogData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating blog with ID ${id}:`, error);
    throw error;
  }
};

// Delete a blog by ID
export const deleteBlog = async (id: string) => {
  try {
    const response = await axios.delete(API_ROUTES.DELETE_BLOG(id), {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting blog with ID ${id}:`, error);
    throw error;
  }
};

// Fetch a single blog by ID
export const fetchSingleBlog = async (id: string) => {
  try {
    const response = await axios.get(API_ROUTES.FETCH_SINGLE_BLOG(id), {
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
    const response = await axios.get(API_ROUTES.FETCH_ALL_BLOGS, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    throw error;
  }
};
