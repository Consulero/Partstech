const express = require('express');
const { searchByVehicleAndKeyword, searchByVehicleAndPartType, searchByVinAndKeyword, searchByVinAndPartType } = require('../controllers/ps-catalog-search');
const router = express.Router();

router.post('/vehicle/keyword', searchByVehicleAndKeyword);
router.post('/vehicle/parts-type', searchByVehicleAndPartType);
router.post('/vin/keyword', searchByVinAndKeyword);
router.post('/vin/parts-type', searchByVinAndPartType);

module.exports = router;
