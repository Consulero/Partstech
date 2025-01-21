const express = require('express');
const { findAll, reqQuote, updateQuoteStatus } = require('../controllers/quotation');
const router = express.Router();

router.get('/', findAll);
router.post('/req', reqQuote);
router.patch('/', updateQuoteStatus);

module.exports = router;
