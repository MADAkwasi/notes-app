import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import AppError from "./appError";

function isMongoDuplicateKeyError(
  error: unknown
): error is { code: number; keyValue: Record<string, unknown> } {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: unknown }).code === 11000
  );
}

function isJWTError(error: unknown): error is { name: string } {
  return typeof error === "object" && error !== null && "name" in error;
}

export const globalErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  let status = "error";
  let message = "Something went wrong!";

  if (err instanceof ZodError) {
    statusCode = 400;
    status = "fail";
    message =
      process.env.NODE_ENV === "development"
        ? "Validation error"
        : "Invalid input data";

    return res.status(statusCode).json({
      status,
      message,
      ...(process.env.NODE_ENV === "development" && { errors: err.issues }),
    });
  }

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    status = err.status;
    message = err.message;
    return res.status(statusCode).json({ status, message });
  }

  if (isMongoDuplicateKeyError(err)) {
    const value = Object.values(err.keyValue)[0];
    statusCode = 400;
    status = "fail";
    message = `Duplicate field. ${value} is already in use`;
    return res.status(statusCode).json({ status, message });
  }

  if (isJWTError(err) && err.name === "JsonWebTokenError") {
    statusCode = 401;
    status = "fail";
    message = "Invalid or expired token. Please log in again.";
    return res.status(statusCode).json({ status, message });
  }

  console.error("🔴 UNHANDLED ERROR:", err);
  return res.status(statusCode).json({ status, message });
};
