const express = require("express");
const errorMiddleware = require("./middleware/error");


const app = express();
app.use(express.json())



// route import
const product = require('./routes/productRoute')
app.use("/api/v1", product)

// error middleware
app.use(errorMiddleware)

module.exports = app;