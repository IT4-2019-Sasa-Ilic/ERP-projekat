const express = require('express');
const router = express.Router()
const { createCheckoutSession, webhook } = require('../controllers/stripeController');

router.post('/create-checkout-session', createCheckoutSession)
router.post('/webhook',webhook)

module.exports = router
