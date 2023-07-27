const { Items } = require('../models');

class itemRepository {
  findAllItem = async () => {

    const items = await Items.findAll();

    return items;
  }

  findItemById = async (itemId) => {
    const items = await Items.findByPk(itemId);

    return items;
  };

  createItem = async (name,OptionId,price,type,amount) => {

    const createItem = await Items.create({ name,OptionId,price,type,amount });

    return createItem;
  }

  deleteItem = async (itemId) => {
    const deleteItemData = await Items.destroy({ where: { itemId } });

    return deleteItemData;
  };
}


module.exports = itemRepository;
