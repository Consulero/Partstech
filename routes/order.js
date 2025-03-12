const express = require('express');
const { findAll, placeOrder, setOrderDetails, addInventoryItems } = require('../controllers/order');
const router = express.Router();

router.get('/', findAll);
router.post('/ps', placeOrder);
router.post('/details', setOrderDetails);
router.post('/inventory', addInventoryItems);


module.exports = router;
