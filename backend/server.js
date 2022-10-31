const app = require('./app');
const dotenv = require("dotenv");
const connectDatabase = require('./config/database');

// config
dotenv.config({ path: "backend/config/config.env" })


// connecting to database
connectDatabase();
app.get('/', (req, res) => {
    res.status(200).send("Ecommerce server is running")
})
app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})