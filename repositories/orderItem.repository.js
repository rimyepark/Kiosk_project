const { OrderItems } = require('../models');

class OrderItemRepository {
  findAllOrderItem = async () => {

    const orderItems = await OrderItems.findAll();

    return orderItems;
  }

  findOrderItemById = async (orderItemId) => {
    const orderItems = await OrderItems.findByPk(orderItemId);

    return orderItems;
  };

  createOrderItem = async (ItemId, amount, state) => {

    const createOrderItem = await OrderItems.create({ ItemId, amount, state });

    return createOrderItem;
  }

  updateOrderItem = async ( orderItemId, ItemId, amount, state) => {
    const updateOrderItemData = await OrderItems.update(
      { ItemId, amount, state },
      { where: { orderItemId } }
    );

    return updateOrderItemData;
  };

  deleteOrderItem= async (orderItemId) => {
    const deleteOrderItemData = await OrderItems.destroy({ where: { orderItemId } });

    return deleteOrderItemData;
  };
}

module.exports = OrderItemRepository;
