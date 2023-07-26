const ItemsService = require('../services/items.service');

class ItemsController {
    itemsService = new ItemsService();
  getItems = async (req, res, next) => {

    const Items = await this.itemsService.findAllItem();

    res.status(200).json({ data: Items })
  }

  createItem = async (req, res, next) => {
    const { name,OptionId,price,type,amount } = req.body;

    // 'Coffee', 'Beverage','Tea', 'Cake', 'Cookie'
    const createItemDate = await this.itemsService.createItem(name,OptionId,price,type,amount);

    res.status(201).json({ data: createItemDate });
  }
}

module.exports = ItemsController;