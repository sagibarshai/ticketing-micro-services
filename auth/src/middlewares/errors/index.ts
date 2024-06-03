import { Request, Response, NextFunction } from "express";
import { CustomError, errorsEnum } from "./types";

const errorHandler = (err: CustomError<{}>, req: Request, res: Response, next: NextFunction) => {
  const errorsInformation = err.serializeErrors();
  if (err.reason in errorsEnum) return res.status(errorsInformation.statusCode).json({ errors: errorsInformation.errors });

  return res.status(500).json({ errors: [{ message: "Something went wrong..." }] });
};

export { errorHandler };
