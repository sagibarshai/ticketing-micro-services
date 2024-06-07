import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userPayload } from "../../models/db/user/types";

declare global {
  namespace Express {
    interface Request {
      currentUser: userPayload;
    }
  }
}

export const currentUserMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  const userJwt = req.session?.jwt;
  if (!userJwt) next();
  try {
    const userPayload = jwt.verify(userJwt, process.env.JWT_KEY!) as userPayload;
    req.currentUser = userPayload;
  } catch (err) {}
  next();
};
