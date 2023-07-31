const OrderICService = require('../services/orderIC.service');

class OrderICController {
  orderICService = new OrderICService();

  getOrderIC = async (req, res, next) => {
    const OrderIC = await this.orderICService.findAllOrderIC();

    res.status(200).json({ data: OrderIC })
  }

  // 상품 주문 API 수정 - 주문 내용에 옵션 추가 및 전체 가격 계산
  createOrderIC = async (req, res) => {
    const { ItemId, OrderCustomerId, amount, option, price } = req.body;
    try {
      const createOrderIC = await orderICService.createOrderIC(ItemId, OrderCustomerId, amount, option, price);
      res.status(201).json(createOrderIC);
    } catch (error) {
      console.error('Failed to create orderIC:', error);
      res.status(500).json({ error: 'Failed to create orderIC' });
    }
  };

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