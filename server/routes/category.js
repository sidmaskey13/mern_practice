const express = require('express');
const router = express.Router();

const dmodule = require('../modules/category/categoryController');
const { authentication } = require('../middleware/authentication')

router.get('/', dmodule.get);
router.get('/active', dmodule.getIsActive);
router.post('/', authentication, dmodule.save);
router.delete('/:id', authentication, dmodule.delete);

module.exports = router;