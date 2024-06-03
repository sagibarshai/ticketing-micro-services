import { NextFunction } from "express";
import { BadRequestError, CustomBadRequestError, errorsEnum } from "../middlewares/errors/types";

export const badRequestError = (errors: BadRequestError[], next: NextFunction) => {
  const reason = errorsEnum.BAD_REQUEST_ERROR;
  const serializeErrors = (): ReturnType<CustomBadRequestError["serializeErrors"]> => {
    return {
      statusCode: 400,
      errors: errors.length
        ? errors.map((e) => ({ message: e.msg || e.message, filed: e.type === "field" ? e.path : e.type }))
        : [{ message: "Validation error" }],
    };
  };

  next({ reason, serializeErrors });
};
