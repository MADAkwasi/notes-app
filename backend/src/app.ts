import express, { Express } from "express";
import morgan from "morgan";

const app: Express = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

export default app;
