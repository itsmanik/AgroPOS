const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productsController');

router.get('/', (ctrl.getAllProducts));

module.exports = router;