import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Define User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"]
  },
  customerId: {
    type: String,
    default: ""
  },
  subscription: {
    type: String,
    default: ""
  }
});

// Hash Password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match Password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Sign Access Token and Refresh Token
userSchema.methods.getSignedToken = function (res) {
  // Validate secrets
  if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
    throw new Error(
      "JWT secrets are not defined in the environment variables."
    );
  }
  // Access Token
  const accessToken = jwt.sign(
    { id: this._id },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIREIN || "15m" }
  );

  // Refresh Token
  const refreshToken = jwt.sign(
    { id: this._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIREIN || "7d" }
  );

  // Set Refresh Token in HTTP-Only Cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.DEV_MODE === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  // Return Access Token
  return accessToken;
};

// Create and Export User Model
const User = mongoose.model("User", userSchema);

export default User;
