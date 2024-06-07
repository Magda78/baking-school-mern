const express = require('express');
const router = express.Router();
const availability = require('../controllers/availability-controllers');

router.get('/availability', availability.getAvailability);

module.exports = router;
