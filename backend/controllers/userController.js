const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/userModel');


//  register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is a sample id",
            url: "profilePicUrl",
        }
    });
    const token = user.getJWTToken();

    res.status(200).json({
        success: true,
        token,
    });
});

// Login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    //checking user has given email and password or not
    if (!email || !password) {
        return next(new ErrorHandler('please Enter email and password', 400))
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return (new ErrorHandler("Invalid email or password", 401))
    }

    const isPasswordMatched = user.comparePassword(password);
    if (!isPasswordMatched) {
        return (new ErrorHandler("Invalid email or password", 401))
    }

    const token = user.getJWTToken();
    res.status(200).json({
        success: true,
        token,
    });
    console.log("token")
})