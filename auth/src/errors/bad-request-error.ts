import { NextFunction } from "express";
import { ValidationError } from "express-validator";
import { errorsEnum } from "../middlewares/error-handler";

export const badRequestError = (errors: ValidationError[], next: NextFunction) => {
  const reason = errorsEnum.BAD_REQUEST_ERROR;
  next({ reason, errors });
};
