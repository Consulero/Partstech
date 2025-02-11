const express = require('express');
const { findAll } = require('../controllers/inventory');
const router = express.Router();

router.get('/', findAll);

module.exports = router;
