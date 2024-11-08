import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export abstract class CustomError extends Error {
  abstract statusCode: number;

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

  let description = err.message;

  if (err instanceof ZodError) description = JSON.parse(err.message);

  res.status(status).json({
    status,
    description,
  });
};
