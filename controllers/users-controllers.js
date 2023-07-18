const { validationResult } = require('express-validator');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
	let users;
	try {
		users = await User.find();
	} catch (error) {
		res.status(500).json({ message: error });
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
		console.log(err);
		return res.status(400).json({ err: err.array() });
	}
	let user;
	try {
		user = await User.findOne({ email: email });
	} catch (error) {
		res.status(500).json({ message: error });
		return next(error);
	}

	if (user) {
		const error = new HtppError('User exist', 422);
		return next(error);
	}
	const createUser = new User({
		firstName,
		lastName,
		email,
		password
	});

	try {
		await createUser.save();
	} catch (error) {
		res.status(500).json({ message: error });
		return next(error);
	}
	res.status(200).json({ users: createUser.toObject({ getters: true }) });
};

exports.getUsers = getUsers;
exports.signUp = signUp;
