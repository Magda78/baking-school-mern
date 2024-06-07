const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reservationSchema = new Schema(
	{
		date: { type: Date, required: true },
		availableClassCount: {type: mongoose.Types.ObjectId, require: true, ref: 'Availability'},
		isNotAvailable: { type: Boolean, default: false },
		program: { type: String, required: true }
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('Reservation', reservationSchema);