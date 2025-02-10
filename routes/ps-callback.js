const express = require('express');
const { submitQuote, saveOrder } = require('../controllers/ps-callback');
const router = express.Router();

router.post('/quote', submitQuote);
router.post('/order', saveOrder);

module.exports = router;
