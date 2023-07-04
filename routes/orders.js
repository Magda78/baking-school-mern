const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders-controllers');

router.get('/orders', ordersController.getOrders);

module.exports = router;
