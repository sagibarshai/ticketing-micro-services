import { Request, Response, NextFunction } from "express";
import { FieldValidationError } from "express-validator";

export enum errorsEnum {
  DATABASE_ERROR = "DATABASE_ERROR",
  BAD_REQUEST_ERROR = "BAD_REQUEST_ERROR",
}

export interface CustomError {
  reason: keyof typeof errorsEnum;
}

export interface CustomBadRequestError extends CustomError {
  errors: FieldValidationError[];
}

export interface CustomDatabaseError extends CustomError {
  errors: { message: string }[];
}

const errorHandler = (err: CustomBadRequestError | CustomDatabaseError, req: Request, res: Response, next: NextFunction) => {
  if (err.reason === "BAD_REQUEST_ERROR") {
    const error = err as CustomBadRequestError;
    return res.status(400).json({ errors: error.errors.map((e) => ({ filed: e.path, message: e.msg })) });
  } else if (err.reason === "DATABASE_ERROR") return res.status(500).json({ errors: err.errors });

  return res.status(500).json({ errors: [{ message: "Something went wrong..." }] });
};

export { errorHandler };
