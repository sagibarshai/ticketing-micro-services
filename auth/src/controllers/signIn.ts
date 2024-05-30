import { Request, Response } from "express";

const signIn = (req: Request, res: Response) => {
  res.send("Hi there");
};

export { signIn as signInController };
