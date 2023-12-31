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

  updateOrderCustomer = async (payload) => {
    try {
      const result = await this.orderCustomerRepository.updateOrderCustomer(payload);
      return result;
    } catch (error) {
      return {
        code: 500,
        message: '에러가 발생했습니다.',
        error: error.message,
      };
    }
  }

  deleteOrderCustomer = async (orderCustomerId) => {
    return this.orderCustomerRepository.deleteOrderCustomer(orderCustomerId);
  };
}



module.exports = OrderCustomerService;