const router = require('express').Router();
const userRoutes = require('./userRoutes');
const textRoutes = require('./textRoutes');

router.use('/users', userRoutes);
router.use('/texts', textRoutes);

module.exports = router;
