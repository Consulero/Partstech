const express = require('express');
const { findMakes, findYears, findModels, findSubmodels, findEngines, findVehicleByVin, findVehicleByDetail } = require('../controllers/ps-vehicle-search');
const router = express.Router();

router.get('/years', findYears);
router.get('/makes', findMakes);
router.get('/models', findModels);
router.get('/submodels', findSubmodels);
router.get('/engines', findEngines);
router.get('/vin', findVehicleByVin);
router.get('/detail', findVehicleByDetail);
module.exports = router;
