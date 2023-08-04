const OrderCustomerService = require('../services/orderCustomer.service');

class OrderCustomerController {
  orderCustomerService = new OrderCustomerService();

  getOrderCustomer = async (req, res, next) => {
    try {
      const orderCustomers = await this.orderCustomerService.findAllOrderCustomer();
      res.status(200).json({ data: orderCustomers });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  createOrderCustomer = async (req, res, next) => {
    try {
      const { state } = req.body;
      const createOrderCustomerData = await this.orderCustomerService.createOrderCustomer(state);
      res.status(201).json({ data: createOrderCustomerData });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  updateOrderCustomer = async (req, res) => {
    const { orderCustomerId, orderICId, ItemId, state } = req.body;

    const payload = {
      orderCustomerId,
      orderICId,
      ItemId,
      state,
    };

    const result = await this.orderCustomerService.updateOrderCustomer(payload);

    return res.status(result.code).json(result);
  }

  deleteOrderCustomer = async (req, res, next) => {
    try {
      const { orderCustomerId } = req.params;
      const result = await this.orderCustomerService.deleteOrderCustomer(orderCustomerId);
      res.status(result.code).json({ message: result.message });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}



module.exports = OrderCustomerController;