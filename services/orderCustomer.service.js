const ordercustomers = require('../models/ordercustomers');
const OrderCustomerRepository = require('../repositories/orderCustomers.repository');

class OrderCustomerService {

  OrderCustomerRepository = new OrderCustomerRepository();

    findAllOrderCustomer = async() => { 
    const allOrderCustomer = await this.OrderCustomerRepository.findAllOrderCustomer();
    return allOrderCustomer.map(orderCustomer => {
      return {
        orderCustomerId: orderCustomer.orderCustomerId,
        state: orderCustomer.state,
        createdAt: orderCustomer.createdAt,
        updatedAt: orderCustomer.updatedAt,
      }
    });
  }

  createOrderCustomer = async (state) => {  
    const CreateOrderCustomerData = await this.OrderCustomerRepository.createOrderCustomer(state);
    if (!CreateOrderCustomerData) throw new Error("데이터를 찾을 수 없습니다.");
   
    return {
      orderCustomerId: CreateOrderCustomerData.orderCustomerId,
      state: CreateOrderCustomerData.state,
    };
  }

  updateOrderCustomer = async (orderCustomerId, state) => {
    const findOrderCustomer = await this.OrderCustomerRepository.findOrderCustomerById(orderCustomerId);
    if (!findOrderCustomer) throw new Error("옵션을 찾지 못하였습니다.");
    
    await this.OrderCustomerRepository.updateOrderCustomer(orderCustomerId,state);
    
    const updateOrderCustomer = await this.OrderCustomerRepository.findOrderCustomerById(orderCustomerId);
    
    return {
      orderCustomerId: updateOrderCustomer.orderCustomerId,
      state: updateOrderCustomer.state,
    };
  };

  deleteOrderCustomer = async (orderCustomerId) => {
    const findOrderCustomer = await this.OrderCustomerRepository.findOrderCustomerById(orderCustomerId);
    if (!findOrderCustomer) throw new Error("옵션을 찾을 수 없습니다.");
    
    await this.OrderCustomerRepository.deleteOrderCustomer(orderCustomerId);
    
    return {
      orderCustomerId: findOrderCustomer.orderCustomerId,
      state: findOrderCustomer.state,
    };
  };
}



module.exports = OrderCustomerService;