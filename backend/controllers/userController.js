const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const SendmailTransport = require('nodemailer/lib/sendmail-transport');
const sendEmail = require("../utils/sendEmail.js");

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

    const targetedUser = await User.findOne({ email }).select('+password');
    console.log(targetedUser);

    if (!targetedUser) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    const isPasswordMatched = await targetedUser.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    sendToken(targetedUser, 200, res);

})

// log-out user
exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        Message: "log-out successfully"
    });
});

// fogot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('User not found', 404))
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/vi/password/reset/${resetToken}`;
    const message = `Your password reset tokent is :- \n\n ${resetPasswordUrl} . \n\n If it is unnecessary for you, then please ignore it`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Ecommerce password recovery successfully',
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} `
        })
    } catch (error) {
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;

        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler(error.message, 500))
    }
})

// reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {

    // token hash
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler("Reset password token has been expired or invalid", 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("password does not matched", 400))
    }

    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    user.save();
    sendToken(user, 200, res)
})

// get user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    });
});


// password change
exports.updatePassword = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user.id).select('+password');

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    console.log(isPasswordMatched)
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("password does not matched", 400))
    }

    user.password = req.body.newPassword;
    await user.save();


    sendToken(user, 200, res);
});

// update user profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true, runValidators: true, useFindModify: false,
    })


    sendToken(user, 200, res)

})

// get all users --admin
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

// get a users --admin
exports.getSingleUsers = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler('user not exist', 404))
    }

    res.status(200).json({
        success: true,
        user
    })
})

// update user role --admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true, runValidators: true, useFindModify: false,
    })

    res.status(200).json({
        success: true
    })

})

// delete user --admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    console.log("user")
    if (!user) {
        return next(new ErrorHandler(`user does not exist with id: ${req.params.id}`, 400))
    }
    await user.remove();

    res.status(200).json({
        success: true
    })

})