import { NextFunction } from "express";
import { CustomDatabaseError, errorsEnum } from "../middlewares/errors/types";

type SerializeErrorsReturnType = ReturnType<CustomDatabaseError["serializeErrors"]>;
type SerializeErrorsErrorsType = SerializeErrorsReturnType["errors"];

export const databaseRequestError = (errors: SerializeErrorsErrorsType, next: NextFunction) => {
  const reason = errorsEnum.DATABASE_ERROR;

  const serializeErrors = (): SerializeErrorsReturnType => {
    return {
      statusCode: 500,
      errors: errors.length ? errors.map((e) => ({ message: e.message })) : [{ message: "Database connection error" }],
    };
  };

  next({ reason, serializeErrors });
};
