const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new Schema(
	{
		name: { type: String, require: true },
		timeOfTheDay: { type: String, require: true },
		creator: { type: mongoose.Types.ObjectId, require: true, ref: 'User' }
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Order', orderSchema);
