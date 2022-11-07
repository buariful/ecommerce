const express = require("express");
const errorMiddleware = require("./middleware/error");


const app = express();
app.use(express.json())



// route import
const product = require('./routes/productRoute')
const user = require('./routes/userRoutes')

app.use("/api/v1", product)
app.use("/api/v1", user)

// error middleware
app.use(errorMiddleware)

module.exports = app;