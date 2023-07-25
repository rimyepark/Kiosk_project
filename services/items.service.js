
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