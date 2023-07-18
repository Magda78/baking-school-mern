const { validationResult } = require('express-validator');
const Order = require('../models/order');
const User = require('../models/user');
const HttpError = require('../models/http-error');
const mongoose = require('mongoose');

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

const getOrdersByUserId = async (req, res, next) => {
	const userId = req.params.id;
	let userOrders;
	try {
		userOrders = await User.findById(userId).populate('orders');
	} catch (err) {
		const error = new HttpError('Can not get user orders', 500);
		return next(error);
	}
	res.status(200).json({ orders: userOrders.orders.map(order => order.toObject({ getters: true })) });
};

const createOrder = async (req, res, next) => {
	const { name, timeOfTheDay, creator } = req.body;

	const err = validationResult(req);
	if (!err.isEmpty()) {
		const error = new HttpError('Invalid inputs', 422);
		return next(error);
	}

	const createOrder = new Order({
		name,
		timeOfTheDay,
		creator
	});

	let user;
	try {
		user = await User.findById(creator);
	} catch (err) {
		const error = new HttpError('Could not add order to db', 500);
		return next(error);
	}
	if (!user) {
		const error = new HttpError('User do not exisit', 404);
		return next(error);
	}

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await createOrder.save({ session: sess });
		user.orders.push(createOrder);
		await user.save({ session: sess });
		sess.commitTransaction();
	} catch (err) {
		const error = new HttpError('Creating place failed', 500);
		return next(error);
	}

	res.status(201).json({ orders: createOrder.toObject({ getters: true }) });
};

exports.getOrders = getOrders;
exports.createOrder = createOrder;
exports.getOrdersByUserId = getOrdersByUserId;
