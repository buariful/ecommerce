const app = require('./app');
const dotenv = require("dotenv");
const connectDatabase = require('./config/database');

// handling uncaught exception==================
process.on("uncaughtException", (err) => {
    console.log(`ERROR: ${err.message}`)
    console.log('shutting down the server due to uncaught exception error')

    process.exit(1)
})

// config
dotenv.config({ path: "backend/config/config.env" })


// connecting to database
connectDatabase();
app.get('/', (req, res) => {
    res.status(200).send("Ecommerce server is running")
})
const server = app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);

    server.close(() => {
        process.exit(1)
    })
})