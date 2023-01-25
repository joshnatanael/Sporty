const customerController = require('../controllers/customerController');
const router = require('express').Router();

router.get('/products', customerController.fetchProducts);
router.get('/categories', customerController.fetchCategories);
router.get('/products/:slug', customerController.fetchProductDetail);

module.exports = router;