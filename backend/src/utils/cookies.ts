import { Response } from "express";
import { env } from "../config/env";

export const setCookieHeaderAndSendResponse = (
  res: Response,
  statusCode: number,
  token: string
) => {
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + +env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: env.NODE_ENV === "production",
    secure: true,
    sameSite: env.NODE_ENV === "production" ? "strict" : "lax",
  });

  res.status(statusCode).json({
    status: "success",
  });
};
