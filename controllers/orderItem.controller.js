const OrderItemService = require('../services/orderItem.service');

class OrderItemsController {
    orderItemsService = new OrderItemService();

    getOrderItem = async (req, res, next) => {
      try {
        const orderItems = await this.orderItemsService.findAllOrderItem();
        res.status(200).json({ data: orderItems });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }

  createOrderItem = async (req, res, next) => {
    const {  ItemId, amount, state } = req.body;
    // ORDERED', 'PENDING', 'COMPLETED', 'CANCELED
    const createOrderItemDate = await this.orderItemsService.createOrderItem( ItemId, amount, state);
    res.status(201).json({ data: createOrderItemDate });
  };

updateOrderItem = async (req, res) => {
  const { orderItemId, ItemId, amount, state } = req.body; // orderItemId 추가

  const payload = {
    orderItemId, // orderItemId 추가
    ItemId,
    amount,
    state,
  };

  const result = await this.orderItemsService.updateOrderItem(payload);

  return res.status(result.code).json(result);
}

  deleteOrderItem = async (req, res, next) => {
    const { orderItemId } = req.params;
    const deleteOrderItem = await this.orderItemsService.deleteOrderItem(orderItemId);
    res.status(200).json({ data: deleteOrderItem })   
  };


}

module.exports = OrderItemsController;