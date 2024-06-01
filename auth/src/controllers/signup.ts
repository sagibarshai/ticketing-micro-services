import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { badRequestError } from "../errors/bad-request-error";
import { databaseRequestError } from "../errors/database-connection-error";

interface SignUpRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

const signUp = (req: SignUpRequest, res: Response, next: NextFunction) => {
  const validateResult = validationResult(req);
  if (!validateResult.isEmpty()) return badRequestError(validateResult.array(), next);
  // return databaseRequestError([{ message: "database connection error" }, { message: "database is fucked up" }], next);

  const { email, password } = req.body;

  return res.status(201).json({ data: { email, password } });
};

export { signUp as signUpController };
