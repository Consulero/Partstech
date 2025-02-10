const express = require('express');
const { findAll, placeOrder,setOrderDetails } = require('../controllers/order');
const router = express.Router();

router.get('/', findAll);
router.post('/ps', placeOrder);
router.post('/details', setOrderDetails);

module.exports = router;
