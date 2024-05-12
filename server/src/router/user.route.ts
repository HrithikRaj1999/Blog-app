import express from "express";
import {
  fetchAllUsers,
  fetchSingleUser,
  updateUser,
} from "../controller/user.controller";
import { deleteUser } from "../controller/superAdmin.controller";
import { isAdmin } from "../middleware/isAdmin";
import { validateUpdateUser } from "../middleware/validator";

const userRouter = express.Router();

userRouter.get("/", isAdmin, fetchAllUsers);
userRouter.get("/:id", fetchSingleUser);
userRouter.patch("/:id", validateUpdateUser, updateUser);
userRouter.delete("/:id", isAdmin, deleteUser);

export default userRouter;
