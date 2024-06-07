const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const availabilitySchema = new Schema(
	{
		date: { type: Date, required: true },
		availableClassCount: { type: Number, required: true },
		isNotAvailable: { type: Boolean, default: false },
		program: { type: String, required: true }
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('Availability', availabilitySchema);
