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
const authRouter = express.Router();

authRouter.post("/signup", validateSignup, signup);
authRouter.post("/login", validateLogin, login);
authRouter.get("/signout", signout);
authRouter.post("/reset-password", validatePasswordReset, resetPassword);
export default authRouter;
