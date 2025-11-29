import app from "./app";
import connectDB from "./config/db";
import { env } from "./config/env";

const startServer = async () => {
  await connectDB();
};

startServer().then(() => {
  app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
  });
});
