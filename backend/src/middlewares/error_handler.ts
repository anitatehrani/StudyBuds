// src/middleware/errorHandler.ts
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/api_error";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof ApiError) {
    res.status(err.status).json({
      error: {
        message: err.message,
        status: err.status,
      },
    });
  } else {
    console.error(err);
    res.status(500).json({
      error: {
        message: "Something went wrong.",
        status: 500,
      },
    });
  }
}
