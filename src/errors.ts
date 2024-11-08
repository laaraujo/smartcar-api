import { NextFunction, Request, Response } from "express";

abstract class CustomError extends Error {
  abstract readonly statusCode?: number;

  constructor(message: string) {
    super(message);
  }
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    status,
    description: err.message,
  });
};
