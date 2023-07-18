const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const userSchema = new Schema(
	{
		firstName: { type: String, require: true },
		lastName: { type: String, require: true },
		email: { type: String, require: true, unique: true },
		password: { type: String, require: true, minlengt: 6 },
		orders:[{ type: mongoose.Types.ObjectId, require: true, ref: 'Order' }]
	},
	{
		timestamps: true
	}
);

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
