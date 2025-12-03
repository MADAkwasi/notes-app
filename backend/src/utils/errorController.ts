import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import AppError from "./appError";

export const globalErrorHandler = (
  err: Error | AppError | ZodError<unknown>,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  // Default values
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const status = err instanceof AppError ? err.status : "error";

  // Development environment
  if (process.env.NODE_ENV === "development") {
    if (err instanceof ZodError) {
      return res.status(400).json({
        status: "fail",
        message: "Validation error",
        errors: err.issues, // <-- use issues instead of errors
        stack: err.stack,
      });
    }

    return res.status(statusCode).json({
      status,
      message: err.message,
      stack: err.stack,
    });
  }

  // Production environment
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid input data",
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      status: "fail",
      message: "Invalid or expired token. Please log in again.",
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  console.error("🔴 UNHANDLED ERROR:", err);

  return res.status(500).json({
    status: "error",
    message: "Something went wrong!",
  });
};
