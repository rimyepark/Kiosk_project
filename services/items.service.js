const itemRepository = require('../repositories/items.repository');

class ItemsService {
    ItemRepository = new itemRepository();

    findAllItem = async() => {
  
    const allItem = await this.ItemRepository.findAllItem();


    return allItem.map(item => {
      return {
        itemId: item.itemId,
        name: item.name,
        OptionId: item.OptionId,
        price: item.price,
        type: item.type,
        amount: item.amount
      }
    });
  }

  createItem = async (name,OptionId,price,type,amount) => {
  
    const CreateItemData = await this.ItemRepository.createItem(name,OptionId,price,type,amount);

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
      OptionId: CreateItemData.OptionId,
      price: CreateItemData.price,
      type: CreateItemData.type,
      amount: CreateItemData.amount,
    };
  }

  deleteItem  = async (itemId) => {
    const findItem = await this.ItemRepository.findItemById(itemId);
    if (!findItem) throw new Error("아이템을 찾을 수 없습니다.");

    await this.ItemRepository.deleteItem(itemId);

    return {
      itemId: findItem.itemId,
      name: findItem.name,
      OptionId: findItem.OptionId,
      price: findItem.price,
      type: findItem.type,
      amount: findItem.amount,
  };
}
}

module.exports = ItemsService;