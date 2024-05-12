import { Request, Response, NextFunction } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user; // Retrieve the decoded user info added by the authenticate middleware

  if (!user || user.role !== "admin") {
    return res
      .status(403)
      .json({
        message: "Forbidden: Only Admin user can perform this operation ",
      });
  }

  next();
};

export const isSuperAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user; 

  if (!user || user.role !== "super-admin") {
    return res
      .status(403)
      .json({
        message: "Forbidden: Only Super Admin user can perform this operation ",
      });
  }

  next(); 
};
