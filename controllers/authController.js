const Auth = require("../models/auth");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");
const AppError = require('../utils/appError')

const signToken = (id) => {
  console.log(typeof (process.env.EXPIRES_IN))
  return jwt.sign({ id }, process.env.JWTSECRET, { expiresIn: process.env.EXPIRES_IN } )
}

exports.signUp = catchAsync(async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;
  const auth = await Auth.findOne({ email });
  if (auth)
    return res
      .status(400)
      .json({ status: "failed", message: "User already exits" });
  const user = await Auth.create({
    username,
    email,
    password,
    confirmPassword,
  });

  const token = signToken(user._id)

  res.json({ status: "Success", message: "Sign up successfully", token });
  // jwt.sign(
  //   { id: user._id },
  //   process.env.JWTSECRET,
  //   { expiresIn: process.env.EXPIRES_IN },
  //   (err, token) => {
  //     if (err) throw err;
  //     res.json({ status: "Success", message: "Sign up successfully", token });
  //   }
  // );
});

exports.login = catchAsync( async (req, res, next) => {
  const { email, password } = req.body
  // checking email and password exits
  if(!email || !password) return next(new AppError('Please provide a email and password', 400))
  // checking user in database
  const user = await Auth.findOne({ email })
  // if not user return error message
  // if(!user) return next( new AppError("Incorrect email or password", 401) )

  // const isMatch = await user.correctPassword(password, user.password)

  // // const isMatch = await bcrypt.compare(password, user.password)

  if(!user || !(await user.correctPassword(password, user.password))) return next( new AppError("Incorrect email or password", 401) ) 

  const token = signToken(user._id)
  res.json({ status: "Success", message: "Login up successfully", token });

})

exports.getAllUser = catchAsync( async ( req, res, next) => {
  const users = await Auth.find()
  // const users = await Auth.findById(req.user)
  res.status(200).json({status: "Success", message: "Get all Users  successfully", users})
})