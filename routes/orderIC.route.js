const express = require('express');
const router = express.Router();

const OrderICController = require('../controllers/orderIC.controller');
const orderICController = new OrderICController();

router.get('/orderIC', orderICController.getOrderIC);
router.post('/orderIC', orderICController.createOrderIC);
router.put('/orderIC/:orderICId', orderICController.updateOrderIC);
router.delete('/orderIC/:orderICId', orderICController.deleteOrderIC);

module.exports = router;