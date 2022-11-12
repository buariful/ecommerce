const express = require('express');
const router = express.Router();

const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const { newOrder, getSingleOrder, myOrders } = require('../controllers/orderControllers')


router.route('/order/new').post(isAuthenticated, newOrder);
router.route("/order/me").get(isAuthenticated, myOrders);


router.route('/order/:id').get(isAuthenticated,authorizeRoles('admin'), getSingleOrder);


module.exports = router;