import { Request, Response } from "express";

const signUp = (req: Request, res: Response) => {
  res.send("Hi there");
};

export { signUp as signUpController };
