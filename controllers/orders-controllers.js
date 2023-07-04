const getOrders = (req, res, next) => {
	console.log('get request ');
	res.json({ message: 'message from get' });
}

exports.getOrders = getOrders