const { validationResult } = require('express-validator');
const Availability = require('../models/availability');
const HttpError = require('../models/http-error');
const mongoose = require('mongoose');

const getAvailability = async (req, res, next) => {
	let availabilities;
	try {
		availabilities = await Availability.find();
	} catch (error) {
		res.status(500).json({ message: error });
		return next(error);
	}

	res.status(200).json({
		availabilities: availabilities.map((availability) => availability.toObject({ getters: true }))
	});
};

exports.getAvailability = getAvailability;
