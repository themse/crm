const express = require('express');
const router = express.Router();

const controller = require('../controllers/category');

router.get('/', controller.findAll);
router.get('/:id', controller.findById);
router.delete('/:id', controller.removeById);
router.post('/', controller.create);
router.patch('/:id', controller.update);

module.exports = router;
