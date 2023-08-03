const { OrderCustomers, sequelize } = require('../models');

class OrderCustomerRepository {
  findAllOrderCustomer = async () => {
    const orderCustomers = await OrderCustomers.findAll();
    return orderCustomers;
  }

  findOrderCustomerById = async (orderCustomerId) => {
    const orderCustomers = await OrderCustomers.findByPk(orderCustomerId);
    return orderCustomers;
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

  deleteOrderCustomer = async (orderCustomerId) => {
    const deleteOrderCustomerData = await OrderCustomers.destroy({ where: { orderCustomerId } });
    return deleteOrderCustomerData;
  };
}


module.exports = OrderCustomerRepository;

