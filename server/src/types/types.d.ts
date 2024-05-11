import session from "express-session";
import { Request } from "express";ś

declare module "express-session" {
  export interface SessionData {
    token?: string;
    user?: { userId: string; role: string };
  }
}

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      userId?: string;
      role?: string;
    };
  }
}
