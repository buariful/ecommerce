const cookieParser = require("cookie-parser");
const express = require("express");
const errorMiddleware = require("./middleware/error");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// route import
const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");
const orderController = require("./routes/orderRoutes");

// middleware for cookie parser
app.use(cookieParser());

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", orderController);

// error middleware
app.use(errorMiddleware);

module.exports = app;
