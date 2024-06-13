import { NextFunction, Request, Response } from "express";
import { badRequestError } from "@sagi-ticketing/common";
import { getUser } from "../models/db/user";
import { compare } from "../models/db/user/utils";
import jwt from "jsonwebtoken";

export interface SignInRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

const signIn = async (req: SignInRequest, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const user = await getUser(email);

  if (!user) return badRequestError([{ message: "User with this email does not exists" }], next);

  const passwordsMatch = await compare(password, user.password);

  if (!passwordsMatch) return badRequestError([{ message: "Password is wrong" }], next);

  const payload = { email: user.email, id: user.id };
  console.log(process.env.JWT_KEY);
  const userJwt = jwt.sign(payload, process.env.JWT_KEY!);

  req.session = {
    jwt: userJwt,
  };
  return res.status(200).json({ data: payload });
};

export { signIn as signInController };
