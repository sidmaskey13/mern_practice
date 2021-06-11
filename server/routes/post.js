const express = require('express');
const router = express.Router();

const dmodule = require('../modules/posts/postcontroller');
const { authentication } = require('../middleware/authentication')

router.get('/all', authentication, dmodule.getAll);
router.get('/own/all', authentication, dmodule.getOwn);
router.get('/homepage/active', dmodule.getIsActive);
router.get('/single/:id', dmodule.single);
router.post('/', authentication, dmodule.save);
router.delete('/:id', authentication, dmodule.delete);

module.exports = router;