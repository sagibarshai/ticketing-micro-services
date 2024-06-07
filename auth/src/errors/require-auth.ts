import { NextFunction } from "express";
import { CustomError, RequireAuth, errorsEnum } from "../middlewares/errors/types";

export const requireAuthError = (errors: RequireAuth[], next: NextFunction) => {
  const reason = errorsEnum.REQUIRE_AUTH;
  const serializeErrors = (): ReturnType<CustomError<RequireAuth>["serializeErrors"]> => {
    return {
      statusCode: 401,
      errors: errors.length ? errors.map((e) => ({ message: e.message })) : [{ message: "Not authenticated" }],
    };
  };

  next({ reason, serializeErrors });
};
