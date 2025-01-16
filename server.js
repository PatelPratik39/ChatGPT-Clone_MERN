import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(
    `------ ChatGPT clone is running at - ${PORT} -------`.bgYellow.gray.bold
  );
});
