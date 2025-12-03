import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../utils/appError";
import { env } from "../config/env";

export const protect = (
  req: Request,
  _: Response,
  next: NextFunction
): void => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(
      new AppError("Please log in to have access to the resource", 401)
    );
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    req.userId = decoded.id;
    next();
  } catch (error) {
    next(error);
  }
};
