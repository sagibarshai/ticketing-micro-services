import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const currentUser = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ user: req.currentUser || null });
};

export { currentUser as currentUserController };
