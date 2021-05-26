const express = require('express');
const router = express.Router();

const dmodule = require('../modules/posts/postcontroller');


router.get('/', dmodule.get);

module.exports = router;