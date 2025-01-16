import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import errorHandler from "./middlewares/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(errorHandler);

// Routes
app.use("/api/v1.auth", authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(
    `------ ChatGPT clone is running in ${process.env.DEV_MODE} at - ${PORT} -------`
      .bgYellow.gray.bold
  );
});
