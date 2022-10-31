const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, singleProduct } = require("../controllers/productControllers");

const router = express.Router();


// get all products
router.route("/products").get(getAllProducts)

// create product -admin
router.route("/product/new").post(createProduct)

// single product -- 'get','put','delete'
router.route('/product/:id')
    .get(singleProduct)
    .put(updateProduct)
    .delete(deleteProduct)

module.exports = router;