import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../model/user.model";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION!;

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRATION,
      }
    );
    req.session.token = token; // Store JWT in session

    res.status(201).send({ message: "Signup successful" });
  } catch (error) {
    next(error);
  }
};
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(401).send({ message: "Authentication failed" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(401).send({ message: "Authentication failed" });

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });
    req.session.token = token; // Store JWT in session

    res.status(200).send({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
};

export const signout = (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err); // Pass error to the error-handling middleware
    }

    res.clearCookie("connect.sid", { path: "/" }); // Clear the session cookie
    res.status(200).send({ message: "Signout successful" });
  });
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, password } = req.body; // confirmPassword is checked by express-validator now

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
};
