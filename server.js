require('dotenv').config({ path: '.env.local' });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const OrdersRoute = require('./routes/orders');
const UsersRoute = require('./routes/users');
//const WebhookRoute = require('./routes/webhook');

const { validationResult } = require('express-validator');
const Order = require('./models/order');
const User = require('./models/user');
const HttpError = require('./models/http-error');

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
app.use(cors());
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

app.post('/create-checkout-session', async (req, res) => {
	console.log(req.body.basketItems);
	const { basketItems, user } = req.body;
	console.log('user', user);
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


const stripe = require('stripe')('sk_test_51KpK5YAvVkCbGsS59MSPmVmw0RFeENOKYYyJQ5CUZ37yvEXpC9m1F7yTQNfVWQ4cEAZ3xYnaBvbpQkmEdyC1bPpt00soRg255q');

// If you are testing your webhook locally with the Stripe CLI you
// can find the endpoint's secret by running `stripe listen`
// Otherwise, find your endpoint's secret in your webhook settings in the Developer Dashboard
const endpointSecret = 'whsec_b368b8bf9861dd75ae0adce19955ca76c1e8fc5916c0c6f938f24106263fd359';

//app.post('/webhook', async (req, res) => {
//	console.log('weeeeeeeeeb');

//	const stripe = require('stripe')('sk_test_51KpK5YAvVkCbGsS59MSPmVmw0RFeENOKYYyJQ5CUZ37yvEXpC9m1F7yTQNfVWQ4cEAZ3xYnaBvbpQkmEdyC1bPpt00soRg255q');

//	const endpointSecret = 'whsec_b368b8bf9861dd75ae0adce19955ca76c1e8fc5916c0c6f938f24106263fd359';

//	const sig = req.headers['stripe-signature'];

//	let event;

	// Verify webhook signature and extract the event.
	// See https://stripe.com/docs/webhooks#verify-events for more information.
//	try {
//		event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//		
//	} catch (err) {
//		return res.status(400).send(`Webhook Error: ${err.message}`);
//	}

	//if (event.type === 'checkout.session.completed') {
	//	console.log('completed..............')
	//	const { creator, name } = event.data.object;
	//	const err = validationResult(req);
	//	if (!err.isEmpty()) {
	//		const error = new HttpError('Invalid inputs', 422);
	//		return next(error);
	//	}

	//	const createOrder = new Order({
	//		name,
	//		creator
	//	});

	//	let user;
	//	try {
	//		user = await User.findById(creator);
	//	} catch (err) {
	//		const error = new HttpError('Could not add order to db', 500);
	//		return next(error);
	//	}
	//	if (!user) {
	//		const error = new HttpError('User does not exist', 404);
	//		return next(error);
	//	}

	//	try {
	//		const sess = await mongoose.startSession();
	//		sess.startTransaction();
	//		await createOrder.save({ session: sess });
	//		user.orders.push(createOrder);
	//		await user.save({ session: sess });
	//		sess.commitTransaction();
	//	} catch (err) {
	//		const error = new HttpError('Creating order failed', 500);
	//		return next(error);
	//	}

	//	res.status(201).json({ orders: createOrder.toObject({ getters: true }) });
	//}

//	if (event.type === 'account.application.deauthorized') {
//		const application = event.data.object;
//		const connectedAccountId = event.account;
//		handleDeauthorization(connectedAccountId, application);
//		res.json({ received: true }); // Move this line here
//	}
//});

app.post('/webhook', bodyParser.raw({type: 'application/json'}), async (req, res, next) => {
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
	}

	if (event.type === 'checkout.session.completed') {
		console.log('completed..............')
		const { email, name } = event.data.object.metadata;
		let userId;
		console.log('event', event.data.object.metadata)
		const err = validationResult(req);
		if (!err.isEmpty()) {
			const error = new HttpError('Invalid inputs', 422);
			return next(error);
		}

		

		let user;
		try {
			user = await User.findOne(email);
			userId = user.id
		} catch (err) {
			const error = new HttpError('Could not add order to db', 500);
			return next(error);
		}
		if (!user) {
			const error = new HttpError('User does not exist', 404);
			return next(error);
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
			return next(error);
		}

		res.status(201).json({ orders: createOrder.toObject({ getters: true }) });
	}
  
	res.json({received: true});
  });
  
  
  const handleDeauthorization = (connectedAccountId, application) => {
	// Clean up account state.
	console.log('Connected account ID: ' + connectedAccountId);
	console.log(JSON.stringify(application));
  }



//app.use(WebhookRoute);
app.listen(port, () => console.log(`Server running on port ${port}`));
