const OrderItemRepository = require('../repositories/orderItem.repository');

class OrderItemService {
    orderItemRepository = new OrderItemRepository();

    findAllOrderItem = async() => {   
    const allOrderItem = await this.orderItemRepository.findAllOrderItem();
    return allOrderItem.map(orderItem => {
      return {
        orderItemId: orderItem.orderItemId,
        ItemId: orderItem.ItemId,
        state: orderItem. state,
        amount: orderItem.amount
      }
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

  updateOrderItem = async (orderItemId, ItemId, amount, state) => {
    const findOrderItem = await this.orderItemRepository.findOrderItemById(orderItemId);
    if (!findOrderItem) throw new Error("아이템을 찾지 못하였습니다.");
    
    await this.orderItemRepository.updateOrderItem(orderItemId, ItemId, amount, state);
    
    const updateOrderItem = await this.orderItemRepository.findOrderItemById(orderItemId);
    
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
        orderItemId: updateOrderItem.orderItemId,
        ItemId: updateOrderItem.ItemId,
        amount: updateOrderItem.amount,
        state: orderItemState[state],
    };
  };

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