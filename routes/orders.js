const express = require('express');
const router = express.Router();
const getOrders = require('../controllers/orders-controllers');
const createOrder = require('../controllers/orders-controllers');
const getOrdersById = require('../controllers/orders-controllers');

router.get('/orders', getOrders.getOrders);
router.post('/orders', createOrder.createOrder);
router.get('/orders/user/:id', getOrdersById.getOrdersById)

module.exports = router;
