import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import { setCookieHeaderAndSendResponse } from "../../utils/cookies";
import AppError from "../../utils/appError";
import { Types } from "mongoose";
import User from "../user/user.model";

export default class AuthController {
  static async signup(req: Request, res: Response): Promise<void> {
    const data = await authService.signupUser(req.body);

    setCookieHeaderAndSendResponse(res, 201, data);
  }

  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const data = await authService.loginUser(req.body);

    if (!data) return next(new AppError("Invalid Credentials", 401));

    setCookieHeaderAndSendResponse(res, 200, data);
  }

  static async updatePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { userId, body } = req;
    const data = await authService.updateUserPassword(
      userId as Types.ObjectId,
      body
    );

    if (!data) return next(new AppError("Current Password is incorrect", 400));

    setCookieHeaderAndSendResponse(res, 200, data);
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
}
