import { requireAuthError } from "@sagi-ticketing/common";
import { NextFunction, Request, Response } from "express";

export const requireAuthMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) return requireAuthError([], next);
  next();
};
