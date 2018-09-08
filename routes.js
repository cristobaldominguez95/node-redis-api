var express = require('express');
var router = express.Router();
var ProductController = require('./controllers/ProductController');

router.post('/products/store', ProductController.store);

module.exports = router;
