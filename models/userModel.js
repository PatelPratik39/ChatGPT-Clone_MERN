import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import cookie from "cookie";

// models
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is Required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlenght: [6, "Password length should be 6 character long"]
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

// hash Password
userSchema.pre("save", async function (next) {
  // update
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// match password
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Sign TOKEN

userSchema.methods.getSignedToken = function (res) {
  // Access Token
  const accessToken = JWT.sign(
    { id: this._id },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: JWT_ACCESS_EXPIREIN }
  );

  //   Refresh Token
  const refreshToken = JWT.sign(
    { id: this._id },
    process.env.JWT_REFRESH_TOKEN,
    { expiresIn: JWT_REFRESH_EXPIREIN }
  );
// cookie refresh token
  res.cookie("refreshToken", `${refreshToken}`, {
    maxAge: 86400 * 7000,
    httpOnly: true
  });
};

const User = mongoose.model("User", userSchema);

export default User;
