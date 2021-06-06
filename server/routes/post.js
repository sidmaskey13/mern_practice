const express = require('express');
const router = express.Router();

const dmodule = require('../modules/posts/postcontroller');


router.get('/', dmodule.get);
router.get('/:id', dmodule.single);
router.post('/', dmodule.save);
router.delete('/:id', dmodule.delete);

module.exports = router;