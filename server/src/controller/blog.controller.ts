import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../types/ErrorHandler-type";
import BlogModel from "../model/blog.model";

export const createNewBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { heading, author, description } = req.body;
    if (!heading || !author) {
      return next(new ErrorHandler(400, "Please fill all required fields"));
    }

    const newBlog = await BlogModel.create({
      heading,
      author,
      description,
      createdBy: req.user?.userId,
    });
    return res.status(201).json({ blog: newBlog });
  } catch (error) {
    next(new ErrorHandler(500, "Server Error: Unable to create blog post"));
  }
};

// Update an existing blog post
export const updateBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { heading, author, description, createdBy } = req.body;
  const userId = req?.user?.userId;

  if (!heading && !author && !description && !createdBy) {
    return next(
      new ErrorHandler(400, "Please provide at least one field to update")
    );
  }

  try {
    // First, find the blog post to verify the owner
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return next(new ErrorHandler(404, "Blog post not found"));
    }

    // Check if the logged-in user is the creator of the blog post
    if (blog.createdBy.toString() !== userId) {
      return next(
        new ErrorHandler(403, "Unauthorized: Cannot edit this blog post")
      );
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(
      id,
      { heading, author, description, createdBy },
      { new: true }
    );

    res.status(200).json({ blog: updatedBlog });
  } catch (error) {
    next(new ErrorHandler(500, "Server Error: Unable to update blog post"));
  }
};

//  delete a blog post
export const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const deletedBlog = await BlogModel.findByIdAndDelete(id);

    if (!deletedBlog) {
      return next(new ErrorHandler(404, "Blog post not found"));
    }

    res.status(200).json({ message: "Blog post successfully deleted" });
  } catch (error) {
    next(new ErrorHandler(500, "Server Error: Unable to delete blog post"));
  }
};

// Get a single blog post by ID
export const fetchSingleBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const blog = await BlogModel.findById(id).populate("createdBy");

    if (!blog) {
      return next(new ErrorHandler(404, "Blog post not found"));
    }

    res.status(200).json(blog);
  } catch (error) {
    next(new ErrorHandler(500, "Server Error: Unable to retrieve blog post"));
  }
};

// Get multiple blog posts, optionally filtered by author
export const fetchAllBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { author } = req.query;
  let query: any = {};

  if (author) {
    query.author = new RegExp(author.toString(), "i");
  }

  try {
    const blogs = await BlogModel.find(query);
    res.status(200).json(blogs);
  } catch (error) {
    next(new ErrorHandler(500, "Server Error: Unable to retrieve blog posts"));
  }
};
