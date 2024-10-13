const stripe = require('stripe')(process.env.STRIPE_SECRET);
const mongoose = require('mongoose');
const Order = require('../models/order');
const User = require('../models/user');
const Availability = require('../models/availability');
const HttpError = require('../models/http-error');
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

const handleDeauthorization = (connectedAccountId, application) => {
	// Clean up account state.
	console.log('Connected account ID: ' + connectedAccountId);
	console.log(JSON.stringify(application));
};

const webhookController = async (req, res) => {
	const sig = req.headers['stripe-signature'];
	const endpointSecret = process.env.STRIPE_SIGNING_SECRET_WEBHOOK;
	const calendarClientId = process.env.GOOGLE_CREDENTIALS.client_id;
	const calendarClientSecret = process.env.GOOGLE_CREDENTIALS.client_secret;
	const oAuth2Client = new google.auth.OAuth2(calendarClientId, calendarClientSecret);
	const calendar = google.calendar({ version: 'v3', auth: OAuth2Client });
	const calendarId = process.env.CALENDAR_ID;

	// Verify webhook signature and extract the event.
	try {
		const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
		console.log('from web', req.body);
		if (event.type === 'account.application.deauthorized') {
			const application = event.data.object;
			const connectedAccountId = event.account;
			handleDeauthorization(connectedAccountId, application);
			return res.json({ received: true });
		}

		if (event.type === 'checkout.session.completed') {
			const { email, basketItems, name } = event.data.object.metadata;
			const parsedBasketItems = JSON.parse(basketItems);
			console.log('event meta', event.data.object.metadata);
			let userId;
			let user;

			try {
				user = await User.findOne({ email: email });
				userId = user._id;
			} catch (err) {
				return res.status(500).json({ error: 'Could not find user' });
			}

			if (!user) {
				const error = new HttpError('User does not exist', 404);
				return res.status(404).json({ error: 'User does not exist' });
			}

			for (const item of parsedBasketItems) {
				console.log('item date', item.date, item);
				const selectedDate = new Date(item.date);
				const toUtc = new Date(selectedDate.getTime() + selectedDate.getTimezoneOffset() * 60000);
				let class_date = toUtc.toISOString();
				let availability = await Availability.findOne({ date: class_date, program: item.program });
				const availableClassCount = 1 - 1;
				const isNotAvailable = availableClassCount <= 0;
				console.log('isNotAvailable===========', isNotAvailable)
				console.log('availibility===========', availability)
				try {
					if (!availability) {
						availability = new Availability({
							date: class_date,
							availableClassCount: availableClassCount,
							isNotAvailable: isNotAvailable,
							program: item.program
						});
						console.log('Availability created:', availability);
					} else {
						console.log(
							'availability.availableClassCount,isNot',
							availability.availableClassCount,
							availability.isNotAvailable
						);
						if (availability.availableClassCount - item.students > 0) {
							availability.availableClassCount -= item.students;
						}
						if (availability.availableClassCount - item.students === 0) {
							console.log(
								'Before updating isNotAvailable:',
								availability.availableClassCount,
								availability.isNotAvailable
							);
							availability.availableClassCount -= item.students;
							availability.isNotAvailable = true;
							console.log(
								'After updating isNotAvailable:',
								availability.availableClassCount,
								availability.isNotAvailable
							);
						}
					}
					await availability.save();
				} catch (err) {
					console.log('Error while updating availability:', err);
				}
				if (!availability.isNotAvailable) {
					const createOrder = new Order({
						name: item.program,
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
				}
				const auth = new google.auth.GoogleAuth({
					keyFile: 'service-key.json',
					scopes: ['https://www.googleapis.com/auth/calendar']
				});
				// Obtain an OAuth2 client instance
				const authClient = await auth.getClient();
				// Define the event details
				const eventCalendar = {
					summary: item.program,
					location: '215 Clinton Ave Brooklyn NY',
					description: item.students,
					start: {
						dateTime: class_date, // Set the start date and time
						timeZone: 'America/New_York'
					},
					end: {
						dateTime: class_date, // Set the end date and time
						timeZone: 'America/New_York'
					}
				};
				// Create the event in the owner's calendar
				calendar.events.insert(
					{
						auth: authClient,
						calendarId: process.env.CALENDAR_ID, // Replace with the owner's calendar ID
						resource: eventCalendar
					},
					(err, event) => {
						if (err) {
							console.error('Error creating event:', err);
							// Handle the error
						} else {
							console.log('Event created:', event.data);
						}
					}
				);
			}
			console.log('after if (!availability)0000000000000000000000000000000000000000');
			return res.status(201).json({ orders: user.orders });
		}
	} catch (err) {
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}
	// Respond to other webhook events
	return res.json({ received: true });
};

module.exports = webhookController;
