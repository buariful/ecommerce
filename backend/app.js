const cookieParser = require("cookie-parser");
const express = require("express");
const errorMiddleware = require("./middleware/error");


const app = express();
app.use(express.json())

// route import
const product = require('./routes/productRoute')
const user = require('./routes/userRoutes');
const orderController = require('./routes/orderRoutes');


// middleware for cookie parser
app.use(cookieParser())


app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", orderController)

// error middleware
app.use(errorMiddleware);



module.exports = app;

