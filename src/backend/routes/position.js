const express = require('express');
const router = express.Router();

const controller = require('../controllers/position');

router.get('/:categoryId', controller.findByCategoryId);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.removeById);

module.exports = router;
