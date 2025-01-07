const express = require('express');
const { findCategories, findSubCategories, findPartsTypes, findPartsType } = require('../controllers/ps-category');
const router = express.Router();

router.get('/categories', findCategories);
router.get('/subcategories', findSubCategories);
router.get('/part-types', findPartsTypes);
router.get('/part-type', findPartsType);

module.exports = router;
