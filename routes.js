var express = require('express');
var router = express.Router();
var ProductController = require('./controllers/ProductController');

router.post('/products', ProductController.store);
router.get('/products', ProductController.getAll);
router.get('/products/:productId', ProductController.getOne);

module.exports = router;
