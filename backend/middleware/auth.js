const catchAsyncError = require("./catchAsyncError");

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {

    const { token } = req.cookies;
    console.log(token)
})