const express = require('express');
const router = express.Router();

const OrderItemsController = require('../controllers/orderItem.controller');
const orderItemController = new OrderItemsController();

router.get('/orderItem', orderItemController.getOrderItem);
router.post('/orderItem', orderItemController.createOrderItem);
router.put('/orderItem/:orderItemId', orderItemController.updateOrderItem);
router.delete('/orderItem/:orderItemId', orderItemController.deleteOrderItem);

module.exports = router;