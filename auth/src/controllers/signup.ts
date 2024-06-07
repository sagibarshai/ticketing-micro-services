import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { badRequestError } from "../errors/bad-request-error";
import { getUser, insertUser } from "../models/db/user";
import { userPayload } from "../models/db/user/types";

interface SignUpRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

const signUp = async (req: SignUpRequest, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const existingUser = await getUser(email);

  if (existingUser) return badRequestError([{ message: "user already exists" }], next);

  const userInsertResult = (await insertUser({ email, password }))!;

  const payload: userPayload = { email: userInsertResult.email, id: userInsertResult.id };

  const userJwt = jwt.sign(payload, process.env.JWT_KEY!);

  req.session = {
    jwt: userJwt,
  };

  return res.status(201).json({ data: payload });
};

export { signUp as signUpController };
