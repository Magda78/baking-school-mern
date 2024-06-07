const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const WebhookController = require('../controllers/webhook-controllers');

router.post('/webhook', bodyParser.raw({ type: 'application/json' }), WebhookController);


module.exports = router;
