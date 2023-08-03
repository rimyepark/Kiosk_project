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

  updateOrderCustomer = async (req, res, next) => {
    const { orderCustomerId } = req.params;
    const { state } = req.body;

    const updateOrderCustomer = await this.orderCustomerService.updateOrderCustomer(
      orderCustomerId,
      state
    );

    res.status(200).json({ data: updateOrderCustomer});
  };

  updateAmount = async (req, res, next) => {
    try {
      const { orderICId, orderCustomerId } = req.params;
      const result = await this.orderCustomerService.updateAmount(orderICId, orderCustomerId);
      res.status(result.code).json({ message: result.message });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

//옵션 삭제 api
  // deleteOrderCustomer = async (req, res, next) => {
  //   const { orderCustomerId } = req.params;
  //   const deleteOrderCustomer = await this.orderCustomerService.deleteOrderCustomer(orderCustomerId);

  //   res.status(200).json({ data: deleteOrderCustomer });
  // };

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