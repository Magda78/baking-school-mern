const express = require('express');
const router = express.Router();
const orders = require('../controllers/orders-controllers');

router.get('/orders', orders.getOrders);
router.post('/orders', orders.createOrder);
router.get('/orders/user/:id', orders.getOrdersById)

module.exports = router;
