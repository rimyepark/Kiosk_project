const OrderItemService = require('../services/orderItem.service');

class OrderItemsController {
    orderItemsService = new OrderItemService();

    getOrderItem = async (req, res, next) => {
    const { itemId } = req.query;
    const OrderItems = await this.orderItemsService.findAllOrderItem();
    res.status(200).json({ data: OrderItems })
  }

  createOrderItem = async (req, res, next) => {
    const {  ItemId, amount, state } = req.body;
    // ORDERED', 'PENDING', 'COMPLETED', 'CANCELED
    const createOrderItemDate = await this.orderItemsService.createOrderItem( ItemId, amount, state);
    res.status(201).json({ data: createOrderItemDate });
  };

  updateOrderItem= async (req, res, next) => {
    const { orderItemId } = req.params;
    const {ItemId, amount, state } = req.body;
    const updateOrderItem = await this.orderItemsService.updateOrderItem(
        orderItemId,
        ItemId, 
        amount, 
        state
    );
    res.status(200).json({ data: updateOrderItem });
  };

  deleteOrderItem = async (req, res, next) => {
    const { orderItemId } = req.params;
    const deleteOrderItem = await this.orderItemsService.deleteOrderItem(orderItemId);
    res.status(200).json({ data: deleteOrderItem })   
  };


}

module.exports = OrderItemsController;