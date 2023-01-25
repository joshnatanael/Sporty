const adminController = require('../controllers/adminController');
const authentication = require('../middlewares/authentication');
const router = require('express').Router();

// router.use(authentication);
router.get('/products', adminController.fetchProducts);
router.get('/categories', adminController.fetchCategories);
router.get('/products/:id', adminController.fetchProductDetail);
router.get('/categories/:id', adminController.fetchCategoryDetail);
router.post('/products', adminController.addProduct);
router.put('/products', adminController.editProduct);
router.delete('/products/:id', adminController.deleteProduct);
router.post('/categories', adminController.addCategory);
router.put('/categories/:id', adminController.editCategory);
router.delete('/categories/:id', adminController.deleteCategory);
router.delete('/products/users/:idMongo', adminController.deleteProductsByIdMongo);

module.exports = router;