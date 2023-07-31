const { OrderItems, Items , sequelize} = require('../models');

class OrderItemRepository {
  findAllOrderItem = async () => {

    const orderItems = await OrderItems.findAll();

    return orderItems;
  }

  findOrderItemById = async (orderItemId) => {
    const orderItems = await OrderItems.findByPk(orderItemId);

    return orderItems;
  };

  // findItemAmount = async (itemId) => {
  //   const item = await Items.findByPk(itemId);
  //   if (!item) {
  //     throw new Error("상품을 찾지 못하였습니다.");
  //   }
  //   return item.amount;
  // };
  
  findItemById = async (itemId) => {
    const items = await Items.findByPk(itemId);

    return items;
  };

  createOrderItem = async (ItemId, amount, state) => {

    const createOrderItem = await OrderItems.create({ ItemId, amount, state });

    return createOrderItem;
  }

  updateOrderItem = async ( orderItemId ,amount, ItemId, state , itemId) => {
    const t = await sequelize.transaction({
        // 격리수준 설정
        isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
      });
      try {
        await OrderItems.update(
          { state : 'COMPLETED' }, // 변경할 상태값을 'Completed'로 설정
          { where: { orderItemId, state : 'PENDING' } }, // orderItemId와 현재 상태가 'Pending'인 조건으로 필터링
          { transaction: t },
        );

        await Items.decrement(
          { point: amount }, //
          { where: { itemId } },
          { transaction: t },
        );

  await t.commit();
    } catch (error) {
      await t.rollback();
      return res
      .status(400)
      .json({ errorMessage: `아이템 주문에 실패하였습니다.` });
  }

  return res.status(200).json({ message: "아이템 주문에 성공하셨습니다." });
    }


  deleteOrderItem= async (orderItemId) => {
    const deleteOrderItemData = await OrderItems.destroy({ where: { orderItemId } });

    return deleteOrderItemData;
  };
}


module.exports = OrderItemRepository;
