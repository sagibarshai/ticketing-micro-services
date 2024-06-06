import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { badRequestError } from "../errors/bad-request-error";
import { getUser, insertUser } from "../models/db/user";

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

  const userJwt = jwt.sign({ email: userInsertResult.email, id: userInsertResult.id }, process.env.JWT_KEY!);

  req.session = {
    jwt: userJwt,
  };

  return res.status(201).json({ data: { email: userInsertResult.email, id: userInsertResult.id } });
};

export { signUp as signUpController };
