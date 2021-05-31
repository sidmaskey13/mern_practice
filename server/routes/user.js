const express = require('express');
const router = express.Router();

const dmodule = require('../modules/user/userController');

router.post('/register', dmodule.register);
router.post('/login', dmodule.login);
router.post('/login-google', dmodule.googleLogin);



module.exports = router;