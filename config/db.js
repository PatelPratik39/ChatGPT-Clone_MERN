import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv"

dotenv.config(); // Load environment variables
colors.enable(); // Enable colors in the console

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Connected to MongoDB Database ${mongoose.connection.host}`.bgGreen.white
    );
  } catch (error) {
    console.log(`MongoDB Database Error : ${error}`.bgRed.white);
  }
};

export default connectDB;
