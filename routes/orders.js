const express = require('express');
const router = express.Router();
const orders = require('../controllers/orders-controllers');
const { check } = require('express-validator');

router.get('/orders', orders.getOrders);
router.post('/orders', [ check('name').not().isEmpty() ], orders.createOrder);
router.get('/orders/user/:id', orders.getOrdersByUserId);

module.exports = router;
