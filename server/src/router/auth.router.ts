import express from "express";
import {
  login,
  resetPassword,
  signout,
  signup,
} from "../controller/auth.controller";
import {
  validateLogin,
  validatePasswordReset,
  validateSignup,
} from "../middleware/validator";
import { authenticate } from "../middleware/requireAuth";
const authRouter = express.Router();

authRouter.post("/signup", validateSignup, signup);
authRouter.post("/login", validateLogin, login);
authRouter.get("/signout", authenticate, signout);
authRouter.post("/reset-password", validatePasswordReset, resetPassword);
export default authRouter;
