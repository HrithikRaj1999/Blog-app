import express from "express";
import { login, signout, signup } from "../controller/auth.controller";
const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/signout", signout);
export default authRouter;
