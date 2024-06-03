import { NextFunction } from "express";
import { CustomNotFoundError, errorsEnum } from "../middlewares/errors/types";

type SerializeErrorsReturnType = ReturnType<CustomNotFoundError["serializeErrors"]>;
type SerializeErrorsErrorsType = SerializeErrorsReturnType["errors"];

export const notFoundError = (errors: SerializeErrorsErrorsType, next: NextFunction) => {
  const reason = errorsEnum.NOT_FOUND_ERROR;

  const serializeErrors = (): ReturnType<CustomNotFoundError["serializeErrors"]> => {
    return {
      statusCode: 404,
      errors: errors.length ? errors.map((e) => ({ message: e.message })) : [{ message: "Not Found" }],
    };
  };

  next({ reason, serializeErrors });
};
