const express = require('express');
const { getUser } = require('../controllers/user');
const router = express.Router();

router.get('/info', getUser);

module.exports = router;
