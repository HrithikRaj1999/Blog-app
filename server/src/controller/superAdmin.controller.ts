import { Request, Response, NextFunction } from "express";
import UserModel from "../model/user.model";
import mongoose from "mongoose";
import BlogModel from "../model/blog.model";

export const enableAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { role: "admin" },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "User set to admin successful" });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    // Start a session and transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    // Delete the user
    const user = await UserModel.findByIdAndDelete(userId).session(session);
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).send({ message: "User not found" });
    }

    // Delete all blogs created by the user
    await BlogModel.deleteMany({ createdBy: userId }).session(session);

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    res
      .status(200)
      .send({ message: "User and all related blogs deleted successfully" });
  } catch (error) {
    next(error);
  }
};
