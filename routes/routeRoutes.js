const express = require('express');
const { getRoutes, addRoute } = require('../controllers/routeController');
const router = express.Router();

router.get('/', getRoutes);
router.post('/', addRoute);

module.exports = router;
