const { validationResult } = require('express-validator');
const User = require('../models/user');
const HttpError = require('../models/http-error');

const getUsers = async (req, res, next) => {
	let users;
	try {
		users = await User.find({}, '-password');
	} catch (err) {
		const error = new HttpError('Can not fetch users', 500);
		return next(error);
	}

	res.status(200).json({
		users: users.map((user) => user.toObject({ getters: true }))
	});
};

const signUp = async (req, res, next) => {
	const { firstName, lastName, email, password } = req.body;
	const err = validationResult(req);
	if (!err.isEmpty()) {
		const error = new HttpError('Invalid inputs', 422);
		return next(error);
	}
	let user;
	try {
		user = await User.findOne({ email: email });
	} catch (error) {
		res.status(500).json({ message: error });
		return next(error);
	}

	if (user) {
		const error = new HttpError('User exist', 422);
		return next(error);
	}
	const createUser = new User({
		firstName,
		lastName,
		email,
		password,
		orders: []
	});

	try {
		await createUser.save();
	} catch (error) {
		res.status(500).json({ message: error });
		return next(error);
	}
	res.status(200).json({ users: createUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
	const { email, password } = req.body;

	let user;
	try {
		user = await User.findOne({ email: email });
	} catch (err) {
		const error = new HttpError('Could not login', 500);
		return next(error);
	}
	if (!user || user.password !== password) {
		const error = new HttpError('Wrong credencial', 401);
		return next(error);
	}
	res.json({ message: 'LogIn' });
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;
