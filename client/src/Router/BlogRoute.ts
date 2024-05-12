const BASE_URL = process.env.REACT_APP_SERVER_URL;

export const BLOG_API_ROUTES = {
  CREATE_BLOG: `${BASE_URL}/blog`,
  UPDATE_BLOG: (id: string) => `${BASE_URL}/blog/${id}`,
  DELETE_BLOG: (id: string) => `${BASE_URL}/blog/${id}`,
  FETCH_SINGLE_BLOG: (id: string) => `${BASE_URL}/blog/${id}`,
  FETCH_ALL_BLOGS: `${BASE_URL}/blog`
};
export const USER_API_ROUTES = {
  // CREATE_BLOG: `${BASE_URL}/blog`,
  UPDATE_USER: (id: string) => `${BASE_URL}/user/${id}`,
  // DELETE_BLOG: (id: string) => `${BASE_URL}/blog/${id}`,
  // FETCH_SINGLE_BLOG: (id: string) => `${BASE_URL}/blog/${id}`,
  // FETCH_ALL_BLOGS: `${BASE_URL}/blog`
};
