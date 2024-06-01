import { NextFunction } from "express";
import { CustomDatabaseError, errorsEnum } from "../middlewares/error-handler";

export const databaseRequestError = (errors: CustomDatabaseError["errors"], next: NextFunction) => {
  const reason = errorsEnum.DATABASE_ERROR;

  next({ reason, errors });
};
