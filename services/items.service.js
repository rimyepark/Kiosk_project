const itemRepository = require('../repositories/items.repository');

class ItemsService {
    ItemRepository = new itemRepository();

    findAllItemsWithOptions = async () => {
      const items = await ItemRepository.findAllItem();
  
      // Iterate through the items and get the options for each item
      const itemsWithOptions = await Promise.all(
        items.map(async (item) => {
          const itemId = item.id;
          const options = await ItemRepository.getItemOptions(itemId);
          return { ...item.toJSON(), options: options };
        })
      );
  
      return itemsWithOptions;
    };
    
// 'Coffee', 'ade','Tea', 'Cake', 'Cookie'
    findAllItem = async() => { 
      const type  = {
        "Coffee": "Coffee",
        "ade": "ade",
        "Tea": "Tea",
        "Cake": "Cake",
        "Cookie": "Cookie",
      };
    const allItem = await this.ItemRepository.findAllItem( type ? { type } : {});
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
    const validTypes = ['Coffee', 'ade', 'Tea', 'Cake', 'Cookie'];
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


  updateItem = async (itemId,name,OptionId,price,type,amount) => {
    const findItem = await this.ItemRepository.findItemById(itemId);
    if (!findItem) throw new Error("아이템을 찾지 못하였습니다.");
    
    await this.ItemRepository.updateItem(itemId, name,OptionId,price,type,amount);
    
    const updateItem = await this.ItemRepository.findItemById(itemId);

    if (!name) {
      throw new Error('상품의 이름을 입력해주세요');
    }

    if (amount<=0) {
      throw new Error('알맞은 가격을 입력해주세요');
    }
    
    
    return {
      itemId: updateItem.itemId,
      name: updateItem.name,
      price: updateItem.price,
      type: updateItem.type,
      amount: updateItem.amount,
    };
  };

  deleteItem = async (itemId) => {
    const findItem = await this.ItemRepository.findItemById(itemId);
  
    if (!findItem) {
      throw new Error("아이템을 찾을 수 없습니다.");
    }
  
    if (findItem.amount > 0) {
      // 사용자 입력을 받기 위한 함수 정의
      const askConfirmation = () => {
        const readline = require('readline');
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
  
        rl.question('수량이 남아있습니다. 정말 삭제하시겠습니까? (yes/no): ', (answer) => {
          rl.close();
  
          if (answer.toLowerCase() === 'yes') {
            // 사용자가 'yes'를 입력하면 아이템을 삭제합니다.
            this.ItemRepository.deleteItem(itemId)
              .then(() => {
                console.log('아이템이 삭제되었습니다.');
              })
              .catch((error) => {
                console.error('삭제 중 오류가 발생했습니다.', error);
              });
          } else if (answer.toLowerCase() === 'no') {
            // 사용자가 'no'를 입력하면 삭제를 취소합니다.
            console.log('삭제를 취소합니다.');
          } else {
            // 유효하지 않은 입력일 경우 다시 물어봅니다.
            console.log('올바른 값을 입력하세요 (yes 또는 no).');
            askConfirmation();
          }
        });
      };
  
      // 사용자 입력 함수 호출
      askConfirmation();
  
      // 삭제 여부를 묻고 나면 해당 프로미스를 리턴하지 않고 바로 함수를 종료합니다.
      // 콘솔에서 작업을 진행할 때 사용자 입력을 기다리는 동안 블로킹하지 않기 위함입니다.
      return;
    }
  
    // 수량이 없으면 바로 삭제합니다.
    await this.ItemRepository.deleteItem(itemId);
  
    return {
      itemId: findItem.itemId,
      name: findItem.name,
      OptionId: findItem.OptionId,
      price: findItem.price,
      type: findItem.type,
      amount: findItem.amount,
    };
  };
}

module.exports = ItemsService;