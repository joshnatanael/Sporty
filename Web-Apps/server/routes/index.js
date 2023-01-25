const router = require('express').Router();
const adminRouter = require('./adminRoutes');
const customerRouter = require('./customerRouter');

router.use('/admins', adminRouter);
router.use('/customers', customerRouter);

module.exports = router;