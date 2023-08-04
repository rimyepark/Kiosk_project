const express = require('express');
const router = express.Router();

const OrderCustomerController = require('../controllers/orderCustomer.controller');
const orderCustomerController = new OrderCustomerController();

router.get('/orderCustomer', orderCustomerController.getOrderCustomer);
router.post('/orderCustomer', orderCustomerController.createOrderCustomer);
// router.put('/orderCustomer/:orderCustomerId', orderCustomerController.updateOrderCustomer);
router.put('/orderCustomer/:orderCustomerId', orderCustomerController.updateOrderCustomer);
router.delete('/orderCustomer/:orderCustomerId', orderCustomerController.deleteOrderCustomer);

module.exports = router;