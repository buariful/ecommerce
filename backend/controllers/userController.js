const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');


//  register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    const newUser = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is a sample id",
            url: "profilePicUrl",
        }
    });
    sendToken(newUser, 201, res);
});

// Login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    //checking user has given email and password or not
    if (!email || !password) {
        return next(new ErrorHandler('please Enter email and password', 400))
    }

    const findTargetedUser = await User.findOne({ email }).select('+password');
    if (!findTargetedUser) {
        return (new ErrorHandler("Invalid email or password", 401))
    }

    const isPasswordMatched = findTargetedUser.comparePassword(password);
    if (!isPasswordMatched) {
        return (new ErrorHandler("Invalid email or password", 401))
    }

    sendToken(findTargetedUser, 200, res);

})