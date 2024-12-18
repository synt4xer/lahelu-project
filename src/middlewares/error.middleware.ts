/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import { AppError } from '../errors/custom-errors';
import { ResponseUtil } from '../utils/response.util';

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  if (err instanceof AppError) {
    ResponseUtil.error(
      res,
      {
        code: err.code,
        message: err.message,
      },
      err.statusCode,
    );
    return;
  }

  // Handle unexpected errors
  ResponseUtil.error(
    res,
    {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred',
    },
    500,
  );
  return;
};
