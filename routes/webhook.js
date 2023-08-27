const express = require('express');
const router = express.Router();
const webhook = require('../controllers/webhook-controllers');

router.post('/webhook', webhook.webhook);

module.exports = router;
