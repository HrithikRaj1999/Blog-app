// blog.routes.ts

import express from "express";
import {
  createNewBlog,
  updateBlog,
  deleteBlog,
  fetchSingleBlog,
  fetchAllBlogs,
} from "../controller/blog.controller";
import { isAdmin } from "../middleware/isAdmin";
import { authenticate } from "../middleware/requireAuth";

const blogRouter = express.Router();

blogRouter.post("/", authenticate, createNewBlog);
blogRouter.patch("/:id", authenticate, updateBlog);
blogRouter.delete("/:id", authenticate, isAdmin, deleteBlog);
blogRouter.get("/:id", fetchSingleBlog);
blogRouter.get("/", fetchAllBlogs);

export default blogRouter;
