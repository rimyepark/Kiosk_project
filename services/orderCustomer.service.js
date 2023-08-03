const OrderCustomerRepository = require('../repositories/orderCustomers.repository');
const OrderICRepository = require('../repositories/orderICs.repository');
const itemRepository = require('../repositories/items.repository');

class OrderCustomerService {

  orderCustomerRepository = new OrderCustomerRepository();
  itemOrderCustomerRepository = new OrderICRepository();
  itemsRepository = new itemRepository();

  findAllOrderCustomer = async () => {
    const allOrderCustomer = await this.orderCustomerRepository.findAllOrderCustomer();
    return allOrderCustomer.map(orderCustomer => ({
      orderCustomerId: orderCustomer.orderCustomerId,
      state: orderCustomer.state,
      createdAt: orderCustomer.createdAt,
      updatedAt: orderCustomer.updatedAt,
    }));
  }

  createOrderCustomer = async (state) => {
    const createOrderCustomerData = await this.orderCustomerRepository.createOrderCustomer(state);
    return {
      orderCustomerId: createOrderCustomerData.orderCustomerId,
      state: createOrderCustomerData.state === true, // 불리언 값 그대로 반환
    };
  }

  updateOrderCustomer = async (orderCustomerId, state) => {
    const findOrderCustomer = await this.orderCustomerRepository.findOrderCustomerById(orderCustomerId);
    if (!findOrderCustomer) throw new Error("옵션을 찾지 못하였습니다.");
    
    await this.orderCustomerRepository.updateOrderCustomer(orderCustomerId,state);
    
    const updateOrderCustomer = await this.orderCustomerRepository.findOrderCustomerById(orderCustomerId);
    
    return {
      orderCustomerId: updateOrderCustomer.orderCustomerId,
      state: updateOrderCustomer.state,
    };
  };

  updateAmount = async (orderICId, orderCustomerId) => {
    return this.orderCustomerRepository.updateAmount(orderICId, orderCustomerId);
  };

  // deleteOrderCustomer = async (orderCustomerId) => {
  //   const findOrderCustomer = await this.orderCustomerRepository.findOrderCustomerById(orderCustomerId);
  //   if (!findOrderCustomer) throw new Error("옵션을 찾을 수 없습니다.");
    
  //   await this.orderCustomerRepository.deleteOrderCustomer(orderCustomerId);
    
  //   return {
  //     orderCustomerId: findOrderCustomer.orderCustomerId,
  //     state: findOrderCustomer.state,
  //   };
  // };

  deleteOrderCustomer = async (orderCustomerId) => {
    return this.orderCustomerRepository.deleteOrderCustomer(orderCustomerId);
  };
}



module.exports = OrderCustomerService;