const express = require('express');
const router = express.Router();

const ItemsController = require('../controllers/items.controller');
const itemsController = new ItemsController();

router.get('/Allitems', itemsController.findAllItem);

router.get('/items', itemsController.getItems);
router.post('/items', itemsController.createItem);
router.put('/items/:itemId', itemsController.updateItem);
router.delete('/items/:itemId', itemsController.deleteItem);
module.exports = router;