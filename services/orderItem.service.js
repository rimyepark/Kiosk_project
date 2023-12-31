const OrderItemRepository = require('../repositories/orderItem.repository');
const { Transaction } = require("sequelize");

class OrderItemService {
    orderItemRepository = new OrderItemRepository();

    findAllOrderItem = async () => {
      const allOrderItem = await this.orderItemRepository.findAllOrderItem();
      return allOrderItem.map(orderItem => {
        return {
          orderItemId: orderItem.orderItemId,
          ItemId: orderItem.ItemId,
          state: orderItem.state,
          amount: orderItem.amount
        };
      });
    }

  createOrderItem = async (ItemId, amount, state) => {
    const CreateOrderItemData = await this.orderItemRepository.createOrderItem(ItemId, amount, state);
    if (!ItemId) {
      throw new Error('상품을 선택해주세요');
    }
    // 가격이 없을 경우
    if (!amount) {
      throw new Error('수량을 입력해주세요.');
    }

 //숫자로 저징하고 문자로 출력
    const orderItemState = {
        0: 'ORDERED',
        1: 'PENDING',
        2: 'COMPLETED',
        3: 'CANCELED'
      };

  if (typeof orderItemState[state] === 'undefined') {
    throw new Error('올바른 발주상태를 지정해주세요.');
  }

    return {
      orderItemId: CreateOrderItemData.orderItemId,
      ItemId: CreateOrderItemData.ItemId,
      state: orderItemState[state],
      amount: CreateOrderItemData.amount,
    };
  }

updateOrderItem =   async(payload) =>{
    try {
      const result = await this.orderItemRepository.updateOrderItem(payload);
      return result;
    } catch (error) {
      return {
        code: 500,
        message: '에러가 발생했습니다.',
        error: error.message,
      };
    }
  }

deleteOrderItem = async (orderItemId) => {
    const findOrderItem = await this.orderItemRepository.findOrderItemById(orderItemId);
  
    if (!findOrderItem) {
      throw new Error("아이템을 찾을 수 없습니다.");
    }

    await this.orderItemRepository.deleteOrderItem(orderItemId);
  
    return {
        orderItemId: findOrderItem.orderItemId,
        ItemId: findOrderItem.ItemId,
        state: findOrderItem.state,
      amount: findOrderItem.amount,
    };
  };
}

module.exports = OrderItemService;