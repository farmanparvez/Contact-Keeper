const jwt = require('jsonwebtoken')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

exports.protect = catchAsync( async (req, res, next) => {
    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }
    if(!token) return next(new AppError('No token, authorization denied'))
    const verify = jwt.verify(token, process.env.JWTSECRET)
    req.user = verify
    next()
})