import { Document } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  photo?: string;
}

export interface IUserDocument extends IUser, Document {
  isPasswordCorrect(
    userPassword: string,
    savedPassword: string
  ): Promise<boolean>;
}
