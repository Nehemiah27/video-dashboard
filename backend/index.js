import express, { json } from "express";
import cors from "cors";
import envCaptured from "./config/envValidation.js";
import connectDB from "./config/database.js";
import usersRoutes from "./routes/usersRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import setupSwagger from "./swagger/swaggerConfig.js";
import globalException from "./middlewares/globalException.js";

const app = express(),
  PORT = envCaptured.port;
connectDB(envCaptured.mongoose.url);
app.use(json({ limit: "50mb" }));
app.use(cors());
app.use("/api/view/uploads", express.static("uploads"));
setupSwagger(app);
app.use("/api/uploads", uploadRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use(errorHandler);
app.use(globalException);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`App is running on Port ${PORT}`);
});
