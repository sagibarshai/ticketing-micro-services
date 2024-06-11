import { badRequestError } from "@sagi-ticketing/common";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validationRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return badRequestError(errors.array(), next);
  next();
};
