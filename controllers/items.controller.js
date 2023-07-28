const ItemsService = require('../services/items.service');

class ItemsController {
    itemsService = new ItemsService();

  getItems = async (req, res, next) => {
    const { optionId } = req.query;
    const Items = await this.itemsService.findAllItem();
    res.status(200).json({ data: Items })
  }

  createItem = async (req, res, next) => {
    const { name,OptionId,price,type,amount } = req.body;
    // 'Coffee', 'ade','Tea', 'Cake', 'Cookie'
    const createItemDate = await this.itemsService.createItem(name,OptionId,price,type,amount);
    res.status(201).json({ data: createItemDate });
  };

  updateItem = async (req, res, next) => {
    const { itemId } = req.params;
    const { name,OptionId,price,type,amount } = req.body;
    const updateItem = await this.itemsService.updateItem(
      itemId,
      name,
      OptionId,
      price,
      type,
      amount
    );
    res.status(200).json({ data: updateItem });
  };

  deleteItem = async (req, res, next) => {
    const { itemId } = req.params;
    const deleteItem = await this.itemsService.deleteItem(itemId);
    res.status(200).json({ data: deleteItem })   
  };


}

module.exports = ItemsController;