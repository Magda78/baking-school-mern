const { validationResult } = require('express-validator');
const Order = require('../models/order');
const User = require('../models/user');
const HttpError = require('../models/http-error');
const mongoose = require('mongoose');

const webhook = async (req, res, next) => {
  const Stripe = require('stripe');
  const stripe = Stripe(process.env.STRIPE_SECRET);
  const endpointSecret = 'whsec_b368b8bf9861dd75ae0adce19955ca76c1e8fc5916c0c6f938f24106263fd359';

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
    res.json({ received: true }); // Move this line here
  }

  if (event.type === 'checkout.session.completed') {
    const { creator, name } = event.data.object;
    const err = validationResult(req);
    if (!err.isEmpty()) {
      const error = new HttpError('Invalid inputs', 422);
      return next(error);
    }

    const createOrder = new Order({
      name,
      creator,
    });

    let user;
    try {
      user = await User.findById(creator);
    } catch (err) {
      const error = new HttpError('Could not add order to db', 500);
      return next(error);
    }
    if (!user) {
      const error = new HttpError('User does not exist', 404);
      return next(error);
    }

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

  const handleDeauthorization = (connectedAccountId, application) => {
    // Clean up account state.
    console.log('Connected account ID: ' + connectedAccountId);
    console.log(JSON.stringify(application));
  };
};

exports.webhook = webhook;
