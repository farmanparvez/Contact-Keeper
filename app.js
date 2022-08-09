const express = require("express");
// const morgan = require("morgan");
const path = require('path')

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const authRouter = require("./routes/authRouter");
const app = express();

// if (process.env.NODE_ENV.trim() === "development") {
//   app.use(morgan("dev"));
// }
// console.log(process.env.NODE_ENV)
app.use(express.json());
// app.get('/',() => res.send('running'))
app.use("/", authRouter);

if(process.env.NODE_ENV.trim() === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

app.all("*", (req, res, next) => {
  //   res.status(404).json({
  //     status: "failed",
  //     message: `Can't find ${req.originalUrl} on this server`,
  //   });
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
  //   const err = new Error(`Can't find ${req.originalUrl} on this server`);
  //   err.statusCode = 404,
  //   err.status = 'failed'
  //   next(err)
});

// app.use(globalErrorHandler);



module.exports = app;
