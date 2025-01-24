const express = require('express');
const { findAll, reqQuote, updateQuoteStatus, checkPartavailability } = require('../controllers/quotation');
const router = express.Router();

router.get('/', findAll);
router.post('/req', reqQuote);
router.patch('/', updateQuoteStatus);
router.post('/refresh', checkPartavailability);

module.exports = router;
