const express = require("express");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReviews,
  getProductReviews,
  deleteReview,
} = require("../controllers/productControllers");

const router = express.Router();

// get all products
router.route("/products").get(getAllProducts);

// create product -admin
router
  .route("/admin/product/new")
  .post(isAuthenticated, authorizeRoles("admin"), createProduct);

// single product -- 'get','put','delete'
router
  .route("/admin/product/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

// Product review
router.route("/review").put(isAuthenticated, createProductReviews);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticated, deleteReview);

module.exports = router;
