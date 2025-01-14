const express = require('express');
const { findAll, create, reqQuotes, findPunchoutSessionWithPartTypes, createPunchoutSessionWithPartTypes } = require('../controllers/punchout-session');
const router = express.Router();

router.get('/', findAll);
// router.get('/test', createPunchoutSessionWithPartTypes);
router.post('/', create);
router.post('/req', reqQuotes);

module.exports = router;
