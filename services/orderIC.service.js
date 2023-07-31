const orderICs = require('../models/itemordercustomers');
const OrderICRepository = require('../repositories/orderICs.repository');

class OrderICService {

  orderICRepository = new OrderICRepository();

    findAllOrderIC = async() => { 
    const allOrderIC = await this.orderICRepository.findAllOrderIC();
    return allOrderIC.map(orderIC => {
      return {
        orderICId: orderIC.orderICId,
        ItemId: orderIC.ItemId,
        OrderCustomerId: orderIC.OrderCustomerId,
        amount: orderIC.amount,
        option: orderIC.option,
        price: orderIC.price,
        createdAt: orderIC.createdAt,
        updatedAt: orderIC.updatedAt,
      }
    });
  }

  createOrderIC = async (ItemId, OrderCustomerId, amount, option, price) => {  
    const CreateOrderICData = await this.orderICRepository.createOrderIC(ItemId, OrderCustomerId, amount, option, price);
    if (!CreateOrderICData) throw new Error("데이터를 찾을 수 없습니다.");
   
    return {
      orderICId: CreateOrderICData.orderICId,
      ItemId: CreateOrderICData.ItemId,
      OrderCustomerId: CreateOrderICData.OrderCustomerId,
      amount: CreateOrderICData.amount,
      option: CreateOrderICData.option,
      price: CreateOrderICData.price,
    };
  }

  updateOrderIC = async (orderICId, ItemId, OrderCustomerId, amount, option, price) => {
    const findOrderIC = await this.orderICRepository.findOrderICById(orderICId);
    if (!findOrderIC) throw new Error("옵션을 찾지 못하였습니다.");
    
    await this.orderICRepository.updateOrderIC(orderICId,ItemId, OrderCustomerId, amount, option, price);
    
    const updateOrderIC = await this.orderICRepository.findOrderICById(orderICId);
    
    return {
      orderICId: updateOrderIC.orderICId,
      ItemId: updateOrderIC.ItemId,
      OrderCustomerId: updateOrderIC.OrderCustomerId,
      amount: updateOrderIC.amount,
      option: updateOrderIC.option,
      price: updateOrderIC.price,
    };
  };

  deleteOrderIC = async (orderICId) => {
    const findOrderIC = await this.orderICRepository.findOrderICById(orderICId);
    if (!state === true) throw new Error("완료된 주문은 취소할 수 없습니다.");
    
    await this.orderICRepository.deleteOrderIC(orderICId);
    
    return {
      orderICId: findOrderIC.orderICId,
      ItemId: findOrderIC.ItemId,
      OrderCustomerId: findOrderIC.OrderCustomerId,
      amount: findOrderIC.amount,
      option: findOrderIC.option,
      price: findOrderIC.price,
    };
  };
}



module.exports = OrderICService;