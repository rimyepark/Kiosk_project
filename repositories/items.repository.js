
const { Items } = require('../models');

class itemRepository {
  findAllItem = async () => {

    const items = await Items.findAll();

    return items;
  }

  createItem = async (name,OptionId,price,type,amount) => {

    const createItem = await Items.create({ name,OptionId,price,type,amount });

    return createItem;
  }
}


module.exports = itemRepository;
