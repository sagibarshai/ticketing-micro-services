import { NextFunction, Request, Response } from "express";
import { requireAuthError } from "../../errors/require-auth";

export const requireAuthMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) return requireAuthError([], next);
  next();
};
