import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { badRequestError } from "../errors/bad-request-error";
import { getUser, insertUser } from "../models/db/user";
import { compare } from "../models/db/user/utils";

interface SignUpRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

const signUp = async (req: SignUpRequest, res: Response, next: NextFunction) => {
  const validateResult = validationResult(req);
  if (!validateResult.isEmpty()) return badRequestError(validateResult.array(), next);

  const { email, password } = req.body;

  const existingUser = await getUser(email);

  if (existingUser) return badRequestError([{ message: "user already exists" }], next);

  const userInsertResult = (await insertUser({ email, password }))!;

  return res.status(201).json({ data: { email: userInsertResult.email } });
};

export { signUp as signUpController };
