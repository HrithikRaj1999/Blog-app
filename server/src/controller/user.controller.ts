import { Request, Response, NextFunction } from "express";
import UserModel from "../model/user.model";
import { ErrorHandler } from "../types/ErrorHandler-type";
import bcrypt from "bcrypt";

// Fetch all users (admin only)
export const fetchAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    next(new ErrorHandler(500, "Server Error: Unable to fetch users"));
  }
};

// Fetch a single user by ID
export const fetchSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return next(new ErrorHandler(404, "User not found"));
    }
    res.status(200).json(user);
  } catch (error) {
    next(new ErrorHandler(500, "Server Error: Unable to fetch user"));
  }
};

// Update a user's basic information
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  if (!password) return next(new ErrorHandler(400, "Password is must on update"));
  if (!name && !email) {
    return next(new ErrorHandler(400, "Please provide fields to update"));
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { name, email, password: hashedPassword },
      { new: true }
    );
    if (!updatedUser) {
      return next(new ErrorHandler(404, "User not found"));
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    next(new ErrorHandler(500, "Server Error: Unable to update user"));
  }
};

// Delete a user (admin only)
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return next(new ErrorHandler(404, "User not found"));
    }
    res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    next(new ErrorHandler(500, "Server Error: Unable to delete user"));
  }
};
