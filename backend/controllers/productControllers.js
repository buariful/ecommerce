const catchAsyncError = require('../middleware/catchAsyncError');
const Product = require('../models/productModel');
const ApiFeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorHandler');

// all product
exports.getAllProducts = catchAsyncError(async (req, res) => {
    const resultPerPage = 2;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage)
    const products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products,
        productCount
    })
})

// get single product
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }
    res.status(200).json({
        success: true,
        product
    })
})

// create product -- Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {

    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
});

// update a product --Admin
exports.updateProduct = catchAsyncError(
    async (req, res, next) => {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(500).json({
                success: false,
                message: "product not found"
            })
        }
        else {
            product = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            });
            res.status(200).json({
                success: true,
                product
            })
        }

    }
)

// delete a product --Admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "product not found"
        })
    }

    await product.remove();
    res.status(200).json({
        success: true,
        message: "product deleted successfully"
    })
}
)

// reviews
exports.createProductReviews = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find((rev) => {
        rev.user.toString() === req.user._id.toString();
    })

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating,
                    rev.comment = comment
            }
        })
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avgRating = 0;
    product.ratings = product.reviews.forEach((rev) => {
        avgRating += rev.rating;
    }) / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    });
});

