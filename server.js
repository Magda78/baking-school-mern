require('dotenv').config({ path: '.env.local' });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const OrdersRoute = require('./routes/orders');
const UsersRoute = require('./routes/users');
const WebhookRoute = require('./routes/webhook');

const { validationResult } = require('express-validator');
const Order = require('./models/order');
const User = require('./models/user');
const HttpError = require('./models/http-error');
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

const app = express();
const port = process.env.PORT || 3001;
const mongoosePath = process.env.MONGO_URL;
mongoose.set('strictQuery', false);
//const stripe = require('stripe')(process.env.STRIPE_SECRET);

mongoose
	.connect(mongoosePath, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		writeConcern: {
			w: 'majority'
		}
	})
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true // Allow cookies and headers to be sent with the request
	})
);
//app.use(bodyParser.json());
app.use((req, res, next) => {
	if (req.originalUrl === '/webhook') {
		next();
	} else {
		bodyParser.json()(req, res, next);
	}
});
app.use(OrdersRoute);
app.use(UsersRoute);

const CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS);
//const CREDENTIALS_ONE = JSON.parse(process.env.GOOGLE_CREDENTIALS_ONE);

app.post('/create-checkout-session', async (req, res) => {
	const { basketItems, user } = req.body;
	//console.log('user', user);
	const transformData = basketItems.map((item) => ({
		price_data: {
			currency: 'usd',
			product_data: {
				name: item.program
			},
			unit_amount: item.price * 100
		},
		quantity: 1
	}));

	try {
		//console.log('transform data', transformData[0].price_data.product_data.name);
		const session = await stripe.checkout.sessions.create({
			line_items: transformData,
			mode: 'payment',
			success_url: 'http://localhost:4242/success',
			cancel_url: 'http://localhost:4242/cancel',
			metadata: {
				email: user[0].email,
				name: transformData[0].price_data.product_data.name
			}
		});
		res.status(200).json({ sessionId: session.id });
	} catch (err) {
		console.log(err);
	}
});

const stripe = require('stripe')(process.env.STRIPE_SECRET);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET_WEBHOOK;

app.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
	const sig = req.headers['stripe-signature'];
	const calendarClientId = process.env.GOOGLE_CREDENTIALS.client_id;
	const calendarClientSecret = process.env.GOOGLE_CREDENTIALS.client_secret;
	const oAuth2Client = new google.auth.OAuth2(calendarClientId, calendarClientSecret);
	const calendar = google.calendar({ version: 'v3', auth: OAuth2Client });
	const calendarId = process.env.CALENDAR_ID;
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

		const auth = new google.auth.GoogleAuth({
			keyFile: 'service-key.json',
			scopes: [ 'https://www.googleapis.com/auth/calendar' ]
		});

		// Obtain an OAuth2 client instance
		const authClient = await auth.getClient();

		// Define the event details
		const eventCalendar = {
			summary: 'Class Booking',
			location: 'Location Name',
			description: 'Class Description',
			start: {
				dateTime: '2023-09-15T10:00:00', // Set the start date and time
				timeZone: 'America/New_York'
			},
			end: {
				dateTime: '2023-09-15T12:00:00', // Set the end date and time
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

		return res.status(201).json({ orders: createOrder.toObject({ getters: true }) });
	}

	// Respond to other webhook events
	return res.json({ received: true });
});

const handleDeauthorization = (connectedAccountId, application) => {
	// Clean up account state.
	console.log('Connected account ID: ' + connectedAccountId);
	console.log(JSON.stringify(application));
};

//app.use(WebhookRoute);
app.listen(port, () => console.log(`Server running on port ${port}`));
