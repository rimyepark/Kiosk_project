
const itemRepository = require('../repositories/items.repository');

class ItemsService {
    ItemRepository = new itemRepository();

  findAllItem = async () => {
  
    const allItem = await this.ItemRepository.findAllItem();


    return allItem.map(item => {
      return {
        itemId: item.itemId,
        name: item.name,
        price: item.price,
        type: item.type,
        amount: item.amount
      }
    });
  }

  createItem = async (name,optionId,price,type,amount) => {
  
    const CreateItemData = await this.itemRepository.createItem(name,optionId,price,type,amount);

    if (!name) {
      throw new Error('상품 이름을 입력해주세요');
    }

    // 가격이 없을 경우
    if (!price) {
      throw new Error('상품 가격을 입력해주세요');
    }

    // 알맞은 타입이 아닐 경우
    const validTypes = ['Coffee', 'Beverage', 'Tea', 'Cake', 'Cookie'];
    if (!validTypes.includes(type)) {
      throw new Error('알맞은 타입을 지정해주세요');
    }

    return {
      itemId: CreateItemData.itemId,
      name: CreateItemData.name,
      optionId: CreateItemData.optionId,
      price: CreateItemData.price,
      type: CreateItemData.type,
      amount: CreateItemData.amount,
    };
  }
}

module.exports = ItemsService;