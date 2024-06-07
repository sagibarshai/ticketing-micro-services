import { Request, Response } from "express";

const signOut = (req: Request, res: Response) => {
  req.session = null;
  res.status(200).json({ message: "Log out successfully" });
};

export { signOut as signOutController };
