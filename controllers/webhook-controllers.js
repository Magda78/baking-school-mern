const { validationResult } = require('express-validator');
const Order = require('../models/order');
const User = require('../models/user');
const HttpError = require('../models/http-error');
const mongoose = require('mongoose');

const webhook = async (req, res, next) => {
  const sig = req.headers['stripe-signature'];

	let event;

	// Verify webhook signature and extract the event.
	// See https://stripe.com/docs/webhooks#verify-events for more information.
	try {
		event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
	} catch (err) {
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}

	if (event.type === 'account.application.deauthorized') {
		const application = event.data.object;
		const connectedAccountId = event.account;
		handleDeauthorization(connectedAccountId, application);
		return res.json({ received: true });
	}

	if (event.type === 'checkout.session.completed') {
		const { email, name } = event.data.object.metadata;
		let userId;

		let user;
		try {
			user = await User.findOne({ email: email });
			userId = user._id;
		} catch (err) {
			const error = new HttpError('Could not add order to db', 500);
			return res.status(500).json({ error: 'Could not add order to db' });
		}

		if (!user) {
			const error = new HttpError('User does not exist', 404);
			return res.status(404).json({ error: 'User does not exist' });
		}

		const createOrder = new Order({
			name,
			creator: userId
		});

		try {
			const sess = await mongoose.startSession();
			sess.startTransaction();
			await createOrder.save({ session: sess });
			user.orders.push(createOrder);
			await user.save({ session: sess });
			sess.commitTransaction();
		} catch (err) {
			const error = new HttpError('Creating order failed', 500);
			return res.status(500).json({ error: 'Creating order failed' });
		}

		return res.status(201).json({ orders: createOrder.toObject({ getters: true }) });
	}

	// Respond to other webhook events
	return res.json({ received: true });
  };

  const handleDeauthorization = (connectedAccountId, application) => {
    // Clean up account state.
    console.log('Connected account ID: ' + connectedAccountId);
    console.log(JSON.stringify(application));
  };

exports.webhook = webhook;
