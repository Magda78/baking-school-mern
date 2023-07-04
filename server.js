require('dotenv').config({ path: '.env.local' });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const OrdersRoute = require('./routes/orders')


const app = express();
const port = process.env.PORT || 3001;
const mongoosePath = process.env.MONGO_URL;
mongoose.set('strictQuery', false);

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

app.listen(port, () => console.log(`Server running on port ${port}`));
