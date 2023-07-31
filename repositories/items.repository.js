const {  Items, Options } = require('../models');
const NodeCache = require('node-cache');
const optionCache = new NodeCache({ stdTTL: 3600 });

class itemRepository {

  getItemOptions = async (itemId) => {
    const cachedOptions = optionCache.get(itemId);
    if (cachedOptions) {
      return cachedOptions;
    } else {
      const options = await Options.findAll({ where: { itemId } });
      optionCache.set(itemId, options);
      return options;
    }
  };

  //아이템 조회 api
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

  updateItem = async (itemId,name,OptionId,price,type,amount) => {
    const updateItemData = await Items.update(
      { name,OptionId,price,type,amount },
      { where: { itemId } }
    );

    return updateItemData;
  };


  deleteItem = async (itemId) => {
    const deleteItemData = await Items.destroy({ where: { itemId } });

    return deleteItemData;
  };
}


module.exports = itemRepository;
