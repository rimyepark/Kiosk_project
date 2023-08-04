const OrderICService = require('../services/orderIC.service');

class OrderICController {
  orderICService = new OrderICService();

  getOrderIC = async (req, res, next) => {
    try {
      const OrderIC = await this.orderICService.findAllOrderIC();
      res.status(200).json({ data: OrderIC });
    } catch (error) {
      console.error('Failed to fetch orderICs:', error);
      res.status(500).json({ error: 'Failed to fetch orderICs' });
    }
  }

  createOrderIC = async (req, res) => {
    const { ItemId, OrderCustomerId, amount, option, price } = req.body;
    try {
      const createOrderIC = await this.orderICService.createOrderIC(ItemId, OrderCustomerId, amount, option, price);
      res.status(201).json(createOrderIC);
    } catch (error) {
      console.error('Failed to create orderIC:', error);
      res.status(500).json({ error: 'Failed to create orderIC' });
    }
  };

  updateOrderIC = async (req, res, next) => {
    const { orderICId } = req.params;
    const { ItemId, OrderCustomerId, amount, option, price } = req.body;

    try {
      const updateOrderIC = await this.orderICService.updateOrderIC(
        orderICId, ItemId, OrderCustomerId, amount, option, price
      );
      res.status(200).json({ data: updateOrderIC });
    } catch (error) {
      console.error('Failed to update orderIC:', error);
      res.status(500).json({ error: 'Failed to update orderIC' });
    }
  };

  deleteOrderIC = async (req, res, next) => {
    const { orderICId } = req.params;
    try {
      const deleteOrderIC = await this.orderICService.deleteOrderIC(orderICId);
      res.status(200).json({ data: deleteOrderIC });
    } catch (error) {
      console.error('Failed to delete orderIC:', error);
      res.status(500).json({ error: 'Failed to delete orderIC' });
    }
  };
}

module.exports = OrderICController;
