const catchAsyncError = require('../middleware/catchAsyncError');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');

// create new order
exports.newOrder = catchAsyncError(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order
    })
});

// get single order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if (!order) {
        return next(new ErrorHandler("Order not found", 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})

// get logged in user's orders
exports.myOrders = async (req, res, next) => {
    const orders = await Order.find({user: req.user._id})

    if (!orders) {
        return next(new ErrorHandler("Order not found", 404))
    }

    res.status(200).json({
        success: true,
        orders
    })
};

// get all orders --Admin
exports.getAllOrders = catchAsyncError(async (req,res,next) => {
    const orders = await Order.find();

    if (!orders) {
        return next(new ErrorHandler("Orders are not found", 404))
    }

    let totalAmount = 0;

    orders.forEach((order)=>{
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        orders,
        totalAmount
    })
})


// update order status --Admin
exports.updateOrder = catchAsyncError(async (req,res,next) => {
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("This order doesn't exist"))
    }
    
    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400))
    }

    order.orderItems.forEach(async(item)=>{
        await updateStock(item.product, item.quantity);
    })
    order.orderStatus = req.body.status;
   
    if(order.orderStatus === "Delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave: false});
    res.status(200).json({
        success: true
    })

});

async function updateStock(id, quantity){
const product = await Product.findById(id);

product.stock -= quantity;
await product.save({validateBeforeSave: false})
}


// delete Order --Admin
exports.deleteOrder = catchAsyncError(async (req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("This order doesn't exist"))
    }

    await order.remove();
    res.status(200).json({
        success: true
    })
})