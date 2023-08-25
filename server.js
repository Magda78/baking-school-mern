require('dotenv').config({ path: '.env.local' });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const OrdersRoute = require('./routes/orders');
const UsersRoute = require('./routes/users');

const app = express();
const port = process.env.PORT || 3001;
const mongoosePath = process.env.MONGO_URL;
mongoose.set('strictQuery', false);
const stripe = require('stripe')(process.env.STRIPE_SECRET);

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
app.use(cors());
app.use(bodyParser.json());

app.use(OrdersRoute);
app.use(UsersRoute);

app.post('/create-checkout-session', async (req, res) => {
	console.log(req.body.basketItems);
	const { basketItems } = req.body;
	console.log('basket', basketItems);
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
		console.log('transform data', transformData);
		const session = await stripe.checkout.sessions.create({
			line_items: transformData,
			mode: 'payment',
			success_url: 'http://localhost:4242/success',
			cancel_url: 'http://localhost:4242/cancel'
		});
		res.status(200).json({ sessionId: session.id });
	} catch (err) {
		console.log(err);
	}
});

app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
	const event = req.body;

	// Handle relevant event (e.g., payment_intent.succeeded)
	switch (event.type) {
		case 'payment_intent.succeeded':
			const paymentIntent = event.data.object;
			// Update your database or perform other actions
			console.log('Payment succeeded:', paymentIntent.id);
			break;
		default:
			console.log('Unhandled event type:', event.type);
	}

	res.status(200).send();
});

app.listen(port, () => console.log(`Server running on port ${port}`));
