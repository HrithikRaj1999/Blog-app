import { Request, Response, NextFunction } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user; // Retrieve the decoded user info added by the authenticate middleware

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }

  next(); // User is an admin, proceed to the next middleware or route handler
};
