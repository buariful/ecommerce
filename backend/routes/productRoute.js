const express = require("express");
const { getAllProducts, createProduct } = require("../controllers/productControllers");

const router = express.Router();


// get product
router.route("/products").get(getAllProducts)

// create product
router.route("/product/new").post(createProduct)

module.exports = router;