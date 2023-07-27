const express = require('express');
const router = express.Router();

const ItemsController = require('../controllers/items.controller');
const itemsController = new ItemsController();

router.get('/items', itemsController.getItems);
router.post('/items', itemsController.createItem);

router.delete('/items/:itemId', itemsController.deleteItem);
module.exports = router;