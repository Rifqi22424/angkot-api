// routes/angkotRoutes.js
const express = require('express');
const { getAngkots, addAngkot } = require('../controllers/angkotController');
const router = express.Router();

router.get('/', getAngkots);
router.post('/', addAngkot);

module.exports = router;
