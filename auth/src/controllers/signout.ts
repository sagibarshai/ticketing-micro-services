import { Request, Response } from "express";

const signOut = (req: Request, res: Response) => {
  res.send("Hi there");
};

export { signOut as signOutController };
