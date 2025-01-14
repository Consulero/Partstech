const express = require('express');
const { generateAccessToken, refreshAccessToken } = require('../controllers/ps-auth');
const router = express.Router();

router.post('/access', generateAccessToken);
router.post('/refresh', refreshAccessToken);

module.exports = router;
