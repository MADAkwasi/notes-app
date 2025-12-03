import dotenv from "dotenv";
import path from "path";
import { EnvConfig } from "../types/env.type";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const DB =
  process.env.DB_STRING?.replace(
    "<db_password>",
    process.env.DB_PASSWORD || ""
  ) || "";

export const env: EnvConfig = {
  PORT: Number(process.env.PORT) ?? 3000,
  DB_STRING: DB,
  DB_PASSWORD: process.env.DB_PASSWORD ?? "",
  JWT_SECRET: process.env.JWT_SECRET ?? "default_jwt_secret",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "1d",
  NODE_ENV: process.env.NODE_ENV ?? "development",
};
