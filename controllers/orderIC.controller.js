const OrderICService = require('../services/orderIC.service');

class OrderICController {
  orderICService = new OrderICService();

  getOrderIC = async (req, res, next) => {
    const OrderIC = await this.orderICService.findAllOrderIC();

    res.status(200).json({ data: OrderIC })
  }

  createOrderIC = async (req, res, next) => {
    const { ItemId, OrderCustomerId, amount, option, price } = req.body;
    const createOrderICDate = await this.orderICService.createOrderIC(ItemId, OrderCustomerId, amount, option, price);

    res.status(201).json({ data: createOrderICDate });
  }

  updateOrderIC = async (req, res, next) => {
    const { orderICId } = req.params;
    const { ItemId, OrderCustomerId, amount, option, price } = req.body;

    const updateOrderIC = await this.orderICService.updateOrderIC(
      orderICId,ItemId, OrderCustomerId, amount, option, price
    );

    res.status(200).json({ data: updateOrderIC});
  };

//옵션 삭제 api
  deleteOrderIC = async (req, res, next) => {
    const { orderICId } = req.params;
    const deleteOrderIC = await this.orderICService.deleteOrderIC(orderICId);

    res.status(200).json({ data: deleteOrderIC });
  };
}



module.exports = OrderICController;