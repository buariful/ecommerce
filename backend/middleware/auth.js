const catchAsyncError = require("./catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {

    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please login to access this resources", 400))
    }

    // get "jwt.sign" info for log-reg user
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
})

// check the user's role
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
      
        if (!roles.includes(req.user.role)) {
        next( new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resources`, 403));
        
        }
        next();
    }
}