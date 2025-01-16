const express = require('express');
const {submitQuote} = require('../controllers/ps-callback');
const router = express.Router();

router.post('/quote', submitQuote);

module.exports = router;
