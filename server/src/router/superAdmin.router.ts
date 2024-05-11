import { deleteUser, enableAdmin } from "../controller/superAdmin.controller";
import { isSuperAdmin } from "../middleware/isAdmin";
import express from "express";
const superAdminRouter = express.Router();

superAdminRouter.patch("/enableAdmin/:userId", isSuperAdmin, enableAdmin);
superAdminRouter.delete("/:userId", isSuperAdmin, deleteUser);
export default superAdminRouter;
