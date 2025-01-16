const express = require('express');
const { findAll, reqQuote } = require('../controllers/quotation');
const router = express.Router();

router.get('/', findAll);
router.post('/req', reqQuote);

module.exports = router;
