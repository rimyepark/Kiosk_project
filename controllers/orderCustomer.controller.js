const OrderCustomerService = require('../services/orderCustomer.service');

class OrderCustomerController {
  orderCustomerService = new OrderCustomerService();

  getOrderCustomer = async (req, res, next) => {
    const OrderCustomer = await this.orderCustomerService.findAllOrderCustomer();

    res.status(200).json({ data: OrderCustomer })
  }

  createOrderCustomer = async (req, res, next) => {
    const { state } = req.body;
    const createOrderCustomerDate = await this.orderCustomerService.createOrderCustomer(state);

    res.status(201).json({ data: createOrderCustomerDate });
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

//옵션 삭제 api
  deleteOrderCustomer = async (req, res, next) => {
    const { orderCustomerId } = req.params;
    const deleteOrderCustomer = await this.orderCustomerService.deleteOrderCustomer(orderCustomerId);

    res.status(200).json({ data: deleteOrderCustomer });
  };
}



module.exports = OrderCustomerController;