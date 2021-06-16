const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const textRoutes = require('./textRoutes');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/texts', textRoutes);

module.exports = router;
