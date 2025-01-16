import errorResponse from "../utils/errorResponse.js";

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // mongoose cast Error
  if (err.name === "castError") {
    const message = "Resources Not Found";
    error = new errorResponse(message, 404);
  }

  //  Duplicate Key error
  if (err.code == 11000) {
    const message = " Duplicate field value entered";
    error = new errorResponse(message, 400);
  }
  //   Mngoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new errorResponse(message, 400);
    res.status(error.statuscode || 500).json({
      success: false,
      error: error.message || "Server Error"
    });
  }
};

export default errorHandler;
