import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { envs } from "@/config/envs.plugin";

interface ErrorResponse {
  message: string;
  stack?: string;
}

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);

  const errorResponse: ErrorResponse = {
    message: getErrorMessage(err),
  };

  if (envs.ENVIRONMENT !== "PRODUCTION") {
    errorResponse.stack = err.stack;
  }

  res.json(errorResponse);
};
