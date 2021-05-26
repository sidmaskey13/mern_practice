const express = require('express');
const router = express.Router();

const postroutes = require('./post');
router.use('/post', postroutes);

module.exports = router;
