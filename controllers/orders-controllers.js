const { validationResult } = require('express-validator');
const Order = require('../models/order');

const getOrders = async (req, res, next) => {
	let orders;
	try {
		orders = await Order.find();
	} catch (error) {
		res.status(500).json({ message: error });
		return next(error);
	}

	res.status(200).json({
		orders: orders.map((order) => order.toObject({ getters: true }))
	});
};

const getOrdersById = async (req, res, next) => {
	const id = req.params.id;
	let ordersById;
	try {
		ordersById = Orders.findById({ creator: id });
	} catch (error) {
		res.status(500).json({ message: 'cant get the orders by id' });
		return next(error);
	}
	res.status(200).json({ orders: ordersById.toObject({ getters: true }) });
};

const createOrder = async (req, res, next) => {
	const { name, timeOfTheDay, creator } = req.body;

	const err = validationResult(req);
	if (!err.isEmpty()) {
		console.log(err);
		return res.status(400).json({ err: err.array() });
	}

	const createOrder = new Order({
		name,
		timeOfTheDay,
		creator
	});

	try {
		await createOrder.save();
	} catch (error) {
		console.log('cant create order');
		res.status(500).json({ message: error });
		return next(error);
	}

	res.status(201).json({ orders: createOrder.toObject({ getters: true }) });
};

exports.getOrders = getOrders;
exports.createOrder = createOrder;
exports.getOrdersById = getOrdersById;
