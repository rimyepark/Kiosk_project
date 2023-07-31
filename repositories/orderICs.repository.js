const { ItemOrderCustomers, sequelize } = require('../models');

class OrderICRepository {
  findAllOrderIC = async () => {

    const orderICs = await ItemOrderCustomers.findAll();

    return orderICs;
  }

  finorderICById = async (orderICId) => {
    const orderICs = await ItemOrderCustomers.findByPk(orderICId);

    return orderICs;
  };

  createOrderIC = async (ItemId, OrderCustomerId, amount, option, price) => {

    const createOrderIC = await ItemOrderCustomers.create(ItemId, OrderCustomerId, amount, option, price);

    return createOrderIC;
  }

  updateOrderIC = async (orderICId,ItemId, OrderCustomerId, amount, option, price) => {
    const updateOrderICData = await ItemOrderCustomers.update(
      { ItemId, OrderCustomerId, amount, option, price },
      { where: { orderICId } }
    );

    return updateOrderICData;
  };

  deleteOrderIC = async (orderICId) => {
    const deleteOrderICData = await ItemOrderCustomers.destroy({ where: { orderICId } });

    return deleteOrderICData;
  };
}


module.exports = OrderICRepository;

