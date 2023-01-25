const adminController = require('../controllers/adminController');
const authentication = require('../middlewares/authentication');
const router = require('express').Router();

router.post('/login', adminController.login);
router.use(authentication);
router.post('/register', adminController.register);
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

module.exports = router;