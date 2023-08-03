const { OrderItems, Items , sequelize} = require('../models');

const orderItemState = {
  0: 'ORDERED',
  1: 'PENDING',
  2: 'COMPLETED',
  3: 'CANCELED'
};

class OrderItemRepository {
  findAllOrderItem = async () => {

    const orderItems = await OrderItems.findAll();

    return orderItems;
  }

  findOrderItemById = async (orderItemId) => {
    const orderItems = await OrderItems.findByPk(orderItemId);

    return orderItems;
  };


  findItemById = async (itemId) => {
    const items = await Items.findByPk(itemId);

    return items;
  };

  createOrderItem = async (ItemId, amount, state) => {

    const createOrderItem = await OrderItems.create({ ItemId, amount, state });

    return createOrderItem;
  }
  

  updateOrderItem = async (payload) => {
    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });

    try {
      const orderItem = await OrderItems.findOne({ where: { id: payload.orderItemId } });
      if (!orderItem) {
        throw new Error('주문 아이템이 존재하지 않습니다.');
      }

      // 숫자로 입력된 상태 코드를 문자열로 변환
      const newState = orderItemState[payload.state];
      if (!newState) {
        throw new Error('유효하지 않은 상태 코드입니다.');
      }

      // 'PENDING' → 'COMPLETED' 상태로 변경될 때
      if (payload.state === 1 && orderItem.state !== 2) {
        const updatedOrderItem = await OrderItems.update(
          { state: newState }, // 상태 코드를 문자열로 변경
          { where: { id: payload.orderItemId }, transaction: t }
        );


        if (updatedOrderItem[0] === 0) {
          throw new Error('상품 주문에 실패했습니다.');
        }

        const item = await Items.findByPk(payload.itemId, { transaction: t });

        if (!item) {
          throw new Error('상품을 찾지 못했습니다.');
        }

        const newAmount = item.amount + orderItem.amount;
        await Items.update(
          { amount: newAmount },
          { where: { id: payload.itemId }, transaction: t }
        );

        await t.commit();

        return {
          code: 200,
          message: '발주가 완료되었습니다.',
        };
      }

      // 다른 경우는 발주상태만 변경
      await OrderItems.update({ state: payload.state }, { where: { id: payload.orderItemId }, transaction: t });

      await t.commit();

      return {
        code: 200,
        message: '발주 상태가 변경되었습니다.',
      };
    } catch (error) {
      await t.rollback();
      return {
        code: 500,
        message: '에러가 발생했습니다.',
        error: error.message,
      };
    }
  };


  deleteOrderItem= async (orderItemId) => {
    const deleteOrderItemData = await OrderItems.destroy({ where: { orderItemId } });

    return deleteOrderItemData;
  };
}


module.exports = OrderItemRepository;
