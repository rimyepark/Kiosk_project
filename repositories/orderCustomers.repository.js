const { OrderCustomers, ItemOrderCustomers, Items, sequelize } = require('../models');

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

  updateOrderCustomer = async (orderCustomerId, state) => {
    const updateOrderCustomerData = await OrderCustomers.update(
      { state },
      { where: { orderCustomerId } }
    );
    return updateOrderCustomerData;
  };

  updateAmount = async (orderICId, orderCustomerId) => {
    const t = await sequelize.transaction();

    try {
      // ItemOrderCustomers에서 주문을 찾아 옵니다.
      const orderIC = await this.finorderICById(orderICId);
      if (!orderIC) {
        throw new Error('주문을 찾지 못했습니다.');
      }

      // OrderCustomers의 state를 true로 업데이트합니다.
      const updateOrderCustomerData = await this.updateOrderCustomer(orderCustomerId, true);
      if (updateOrderCustomerData[0] === 0) {
        throw new Error('주문자 상태 업데이트에 실패했습니다.');
      }

      // Items에서 상품을 찾아 amount를 조정합니다.
      const item = await this.findItemById(orderIC.ItemId);
      if (!item) {
        throw new Error('상품을 찾지 못했습니다.');
      }

      const newAmount = item.amount - orderIC.amount;
      if (newAmount < 0) {
        throw new Error('상품의 재고가 부족합니다.');
      }

      await Items.update(
        { amount: newAmount },
        { where: { id: orderIC.ItemId }, transaction: t }
      );

      await t.commit();

      return {
        code: 200,
        message: '주문 완료 처리 및 재고 조정이 완료되었습니다.',
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

  // deleteOrderCustomer = async (orderCustomerId) => {
  //   const deleteOrderCustomerData = await OrderCustomers.destroy({ where: { orderCustomerId } });
  //   return deleteOrderCustomerData;
  // };

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

