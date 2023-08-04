const { OrderCustomers, ItemOrderCustomers, Items, sequelize } = require('../models');
const { Transaction } = require("sequelize");

class OrderCustomerRepository {
  findAllOrderCustomer = async () => {
    const orderCustomers = await OrderCustomers.findAll();
    return orderCustomers;
  }

  findOrderCustomerById = async (orderCustomerId) => {
    const orderCustomers = await OrderCustomers.findByPk(orderCustomerId);
    return orderCustomers;
  };

  finorderICById = async (orderICId) => {
    const orderICs = await ItemOrderCustomers.findByPk(orderICId);

    return orderICs;
  };

  findItemById = async (itemId) => {
    const items = await Items.findByPk(itemId);

    return items;
  };


  createOrderCustomer = async (state) => {
    const createOrderCustomer = await OrderCustomers.create({ state: !!state }); // 불리언으로 변환하여 저장
    return createOrderCustomer;
  }

  updateOrderCustomer = async (payload) => {
    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });
  
    try {
      const updateOrderCustomer = await OrderCustomers.findOne({ where: { orderCustomerId: payload.orderCustomerId } });
      if (!updateOrderCustomer) {
        throw new Error('주문 고객이 존재하지 않습니다.');
      }
  
      if (payload.state === false && updateOrderCustomer.state === true) {
        const itemOrderCustomer = await ItemOrderCustomers.findOne({ where: { OrderCustomerId: payload.orderCustomerId }, transaction: t });
        if (!itemOrderCustomer) {
          throw new Error('주문 아이템이 존재하지 않습니다.');
        }
  
        const item = await Items.findByPk(itemOrderCustomer.ItemId, { transaction: t });
        if (!item) {
          throw new Error('상품을 찾지 못했습니다.');
        }
  
        const newAmount = item.amount - itemOrderCustomer.amount;
        await Items.update(
          { amount: newAmount },
          { where: { ItemId: itemOrderCustomer.ItemId }, transaction: t }
        );
  
        await ItemOrderCustomers.update(
          { state: payload.state },
          { where: { OrderCustomerId: payload.orderCustomerId }, transaction: t }
        );
  
        await t.commit();
  
        return {
          code: 200,
          message: '주문을 수정했습니다.',
        };
      }
  
      // 다른 경우는 주문 상태만 변경
      await OrderCustomers.update(
        { state: payload.state },
        { where: { orderCustomerId: payload.orderCustomerId }, transaction: t }
      );
  
      await t.commit();
  
      return {
        code: 200,
        message: '주문 상태가 변경되었습니다.',
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

  //ordercustomer 데이터, itemordercustomer 데이터 `트랜잭션` 을 적용해 일괄 삭제
  deleteOrderCustomer = async (orderCustomerId) => {
    const t = await sequelize.transaction();

    try {
      const orderCustomer = await OrderCustomers.findByPk(orderCustomerId);
      if (!orderCustomer) {
        throw new Error('주문 고객을 찾을 수 없습니다.');
      }

      if (orderCustomer.state === true) {
        throw new Error('완료된 주문은 취소할 수 없습니다.');
      }

      await ItemOrderCustomers.destroy({ where: { OrderCustomerId: orderCustomerId }, transaction: t });
      await OrderCustomers.destroy({ where: { orderCustomerId }, transaction: t });

      await t.commit();

      return {
        code: 200,
        message: '주문이 취소되었습니다.',
      };
    } catch (error) {
      console.log(error);
      await t.rollback();
      return {
        code: 500,
        message: '에러가 발생했습니다.',
        error: error.message,
      };
    }
  };
}


module.exports = OrderCustomerRepository;

