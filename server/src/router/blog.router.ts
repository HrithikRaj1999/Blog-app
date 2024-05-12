import express from "express";
import {
  createNewBlog,
  updateBlog,
  deleteBlog,
  fetchSingleBlog,
  fetchAllBlogs,
} from "../controller/blog.controller";
import { isAdmin } from "../middleware/isAdmin";

const blogRouter = express.Router();

blogRouter.post("/", createNewBlog);
blogRouter.patch("/:id", updateBlog);
blogRouter.delete("/:id", isAdmin, deleteBlog);
blogRouter.get("/:id", fetchSingleBlog);
blogRouter.get("/", fetchAllBlogs);

export default blogRouter;
