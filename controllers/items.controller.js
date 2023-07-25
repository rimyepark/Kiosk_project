const ItemsService = require('../services/items.service');

class ItemsController {
    itemsService = new ItemsService();
  getItems = async (req, res, next) => {

    const Items = await this.ItemsService.findAllItem();

    res.status(200).json({ data: Items })
  }

  createItem = async (req, res, next) => {
    const { name,optionId,price,type,amount } = req.body;

    // 서비스 계층에 구현된 createPost 로직을 실행합니다.
    const createItemDate = await this.ItemsService.createItem(name,optionId,price,type,amount);

    res.status(201).json({ data: createItemDate });
  }
}

module.exports = ItemsController;