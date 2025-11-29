import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../config.env") });

interface EnvConfig {
  PORT: number;
  DB_STRING: string;
  DB_PASSWORD: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
}

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
};
