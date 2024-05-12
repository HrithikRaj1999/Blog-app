import express from "express";
import {
  createNewBlog,
  updateBlog,
  deleteBlog,
  fetchSingleBlog,
  fetchAllBlogs,
} from "../controller/blog.controller";

const blogRouter = express.Router();

blogRouter.post("/", createNewBlog);
blogRouter.patch("/:id", updateBlog);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/:id", fetchSingleBlog);
blogRouter.get("/", fetchAllBlogs);

export default blogRouter;
