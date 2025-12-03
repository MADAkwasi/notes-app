import { Response } from "express";
import { env } from "../config/env";
import { AuthResponse } from "../types/auth.type";

export const setCookieHeaderAndSendResponse = (
  res: Response,
  statusCode: number,
  data: AuthResponse
) => {
  res.cookie("jwt", data.token, {
    expires: new Date(Date.now() + +env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: env.NODE_ENV === "production",
    secure: true,
    sameSite: "lax",
  });

  res.status(statusCode).json({
    status: "success",
    data: {
      user: data.user,
    },
  });
};
