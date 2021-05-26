const express = require('express');
const router = express.Router();

const postRoutes = require('./post');
router.use('/post', postRoutes);

const userRoutes = require('./user');
router.use('/auth', userRoutes);

module.exports = router;
