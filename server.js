import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import morgan from "morgan";
import colors from "colors";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();


app.listen(PORT, () => {
  console.log(chalk.green.bold(`ChatGPT clone is running at - ${PORT} -----`.bgWhite));
});
