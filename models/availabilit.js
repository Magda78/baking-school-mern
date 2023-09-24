const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const availabilitSchema = new Schema(
	{
		date: { type: Date, required: true },
		availableClassCount: { type: Number, required: true },
		isNotAvailable: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);
module.export = mongoose.model('Availabiliti', availabilitSchema);
