import { Router } from "express";
import { validate } from "../../middleware/validator";
import {
  loginUserSchema,
  signupUserSchema,
  updateUserPasswordSchema,
} from "./auth.schema";
import AuthController from "./auth.controller";
import { catchAsync } from "../../utils/catchAsync";
import { protect } from "../../middleware/auth";

const router = Router();

router
  .route("/signup")
  .post(validate(signupUserSchema), catchAsync(AuthController.signup));

router
  .route("/login")
  .post(validate(loginUserSchema), catchAsync(AuthController.login));

router.route("/logout").post(catchAsync(AuthController.logout));

router
  .route("/update-password")
  .post(
    protect,
    validate(updateUserPasswordSchema),
    AuthController.updatePassword
  );

router.route("/me").get(protect, AuthController.getMe);

export default router;
