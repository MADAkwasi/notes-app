import { compare, hash } from "bcrypt";
import { model, Schema } from "mongoose";
import { IUserDocument } from "../../types/user.type";

const userSchema = new Schema<IUserDocument>({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    select: false,
  },
  photo: String,
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await hash(this.password, 12);
});

userSchema.methods.isPasswordCorrect = async function (
  userPassword: string,
  savedPassword: string
) {
  return await compare(userPassword, savedPassword);
};

const User = model<IUserDocument>("User", userSchema);

export default User;
