require('dotenv').config({ path: '.env.local' });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const OrdersRoute = require('./routes/orders');
const UsersRoute = require('./routes/users');
const AvailabilityRoute = require('./routes/availability');
const WebhookRoute = require('./routes/webhook');
//const Availability = require('./models/availabilit');
const websocketController = require('./controllers/webSocket-controller');

const { validationResult } = require('express-validator');
const Order = require('./models/order');
const User = require('./models/user');
const HttpError = require('./models/http-error');
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

const app = express();
const port = process.env.PORT || 3001;
//const wss = websocketController.initializeWebSocket(server);
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
app.use(AvailabilityRoute);

const CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS);
//const CREDENTIALS_ONE = JSON.parse(process.env.GOOGLE_CREDENTIALS_ONE);

app.post('/create-checkout-session', async (req, res) => {
	const { basketItems, user } = req.body;
	console.log('basket back', basketItems);
	const transformData = basketItems.map((item) => ({
		price_data: {
			currency: 'usd',
			product_data: {
				name: item.program,
				metadata: {
					date: item.date // Include the date as metadata
				}
			},
			unit_amount: item.price * 100
		},
		quantity: 1
	}));

	try {
		console.log('transform date', transformData[0].price_data.product_data.metadata.date);
		const basketItemsString = JSON.stringify(basketItems);
		const session = await stripe.checkout.sessions.create({
			line_items: transformData,
			mode: 'payment',
			success_url: 'http://localhost:4242/success',
			cancel_url: 'http://localhost:4242/cancel',
			metadata: {
				email: user[0].email,
				basketItems: basketItemsString,
				name: transformData[0].price_data.product_data.name,
				date: transformData[0].price_data.product_data.metadata.date
			}
		});
		res.status(200).json({ sessionId: session.id });
	} catch (err) {
		console.log(err);
	}
});

const stripe = require('stripe')(process.env.STRIPE_SECRET);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET_WEBHOOK;

app.use(WebhookRoute); // You can modify the path as needed

app.listen(port, () => console.log(`Server running on port ${port}`));
