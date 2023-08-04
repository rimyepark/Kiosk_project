const { ItemOrderCustomers, sequelize } = require('../models');
const NodeCache = require('node-cache');

const optionCache = new NodeCache({ stdTTL: 3600 });

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
    // 옵션을 포함한 총 가격 계산
    const optionPrice = await this.calculateOptionPrice(ItemId, option);
    const totalPrice = price + optionPrice;

    const createOrderIC = await ItemOrderCustomers.create({
      ItemId,
      OrderCustomerId,
      amount,
      option,
      price: totalPrice, // 옵션 포함한 총 가격 저장
    });

    return createOrderIC;
  };

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

   // 아이템의 선택된 옵션에 대한 가격을 계산하는 함수
   calculateOptionPrice = async (ItemId, selectedOptions) => {
    const cachedOptions = optionCache.get(ItemId);

    if (!cachedOptions) {
      // 캐시에서 옵션을 찾지 못한 경우, 데이터베이스에서 옵션을 가져와 캐시에 저장
      const options = await this.getOptionsFromDatabase(ItemId);
      optionCache.set(ItemId, options);
      return this.calculateOptionPriceInternal(options, selectedOptions);
    } else {
      return this.calculateOptionPriceInternal(cachedOptions, selectedOptions);
    }
  };

  // 선택된 옵션에 대한 가격을 계산하는 내부 함수
  calculateOptionPriceInternal = (options, selectedOptions) => {
    let optionPrice = 0;
    for (const selectedOption of selectedOptions) {
      const option = options.find((o) => o.id === selectedOption.id);
      if (option) {
        optionPrice += option.price * selectedOption.quantity;
      }
    }
    return optionPrice;
  };

  // 아이템의 옵션을 데이터베이스에서 가져오는 함수
  getOptionsFromDatabase = async (ItemId) => {
    // 여기에 아이템에 대한 옵션을 데이터베이스에서 가져오는 로직을 구현해야 합니다.
    // 예를 들어: return Options.findAll({ where: { ItemId } });
    return [];
  };
}


module.exports = OrderICRepository;

