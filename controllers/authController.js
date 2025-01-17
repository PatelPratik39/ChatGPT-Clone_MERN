import errorHandler from "../middlewares/errorMiddleware.js";
import userModel from "../models/userModel.js";
import errorResponse from "../utils/errorResponse.js";

export const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    token
  });
};

// Register Controller

export const registerController = async (req, res, next) => {
  // console.log(`Incoming request: ${req.method} ${req.url}`);
  try {
    const { username, email, password } = req.body;

    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return next(new errorResponse("Email is already register !!", 400));
    }
    const user = await userModel.create({ username, email, password });
    sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Login Controller

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Validate inputs
    if (!email || !password) {
      return next(new errorResponse("Please provide email and password!", 400));
    }
    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new errorResponse("Invalid Credentials", 401));
    }
    
    // Check password match
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new errorResponse("Invalid Credentials", 401));
    }

    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const logoutController = async (req, res, next) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({
    success: true,
    message: "Logout Successfully!!"
  });
};
