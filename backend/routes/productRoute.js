const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productControllers");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();


// get all products
router.route("/products").get(isAuthenticated, getAllProducts)

// create product -admin
router.route("/product/new").post(createProduct)

// single product -- 'get','put','delete'
router.route('/product/:id')
    .get(getProductDetails)
    .put(updateProduct)
    .delete(deleteProduct)

module.exports = router;