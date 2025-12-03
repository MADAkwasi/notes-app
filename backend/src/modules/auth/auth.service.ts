import jwt, { SignOptions } from "jsonwebtoken";
import { IUser } from "../../types/user.type";
import User from "../user/user.model";
import { env } from "../../config/env";
import { Types } from "mongoose";
import { AuthResponse, LoginData, PasswordUpdate } from "../../types/auth.type";

class AuthService {
  public async signupUser(data: IUser): Promise<AuthResponse> {
    const user = await User.create(data);
    const token = this.generateToken(user._id);

    return {
      token,
      user,
    };
  }

  public async loginUser(data: LoginData): Promise<AuthResponse | null> {
    const { email, password } = data;

    const user = await User.findOne({ email }).select("+password -__v");

    if (!user || !(await user.isPasswordCorrect(password, user.password)))
      return null;

    const token = this.generateToken(user._id);

    return {
      token,
      user,
    };
  }

  public async updateUserPassword(
    userId: Types.ObjectId,
    data: PasswordUpdate
  ): Promise<AuthResponse | null> {
    const { newPassword, currentPassword } = data;
    const user = await User.findById(userId).select("+password");

    if (
      !user ||
      !(await user.isPasswordCorrect(currentPassword, user.password))
    )
      return null;

    user.password = newPassword;
    await user.save();

    const token = this.generateToken(user._id);

    return {
      token,
      user,
    };
  }

  private generateToken(id: Types.ObjectId): string {
    const signupOption: SignOptions = {
      expiresIn: +env.JWT_EXPIRES_IN * 24 * 60 * 60,
    };

    return jwt.sign({ id }, env.JWT_SECRET, signupOption);
  }
}

export const authService = new AuthService();
