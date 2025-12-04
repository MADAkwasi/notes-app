import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { globalErrorHandler } from "./utils/errorController";
import AppError from "./utils/appError";

import authRouter from "./modules/auth/auth.route";
import notesRouter from "./modules/note/note.route";
import { env } from "./config/env";

const app: Express = express();

if (env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/notes", notesRouter);

app.all("/{*splat}", (req: Request, _: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
