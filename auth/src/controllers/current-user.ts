import { Request, Response } from "express";

const currentUser = (req: Request, res: Response) => {
  res.send("Hi there");
};

export { currentUser as currentUserController };
