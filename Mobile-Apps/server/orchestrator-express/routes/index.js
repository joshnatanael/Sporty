const Controller = require('../controllers/Controller');
const router = require('express').Router();

router.get('/users', Controller.findAllUsers);
router.post('/users', Controller.registerUser);
router.put('/users/:id', Controller.editUser);
router.delete('/users/:id', Controller.deleteUser);
router.get('/products', Controller.findAllProducts);
router.get('/products/:slug', Controller.findProductBySlug);
router.post('/products', Controller.addProduct);
router.put('/products/:id', Controller.editProduct);
router.delete('/products/:id', Controller.deleteProduct);

module.exports = router;