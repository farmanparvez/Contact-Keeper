const AppError = require("../utils/appError");

const handleValidationError = (err) => {
  const message = Object.values(err.errors).map(val => val.message)
  return new AppError(message, 400)
}
const handleTokenExpiredError = () => {
  const message = 'Session expires login again!'
  return new AppError(message, 400)
}
const handleJsonWebTokenError = (err) => {
  let message = err.message
  if(message === 'invalid token' || message === 'invalid signature') message = 'Invalid token Please Login again!'
  return new AppError(message, 400)
}

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log("ERROR", err);
    res.status(500).json({
      status: "error",
      message: "something went wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV.trim() === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV.trim() === "production") {
    let error = err;
    if (err.name === 'ValidationError') error = handleValidationError(error)
    if (err.name === 'TokenExpiredError') error = handleTokenExpiredError()
    if (err.name === 'JsonWebTokenError') error = handleJsonWebTokenError(error)
    sendErrorProd(error, res);
  }
};
