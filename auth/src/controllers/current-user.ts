import { NextFunction, Request, Response } from "express";

const currentUser = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ user: req.currentUser || null });
};

export { currentUser as currentUserController };
