const express = require('express');
const router = express.Router();

const dmodule = require('../modules/user/userController');

router.post('/register', dmodule.register);
router.post('/login', dmodule.login);


module.exports = router;