import { ValidationError } from "express-validator";

export enum errorsEnum {
  DATABASE_ERROR = "DATABASE_ERROR",
  BAD_REQUEST_ERROR = "BAD_REQUEST_ERROR",
  NOT_FOUND_ERROR = "NOT_FOUND_ERROR",
}

export interface DatabaseError {
  message: string;
}
export type BadRequestError = {
  filed?: string;
  message?: string;
} & Partial<ValidationError>;

export interface NotFoundError {
  message: string;
}

export interface CustomError<T> {
  reason: keyof typeof errorsEnum;
  serializeErrors: () => { statusCode: number; errors: T[] };
}

export interface CustomBadRequestError extends CustomError<BadRequestError> {}

export interface CustomDatabaseError extends CustomError<DatabaseError> {}

export interface CustomNotFoundError extends CustomError<NotFoundError> {}
