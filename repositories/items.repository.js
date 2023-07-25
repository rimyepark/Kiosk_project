
const { items } = require('../models');

class itemRepository {
  findAllItem = async () => {

    const Items = await items.findAll();

    return Items;
  }

  createItem = async (name,optionId,price,type,amount) => {

    const createItem = await items.create({ name,optionId,price,type,amount });

    return createItem;
  }
}


module.exports = itemRepository;
