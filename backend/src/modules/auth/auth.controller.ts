import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import { setCookieHeaderAndSendResponse } from "../../utils/cookies";
import AppError from "../../utils/appError";
import { Types } from "mongoose";
import User from "../user/user.model";

export default class AuthController {
  static async signup(req: Request, res: Response): Promise<void> {
    const token = await authService.signupUser(req.body);

    setCookieHeaderAndSendResponse(res, 201, token);
  }

  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const token = await authService.loginUser(req.body);

    if (!token) return next(new AppError("Invalid Credentials", 401));

    setCookieHeaderAndSendResponse(res, 200, token);
  }

  static async updatePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { userId, body } = req;
    const token = await authService.updateUserPassword(
      userId as Types.ObjectId,
      body
    );

    if (!token) return next(new AppError("Current Password is incorrect", 400));

    setCookieHeaderAndSendResponse(res, 200, token);
  }

  static async getMe(req: Request, res: Response): Promise<void> {
    const user = await User.findById(req.userId).select("-__v");

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }

  static async logout(_: Request, res: Response): Promise<void> {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  }
}
