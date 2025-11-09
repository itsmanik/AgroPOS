const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productsController');
const upload = require('../middleware/upload');

router.get('/', (ctrl.getAllProducts));
router.post('/', upload.single("image"), ctrl.createProduct);

module.exports = router; 