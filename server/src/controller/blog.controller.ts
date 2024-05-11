import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../types/ErrorHandler-type";
import BlogModel from "../model/blog.model";

export const createNewBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { heading, author, description, createdBy } = req.body;
    if (!heading || !author || !createdBy) {
      return next(new ErrorHandler(400, "Please fill all required fields"));
    }

    const newBlog = await BlogModel.create({
      heading,
      author,
      description,
      createdBy,
    });
    return res.status(201).json(newBlog);
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

  if (!heading && !author && !description && !createdBy) {
    return next(
      new ErrorHandler(400, "Please provide at least one field to update")
    );
  }

  try {
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      id,
      { heading, author, description, createdBy },
      { new: true }
    );

    if (!updatedBlog) {
      return next(new ErrorHandler(404, "Blog post not found"));
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    next(new ErrorHandler(500, "Server Error: Unable to update blog post"));
  }
};

// Delete a blog post
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
    const blogs = await BlogModel.find(query).populate("createdBy");
    res.status(200).json(blogs);
  } catch (error) {
    next(new ErrorHandler(500, "Server Error: Unable to retrieve blog posts"));
  }
};
