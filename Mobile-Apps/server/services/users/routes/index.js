const UserController = require('../controllers/UserController');
const router = require('express').Router();

router.post('/users', UserController.register);
router.get('/users', UserController.findUser);
router.get('/users/:id', UserController.findUserById);
router.delete('/users/:id', UserController.deleteUser);
router.put('/users/:id', UserController.editUser);

module.exports = router;